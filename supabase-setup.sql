-- ============================================
-- GUINÉ-VENDAS - Setup Supabase
-- Execute este script no SQL Editor do seu
-- projeto Supabase (uma única vez).
-- ============================================

-- ---------- TABELAS ----------

-- Perfil do utilizador, ligado à conta Supabase Auth.
-- A identidade (email + palavra-passe) fica em auth.users;
-- aqui guardamos apenas dados extra (nome completo, telefone).
create table if not exists profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text,
  phone      text,
  created_at timestamptz not null default now()
);

create table if not exists ads (
  id          bigint primary key default (floor(random() * 9000000000) + 1000000000),
  user_id     uuid references auth.users(id) on delete cascade,
  title       text not null,
  description text not null default '',
  price       numeric,
  category    text,
  subcategory text,
  province    text,
  location    text,
  condition   text,
  images      jsonb not null default '[]',
  seller      jsonb,
  status      text not null default 'active',
  featured    boolean not null default false,
  views       integer not null default 0,
  created_at  timestamptz not null default now(),
  constraint ads_price_nonneg check (price is null or price >= 0),
  constraint ads_title_len    check (char_length(title) between 3 and 120)
);

create table if not exists favorites (
  user_id    uuid references auth.users(id) on delete cascade,
  ad_id      bigint references ads(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, ad_id)
);

create table if not exists reports (
  id         bigint primary key default (floor(random() * 9000000000) + 1000000000),
  ad_id      bigint references ads(id) on delete cascade,
  reporter   uuid references auth.users(id) on delete set null,
  reason     text,
  created_at timestamptz not null default now()
);

create index if not exists idx_ads_category   on ads (category);
create index if not exists idx_ads_user       on ads (user_id);
create index if not exists idx_ads_status     on ads (status);
create index if not exists idx_favorites_user on favorites (user_id);

-- ---------- SEGURANÇA (RLS) ----------
-- Segurança real: só o dono de cada linha pode alterá-la.
-- A identidade vem do Supabase Auth (auth.uid()), nunca do cliente.

-- Cria automaticamente o perfil quando um utilizador se regista.
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email),
    new.raw_user_meta_data ->> 'phone'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table profiles   enable row level security;
alter table ads        enable row level security;
alter table favorites  enable row level security;
alter table reports    enable row level security;

-- PROFILES: só lê/edita o próprio perfil.
drop policy if exists "profiles_select" on profiles;
drop policy if exists "profiles_insert" on profiles;
drop policy if exists "profiles_update" on profiles;
create policy "profiles_select" on profiles for select using (auth.uid() = id);
create policy "profiles_insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

-- ADS: todos veem anúncios públicos; só o dono edita/apaga.
drop policy if exists "ads_select" on ads;
drop policy if exists "ads_insert" on ads;
drop policy if exists "ads_update" on ads;
drop policy if exists "ads_delete" on ads;
create policy "ads_select" on ads for select using (auth.uid() = user_id or status in ('active','sold'));
create policy "ads_insert" on ads for insert with check (auth.uid() = user_id);
create policy "ads_update" on ads for update using (auth.uid() = user_id);
create policy "ads_delete" on ads for delete using (auth.uid() = user_id);

-- FAVORITES: só o dono.
drop policy if exists "fav_select" on favorites;
drop policy if exists "fav_insert" on favorites;
drop policy if exists "fav_delete" on favorites;
create policy "fav_select" on favorites for select using (auth.uid() = user_id);
create policy "fav_insert" on favorites for insert with check (auth.uid() = user_id);
create policy "fav_delete" on favorites for delete using (auth.uid() = user_id);

-- REPORTS: qualquer utilizador autenticado pode reportar; só vê a própria.
drop policy if exists "rep_insert" on reports;
drop policy if exists "rep_select" on reports;
create policy "rep_insert" on reports for insert with check (auth.uid() is not null);
create policy "rep_select" on reports for select using (auth.uid() = reporter);

-- Pronto! Ative o provider Email no Supabase (Auth -> Providers) e
-- preencha js/supabase-config.js com a URL e a anon key.

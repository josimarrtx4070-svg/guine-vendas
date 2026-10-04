-- ============================================
-- GUINÉ-VENDAS - OTP via WhatsApp (modo cloud)
-- Execute APÓS o supabase-setup.sql, uma única vez.
-- Guarda hashes de códigos de 6 dígitos (nunca o
-- código em claro) com expiração de 5 minutos.
-- ============================================

create table if not exists otp_codes (
  phone      text primary key,
  code_hash  text not null,
  expires_at timestamptz not null,
  attempts   integer not null default 0,
  created_at timestamptz not null default now()
);

alter table otp_codes enable row level security;

-- Ninguém lê via API pública: só a Edge Function
-- (service_role) gere esta tabela. Sem políticas
-- de acesso anónimo/autenticado = tabela fechada.

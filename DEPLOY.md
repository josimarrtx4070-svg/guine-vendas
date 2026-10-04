# 🚀 DEPLOY — GUINÉ-VENDAS (Supabase + Cloudflare Pages)

## O que só você pode fazer (5 min, sem código)
1. Criar projeto em https://supabase.com → nome `guine-vendas`, região `eu-west-1`
2. Conta em https://dash.cloudflare.com (para hospedar)

## Passo 1 — Banco de dados (no painel Supabase)
1. **SQL Editor → New Query** → cole TODO o conteúdo de `supabase-setup.sql` → **Run**
   (esperado: `Success. No rows returned`)
2. **Authentication → Providers** → ative **Email**
   (para testes: desligue "Confirm email" temporariamente)

## Passo 2 — Fotos
4. **Storage → New bucket** → nome `ad-images` → marque **Public**

## Passo 3 — Ligar o site
5. **Project Settings → API** → copie:
   - `Project URL` (ex.: `https://abcxyz.supabase.co`)
   - `anon public key` (começa com `eyJ...`)
6. Cole em `js/supabase-config.js`:
```javascript
const SUPABASE_URL = 'https://abcxyz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...';
```
7. Abra `index.html` → console deve mostrar: `Modo CLOUD ativo ☁️`

## Passo 4 — Login social Google/Facebook (opcional, grátis)
- No Supabase: **Authentication → Providers** → ative **Google** e **Facebook** com as credenciais (ver secção OAuth no README)
- Sem ativar, os botões avisam em vez de falhar

## Passo 5 — Hospedar (Cloudflare Pages)
8. Suba a pasta `GUINE-VENDAS` para um repositório GitHub
9. **dash.cloudflare.com → Workers & Pages → Create → Pages → Import** o repositório
   - Framework preset: **None** · Build command: *(vazio)* · Output: `/`
10. **Após cada atualização futura:** Caching → **Purge Everything**

## Passo 6 — Teste final (aba anónima)
- [ ] Registo por email → dashboard
- [ ] Login com Google/Facebook → dashboard (após ativar providers)
- [ ] Publicar anúncio com foto → aparece na home
- [ ] Editar, favoritar, pesquisar, denunciar

# 🚀 DEPLOY — GUINÉ-VENDAS (Supabase + Cloudflare Pages)

## O que só você pode fazer (5 min, sem código)
1. Criar projeto em https://supabase.com → nome `guine-vendas`, região `eu-west-1`
2. Conta em https://dash.cloudflare.com (para hospedar)

## Passo 1 — Banco de dados (no painel Supabase)
1. **SQL Editor → New Query** → cole TODO o conteúdo de `supabase-setup.sql` → **Run**
   (esperado: `Success. No rows returned`)
2. **SQL Editor → New Query** → cole TODO o conteúdo de `supabase-whatsapp-setup.sql` → **Run**
3. **Authentication → Providers** → ative **Email**
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

## Passo 4 — WhatsApp real (opcional, pode ficar para depois)
- Sem configurar: funciona em **modo demo** (código aparece no ecrã)
- Com sender: preencha `WHATSAPP_API_URL` + `WHATSAPP_API_KEY` no mesmo ficheiro
- Cloud total: `supabase functions deploy wa-otp --no-verify-jwt` +
  `supabase secrets set EVOLUTION_API_URL=... EVOLUTION_API_KEY=...`

## Passo 5 — Hospedar (Cloudflare Pages)
8. Suba a pasta `GUINE-VENDAS` para um repositório GitHub
9. **dash.cloudflare.com → Workers & Pages → Create → Pages → Import** o repositório
   - Framework preset: **None** · Build command: *(vazio)* · Output: `/`
10. **Após cada atualização futura:** Caching → **Purge Everything**

## Passo 6 — Teste final (aba anónima)
- [ ] Registo por email → dashboard
- [ ] Registo por WhatsApp (demo) → dashboard
- [ ] Publicar anúncio com foto → aparece na home
- [ ] Editar, favoritar, pesquisar, denunciar

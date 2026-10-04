# 🇬🇼 GUINÉ-VENDAS

> O maior marketplace de anúncios classificados da Guiné-Bissau.

## 📋 Sobre o Projeto

GUINÉ-VENDAS é uma plataforma completa de classificados online que permite aos cidadãos da Guiné-Bissau comprar, vender e publicar anúncios de forma fácil e gratuita.

## 🚀 Funcionalidades

### Para Utilizadores
- ✅ **Explorar categorias** - 10 categorias de anúncios
- ✅ **Pesquisa avançada** - Pesquise por termo e categoria
- ✅ **Publicar anúncios** - Formulário em 3 passos
- ✅ **Editar/eliminar anúncios** - Gestão completa dos seus anúncios
- ✅ **Favoritos** - Guarde os anúncios que mais gosta
- ✅ **Perfil de utilizador** - Gestão de conta
- ✅ **Contactar vendedores** - Ver telefone e WhatsApp
- ✅ **Design responsivo** - Funciona em desktop, tablet e telemóvel
- ✅ **Modo Cloud** - Dados partilhados entre todos os utilizadores (Supabase)

### Categorias Disponíveis
| Categoria | Ícone | Descrição |
|-----------|-------|-----------|
| Imóveis | 🏠 | Casas, apartamentos, terrenos |
| Veículos | 🚗 | Carros, motos, barcos |
| Eletrónicos | 📱 | Telemóveis, eletrodomésticos |
| Emprego | 💼 | Ofertas de trabalho |
| Casa & Jardim | 🏡 | Móveis, decoração |
| Moda & Beleza | 👗 | Roupa, acessórios |
| Computadores | 💻 | Laptops, componentes |
| Serviços | 🔧 | Serviços diversos |
| Agricultura | 🌾 | Produtos agrícolas |
| Outros | 📦 | Tudo o resto |

## 📁 Estrutura do Projeto

```
GUINE-VENDAS/
├── index.html              # Página principal (SPA)
├── css/
│   └── style.css           # Estilos completos (2000+ linhas)
├── js/
│   ├── app.js              # Lógica da aplicação (1590+ linhas)
│   └── supabase-config.js  # Configuração do backend Supabase
├── images/                 # Imagens (placeholder)
├── supabase-setup.sql      # Script SQL para criar as tabelas
└── README.md               # Este ficheiro
```

## 🏗️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend (opcional)**: Supabase (Postgres + REST API)
- **Hospedagem**: Netlify (ou qualquer hosting estático)
- **Design**: CSS Grid, Flexbox, Variáveis CSS
- **Responsivo**: Mobile-first design

---

## ☁️ COMO ATIVAR O MODO CLOUD (Supabase)

> **Sem esta configuração, o site funciona em modo local** (dados apenas no seu navegador).
> Com esta configuração, **todos os utilizadores veem os mesmos anúncios** — marketplace real!

### Passo 1 — Criar o Projeto Supabase (gratuito)

1. Vá a [https://supabase.com](https://supabase.com) e crie uma conta gratuita
2. Clique em **"New Project"**
3. Nome: `guine-vendas` (ou o que preferir)
4. Escolha uma região (ex.: `eu-west-1`)
5. Aguarde ~2 minutos até o projeto ficar pronto

### Passo 2 — Executar o Script SQL

1. No painel do projeto, clique em **"SQL Editor"** (ícone de base de dados)
2. Clique em **"New Query"**
3. **Copie e cole TODO o conteúdo** do ficheiro `supabase-setup.sql` (está na pasta raiz do site)
4. Clique em **"Run"** (ou `Ctrl+Enter`)
5. Deve ver: `Success. No rows returned`

> Este script cria 4 tabelas: `profiles`, `ads`, `favorites`, `reports` + índices + políticas de segurança (RLS com Supabase Auth) + trigger de perfil.

### Passo 3 — Preencher a Configuração

1. No painel do projeto, vá a **"Project Settings"** → **"API"**
2. Copie:
   - **Project URL** → ex.: `https://abcxyz.supabase.co`
   - **anon / public key** → começa com `eyJ...`
3. Abra o ficheiro `js/supabase-config.js` e preencha:

```javascript
const SUPABASE_URL = 'https://abcxyz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6...';
```

4. **Guarde o ficheiro** e recarregue o site no browser

> ✅ Pronto! O site agora usa o backend cloud. Todos os anúncios, contas e favoritos são partilhados entre todos os visitantes.

---

## 💬 LOGIN/REGISTO VIA WHATSAPP (código de 6 dígitos)
O site tem abas **Email | WhatsApp** no login e no registo. O fluxo: número → código de 6 dígitos no WhatsApp (válido 5 min) → conta criada ou sessão iniciada. Sem palavra-passe.

### Modo demo (já funciona, sem configurar nada)
Peça o código e ele aparece no ecrã (aviso laranja). Serve para testar o fluxo de ponta a ponta.

### Enviar de verdade (Evolution API — gratuita/self-hosted)
1. Suba uma instância da [Evolution API](https://doc.evolution-api.com) (VPS/Docker) e ligue o seu número.
2. Em `js/supabase-config.js`, preencha:
```javascript
const WHATSAPP_API_URL = 'https://sua-evolution.com/message/sendText/minha-instancia';
const WHATSAPP_API_KEY = 'apikey-da-instancia';
```
3. Republicar. O código passa a chegar no WhatsApp do utilizador; o modo demo desliga sozinho.

### Modo cloud (Supabase)
1. Execute `supabase-whatsapp-setup.sql` no SQL Editor (tabela `otp_codes`, fechada — só a função acede).
2. Publique a função: `supabase functions deploy wa-otp --no-verify-jwt`
3. Defina os segredos: `supabase secrets set EVOLUTION_API_URL=... EVOLUTION_API_KEY=...`
   - Sem `EVOLUTION_API_URL`, a função responde em modo demo (só para testes!).
4. No `verify` com sucesso, a função cria/encontra o utilizador (email interno `wa_<número>@whatsapp.guine-vendas.local`, invisível) e devolve um magic link — o site navega para ele e a sessão fica ativa.

### Segurança do OTP
- Só o hash SHA-256 do código é guardado (nunca o código), expiração de 5 min, máx. 5 tentativas e rate-limit de 3 pedidos/min por número.

---

## 📱 APP ANDROID (Google Play via TWA)

O site já é PWA (`manifest.webmanifest` + `sw.js` + ícones). O app Android é gerado por **TWA** com [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) — sem reescrever código.

### 1. Publicar o PWA primeiro
Suba esta versão para a Cloudflare (git push) e confirme:
- `https://guine-vendas.pages.dev/manifest.webmanifest` abre o JSON
- `https://guine-vendas.pages.dev/.well-known/assetlinks.json` abre o JSON **sem placeholder** (preencha o SHA-256 abaixo antes!)

### 2. Gerar o app (no seu PC: Node 18+ + JDK 17)
```bash
npm i -g @bubblewrap/cli
bubblewrap init --manifest https://guine-vendas.pages.dev/manifest.webmanifest
# Package: gw.guinevendas.app | Nome: GUINÉ-VENDAS | Cor: #F78302
bubblewrap build
```
O `build` gera a **keystore** (guarde o ficheiro `.keystore` + senhas — sem ele não há updates!) e mostra o **SHA-256 fingerprint**.

### 3. Ligar site ↔ app (obrigatório, senão abre no browser)
1. Cole o SHA-256 em `.well-known/assetlinks.json` (trocar o placeholder)
2. `git push` + Purge cache na Cloudflare
3. Valide: `bubblewrap doctor` ou teste o `.apk` no telemóvel

### 4. Google Play ($25 únicos)
- Conta em `play.google.com/console` → Create app → upload do `.aab` de `bubblewrap build`
- **Data safety**: declarar email + telefone (Supabase Auth) e fotos dos anúncios
- Preencha loja (descrição PT, screenshots, ícone 512, feature graphic) → revisão (~2-7 dias)

---

## 🌐 COMO HOSPEDAR O SITE (Netlify — grátis)

### Opção A — Drag & Drop (mais rápida, 30 segundos)

1. Vá a [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. **Arraste a pasta `GUINE-VENDAS`** inteira para a página do browser
3. Aguarde ~10 segundos
4. Netlify dá-lhe uma URL: `https://guine-vendas-xxxxx.netlify.app`
5. **Pronto!** O site está online 🎉

> 💡 Para um domínio próprio (ex.: `guine-vendas.com`), vá a **Site settings → Domain management** no Netlify.

### Opção B — Via Git (recomendado para atualizações futuras)

1. Crie um repositório em [GitHub](https://github.com) ou [GitLab](https://gitlab.com)
2. Suba os ficheiros da pasta `GUINE-VENDAS`
3. No Netlify: **"Add new site" → "Import from Git"**
4. Selecione o repositório
5. Build command: *(deixe vazio)*
6. Publish directory: `.` (pasta raiz)
7. Clique em **"Deploy"**

> A cada `git push`, o Netlify atualiza o site automaticamente.

---

## 📱 Como Usar

### 1. Abrir o Site (local)
Basta abrir o ficheiro `index.html` no browser:
- Duplo clique no ficheiro, ou
- Arrastar para o browser, ou
- Servidor local: `python -m http.server 8080`

### 2. Publicar um Anúncio
1. Clique em **"Publicar Anúncio"**
2. Selecione a categoria
3. Preencha os detalhes (título, preço, localização)
4. Adicione descrição e fotos
5. Clique em **"Publicar Anúncio"**

### 3. Criar Conta
1. Clique em **"Entrar"** → **"Registar agora"**
2. Preencha nome, email, telefone e palavra-passe
3. A conta é guardada (local ou cloud, conforme configuração)

### 4. Pesquisar
1. Use a barra de pesquisa no topo
2. Filtre por categoria
3. Ordene por preço, data ou visualizações

## 🔧 Funcionalidades Técnicas

- **SPA (Single Page Application)** - Navegação sem recarregar
- **Roteamento por Hash** - URLs amigáveis (#/page)
- **Modo Local** - localStorage (funciona offline)
- **Modo Cloud** - Supabase (dados partilhados)
- **Dados de demonstração** - 12 anúncios pré-carregados (modo local)
- **Animações CSS** - Transições suaves
- **Sistema de notificações** - Toast messages
- **Modal de contacto** - Ver telefone do vendedor

## 🌍 Províncias Suportadas

- Bissau
- Bafatá
- Biombo
- Bolama
- Cacheu
- Gabú
- Oio
- Quinara
- Tombali

## 📊 Dados de Demonstração

O site vem com **12 anúncios de exemplo** que cobrem várias categorias:
- Imóveis (apartamentos, terrenos, moradias)
- Veículos (carros, motos, motores de busca)
- Eletrónicos (iPhone, Samsung, laptops)
- Agricultura (arroz)
- Serviços (construção civil)
- Moda (roupa feminina)

## 🔐 Segurança

### Modo Local (padrão)
- Dados armazenados localmente (localStorage)
- Sem backend necessário
- Sem dados enviados para servidores
- Funciona offline após carregamento

### Modo Cloud (Supabase)
- **RLS (Row Level Security)** ativado em todas as tabelas (`profiles`, `ads`, `favorites`, `reports`)
- **Auth real**: identidade via Supabase Auth (`auth.uid()`), nunca confie em `user_id` enviado pelo cliente
- **Palavras-passe**: geridas pelo Supabase Auth. No modo local, hash SHA-256 + salt (`sha256$...`); nunca em texto puro
- **Imagens**: comprimidas no navegador (máx. 1280px, JPEG 0.8, limite ~1.5MB). Recomendado: crie o bucket público `ad-images` no Supabase Storage — o código tenta upload e faz fallback para base64
  - ⚠️ Base64 na DB funciona para MVP mas migre para **Supabase Storage** em produção

### Recomendações para Produção
1. **RLS**: Crie políticas restritivas por `user_id` (ver `supabase-setup.sql`)
2. **Supabase Auth**: Substitua o sistema de login próprio pelo Supabase Auth (JWT)
3. **Supabase Storage**: Armazene imagens no Storage em vez de base64 na DB
4. **Rate limiting**: Adicione rate limiting nas APIs
5. **CORS**: Configure o domínio do Netlify no Supabase (Settings → API → CORS)

## 🎨 Personalização

Para mudar as cores, edite as variáveis CSS no topo do ficheiro `css/style.css`:

```css
:root {
  --primary: #61616B;
  --accent: #F78302;
  --accent-hover: #E07600;
  /* ... mais variáveis */
}
```

## 📝 Notas

- Para adicionar mais anúncios de demonstração, edite o array `defaultAds` em `js/app.js`
- Para adicionar novas categorias, edite o array `categories` em `js/app.js`
- O sistema de favoritos funciona por localStorage (modo local) ou Supabase (modo cloud)
- O site funciona em **ambos os modos** — se `supabase-config.js` estiver vazio, usa localStorage

## 📞 Contacto

- Email: josimarrtx4070@gmail.com
- Telefone: +245 955 394 566
- Localização: Bissau, Guiné-Bissau

---

**Feito com ❤️ para a Guiné-Bissau** 🇬🇼

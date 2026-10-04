/* ============================================
   GUINÉ-VENDAS - Configuração Supabase
   ============================================
   COMO LIGAR O BACKEND (4 passos):

   1. Crie uma conta gratuita em https://supabase.com
      e crie um novo projeto (nome: "guine-vendas").

   2. No painel, abra "SQL Editor" e execute TODO o conteúdo
      do ficheiro supabase-setup.sql (pasta raiz do site).
      Isto cria as tabelas, as políticas RLS de segurança e o
      trigger que liga os perfis ao Supabase Auth.

   3. Ative a autenticação por email:
      "Authentication" → "Providers" → ative "Email".
      (Opcional, mas recomendado) Desative "Confirm email"
      se quiser testes sem precisar de clicar no link.

   4. Vá a "Project Settings" → "API" e copie:
      - Project URL        → SUPABASE_URL
      - anon / public key  → SUPABASE_ANON_KEY
      (A anon key é pública e segura — o RLS protege os dados.)

   Enquanto estas duas constantes não estiverem
   preenchidas, o site funciona em MODO LOCAL
   (dados apenas neste navegador, só para demonstração).
   ============================================ */

const SUPABASE_URL = 'https://nbvmjcxbgvjztkslvfsf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5idm1qY3hiZ3ZqenRrc2x2ZnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwNzcxMDMsImV4cCI6MjEwNjY1MzEwM30.1CktAZW_Ris86ddDHjfMo58GUmcEnPLBX2DiqF8h8sE';

const SUPABASE_ENABLED =
  typeof SUPABASE_URL === 'string' && SUPABASE_URL.startsWith('http') &&
  typeof SUPABASE_ANON_KEY === 'string' && SUPABASE_ANON_KEY.startsWith('eyJ');

let supabaseClient = null;
if (SUPABASE_ENABLED) {
  if (window.supabase && window.supabase.createClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('[GUINÉ-VENDAS] Modo CLOUD ativo (Supabase) ☁️');
  } else {
    console.warn('[GUINÉ-VENDAS] CDN do Supabase não carregou. A usar modo LOCAL.');
  }
} else {
  console.log('[GUINÉ-VENDAS] Modo LOCAL ativo (localStorage). Preencha js/supabase-config.js para ativar o modo cloud.');
}

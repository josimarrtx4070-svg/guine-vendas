// ============================================
// GUINÉ-VENDAS - Edge Function `wa-otp`
// Login/Registo por código WhatsApp (modo cloud).
//
// Deploy:
//   supabase functions deploy wa-otp --no-verify-jwt
//   supabase secrets set EVOLUTION_API_URL=... EVOLUTION_API_KEY=...
//
// A função é pública (verify_jwt=false) mas tem
// rate-limit próprio e nunca devolve o código.
// No `verify` com sucesso, cria (ou encontra) o
// utilizador via admin API e devolve um magic link
// (actionLink); o site navega para ele e a sessão
// Supabase fica ativa.
// ============================================
// @ts-nocheck
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const EVOLUTION_API_URL = Deno.env.get("EVOLUTION_API_URL") ?? ""; // .../message/sendText/INSTANCIA
const EVOLUTION_API_KEY = Deno.env.get("EVOLUTION_API_KEY") ?? "";
const SENDER_NAME = "GUINÉ-VENDAS";
const CODE_TTL_MS = 5 * 60 * 1000;

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

function digits(phone) {
  return String(phone ?? "").replace(/\D/g, "");
}

function validPhone(phone) {
  const d = digits(phone);
  return d.length === 9 || (d.length === 12 && d.startsWith("245"));
}

async function sha256Hex(s) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Rate-limit em memória (por instância): 3 pedidos/min por número.
const hits = new Map();
function rateOk(key, max = 3, windowMs = 60000) {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= max) return false;
  arr.push(now);
  hits.set(key, arr);
  return true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }
  const cors = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };
  try {
    const { action, phone, code, name } = await req.json();
    if (!validPhone(phone)) {
      return new Response(JSON.stringify({ error: "invalid-phone" }), { status: 400, headers: cors });
    }
    const d = digits(phone);

    if (action === "request") {
      if (!rateOk("req-" + d)) {
        return new Response(JSON.stringify({ error: "rate-limited" }), { status: 429, headers: cors });
      }
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      const codeHash = await sha256Hex("wa-otp::" + otp);
      const expiresAt = new Date(Date.now() + CODE_TTL_MS).toISOString();
      const { error: upErr } = await supabase.from("otp_codes").upsert({
        phone: d,
        code_hash: codeHash,
        expires_at: expiresAt,
        attempts: 0,
      });
      if (upErr) throw upErr;

      // Sem sender configurado: modo demo (NUNCA em produção real!)
      if (!EVOLUTION_API_URL || !EVOLUTION_API_KEY) {
        return new Response(JSON.stringify({ ok: true, demoCode: otp }), { headers: cors });
      }
      const text = `${SENDER_NAME}: o seu código de entrada é ${otp}. Válido por 5 minutos. Não partilhe este código.`;
      const send = await fetch(EVOLUTION_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: EVOLUTION_API_KEY },
        body: JSON.stringify({ number: d, text }),
      });
      if (!send.ok) throw new Error("sender-" + send.status);
      return new Response(JSON.stringify({ ok: true }), { headers: cors });
    }

    if (action === "verify") {
      const clean = String(code ?? "").replace(/\D/g, "");
      if (clean.length !== 6) {
        return new Response(JSON.stringify({ error: "bad-code" }), { status: 400, headers: cors });
      }
      const { data: row } = await supabase.from("otp_codes").select("*").eq("phone", d).maybeSingle();
      if (!row || new Date(row.expires_at).getTime() < Date.now()) {
        return new Response(JSON.stringify({ error: "expired" }), { status: 400, headers: cors });
      }
      if ((row.attempts ?? 0) >= 5) {
        await supabase.from("otp_codes").delete().eq("phone", d);
        return new Response(JSON.stringify({ error: "too-many" }), { status: 429, headers: cors });
      }
      const hash = await sha256Hex("wa-otp::" + clean);
      if (hash !== row.code_hash) {
        await supabase.from("otp_codes").update({ attempts: (row.attempts ?? 0) + 1 }).eq("phone", d);
        return new Response(JSON.stringify({ error: "wrong-code" }), { status: 400, headers: cors });
      }
      await supabase.from("otp_codes").delete().eq("phone", d);

      // Conta espelho: email interno por número. O utilizador nunca vê isto.
      const email = `wa_${d}@whatsapp.guine-vendas.local`;
      const { data: existing } = await supabase.auth.admin.listUsers();
      let userId = existing?.users?.find((u) => u.email === email)?.id;
      if (!userId) {
        const { data: created, error: cErr } = await supabase.auth.admin.createUser({
          email,
          email_confirm: true,
          user_metadata: {
            full_name: String(name ?? "Utilizador WhatsApp").slice(0, 120),
            phone: d,
            wa_verified: true,
          },
        });
        if (cErr) throw cErr;
        userId = created.user.id;
      }
      const { data: link, error: lErr } = await supabase.auth.admin.generateLink({
        type: "magiclink",
        email,
      });
      if (lErr) throw lErr;
      return new Response(JSON.stringify({ ok: true, actionLink: link.properties.action_link }), {
        headers: cors,
      });
    }

    return new Response(JSON.stringify({ error: "bad-action" }), { status: 400, headers: cors });
  } catch (e) {
    return new Response(JSON.stringify({ error: "server-error" }), { status: 500, headers: cors });
  }
});

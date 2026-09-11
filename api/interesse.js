/**
 * Recebe os leads do formulário "Quero participar da próxima turma".
 *
 * Função serverless da Vercel (runtime Node). Sem dependências: tudo é feito
 * com `fetch`, então não há nada para instalar nem manter atualizado.
 *
 * O que acontece a cada envio, nesta ordem:
 *   1. valida os campos;
 *   2. grava o lead (Vercel KV / Upstash Redis, se estiver configurado);
 *   3. envia a notificação por e-mail para o time (Resend);
 *   4. registra o lead nos logs da função — rede de segurança que funciona
 *      mesmo se os dois passos acima estiverem sem chave configurada.
 *
 * ---------------------------------------------------------------------------
 * CONFIGURAÇÃO — Vercel › Project › Settings › Environment Variables
 * ---------------------------------------------------------------------------
 *   LEAD_NOTIFICATION_EMAIL  (obrigatória p/ e-mail) destino da notificação.
 *                            Aceita vários separados por vírgula.
 *   RESEND_API_KEY           (obrigatória p/ e-mail) chave da conta Resend.
 *   LEAD_FROM_EMAIL          (opcional) remetente; precisa ser de um domínio
 *                            verificado no Resend. Default: onboarding@resend.dev
 *   KV_REST_API_URL          (opcional) URL REST do Vercel KV / Upstash.
 *   KV_REST_API_TOKEN        (opcional) token REST correspondente.
 *
 * NENHUM endereço de e-mail está fixo no código de propósito: enquanto
 * LEAD_NOTIFICATION_EMAIL não for preenchida, o lead continua sendo salvo e
 * registrado no log, e a resposta avisa que a notificação não saiu.
 */

const MAX_FIELD_LENGTH = 200;

const FIELDS = [
  ["nome", "Nome"],
  ["email", "E-mail"],
  ["empresa", "Empresa"],
  ["cargo", "Cargo"],
  ["telefone", "Telefone"],
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (value) =>
  typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "";

function validate(body) {
  const lead = {};
  const missing = [];

  for (const [key, label] of FIELDS) {
    const value = clean(body[key]);
    if (!value) missing.push(label);
    lead[key] = value;
  }

  if (missing.length) {
    return { error: `Preencha: ${missing.join(", ")}.` };
  }
  if (!EMAIL_RE.test(lead.email)) {
    return { error: "O e-mail informado não parece válido." };
  }

  return { lead };
}

/** Grava no Vercel KV / Upstash via REST. Silencioso quando não configurado. */
async function persist(lead) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return { stored: false, reason: "kv-nao-configurado" };

  const key = `lead:${lead.recebidoEm}:${lead.email}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const write = await fetch(`${url}/set/${encodeURIComponent(key)}`, {
    method: "POST",
    headers,
    body: JSON.stringify(lead),
  });

  if (!write.ok) {
    return { stored: false, reason: `kv-erro-${write.status}` };
  }

  // Índice cronológico, para listar os leads sem varrer as chaves.
  await fetch(
    `${url}/lpush/leads:foundersos/${encodeURIComponent(JSON.stringify(lead))}`,
    { method: "POST", headers },
  ).catch(() => {});

  return { stored: true, key };
}

function emailBody(lead) {
  const rows = FIELDS.map(
    ([key, label]) =>
      `<tr><td style="padding:6px 16px 6px 0;color:#6d727d;font-size:13px">${label}</td>` +
      `<td style="padding:6px 0;color:#1c1d1f;font-size:14px"><strong>${escapeHtml(lead[key])}</strong></td></tr>`,
  ).join("");

  return `<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif">
    <h2 style="margin:0 0 4px;font-size:18px;color:#1c1d1f">Novo interesse na turma do FoundersOS</h2>
    <p style="margin:0 0 18px;font-size:13px;color:#6d727d">Origem: ${escapeHtml(lead.origem)} · ${escapeHtml(lead.recebidoEm)}</p>
    <table style="border-collapse:collapse">${rows}</table>
  </div>`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );
}

/** Notificação por e-mail via Resend. Silenciosa quando não configurada. */
async function notify(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = (process.env.LEAD_NOTIFICATION_EMAIL || "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

  if (!apiKey) return { sent: false, reason: "RESEND_API_KEY ausente" };
  if (!to.length) {
    return { sent: false, reason: "LEAD_NOTIFICATION_EMAIL ausente" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.LEAD_FROM_EMAIL || "FoundersOS <onboarding@resend.dev>",
      to,
      reply_to: lead.email,
      subject: `Interesse na turma · ${lead.nome} (${lead.empresa})`,
      html: emailBody(lead),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return { sent: false, reason: `resend-${response.status}: ${detail.slice(0, 300)}` };
  }

  return { sent: true, to };
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Método não permitido." });
  }

  let body = request.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return response.status(400).json({ error: "Corpo inválido." });
    }
  }
  if (!body || typeof body !== "object") {
    return response.status(400).json({ error: "Corpo inválido." });
  }

  const { lead, error } = validate(body);
  if (error) return response.status(400).json({ error });

  lead.origem = clean(body.origem) || "landing-foundersos";
  lead.recebidoEm = new Date().toISOString();

  const stored = await persist(lead).catch((kvError) => ({
    stored: false,
    reason: String(kvError),
  }));
  const notified = await notify(lead).catch((mailError) => ({
    sent: false,
    reason: String(mailError),
  }));

  // Último recurso: o lead sempre existe nos logs da função, mesmo se KV e
  // Resend estiverem sem chave. Evita perder um lead por erro de configuração.
  console.log("[lead:foundersos]", JSON.stringify({ lead, stored, notified }));

  if (!notified.sent) {
    console.warn("[lead:foundersos] notificação não enviada —", notified.reason);
  }

  // O lead chegou: o usuário vê a confirmação mesmo que KV/Resend falhem.
  return response.status(200).json({ ok: true, stored: stored.stored, notified: notified.sent });
}

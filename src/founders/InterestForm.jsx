import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { cohort } from "./cohort";

/** Endpoint serverless (api/interesse.js). Ver .env.example para a config. */
const ENDPOINT = "/api/interesse";

const FIELDS = [
  {
    name: "nome",
    label: "Nome",
    type: "text",
    autoComplete: "name",
    placeholder: "Como devemos te chamar",
  },
  {
    name: "email",
    label: "E-mail",
    type: "email",
    autoComplete: "email",
    placeholder: "voce@empresa.com.br",
  },
  {
    name: "empresa",
    label: "Empresa",
    type: "text",
    autoComplete: "organization",
    placeholder: "Nome da empresa",
  },
  {
    name: "cargo",
    label: "Cargo",
    type: "text",
    autoComplete: "organization-title",
    placeholder: "Founder, CEO, diretor...",
  },
  {
    name: "telefone",
    label: "Telefone",
    type: "tel",
    autoComplete: "tel",
    placeholder: "(11) 90000-0000",
    inputMode: "tel",
  },
];

const EMPTY = FIELDS.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {});

const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
};

/**
 * Mesma conversão que o embed do Cal.com disparava quando um agendamento era
 * concluído. O calendário saiu; o evento continua sendo o mesmo — "o lead
 * chegou até o fim do funil" — só que agora vem do envio do formulário.
 */
function trackConversion() {
  if (typeof window.oaiq === "function") {
    window.oaiq("measure", "registration_completed", {
      type: "customer_action",
      amount: 0,
      currency: "USD",
    });
  }
}

export function InterestSection() {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  const update = (name) => (event) =>
    setValues((current) => ({ ...current, [name]: event.target.value }));

  async function onSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setError("");

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, origem: "landing-foundersos" }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Não conseguimos registrar seus dados.");
      }

      trackConversion();
      setStatus("done");
      setValues(EMPTY);
    } catch (requestError) {
      setStatus("error");
      setError(
        requestError.message ||
          "Não conseguimos registrar seus dados. Tente novamente.",
      );
    }
  }

  return (
    <section className="interest-section paper-surface" id="turma">
      {/* Âncora antiga: links externos e anúncios ainda apontam para #agendar. */}
      <span id="agendar" className="anchor-alias" aria-hidden="true" />
      <div className="interest-glow" aria-hidden="true" />

      <div className="page-container interest-container">
        <motion.div className="interest-heading" {...reveal}>
          <p className="eyebrow">{cohort.seats}</p>
          <h2>{cohort.ctaPrimary}</h2>
          <p>
            Preencha seus dados para demonstrar interesse na próxima turma.
            Nosso time entra em contato para confirmar se ela faz sentido para o
            seu momento.
          </p>
        </motion.div>

        <motion.div
          className="interest-card"
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.08 }}
        >
          {status === "done" ? (
            <div className="interest-success" role="status">
              <span className="interest-success-mark">
                <Check size={20} />
              </span>
              <h3>Recebemos seu interesse.</h3>
              <p>Entraremos em contato com você.</p>
            </div>
          ) : (
            <form className="interest-form" onSubmit={onSubmit} noValidate={false}>
              <div className="interest-fields">
                {FIELDS.map((field) => (
                  <label className="interest-field" key={field.name}>
                    <span>{field.label}</span>
                    <input
                      name={field.name}
                      type={field.type}
                      inputMode={field.inputMode}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      value={values[field.name]}
                      onChange={update(field.name)}
                      required
                      disabled={status === "sending"}
                    />
                  </label>
                ))}
              </div>

              {status === "error" && (
                <p className="interest-error" role="alert">
                  {error}
                </p>
              )}

              <button
                className="button button-dark button-large button-wide"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={16} className="interest-spinner" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Enviar meus dados <ArrowRight size={16} />
                  </>
                )}
              </button>

              <small>{cohort.ctaNote}</small>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Configuração comercial da turma (cohort).
 *
 * Este é o ÚNICO arquivo que precisa ser editado para:
 *   1. trocar a data / nome da próxima turma;
 *   2. alternar entre turma aberta e lista de espera;
 *   3. apontar os CTAs para o formulário definitivo.
 *
 * Nada aqui depende de CMS, banco ou variável de ambiente — é só texto.
 */

/**
 * Estado comercial da página.
 *
 *   "open"     → turma aberta: CTA de inscrição na próxima turma.
 *   "waitlist" → turma em andamento/fechada: CTA de lista de espera.
 */
export const COHORT_STATUS = "open";

/**
 * Dados da próxima turma.
 *
 * `startDate` é opcional: quando vazio, a página mostra apenas o nome da
 * turma (ex.: "Turma de Setembro"). Com a data preenchida, ela aparece no
 * selo do hero e no bloco "Próxima turma".
 *
 * `seatCount` é o número de vagas da turma, usado na nota abaixo do CTA.
 */
export const COHORT = {
  name: "Turma de Setembro",
  startDate: "",
  format: "Programa guiado de 4 semanas",
  seatCount: 5,
};

/**
 * ⚠️ LINKS DOS FORMULÁRIOS — INSERIR AQUI O LINK DEFINITIVO.
 *
 * Enquanto estas constantes estiverem vazias, todos os CTAs continuam
 * apontando para o formulário de interesse (#turma), que já existe na própria
 * página e funciona. Nenhum link fake é usado.
 *
 * Assim que o formulário existir, basta colar a URL abaixo:
 *   COHORT_FORM_URL   → formulário de inscrição (estado "open")
 *   WAITLIST_FORM_URL → formulário de lista de espera (estado "waitlist")
 */
export const COHORT_FORM_URL = ""; // ex.: "https://tally.so/r/xxxxxx"
export const WAITLIST_FORM_URL = ""; // ex.: "https://tally.so/r/yyyyyy"

/** Destino usado quando ainda não há formulário configurado. */
const FALLBACK_HREF = "#turma";

const COPY = {
  open: {
    seats: "Vagas abertas",
    announcement: `${COHORT.name} · vagas abertas`,
    pill: "Programa em turma",
    ctaPrimary: "Quero participar da próxima turma",
    ctaShort: "Participar da turma",
    ctaLead:
      "Deixe seus dados e o nosso time confirma se a turma faz sentido para o seu momento.",
    ctaNote: `Inscrição por formulário · ${COHORT.seatCount} vagas por turma`,
  },
  waitlist: {
    seats: "Inscrições encerradas",
    announcement: "Turma em andamento · lista de espera aberta",
    pill: "Programa em turma",
    ctaPrimary: "Entrar na lista de espera",
    ctaShort: "Lista de espera",
    ctaLead:
      "Entre na lista e seja avisado assim que abrirmos as vagas da próxima turma.",
    ctaNote: "Lista de espera · avisamos antes da abertura pública",
  },
};

const copy = COPY[COHORT_STATUS] ?? COPY.open;
const formUrl = COHORT_STATUS === "waitlist" ? WAITLIST_FORM_URL : COHORT_FORM_URL;
const ctaHref = formUrl || FALLBACK_HREF;

export const cohort = {
  ...COHORT,
  ...copy,
  status: COHORT_STATUS,
  isOpen: COHORT_STATUS === "open",
  /** Data no bloco "Próxima turma": cai no nome da turma se não houver data. */
  dateLabel: COHORT.startDate || COHORT.name,
  /** Selo do hero: curto, some com a data quando a turma já fechou. */
  pillLabel:
    COHORT_STATUS === "open"
      ? `${copy.pill}${COHORT.startDate ? ` · início ${COHORT.startDate}` : ` · ${COHORT.name}`}`
      : `${copy.pill} · próxima turma em breve`,
  ctaHref,
  /** Formulário externo abre em nova aba; a âncora interna, não. */
  ctaTarget: formUrl ? "_blank" : undefined,
  ctaRel: formUrl ? "noreferrer" : undefined,
};

/**
 * As duas ofertas do FoundersOS, servidas pelo mesmo código.
 *
 *   individual → www.foundersos.com.br   implantação para uma empresa
 *   turma      → turma.foundersos.com.br programa guiado em turma
 *
 * As páginas compartilham estrutura, componentes e design system: o que muda
 * entre elas é o texto, o preço e para onde os CTAs apontam. Por isso tudo o
 * que difere vive aqui, e os componentes só leem `offer`.
 *
 * Os dados comerciais da turma (nome, status, vagas) continuam em cohort.js,
 * que é o arquivo que o time edita para abrir ou fechar inscrições.
 */

import { cohort } from "./cohort";

/**
 * Âncora da seção do formulário. A seção tem os dois ids: #turma (atual) e
 * #agendar (alias antigo, que anúncios e links externos ainda usam). Cada
 * página usa o nome que combina com a sua oferta.
 */
const ANCHOR_INDIVIDUAL = "#agendar";
const ANCHOR_TURMA = "#turma";

const INDIVIDUAL = {
  key: "individual",

  announcement: "o segundo cérebro do fundador",
  announcementCta: { label: "Conheça o sistema", href: "#sistema" },
  headerCta: { label: "Falar com a equipe", href: ANCHOR_INDIVIDUAL },

  heroPill: { label: "O segundo cérebro do fundador", href: "#cerebro" },
  heroLead:
    "Um sistema operacional de IA que vê, escuta, lê e age em todas as frentes que você toca.",
  heroActions: {
    outline: { label: "Falar com a equipe", href: ANCHOR_INDIVIDUAL },
    primary: { label: "Ver como funciona", href: "#sistema" },
  },

  skillsCaption: "construídas para sua rotina",
  reasons: [
    ["Contexto acumulado", "O ativo cresce todos os dias."],
    ["Método fechado", "4 semanas com Definition of Done."],
    ["Packs prontos", "Skills testadas e adaptadas."],
  ],

  phases: [
    {
      step: "01",
      weeks: "Semana 1",
      title: "Diagnóstico + base",
      copy: "Mapeamento, estrutura do cérebro e conectores lendo dados reais.",
      done: "Cérebro no ar",
    },
    {
      step: "02",
      weeks: "Semana 2",
      title: "Skills sob medida",
      copy: "Cinco skills construídas e validadas nos cenários do fundador.",
      done: "5 skills rodando",
    },
    {
      step: "03",
      weeks: "Semana 3",
      title: "Packs + rotinas",
      copy: "Packs Playbook Lab adaptados e rotinas automáticas agendadas.",
      done: "Sistema em ação",
    },
    {
      step: "04",
      weeks: "Semana 4",
      title: "Treino + autonomia",
      copy: "Documentação, vídeos, treinamento e plano de continuidade.",
      done: "Operação entregue",
    },
  ],

  method: {
    eyebrow: "O método",
    title: "Um mês. Quatro reuniões.",
    subtitle: "Cada fase termina com algo funcionando.",
    copy: "Produto produtizado, não projeto aberto. Escopo e definição de pronto visíveis desde o primeiro dia.",
  },

  persistenceCopy: "Quando o projeto acaba, o FoundersOS continua rodando.",

  /** Coluna esquerda do bloco de investimento. */
  price: { amount: "6.000", note: "à vista · sem mensalidade", installment: "12x de R$ 619,70" },
  priceLead: null,
  includes: [
    "4 semanas de implantação",
    "4 reuniões de acompanhamento",
    "Sistema e documentação ficam com você",
  ],

  chip: "Agenda aberta",
  showCohortMeta: false,
  ctaLead:
    "Deixe seus dados e o nosso time entra em contato para entender o seu cenário.",
  ctaButton: { label: "Falar com a equipe", href: ANCHOR_INDIVIDUAL },
  ctaNote: "Implantação individual · uma empresa por vez",

  form: {
    eyebrow: "Agenda aberta",
    title: "Falar com a equipe",
    lead: "Deixe seus dados e o nosso time entra em contato para entender o seu cenário e o que faz sentido para a sua empresa.",
    note: "Implantação individual · uma empresa por vez",
    origem: "landing-individual",
    success: {
      title: "Recebemos seu contato.",
      text: "Entraremos em contato com você.",
    },
  },

  footerLead:
    "Um sistema operacional de IA que aprende o contexto do fundador e trabalha dentro das ferramentas que ele já usa.",
  footerCta: { label: "Falar com a equipe", href: ANCHOR_INDIVIDUAL },
};

const TURMA = {
  key: "turma",

  announcement: cohort.announcement,
  announcementCta: { label: "Ver o programa", href: "#metodo" },
  headerCta: {
    label: cohort.ctaShort,
    href: cohort.ctaHref,
    target: cohort.ctaTarget,
    rel: cohort.ctaRel,
  },

  heroPill: { label: cohort.pillLabel, href: "#metodo" },
  heroLead:
    "Um sistema operacional de IA que vê, escuta, lê e age em todas as frentes que você toca. Você constrói o seu em quatro semanas, junto com a turma.",
  heroActions: {
    outline: { label: "Ver como funciona", href: "#sistema" },
    primary: {
      label: cohort.ctaPrimary,
      href: cohort.ctaHref,
      target: cohort.ctaTarget,
      rel: cohort.ctaRel,
    },
  },

  skillsCaption: "que você constrói na turma",
  reasons: [
    ["Contexto acumulado", "O ativo cresce todos os dias."],
    ["Programa guiado", "4 semanas com Definition of Done."],
    ["Packs prontos", "Skills testadas que você adapta."],
  ],

  phases: [
    {
      step: "01",
      weeks: "Semana 1",
      title: "Fundação + contexto",
      copy: "Você mapeia o seu negócio e monta a arquitetura inicial do cérebro, com os primeiros conectores lendo dados reais.",
      done: "Cérebro no ar",
    },
    {
      step: "02",
      weeks: "Semana 2",
      title: "Memória + organização",
      copy: "Como organizar a memória do negócio e usar o sistema no dia a dia — sem precisar virar especialista técnico.",
      done: "Memória organizada",
    },
    {
      step: "03",
      weeks: "Semana 3",
      title: "Skills + rotinas",
      copy: "Você constrói cinco skills a partir dos packs Playbook Lab e agenda as rotinas que rodam sozinhas.",
      done: "Skills e rotinas rodando",
    },
    {
      step: "04",
      weeks: "Semana 4",
      title: "Conexões + operação",
      copy: "Conectores, refinamento e consolidação: documentação, treino e plano de continuidade para o sistema seguir rodando.",
      done: "Sistema em operação",
    },
  ],

  method: {
    eyebrow: "O programa",
    title: "Quatro semanas. Oito encontros.",
    subtitle: "Cada semana termina com algo funcionando.",
    copy: "A turma inteira avança no mesmo ciclo, com encontros ao vivo e uma metodologia guiada — não é curso gravado nem consultoria feita por nós no seu lugar. Escopo e definição de pronto visíveis desde o primeiro dia.",
  },

  persistenceCopy: "Quando o programa acaba, o FoundersOS continua rodando.",

  /** Turma em lista de espera: sem preço na página. */
  price: null,
  priceLead: {
    title: "Quatro semanas para montar o seu FoundersOS.",
    note: "Turma atual em andamento · a próxima abre primeiro para a lista de espera",
  },
  includes: [
    "Programa guiado de 4 semanas",
    "8 encontros ao vivo com a turma",
    "Grupo de WhatsApp para suporte durante o programa",
    "Sistema e documentação ficam com você",
  ],

  chip: cohort.seats,
  showCohortMeta: true,
  ctaLead: cohort.ctaLead,
  ctaButton: {
    label: cohort.ctaPrimary,
    href: cohort.ctaHref,
    target: cohort.ctaTarget,
    rel: cohort.ctaRel,
  },
  ctaNote: cohort.ctaNote,

  form: {
    eyebrow: cohort.seats,
    title: cohort.ctaPrimary,
    lead: cohort.ctaLead,
    note: cohort.ctaNote,
    origem: "landing-turma",
    success: cohort.isOpen
      ? { title: "Recebemos seu interesse.", text: "Entraremos em contato com você." }
      : {
          title: "Você está na lista de espera.",
          text: "Avisamos assim que as vagas da próxima turma abrirem.",
        },
  },

  footerLead:
    "Um programa guiado, em turma, para construir o segundo cérebro que aprende o contexto do fundador e trabalha dentro das ferramentas que ele já usa.",
  footerCta: { label: cohort.ctaPrimary, href: ANCHOR_TURMA },
};

/**
 * Qual oferta renderizar.
 *
 * O subdomínio decide em produção (`turma.foundersos.com.br`); o caminho
 * `/turma` faz a mesma coisa e serve para testar as duas páginas localmente,
 * onde o host é sempre localhost.
 */
function detect() {
  if (typeof window === "undefined") return INDIVIDUAL;

  const { hostname, pathname } = window.location;
  const isTurmaHost = hostname === "turma.foundersos.com.br" || hostname.startsWith("turma.");
  const isTurmaPath = pathname === "/turma" || pathname.startsWith("/turma/");

  return isTurmaHost || isTurmaPath ? TURMA : INDIVIDUAL;
}

export const offer = detect();
export const isTurma = offer.key === "turma";

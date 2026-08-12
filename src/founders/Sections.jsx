import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  HardDrive,
  Lock,
  Play,
  Sparkles,
  Unplug,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CompoundingChart } from "./CompoundingChart";
import { LayerDiagram } from "./LayerDiagram";
import { ObsidianVaultDemo } from "./ObsidianWorkspace";
import {
  BrainOrbit,
  SenseInterface,
} from "./ProductUI";

const reveal = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.62, ease: [0.16, 1, 0.3, 1] },
};

function SectionLead({ eyebrow, title, copy, centered = false, invert = false }) {
  return (
    <div
      className={`section-lead ${centered ? "is-centered" : ""} ${invert ? "is-inverted" : ""}`}
    >
      <motion.p className="eyebrow" {...reveal}>
        {eyebrow}
      </motion.p>
      <motion.h2 {...reveal} transition={{ ...reveal.transition, delay: 0.04 }}>
        {title}
      </motion.h2>
      {copy && (
        <motion.p
          className="section-copy"
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.08 }}
        >
          {copy}
        </motion.p>
      )}
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const visualScale = useTransform(
    scrollYProgress,
    [0.1, 0.75],
    reducedMotion ? [1, 1] : [1, 0.955],
  );
  const visualY = useTransform(
    scrollYProgress,
    [0.1, 0.75],
    reducedMotion ? [0, 0] : [0, 26],
  );

  return (
    <section
      className="hero-section grid-surface"
      id="top"
      ref={sectionRef}
    >
      <div className="hero-copy">
        <motion.a
          href="#cerebro"
          className="hero-pill"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          O segundo cérebro do fundador <ChevronRight size={13} />
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.65 }}
        >
          Pare de explicar seu negócio para a IA.
          <span>O FoundersOS já sabe.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.55 }}
        >
          Um sistema operacional de IA que vê, escuta, lê e age em todas as
          frentes que você toca.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a className="button button-outline" href="#agendar">
            Agendar uma conversa
          </a>
          <a className="button button-dark" href="#sistema">
            Ver como funciona <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>

      <div className="hero-product-plane" id="obsidian">
        <motion.div
          className="hero-product-stage"
          style={{ scale: visualScale, y: visualY }}
        >
          <div className="hero-visual-view">
            <ObsidianVaultDemo
              className="hero-obsidian-shell"
              initialSelected="foundersos"
            />
          </div>
        </motion.div>
      </div>

      <div className="source-rail">
        <span>Contexto conectado</span>
        <ul>
          {["Pipedrive", "tl;dv", "Gmail", "Google Drive", "Notion"].map(
            (source, index) => (
              <motion.li
                key={source}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <i />
                {source}
              </motion.li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}

const SENSES = [
  ["ve", "Vê"],
  ["escuta", "Escuta"],
  ["le", "Lê"],
  ["age", "Age"],
];

export function ProductShowcase() {
  const [active, setActive] = useState("ve");
  const copy = {
    ve: [
      "A empresa inteira no mesmo campo de visão.",
      "O FoundersOS cruza o que muda no comercial, na operação e no financeiro — antes que o fundador descubra tarde.",
    ],
    escuta: [
      "Toda reunião passa a ensinar o sistema.",
      "Decisões, objeções e compromissos viram memória consultável em vez de desaparecerem numa gravação.",
    ],
    le: [
      "O que está espalhado vira contexto.",
      "Documentos e conversas deixam de ser ilhas. O sistema entende dependências, prazos e o que cada frente precisa.",
    ],
    age: [
      "Contexto com braços para executar.",
      "Rotinas trabalham sozinhas; skills executam sob comando. Você deixa de operar cada ferramenta e passa a orquestrar.",
    ],
  };

  return (
    <section className="product-showcase grid-surface" id="sistema">
      <div className="showcase-header">
        <SectionLead
          eyebrow="FoundersOS"
          title="O sistema inteligente que conhece sua empresa"
        />
      </div>

      <div className="showcase-shell">
        <aside className="showcase-nav">
          <span>Como o sistema percebe</span>
          {SENSES.map(([key, label]) => (
            <button
              className={active === key ? "active" : ""}
              onClick={() => setActive(key)}
              key={key}
            >
              {label}
              <ChevronRight size={14} />
            </button>
          ))}
        </aside>

        <div className="showcase-main">
          <motion.div
            className="showcase-copy"
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2>
              {copy[active][0]}{" "}
              <span className="muted-title">{copy[active][1]}</span>
            </h2>
          </motion.div>
          <SenseInterface active={active} />
        </div>
      </div>
    </section>
  );
}

export function BrainAnatomy() {
  return (
    <section className="brain-anatomy paper-surface" id="cerebro">
      <div className="page-container">
        <SectionLead
          centered
          eyebrow="O sistema"
          title="Um cérebro. Tudo conectado a ele."
          copy="As ferramentas alimentam a memória. A memória orienta cada decisão e cada ação."
        />

        <motion.div
          className="brain-panel hard-panel"
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.08 }}
        >
          <div className="brain-panel-top">
            <span className="hard-chip">O segundo cérebro</span>
            <span className="hard-chip live">
              <i /> Ao vivo · conectado
            </span>
          </div>
          <BrainOrbit />
          <div className="brain-context-bar">
            <strong>O contexto da empresa vive aqui.</strong>
            <span>
              ICP · oferta · processos · decisões · clientes · números · tom de
              voz
            </span>
          </div>
        </motion.div>

        <div className="brain-outcomes">
          <motion.article {...reveal}>
            <span>01</span>
            <div>
              <h3>Uma memória viva.</h3>
              <p>
                Cada conversa começa de onde a anterior terminou — com fatos,
                decisões e regras do seu negócio.
              </p>
            </div>
          </motion.article>
          <motion.article {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
            <span>02</span>
            <div>
              <h3>Um sistema com ação.</h3>
              <p>
                O cérebro não só responde. Ele executa rotinas e trabalha dentro
                das ferramentas que já existem.
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

const LAYERS = [
  {
    number: 1,
    title: "Contexto",
    tag: "DNA",
    copy: "Empresa, fundador, ICP, oferta, preços, prioridades, regras e tom de voz.",
  },
  {
    number: 2,
    title: "Memória",
    tag: "Percepção",
    copy: "Tudo o que o sistema vê, escuta e lê, organizado e sempre disponível.",
  },
  {
    number: 3,
    title: "Skills + rotinas",
    tag: "Ação",
    copy: "Processos sob comando e ações automáticas que rodam sem depender de um prompt.",
  },
  {
    number: 4,
    title: "Conectores / MCPs",
    tag: "Integração",
    copy: "As ferramentas alimentam a memória e recebem as ações do sistema.",
  },
];

export function LayerSection() {
  const [active, setActive] = useState(1);

  return (
    <section className="layer-section dark-surface" id="camadas">
      <div className="dark-grid" />
      <div className="page-container">
        <SectionLead
          invert
          eyebrow="O sistema por dentro"
          title={
            <>
              Quatro camadas.{" "}
              <span className="dark-muted">
                Do DNA do fundador até as ferramentas.
              </span>
            </>
          }
          copy="As duas primeiras fazem o cérebro saber. As duas últimas fazem o cérebro agir."
        />

        <div className="layer-layout">
          <div className="layer-visual">
            <LayerDiagram active={active} onChange={setActive} />
          </div>

          <div className="layer-list">
            {LAYERS.map((layer) => (
              <motion.button
                className={active === layer.number ? "active" : ""}
                key={layer.number}
                onMouseEnter={() => setActive(layer.number)}
                onFocus={() => setActive(layer.number)}
                onClick={() => setActive(layer.number)}
                onViewportEnter={() => setActive(layer.number)}
                viewport={{ margin: "-46% 0px -46% 0px" }}
              >
                <span className="layer-number">0{layer.number}</span>
                <div>
                  <span className="layer-tag">{layer.tag}</span>
                  <h3>{layer.title}</h3>
                  <p>{layer.copy}</p>
                </div>
                <ChevronRight size={16} />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="dark-feature-rail">
          {[
            ["1 núcleo", "uma identidade consistente"],
            ["Memória local", "contexto que fica com você"],
            ["5 skills", "construídas para sua rotina"],
            ["Rotinas ativas", "o sistema trabalhando sozinho"],
          ].map(([value, label]) => (
            <div key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CompoundingSection() {
  return (
    <section className="compounding-section paper-surface">
      <div className="page-container">
        <div className="compounding-layout">
          <SectionLead
            eyebrow="A vantagem que aumenta"
            title={
              <>
                O Claude avulso é brilhante.{" "}
                <span className="muted-title">Mas esquece tudo.</span>
              </>
            }
            copy="Com o FoundersOS, cada call transcrita, documento lido e decisão registrada melhora a próxima resposta."
          />

          <motion.div
            className="compounding-visual"
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.08 }}
          >
            <CompoundingChart />
          </motion.div>
        </div>

        <div className="reason-rail">
          {[
            ["Contexto acumulado", "O ativo cresce todos os dias."],
            ["Método fechado", "4 semanas com Definition of Done."],
            ["Packs prontos", "Skills testadas e adaptadas."],
          ].map(([title, copy], index) => (
            <motion.div
              key={title}
              {...reveal}
              transition={{ ...reveal.transition, delay: index * 0.06 }}
            >
              <span>0{index + 1}</span>
              <strong>{title}</strong>
              <p>{copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PHASES = [
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
];

export function MethodSection() {
  return (
    <section className="method-section grid-surface" id="metodo">
      <div className="page-container">
        <SectionLead
          eyebrow="O método"
          title={
            <>
              Um mês. Quatro reuniões.{" "}
              <span className="muted-title">
                Cada fase termina com algo funcionando.
              </span>
            </>
          }
          copy="Produto produtizado, não projeto aberto. Escopo e definição de pronto visíveis desde o primeiro dia."
        />

        <ol className="method-grid">
          {PHASES.map((phase, index) => (
            <motion.li
              key={phase.step}
              {...reveal}
              transition={{ ...reveal.transition, delay: index * 0.07 }}
            >
              <div className="method-index">
                <span>{phase.step}</span>
                <i />
              </div>
              <p className="method-weeks">{phase.weeks}</p>
              <h3>{phase.title}</h3>
              <p>{phase.copy}</p>
              <div className="done-chip">
                <Check size={12} /> {phase.done}
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="delivery-strip">
          <div>
            <BrainCircuit size={17} />
            <span>Segundo cérebro completo</span>
          </div>
          <div>
            <Sparkles size={17} />
            <span>5 skills + packs Playbook Lab</span>
          </div>
          <div>
            <Clock3 size={17} />
            <span>Rotinas automáticas rodando</span>
          </div>
          <div>
            <FileText size={17} />
            <span>Documentação e treinamento</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const OWNERSHIP = [
  {
    icon: HardDrive,
    title: "Autonomia",
    copy: "Quando o projeto acaba, o FoundersOS continua rodando.",
  },
  {
    icon: Lock,
    title: "Privacidade",
    copy: "E-mails, contratos e pipeline ficam na sua máquina.",
  },
  {
    icon: Unplug,
    title: "Zero lock-in",
    copy: "Não é uma plataforma nossa que você precisa alugar.",
  },
];

export function LocalOwnership() {
  return (
    <section className="ownership-section dark-surface" id="autonomia">
      <div className="page-container">
        <motion.p className="eyebrow" {...reveal}>
          Por que roda na sua máquina
        </motion.p>
        <motion.blockquote
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.05 }}
        >
          “Seu segundo cérebro é seu. Os dados{" "}
          <span>nunca saem do seu computador</span>.”
        </motion.blockquote>

        <div className="ownership-grid">
          {OWNERSHIP.map(({ icon: Icon, title, copy }, index) => (
            <motion.article
              key={title}
              {...reveal}
              transition={{ ...reveal.transition, delay: 0.08 + index * 0.06 }}
            >
              <Icon size={18} />
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final-cta-section paper-surface" id="investimento">
      <div className="page-container">
        <div className="final-cta-grid">
          <motion.div className="price-column" {...reveal}>
            <p className="eyebrow">Piloto de lançamento</p>
            <div className="price">
              <span>R$</span>
              <strong>6.000</strong>
            </div>
            <p className="price-note">em 2x · sem mensalidade</p>
            <ul>
              <li>
                <Check size={14} /> 4 semanas de implantação
              </li>
              <li>
                <Check size={14} /> 4 reuniões de acompanhamento
              </li>
              <li>
                <Check size={14} /> Sistema e documentação ficam com você
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="cta-column"
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.08 }}
          >
            <span className="live-chip">
              <i /> Agenda aberta
            </span>
            <h2>Pare de explicar sua empresa toda vez que abrir o chat.</h2>
            <p>
              Escolha um horário disponível e fale direto com a equipe da
              Playbook Lab.
            </p>
            <a className="button button-dark button-large" href="#agendar">
              Agendar uma conversa <ArrowRight size={16} />
            </a>
            <small>Sem formulário longo. Agendamento direto.</small>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const CALENDAR_NAMESPACE = "foundersos";
const CALENDAR_LINK = "victor-playbooklab/bate-papo-foundersos";

function loadCalEmbed() {
  if (window.Cal) return;

  ((windowRef, embedUrl, initCommand) => {
    const enqueue = (target, args) => target.q.push(args);
    const documentRef = windowRef.document;

    windowRef.Cal = windowRef.Cal || function calQueue() {
      const cal = windowRef.Cal;
      const args = arguments;

      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        const script = documentRef.createElement("script");
        script.src = embedUrl;
        script.async = true;
        documentRef.head.appendChild(script);
        cal.loaded = true;
      }

      if (args[0] === initCommand) {
        const namespace = args[1];
        const api = function calNamespaceQueue() {
          enqueue(api, arguments);
        };
        api.q = api.q || [];
        if (typeof namespace === "string") {
          cal.ns[namespace] = cal.ns[namespace] || api;
          enqueue(cal.ns[namespace], args);
          enqueue(cal, ["initNamespace", namespace]);
        } else {
          enqueue(cal, args);
        }
        return;
      }

      enqueue(cal, args);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");
}

export function ScheduleSection() {
  const calendarRef = useRef(null);

  useEffect(() => {
    const element = calendarRef.current;
    if (!element || element.dataset.calInitialized === "true") return;

    element.dataset.calInitialized = "true";
    loadCalEmbed();
    window.Cal("init", CALENDAR_NAMESPACE, {
      origin: "https://app.cal.com",
    });
    window.Cal.ns[CALENDAR_NAMESPACE]("inline", {
      elementOrSelector: "#foundersos-calendar",
      config: { layout: "month_view", theme: "light" },
      calLink: CALENDAR_LINK,
    });
    window.Cal.ns[CALENDAR_NAMESPACE]("ui", {
      theme: "light",
      cssVarsPerTheme: {
        light: { "cal-brand": "#0aa866" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return (
    <section className="schedule-section paper-surface" id="agendar">
      <div className="schedule-glow" aria-hidden="true" />
      <div className="page-container schedule-container">
        <motion.div className="schedule-heading" {...reveal}>
          <p className="eyebrow">Agenda aberta</p>
          <h2>Agende uma conversa</h2>
          <p>Escolha um horário para falar com nossa equipe.</p>
        </motion.div>

        <motion.div
          className="calendar-shell"
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.08 }}
        >
          <div
            id="foundersos-calendar"
            ref={calendarRef}
            className="calendar-embed"
            aria-label="Calendário para agendar uma conversa com a Playbook Lab"
          />
          <noscript>
            <a
              className="calendar-fallback"
              href={`https://cal.com/${CALENDAR_LINK}`}
              target="_blank"
              rel="noreferrer"
            >
              Abrir calendário de agendamento
            </a>
          </noscript>
        </motion.div>
      </div>
    </section>
  );
}

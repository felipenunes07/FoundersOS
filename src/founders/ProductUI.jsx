import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  Database,
  FileText,
  Headphones,
  Inbox,
  LayoutDashboard,
  Mail,
  Mic2,
  MoreHorizontal,
  Play,
  Search,
  Settings,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { PointillistBrain } from "./PointillistBrain";

const entries = [
  {
    icon: Target,
    area: "Comercial",
    title: "3 propostas sem próximo passo",
    meta: "R$ 184 mil em pipeline",
    color: "blue",
  },
  {
    icon: Workflow,
    area: "Operação",
    title: "Onboarding da Atlas em risco",
    meta: "2 dependências atrasadas",
    color: "orange",
  },
  {
    icon: CircleDollarSign,
    area: "Financeiro",
    title: "Duas faturas vencem amanhã",
    meta: "R$ 28,4 mil",
    color: "green",
  },
];

function AppSidebar() {
  const items = [
    [LayoutDashboard, "Visão geral", true],
    [BrainCircuit, "Memória"],
    [Workflow, "Rotinas"],
    [Sparkles, "Skills"],
    [Database, "Fontes"],
    [BarChart3, "Relatórios"],
  ];

  return (
    <aside className="os-sidebar">
      <div className="workspace-name">
        <span className="workspace-icon">F</span>
        <span>FoundersOS</span>
        <ChevronDown size={12} />
      </div>
      <button className="quick-search">
        <Search size={13} /> Buscar
        <span>⌘ K</span>
      </button>
      <nav>
        {items.map(([Icon, label, active]) => (
          <div className={active ? "active" : ""} key={label}>
            <Icon size={14} />
            <span>{label}</span>
          </div>
        ))}
      </nav>
      <div className="sidebar-spacer" />
      <div className="source-health">
        <div>
          <span className="source-status" />
          5 fontes ativas
        </div>
        <Settings size={13} />
      </div>
    </aside>
  );
}

export function OperatingWorkspace({ compact = false }) {
  return (
    <div className={`operating-window ${compact ? "is-compact" : ""}`}>
      <div className="window-chrome">
        <div className="traffic-lights">
          <i />
          <i />
          <i />
        </div>
        <div className="window-path">
          <BrainCircuit size={13} />
          FoundersOS / Visão semanal
        </div>
        <div className="window-actions">
          <span className="live-chip">
            <i /> Ao vivo
          </span>
          <button>
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>

      <div className="workspace-shell">
        <AppSidebar />
        <section className="workspace-main">
          <div className="workspace-titlebar">
            <div>
              <p>Segunda-feira · 08:32</p>
              <h3>Visão semanal</h3>
            </div>
            <div className="avatar-stack">
              <span>FN</span>
              <span>VO</span>
              <i>+2</i>
            </div>
          </div>

          <div className="workspace-content">
            <div className="prompt-line">
              <span className="prompt-avatar">F</span>
              <div>
                <p>Você perguntou</p>
                <strong>Onde eu preciso focar esta semana?</strong>
              </div>
            </div>

            <div className="answer-panel">
              <div className="answer-head">
                <span className="brain-mini">
                  <BrainCircuit size={15} />
                </span>
                <div>
                  <strong>FoundersOS</strong>
                  <p>cruzou 5 fontes · 2,4s</p>
                </div>
              </div>

              <div className="focus-list">
                {entries.map(({ icon: Icon, area, title, meta, color }) => (
                  <div className="focus-row" key={area}>
                    <span className={`focus-icon ${color}`}>
                      <Icon size={13} />
                    </span>
                    <div>
                      <p>{area}</p>
                      <strong>{title}</strong>
                    </div>
                    <span className="focus-meta">{meta}</span>
                  </div>
                ))}
              </div>

              <div className="recommendation">
                <Sparkles size={14} />
                <p>
                  <span>Prioridade:</span> destravar a entrega da Atlas antes de
                  acelerar novas propostas.
                </p>
                <button>Ver plano de ação</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function HeroFloatingCards() {
  return (
    <>
      <motion.div
        className="hero-float meeting-float"
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.1, duration: 0.65 }}
      >
        <div className="float-head">
          <span className="float-avatar">VM</span>
          <div>
            <strong>Weekly de liderança</strong>
            <p>tl;dv · 32 min</p>
          </div>
          <Mic2 size={14} />
        </div>
        <div className="waveform">
          {Array.from({ length: 28 }, (_, index) => (
            <i
              key={index}
              style={{ height: `${5 + ((index * 7) % 17)}px` }}
            />
          ))}
        </div>
        <p className="transcript-snippet">
          “O maior risco agora não é vender. É a capacidade de entregar…”
        </p>
        <span className="captured-chip">
          <Check size={11} /> decisão capturada
        </span>
      </motion.div>

      <motion.div
        className="hero-float sources-float"
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.28, duration: 0.65 }}
      >
        <div className="float-kicker">
          <span className="source-status" /> Contexto entrando
        </div>
        {[
          [Mail, "Gmail", "14 novos sinais"],
          [Database, "Pipedrive", "6 deals atualizados"],
          [FileText, "Drive", "3 documentos lidos"],
        ].map(([Icon, name, detail]) => (
          <div className="source-row" key={name}>
            <span>
              <Icon size={13} />
            </span>
            <strong>{name}</strong>
            <p>{detail}</p>
          </div>
        ))}
      </motion.div>
    </>
  );
}

const SENSE_CONTENT = {
  ve: {
    label: "Vê",
    title: "Enxerga o que muda na operação.",
    copy: "Pipeline, tarefas, entregas e números entram no mesmo campo de visão.",
    icon: Target,
  },
  escuta: {
    label: "Escuta",
    title: "Transforma calls em memória.",
    copy: "Reuniões deixam de ser arquivos esquecidos e passam a orientar as próximas decisões.",
    icon: Headphones,
  },
  le: {
    label: "Lê",
    title: "Entende documentos e conversas.",
    copy: "E-mails, contratos, propostas e processos ficam disponíveis para qualquer análise.",
    icon: FileText,
  },
  age: {
    label: "Age",
    title: "Executa rotinas no seu lugar.",
    copy: "Briefings, follow-ups e revisões rodam com contexto — sem pedir tudo de novo.",
    icon: Workflow,
  },
};

export function SenseInterface({ active }) {
  const content = SENSE_CONTENT[active];
  const Icon = content.icon;

  return (
    <div className="sense-window">
      <div className="sense-topbar">
        <div>
          <span className="workspace-icon">F</span>
          <strong>Context stream</strong>
        </div>
        <span className="live-chip">
          <i /> sincronizando
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          className="sense-stage"
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          <div className="sense-summary">
            <span className="sense-icon">
              <Icon size={18} />
            </span>
            <div>
              <p>{content.label} · agora</p>
              <h3>{content.title}</h3>
              <span>{content.copy}</span>
            </div>
          </div>

          {active === "ve" && (
            <div className="mini-table">
              <div className="mini-table-head">
                <span>Frente</span>
                <span>Sinal</span>
                <span>Estado</span>
                <span>Próxima ação</span>
              </div>
              {[
                ["Comercial", "3 propostas paradas", "Atenção", "Cobrar hoje"],
                ["Entrega", "Atlas atrasou 2 tarefas", "Risco", "Replanejar"],
                ["Financeiro", "Caixa dentro da meta", "Saudável", "Monitorar"],
              ].map((row, index) => (
                <div className="mini-table-row" key={row[0]}>
                  <strong>{row[0]}</strong>
                  <span>{row[1]}</span>
                  <i className={`state-${index}`}>{row[2]}</i>
                  <span>{row[3]}</span>
                </div>
              ))}
            </div>
          )}

          {active === "escuta" && (
            <div className="transcript-ui">
              <div className="audio-line">
                <button>
                  <Play size={12} fill="currentColor" />
                </button>
                <div className="waveform wide">
                  {Array.from({ length: 46 }, (_, index) => (
                    <i
                      key={index}
                      style={{ height: `${4 + ((index * 9) % 22)}px` }}
                    />
                  ))}
                </div>
                <span>18:42</span>
              </div>
              <div className="quote-line">
                <span>VM · 18:42</span>
                <p>
                  “Se a gente fechar mais duas contas agora, a operação vira o
                  gargalo. Precisamos estabilizar a entrega primeiro.”
                </p>
              </div>
              <div className="decision-line">
                <Sparkles size={13} />
                Decisão registrada em <strong>memory/decisoes.md</strong>
              </div>
            </div>
          )}

          {active === "le" && (
            <div className="document-grid">
              {[
                [FileText, "Proposta · Atlas.pdf", "Preço e escopo"],
                [Mail, "Thread · Expansão", "4 participantes"],
                [FileText, "Processo · Onboarding", "12 etapas"],
              ].map(([DocIcon, title, meta], index) => (
                <div key={title} className={index === 1 ? "selected" : ""}>
                  <DocIcon size={17} />
                  <strong>{title}</strong>
                  <span>{meta}</span>
                  {index === 1 && <i>lido agora</i>}
                </div>
              ))}
              <aside>
                <p>Contexto extraído</p>
                <strong>Expansão depende da entrega do onboarding.</strong>
                <ul>
                  <li>Prazo prometido: sexta-feira</li>
                  <li>Responsável: Operações</li>
                  <li>Risco citado em 2 conversas</li>
                </ul>
              </aside>
            </div>
          )}

          {active === "age" && (
            <div className="routine-board">
              {[
                ["08:00", "Briefing do fundador", "Concluído"],
                ["12:30", "Atualizar riscos de entrega", "Executando"],
                ["17:45", "Fechamento do dia", "Agendado"],
                ["SEX", "Revisão semanal", "Agendado"],
              ].map(([time, routine, status], index) => (
                <div key={routine}>
                  <span>{time}</span>
                  <strong>{routine}</strong>
                  <i className={`routine-${index}`}>{status}</i>
                  <MoreHorizontal size={14} />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function BrainOrbit() {
  const tools = [
    [Mail, "E-mail"],
    [Mic2, "Mensagens"],
    [FileText, "Contratos"],
    [Inbox, "Documentos"],
    [CalendarDays, "Calendário"],
    [CircleDollarSign, "Reuniões"],
    [Workflow, "+ Outras fontes"],
    [Database, "CRM"],
  ];

  return (
    <div className="brain-orbit">
      <div className="orbit-ring orbit-ring-one" />
      <div className="orbit-ring orbit-ring-two" />
      <div className="orbit-brain">
        <PointillistBrain light interactive className="brain-canvas" />
      </div>
      {tools.map(([Icon, label], index) => {
        const angle = (index / tools.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <motion.div
            className="orbit-tool"
            key={label}
            style={{
              left: `${50 + Math.cos(angle) * 40}%`,
              top: `${50 + Math.sin(angle) * 40}%`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + index * 0.06 }}
          >
            <Icon size={13} />
            <span>{label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

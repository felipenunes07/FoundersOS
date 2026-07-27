import { motion, useReducedMotion } from "framer-motion";
import {
  Bot,
  CalendarDays,
  Database,
  FileText,
  Mail,
  MessageCircle,
  Mic2,
  Network,
} from "lucide-react";
import { useState } from "react";

const LAYERS = {
  applications: {
    index: "04",
    label: "Aplicações",
    short: "APPS",
    headline: "As ferramentas que alimentam e executam.",
    copy: "E-mail, CRM, reuniões, documentos e agenda conectados ao mesmo contexto.",
    metric: "8 fontes conectadas",
  },
  routines: {
    index: "03",
    label: "Rotinas",
    short: "ROTINAS",
    headline: "O trabalho recorrente ganha cadência.",
    copy: "Briefings, follow-ups, revisões e alertas passam a rodar com memória.",
    metric: "12 rotinas ativas",
  },
  memory: {
    index: "02",
    label: "Memória",
    short: "MEMÓRIA",
    headline: "O contexto deixa de desaparecer.",
    copy: "Decisões, clientes, processos e aprendizados continuam disponíveis para a próxima ação.",
    metric: "2.847 relações",
  },
  skills: {
    index: "01",
    label: "Skills",
    short: "SKILLS",
    headline: "A IA aprende como sua empresa trabalha.",
    copy: "Capacidades reutilizáveis transformam conhecimento em pesquisa, análise e execução.",
    metric: "8 capacidades operacionais",
  },
};

const APPLICATIONS = [
  { label: "Gmail", Icon: Mail },
  { label: "Drive", Icon: FileText },
  { label: "Notion", Icon: Database },
  { label: "CRM", Icon: Network },
  { label: "tl;dv", Icon: Mic2 },
  { label: "Agenda", Icon: CalendarDays },
  { label: "WhatsApp", Icon: MessageCircle },
  { label: "Agentes", Icon: Bot },
];

const ROUTINES = [
  "Briefing",
  "Follow-up",
  "Weekly",
  "Pipeline",
  "Onboarding",
  "Conteúdo",
  "Cobrança",
  "Sync",
  "Alertas",
  "Revisão",
  "Prioridades",
  "Relatório",
];

const SKILLS = [
  "Pesquisa",
  "Síntese",
  "Análise",
  "Decisão",
  "Escrita",
  "Planejamento",
  "Automação",
  "Execução",
];

const MEMORY_LABELS = [
  "Clientes",
  "Produto",
  "Operação",
  "Comercial",
  "Decisões",
  "Reuniões",
];

const MEMORY_DOTS = Array.from({ length: 74 }, (_, index) => {
  const angle = (index / 74) * Math.PI * 2 + (index % 3) * 0.026;
  const radius = 25.5 + ((index * 17) % 38) / 10;
  return {
    id: index,
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
    size: 2 + (index % 4) * 0.65,
  };
});

function orbitPosition(index, total, radius, offset = -Math.PI / 2) {
  const angle = offset + (index / total) * Math.PI * 2;
  return {
    left: `${50 + Math.cos(angle) * radius}%`,
    top: `${50 + Math.sin(angle) * radius}%`,
  };
}

function LayerNode({
  layer,
  label,
  index,
  total,
  radius,
  active,
  onActivate,
  Icon,
  named = false,
}) {
  return (
    <motion.button
      type="button"
      className={`orbital-node node-${layer} ${active ? "is-active" : ""} ${
        named ? "is-named" : ""
      }`}
      style={orbitPosition(index, total, radius)}
      initial={{ opacity: 0, scale: 0.55 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 + index * 0.025, duration: 0.45 }}
      onMouseEnter={() => onActivate(layer)}
      onFocus={() => onActivate(layer)}
      onClick={() => onActivate(layer)}
      aria-label={`Destacar ${label}`}
    >
      <span>{Icon ? <Icon size={13} /> : null}</span>
      {named ? <small>{label}</small> : null}
    </motion.button>
  );
}

export function OrbitalBrainSection({ embedded = false }) {
  const [activeLayer, setActiveLayer] = useState("memory");
  const reducedMotion = useReducedMotion();
  const active = LAYERS[activeLayer];

  return (
    <section
      className={`orbital-section dark-surface ${
        embedded ? "orbital-embedded" : ""
      }`}
      id={embedded ? undefined : "orbita"}
    >
      <div className="dark-grid" />
      <div className="page-container">
        <div className="orbital-section-head">
          <div>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Visualização 02 · Mapa orbital
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              O núcleo aprende.{" "}
              <span>As camadas ao redor transformam contexto em ação.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            O Obsidian mostra onde o conhecimento vive. Este mapa mostra como
            memória, skills, rotinas e ferramentas trabalham juntas.
          </motion.p>
        </div>

        <motion.div
          className="orbital-frame"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="orbital-chrome">
            <span>
              <i /> FoundersOS · Topologia viva
            </span>
            <strong>4 camadas · 2.847 relações</strong>
          </div>

          <div className="orbital-frame-body">
            <div className={`orbital-map active-${activeLayer}`}>
              <svg
                className="orbital-connections"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                {APPLICATIONS.map((_, index) => {
                  const point = orbitPosition(index, APPLICATIONS.length, 44);
                  return (
                    <line
                      key={`app-line-${index}`}
                      x1="50"
                      y1="50"
                      x2={parseFloat(point.left)}
                      y2={parseFloat(point.top)}
                    />
                  );
                })}
              </svg>

              {[
                ["applications", 6],
                ["routines", 16],
                ["memory", 23],
                ["skills", 34],
              ].map(([layer, inset]) => (
                <button
                  type="button"
                  className={`orbital-ring ring-${layer}`}
                  style={{ inset: `${inset}%` }}
                  onClick={() => setActiveLayer(layer)}
                  aria-label={`Destacar camada ${LAYERS[layer].label}`}
                  key={layer}
                >
                  <span>{LAYERS[layer].short}</span>
                </button>
              ))}

              <motion.div
                className="orbital-tracer tracer-apps"
                animate={
                  reducedMotion ? undefined : { rotate: [0, 360] }
                }
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <i />
              </motion.div>

              <motion.div
                className="orbital-tracer tracer-routines"
                animate={
                  reducedMotion ? undefined : { rotate: [360, 0] }
                }
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <i />
              </motion.div>

              <div className="memory-dust" aria-hidden="true">
                {MEMORY_DOTS.map((dot) => (
                  <i
                    key={dot.id}
                    style={{
                      left: `${dot.x}%`,
                      top: `${dot.y}%`,
                      width: `${dot.size}px`,
                      height: `${dot.size}px`,
                    }}
                  />
                ))}
              </div>

              {APPLICATIONS.map((node, index) => (
                <LayerNode
                  {...node}
                  layer="applications"
                  index={index}
                  total={APPLICATIONS.length}
                  radius={44}
                  active={activeLayer === "applications"}
                  onActivate={setActiveLayer}
                  named
                  key={node.label}
                />
              ))}

              {ROUTINES.map((label, index) => (
                <LayerNode
                  layer="routines"
                  label={label}
                  index={index}
                  total={ROUTINES.length}
                  radius={34}
                  active={activeLayer === "routines"}
                  onActivate={setActiveLayer}
                  named={index % 3 === 0}
                  key={label}
                />
              ))}

              {MEMORY_LABELS.map((label, index) => (
                <LayerNode
                  layer="memory"
                  label={label}
                  index={index}
                  total={MEMORY_LABELS.length}
                  radius={27}
                  active={activeLayer === "memory"}
                  onActivate={setActiveLayer}
                  named
                  key={label}
                />
              ))}

              {SKILLS.map((label, index) => (
                <LayerNode
                  layer="skills"
                  label={label}
                  index={index}
                  total={SKILLS.length}
                  radius={16}
                  active={activeLayer === "skills"}
                  onActivate={setActiveLayer}
                  named={index % 2 === 0}
                  key={label}
                />
              ))}

              <button
                type="button"
                className="orbital-core"
                onClick={() => setActiveLayer("memory")}
              >
                <span>
                  <i />
                  FoundersOS
                </span>
                <strong>CLAUDE.md</strong>
                <small>núcleo de contexto</small>
              </button>
            </div>

            <aside className="orbital-inspector">
              <span className="orbital-inspector-kicker">
                Camada ativa · {active.index}
              </span>
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28 }}
              >
                <p>{active.label}</p>
                <h3>{active.headline}</h3>
                <p>{active.copy}</p>
                <strong>{active.metric}</strong>
              </motion.div>

              <div className="orbital-layer-list">
                {Object.entries(LAYERS).map(([key, layer]) => (
                  <button
                    type="button"
                    className={activeLayer === key ? "active" : ""}
                    onClick={() => setActiveLayer(key)}
                    key={key}
                  >
                    <span>{layer.index}</span>
                    {layer.label}
                    <i />
                  </button>
                ))}
              </div>

              <small>
                Passe pelos anéis ou clique nas camadas para explorar.
              </small>
            </aside>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

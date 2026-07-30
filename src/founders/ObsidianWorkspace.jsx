import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDot,
  FileText,
  Folder,
  FolderOpen,
  Hash,
  Link2,
  Network,
  Orbit,
  PanelLeft,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { OrbitalMap } from "./OrbitalBrain";

const INITIAL_NODES = [
  { id: "foundersos", label: "FoundersOS", x: 49, y: 48, kind: "core" },
  { id: "claude", label: "CLAUDE.md", x: 28, y: 24, kind: "dna" },
  { id: "founder", label: "Fundador", x: 46, y: 15, kind: "dna" },
  { id: "offer", label: "Oferta", x: 68, y: 24, kind: "dna" },
  { id: "icp", label: "ICP", x: 79, y: 41, kind: "dna" },
  { id: "tone", label: "Tom de voz", x: 17, y: 42, kind: "dna" },
  { id: "weekly", label: "Weekly liderança", x: 21, y: 66, kind: "memory" },
  { id: "decision", label: "Decisão · Atlas", x: 42, y: 77, kind: "memory" },
  { id: "atlas", label: "Cliente · Atlas", x: 65, y: 72, kind: "memory" },
  { id: "pipeline", label: "Pipeline", x: 83, y: 62, kind: "source" },
  { id: "onboarding", label: "Onboarding", x: 59, y: 91, kind: "skill" },
  { id: "briefing", label: "Briefing diário", x: 33, y: 92, kind: "routine" },
  { id: "finance", label: "Financeiro", x: 91, y: 79, kind: "source" },
  { id: "followup", label: "Follow-up", x: 88, y: 21, kind: "routine" },
];

const EDGES = [
  ["foundersos", "claude"],
  ["foundersos", "founder"],
  ["foundersos", "offer"],
  ["foundersos", "weekly"],
  ["foundersos", "decision"],
  ["foundersos", "atlas"],
  ["foundersos", "pipeline"],
  ["foundersos", "briefing"],
  ["claude", "founder"],
  ["claude", "offer"],
  ["claude", "tone"],
  ["offer", "icp"],
  ["offer", "pipeline"],
  ["offer", "followup"],
  ["weekly", "decision"],
  ["weekly", "briefing"],
  ["decision", "atlas"],
  ["decision", "onboarding"],
  ["atlas", "pipeline"],
  ["atlas", "finance"],
  ["atlas", "onboarding"],
  ["pipeline", "followup"],
  ["pipeline", "finance"],
  ["briefing", "decision"],
  ["briefing", "finance"],
];

const NOTES = {
  foundersos: {
    title: "FoundersOS",
    path: "FoundersOS/README.md",
    type: "Mapa do sistema",
    updated: "agora",
    body: "O índice que conecta o DNA da empresa, a memória operacional e tudo o que o sistema pode executar.",
    bullets: ["4 camadas ativas", "27 fontes conectadas", "memória local"],
    links: ["CLAUDE.md", "Decisões", "Skills"],
    tags: ["sistema", "contexto"],
  },
  claude: {
    title: "CLAUDE.md",
    path: "00_DNA/CLAUDE.md",
    type: "DNA da empresa",
    updated: "hoje · 08:12",
    body: "Como a empresa pensa: ICP, oferta, prioridades, regras, preços e o tom que toda IA deve respeitar.",
    bullets: ["ICP validado", "regras comerciais", "tom do fundador"],
    links: ["Oferta", "Fundador", "Tom de voz"],
    tags: ["dna", "fonte-da-verdade"],
  },
  founder: {
    title: "Fundador",
    path: "00_DNA/fundador.md",
    type: "Contexto permanente",
    updated: "ontem · 19:40",
    body: "Preferências, critérios de decisão, responsabilidades e as frentes que não podem depender apenas da memória humana.",
    bullets: ["prioriza clareza", "opera 3 frentes", "decide por evidência"],
    links: ["CLAUDE.md", "Weekly liderança"],
    tags: ["fundador", "princípios"],
  },
  offer: {
    title: "Oferta FoundersOS",
    path: "00_DNA/oferta.md",
    type: "Fonte comercial",
    updated: "hoje · 09:06",
    body: "Implantação do segundo cérebro em quatro semanas, com entregas verificáveis e propriedade integral do cliente.",
    bullets: ["4 semanas", "4 reuniões", "zero lock-in"],
    links: ["ICP", "Pipeline", "Follow-up"],
    tags: ["oferta", "comercial"],
  },
  icp: {
    title: "ICP",
    path: "00_DNA/icp.md",
    type: "Estratégia comercial",
    updated: "22 jul · 16:18",
    body: "Fundadores que centralizam comercial, entrega e decisões — e já sentem o custo do contexto espalhado.",
    bullets: ["empresa de serviço", "time enxuto", "fundador no centro"],
    links: ["Oferta", "Pipeline"],
    tags: ["icp", "go-to-market"],
  },
  tone: {
    title: "Tom de voz",
    path: "00_DNA/tom-de-voz.md",
    type: "Regra de comunicação",
    updated: "18 jul · 14:22",
    body: "Direto, humano e preciso. Sem jargão de IA, promessas vagas ou texto que pareça escrito por máquina.",
    bullets: ["clareza", "convicção", "sem exagero"],
    links: ["CLAUDE.md", "Oferta"],
    tags: ["marca", "linguagem"],
  },
  weekly: {
    title: "Weekly de liderança",
    path: "01_MEMÓRIA/reuniões/2026-07-27-weekly.md",
    type: "Reunião transcrita",
    updated: "hoje · 10:34",
    body: "A operação virou o gargalo. Antes de acelerar propostas, o time precisa estabilizar o onboarding da Atlas.",
    bullets: ["3 decisões", "2 riscos", "1 responsável"],
    links: ["Decisão · Atlas", "Briefing diário"],
    tags: ["reunião", "operação"],
  },
  decision: {
    title: "Estabilizar a entrega da Atlas",
    path: "01_MEMÓRIA/decisões/atlas-capacidade.md",
    type: "Decisão registrada",
    updated: "hoje · 10:38",
    body: "Não avançar novas propostas críticas até a equipe confirmar capacidade e resolver as duas dependências do onboarding.",
    bullets: ["owner: Vitória", "prazo: sexta", "status: em andamento"],
    links: ["Weekly liderança", "Cliente · Atlas", "Onboarding"],
    tags: ["decisão", "prioridade"],
  },
  atlas: {
    title: "Cliente · Atlas",
    path: "01_MEMÓRIA/clientes/atlas.md",
    type: "Memória de cliente",
    updated: "há 18 min",
    body: "Histórico comercial, compromissos assumidos, riscos de entrega e todas as decisões que afetam a conta.",
    bullets: ["MRR R$ 18,4 mil", "onboarding em risco", "NPS 9"],
    links: ["Pipeline", "Financeiro", "Onboarding"],
    tags: ["cliente", "conta-ativa"],
  },
  pipeline: {
    title: "Pipeline",
    path: "04_FONTES/pipedrive/pipeline.md",
    type: "Fonte sincronizada",
    updated: "há 3 min",
    body: "O espelho local do CRM permite cruzar oportunidades com capacidade operacional e caixa — sem analisar cada ferramenta isoladamente.",
    bullets: ["R$ 184 mil aberto", "3 propostas paradas", "6 atualizações"],
    links: ["Oferta", "Cliente · Atlas", "Follow-up"],
    tags: ["crm", "comercial"],
  },
  onboarding: {
    title: "Skill · Onboarding",
    path: "02_SKILLS/onboarding-cliente/SKILL.md",
    type: "Capacidade instalada",
    updated: "23 jul · 11:14",
    body: "Lê escopo, identifica dependências e monta o plano de entrada do cliente usando as regras e aprendizados acumulados.",
    bullets: ["5 etapas", "2 verificações", "saída padronizada"],
    links: ["Cliente · Atlas", "Decisão · Atlas"],
    tags: ["skill", "entrega"],
  },
  briefing: {
    title: "Rotina · Briefing diário",
    path: "03_ROTINAS/briefing-diário.md",
    type: "Automação ativa",
    updated: "hoje · 08:00",
    body: "Todas as manhãs, cruza pipeline, entregas, financeiro e decisões recentes para apontar a prioridade real do fundador.",
    bullets: ["executa 08:00", "4 fontes", "1 resumo"],
    links: ["Decisão · Atlas", "Financeiro", "Weekly liderança"],
    tags: ["rotina", "prioridade"],
  },
  finance: {
    title: "Financeiro",
    path: "04_FONTES/financeiro/caixa.md",
    type: "Fonte sincronizada",
    updated: "há 7 min",
    body: "Recebimentos, vencimentos e compromissos conectados às decisões comerciais e operacionais.",
    bullets: ["2 faturas amanhã", "caixa na meta", "0 alertas críticos"],
    links: ["Cliente · Atlas", "Briefing diário"],
    tags: ["financeiro", "fonte"],
  },
  followup: {
    title: "Rotina · Follow-up",
    path: "03_ROTINAS/follow-up-comercial.md",
    type: "Automação ativa",
    updated: "hoje · 12:30",
    body: "Encontra propostas sem próximo passo e prepara mensagens usando o histórico da oportunidade e o tom do fundador.",
    bullets: ["3 propostas", "preview obrigatório", "aguarda aprovação"],
    links: ["Oferta", "Pipeline"],
    tags: ["rotina", "comercial"],
  },
};

const FOLDERS = [
  {
    id: "dna",
    label: "00_DNA",
    noteIds: ["claude", "founder", "offer", "icp", "tone"],
  },
  {
    id: "memory",
    label: "01_MEMÓRIA",
    noteIds: ["weekly", "decision", "atlas"],
  },
  {
    id: "skills",
    label: "02_SKILLS",
    noteIds: ["onboarding"],
  },
  {
    id: "routines",
    label: "03_ROTINAS",
    noteIds: ["briefing", "followup"],
  },
  {
    id: "sources",
    label: "04_FONTES",
    noteIds: ["pipeline", "finance"],
  },
];

const NOTE_ID_BY_LINK = {
  "CLAUDE.md": "claude",
  Decisões: "decision",
  Skills: "onboarding",
  Oferta: "offer",
  Fundador: "founder",
  "Tom de voz": "tone",
  "Weekly liderança": "weekly",
  "Decisão · Atlas": "decision",
  "Briefing diário": "briefing",
  "Cliente · Atlas": "atlas",
  Onboarding: "onboarding",
  ICP: "icp",
  Pipeline: "pipeline",
  "Follow-up": "followup",
  Financeiro: "finance",
};

function VaultTree({ selected, onSelect }) {
  const [openFolders, setOpenFolders] = useState(() =>
    Object.fromEntries(FOLDERS.map((folder) => [folder.id, true])),
  );

  return (
    <aside className="obsidian-vault">
      <div className="obsidian-pane-title">
        <span>
          <PanelLeft size={13} /> EXPLORADOR
        </span>
        <Search size={13} />
      </div>

      <div className="vault-root">
        <div className="vault-root-title">
          <FolderOpen size={13} />
          <strong>FOUNDERSOS</strong>
          <small>LOCAL</small>
        </div>

        {FOLDERS.map((folder) => {
          const open = openFolders[folder.id];
          return (
            <div className="vault-folder" key={folder.id}>
              <button
                type="button"
                className="vault-folder-button"
                onClick={() =>
                  setOpenFolders((current) => ({
                    ...current,
                    [folder.id]: !current[folder.id],
                  }))
                }
              >
                {open ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                {open ? <FolderOpen size={12} /> : <Folder size={12} />}
                <span>{folder.label}</span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    className="vault-files"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    {folder.noteIds.map((id) => (
                      <button
                        type="button"
                        className={selected === id ? "active" : ""}
                        onClick={() => onSelect(id)}
                        key={id}
                      >
                        <FileText size={11} />
                        <span>{NOTES[id].title}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="vault-status">
        <span>
          <i /> Vault sincronizado
        </span>
        <strong>LOCAL</strong>
      </div>
    </aside>
  );
}

function KnowledgeGraph({ selected, onSelect, view, onViewChange }) {
  const [orbitLayer, setOrbitLayer] = useState("memory");
  const graphRef = useRef(null);
  const dragRef = useRef(null);
  const [positions, setPositions] = useState(() =>
    Object.fromEntries(INITIAL_NODES.map((node) => [node.id, { x: node.x, y: node.y }])),
  );

  const related = useMemo(() => {
    const ids = new Set([selected]);
    EDGES.forEach(([from, to]) => {
      if (from === selected) ids.add(to);
      if (to === selected) ids.add(from);
    });
    return ids;
  }, [selected]);

  useEffect(() => {
    const moveDraggedNode = (event) => {
      const drag = dragRef.current;
      if (!drag || !graphRef.current) return;

      const rect = graphRef.current.getBoundingClientRect();
      const x = Math.max(
        5,
        Math.min(95, ((event.clientX - rect.left) / rect.width) * 100),
      );
      const y = Math.max(
        7,
        Math.min(93, ((event.clientY - rect.top) / rect.height) * 100),
      );

      drag.moved = true;
      setPositions((current) => ({
        ...current,
        [drag.id]: { x, y },
      }));
    };

    const finishDrag = () => {
      dragRef.current = null;
    };

    window.addEventListener("pointermove", moveDraggedNode);
    window.addEventListener("pointerup", finishDrag);
    window.addEventListener("pointercancel", finishDrag);
    window.addEventListener("mousemove", moveDraggedNode);
    window.addEventListener("mouseup", finishDrag);

    return () => {
      window.removeEventListener("pointermove", moveDraggedNode);
      window.removeEventListener("pointerup", finishDrag);
      window.removeEventListener("pointercancel", finishDrag);
      window.removeEventListener("mousemove", moveDraggedNode);
      window.removeEventListener("mouseup", finishDrag);
    };
  }, []);

  const moveNode = (event, id) => {
    if (dragRef.current?.id !== id || !graphRef.current) return;
    const rect = graphRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(7, Math.min(93, ((event.clientY - rect.top) / rect.height) * 100));
    dragRef.current.moved = true;
    setPositions((current) => ({ ...current, [id]: { x, y } }));
  };

  return (
    <div className="knowledge-graph">
      <div className="graph-toolbar">
        <div>
          <button
            type="button"
            className={view === "grafo" ? "active" : ""}
            aria-pressed={view === "grafo"}
            onClick={() => onViewChange("grafo")}
          >
            <Network size={12} /> Grafo
          </button>
          <button
            type="button"
            className={view === "orbita" ? "active" : ""}
            aria-pressed={view === "orbita"}
            onClick={() => onViewChange("orbita")}
          >
            <Orbit size={12} /> Órbita
          </button>
          <span className="graph-toolbar-label">
            <FileText size={12} /> Nota vinculada
          </span>
        </div>
        <span>
          {view === "orbita"
            ? "4 camadas · 2.847 relações"
            : "14 notas · 25 conexões"}
        </span>
      </div>

      {view === "orbita" ? (
        <div className="graph-stage graph-stage-orbit">
          <OrbitalMap activeLayer={orbitLayer} onLayerChange={setOrbitLayer} />
        </div>
      ) : (
      <div className="graph-stage" ref={graphRef}>
        <span className="graph-region graph-region-dna">DNA</span>
        <span className="graph-region graph-region-memory">MEMÓRIA</span>
        <span className="graph-region graph-region-action">AÇÃO</span>

        <svg
          className="graph-connections"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {EDGES.map(([from, to]) => {
            const active = from === selected || to === selected;
            return (
              <motion.line
                key={`${from}-${to}`}
                x1={positions[from].x}
                y1={positions[from].y}
                x2={positions[to].x}
                y2={positions[to].y}
                className={active ? "active" : ""}
                animate={{ opacity: active ? 1 : 0.25 }}
                transition={{ duration: 0.2 }}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {INITIAL_NODES.map((node, index) => {
          const position = positions[node.id];
          const active = node.id === selected;
          const isRelated = related.has(node.id);
          return (
            <motion.button
              type="button"
              key={node.id}
              className={`graph-node node-${node.kind} ${active ? "active" : ""} ${isRelated ? "related" : ""}`}
              style={{ left: `${position.x}%`, top: `${position.y}%` }}
              initial={{ opacity: 0, scale: 0.65 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 + index * 0.035 }}
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                dragRef.current = { id: node.id, moved: false };
                onSelect(node.id);
              }}
              onMouseDown={() => {
                dragRef.current = { id: node.id, moved: false };
                onSelect(node.id);
              }}
              onPointerMove={(event) => moveNode(event, node.id)}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  event.currentTarget.releasePointerCapture(event.pointerId);
                }
                dragRef.current = null;
              }}
              onPointerCancel={() => {
                dragRef.current = null;
              }}
              onClick={() => onSelect(node.id)}
              aria-label={`Abrir nota ${NOTES[node.id].title}`}
            >
              <span />
              <strong>{node.label}</strong>
            </motion.button>
          );
        })}

        <div className="graph-hint">
          <CircleDot size={11} />
          Arraste os nodes · clique para abrir
        </div>
      </div>
      )}
    </div>
  );
}

function NoteInspector({ selected, onSelect }) {
  const note = NOTES[selected];

  return (
    <aside className="note-inspector">
      <div className="obsidian-pane-title">
        <span>
          <Link2 size={13} /> NOTA ATIVA
        </span>
        <ArrowUpRight size={13} />
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          className="note-content"
          key={selected}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -6 }}
          transition={{ duration: 0.16 }}
        >
          <div className="note-path">{note.path}</div>
          <span className="note-type">
            <i /> {note.type}
          </span>
          <h3>{note.title}</h3>
          <p>{note.body}</p>

          <div className="note-callout">
            <Sparkles size={13} />
            <div>
              <strong>Contexto utilizável</strong>
              <span>Esta nota já pode orientar análises, skills e rotinas.</span>
            </div>
          </div>

          <ul className="note-facts">
            {note.bullets.map((bullet) => (
              <li key={bullet}>
                <Check size={11} /> {bullet}
              </li>
            ))}
          </ul>

          <div className="note-backlinks">
            <span>
              <Link2 size={11} /> LINKS BIDIRECIONAIS
            </span>
            {note.links.map((link) => (
              <button
                type="button"
                key={link}
                onClick={() => {
                  const target = NOTE_ID_BY_LINK[link];
                  if (target) onSelect(target);
                }}
              >
                [[{link}]]
              </button>
            ))}
          </div>

          <div className="note-tags">
            {note.tags.map((tag) => (
              <span key={tag}>
                <Hash size={9} /> {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="note-footer">
        <span>modificado {note.updated}</span>
        <strong>Markdown</strong>
      </div>
    </aside>
  );
}

export function ObsidianVaultDemo({
  id,
  className = "",
  initialSelected = "foundersos",
}) {
  const [selected, setSelected] = useState(initialSelected);
  const [view, setView] = useState("grafo");

  return (
    <div className={`obsidian-frame ${className}`.trim()} id={id}>
      <div className="obsidian-chrome">
        <div className="obsidian-traffic">
          <i />
          <i />
          <i />
        </div>
        <div className="obsidian-title">
          <span className="obsidian-gem">◆</span>
          FoundersOS Vault
        </div>
        <div className="obsidian-sync">
          <i /> 27 fontes sincronizadas
        </div>
      </div>

      <div className="obsidian-frame-body">
        <VaultTree selected={selected} onSelect={setSelected} />
        <KnowledgeGraph
          selected={selected}
          onSelect={setSelected}
          view={view}
          onViewChange={setView}
        />
        <NoteInspector selected={selected} onSelect={setSelected} />
      </div>
    </div>
  );
}

export function ObsidianSection() {
  const [selected, setSelected] = useState("foundersos");

  return (
    <section className="obsidian-section grid-surface" id="obsidian">
      <div className="page-container">
        <div className="obsidian-section-head">
          <div>
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Dentro do Obsidian
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
            >
              O contexto deixa de ficar espalhado.{" "}
              <span>Ele vira um mapa navegável.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Cada arquivo é uma peça de memória. Cada link mostra uma relação.
            Juntos, eles formam a estrutura que a IA consulta antes de responder
            ou agir.
          </motion.p>
        </div>

        <motion.div
          className="obsidian-frame"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="obsidian-chrome">
            <div className="obsidian-traffic">
              <i />
              <i />
              <i />
            </div>
            <div className="obsidian-title">
              <span className="obsidian-gem">◆</span>
              FoundersOS Vault
            </div>
            <div className="obsidian-sync">
              <i /> 27 fontes sincronizadas
            </div>
          </div>

          <div className="obsidian-frame-body">
            <VaultTree selected={selected} onSelect={setSelected} />
            <KnowledgeGraph selected={selected} onSelect={setSelected} />
            <NoteInspector selected={selected} onSelect={setSelected} />
          </div>
        </motion.div>

        <div className="obsidian-proof-rail">
          {[
            ["Markdown local", "arquivos legíveis, portáveis e seus"],
            ["Links bidirecionais", "cada decisão encontra sua origem"],
            ["Grafo vivo", "o conhecimento revela relações invisíveis"],
          ].map(([title, copy], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
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

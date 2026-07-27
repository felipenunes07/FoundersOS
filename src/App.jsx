import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Background,
  Handle,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import "@xyflow/react/dist/style.css";
import {
  ArrowRight,
  Asterisk,
  BarChart3,
  Bot,
  Box,
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock3,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Code2,
  Command,
  Copy,
  Database,
  File,
  GitBranch,
  Globe2,
  HeartHandshake,
  Inbox,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Mic2,
  MapPin,
  MoreHorizontal,
  MousePointer2,
  Network,
  PanelLeft,
  Play,
  Plus,
  Search,
  Send,
  Settings,
  Sparkles,
  SquareCheckBig,
  Star,
  Table2,
  ThumbsDown,
  ThumbsUp,
  Users,
  Workflow,
  X,
  Zap,
  RotateCw,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button as ShadButton } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Input } from "./components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";

const asset = (id, ext) => `/assets/${id}.${ext}`;

const customerLogos = [
  ["28ba6e6d8830cc50", "svg", "Parallel"],
  ["eaa1fc714fa4745c", "svg", "Turbopuffer"],
  ["4b02f9ead071ac7a", "svg", "Taskrabbit"],
  ["0aabca2149bd8b08", "svg", "Granola"],
  ["a7ffe179ad649dee", "svg", "Listen"],
  ["64151f52cd3ae706", "png", "Wispr Flow"],
  ["746ca558e9980ee0", "svg", "Wordsmith"],
  ["26cee29fa06bb587", "svg", "Modal"],
  ["153deaf80d73a672", "svg", "Obvious"],
  ["2a7dddb214969467", "svg", "Passionfroot"],
  ["c5e292a82c78692e", "svg", "Railway"],
  ["5a54ab2ffd9f16e5", "svg", "Lightdash"],
  ["60bec71d97b316b6", "svg", "AIUC"],
  ["fae8b9c3fe72c2f2", "svg", "Near"],
  ["9087bd5d6f59ace9", "svg", "Public"],
];

const pipelineCompanies = [
  ["OpenAI", "98", "Isla Harrington", "Opened 40+ GTM roles", "c15e984ac1912df0"],
  ["Harvey", "98", "George Wilkes", "Hired a new CRO", "0abf550c61dce997"],
  ["Browserbase", "97", "Theo Marshall", "Building its first GTM team", "1f7da6673743e381"],
  ["Cursor", "96", "Amelia Carter", "Opened 14 AE roles this quarter", "ee7e3add0264ac96"],
  ["Notion", "96", "Nathan Cole", "Opening a new sales hub", "f94a9b7544eb582f"],
  ["Granola", "92", "Daniel Fraser", "Raised $125M Series C", "2a17146b8a96ee50"],
  ["Ramp", "91", "Maxwell Turner", "Doubling its sales org this year", "036876f8641b79d4"],
];

const showcase = [
  { id: "pipeline", label: "Build pipeline" },
  { id: "convert", label: "Convert leads" },
  { id: "motions", label: "Run sales motions" },
  { id: "forecast", label: "Forecast revenue" },
  { id: "retain", label: "Retain and expand" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

function AttioMark({ word = true, light = false }) {
  return (
    <div className={`attio-mark ${light ? "is-light" : ""}`} aria-label="Attio homepage">
      <span className="attio-glyph">
        <i />
        <i />
        <i />
      </span>
      {word && <span className="attio-word">attio</span>}
    </div>
  );
}

function Button({ children, dark = false, arrow = false, className = "", onClick }) {
  return (
    <ShadButton variant={dark ? "dark" : className.includes("button-light") ? "light" : "outline"} className={className} onClick={onClick}>
      <span>{children}</span>
      {arrow && <ArrowRight size={14} strokeWidth={1.8} />}
    </ShadButton>
  );
}

function Announcement({ onDismiss }) {
  return (
    <motion.div
      className="announcement"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 48, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
    >
      <a href="#platform">
        Orchestrate revenue agents with the new Workflows
        <ArrowRight size={14} />
      </a>
      <button aria-label="Dismiss banner" onClick={onDismiss}>
        <X size={15} />
      </button>
    </motion.div>
  );
}

function Header({ announcementVisible, dark = false }) {
  const dropdowns = {
    Platform: [
      ["Agentic CRM", "Put agents to work across your revenue engine.", Bot],
      ["Workflows", "Automate every motion in your GTM system.", Workflow],
      ["Intelligence", "Ask questions and act on live context.", Sparkles],
    ],
    Resources: [
      ["Customers", "See how modern teams run on Attio.", Users],
      ["Changelog", "The latest product updates.", Zap],
      ["Developers", "API, SDK, MCP and documentation.", Code2],
    ],
  };

  return (
    <header className={`site-header ${announcementVisible ? "" : "announcement-gone"} ${dark ? "is-dark" : ""}`}>
      <div className="header-inner">
        <a href="#top" className="logo-link">
          <AttioMark />
        </a>
        <nav className="desktop-nav">
          {["Platform", "Resources"].map((item) => (
            <DropdownMenu key={item}>
              <DropdownMenuTrigger asChild>
                <button className="nav-link">
                  {item}
                  <ChevronDown size={14} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="nav-dropdown" align="start">
                {dropdowns[item].map(([title, body, Icon]) => (
                  <DropdownMenuItem asChild key={title}>
                    <a href="#platform">
                      <span className="drop-icon">
                        <Icon size={17} />
                      </span>
                      <span>
                        <strong>{title}</strong>
                        <small>{body}</small>
                      </span>
                      <ArrowRight size={13} />
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          <a className="nav-link" href="#customers">
            Customers
          </a>
          <a className="nav-link" href="#pricing">
            Pricing
          </a>
        </nav>
        <div className="header-actions">
          <Button>Sign in</Button>
          <Button dark>Start for free</Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <button className="mobile-toggle" aria-label="Toggle menu">
              <Menu />
            </button>
          </SheetTrigger>
          <SheetContent className="mobile-menu">
            <SheetTitle>
              <AttioMark />
            </SheetTitle>
            {["Platform", "Resources", "Customers", "Pricing"].map((item) => (
              <SheetClose asChild key={item}>
                <a href={`#${item.toLowerCase()}`}>
                  {item} <ChevronRight size={16} />
                </a>
              </SheetClose>
            ))}
            <div>
              <Button>Sign in</Button>
              <Button dark>Start for free</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function useLoopingElapsed(duration) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      setElapsed((Date.now() - startedAt) % duration);
    }, 55);

    return () => window.clearInterval(timer);
  }, [duration]);

  return elapsed;
}

function getTypedText(text, elapsed, start, duration) {
  const progress = Math.max(0, Math.min(1, (elapsed - start) / duration));
  return text.slice(0, Math.floor(text.length * progress));
}

function SlackLiveReply() {
  const elapsed = useLoopingElapsed(9800);
  const message = "GreenLeaf (verbal yes, no quote out) and Ramp (stalled in Legal 5d).";
  const typed = getTypedText(message, elapsed, 950, 3100);
  const isTyping = elapsed >= 950 && elapsed < 4050;
  const isResetting = elapsed > 9000;

  return (
    <div className={`slack-live-reply ${isResetting ? "is-resetting" : ""}`} aria-hidden="true">
      <span className="slack-live-avatar"><Sparkles size={9} /></span>
      <div>
        <p className="slack-live-meta">
          <b>Attio</b><span>APP</span><small>10:24</small>
        </p>
        {elapsed < 950 ? (
          <span className="slack-thinking"><i /><i /><i /></span>
        ) : (
          <p className="slack-live-copy">
            {typed}
            {isTyping && <i className="typing-caret" />}
          </p>
        )}
      </div>
    </div>
  );
}

function TerminalLive() {
  const elapsed = useLoopingElapsed(11800);
  const prompt = "Find yesterday's demo call and create the right follow-up task.";
  const answer = "Pulled the transcript, flagged a pricing objection, and queued the AE's follow-up.";
  const promptTyped = getTypedText(prompt, elapsed, 150, 2800);
  const answerTyped = getTypedText(answer, elapsed, 5550, 2700);
  const promptTyping = elapsed < 2950;
  const answerTyping = elapsed >= 5550 && elapsed < 8250;

  return (
    <div className={`terminal-live ${elapsed > 10900 ? "is-resetting" : ""}`} aria-hidden="true">
      <div className="terminal-live-prompt">
        <span>›</span>
        <b>{promptTyped}{promptTyping && <i className="terminal-caret" />}</b>
      </div>
      <div className={`terminal-live-commands ${elapsed >= 3150 ? "is-visible" : ""}`}>
        <p><i /> Ran 3 commands</p>
        <small className={elapsed >= 3500 ? "is-visible" : ""}>└ search-call-recordings-by-metadata</small>
        <small className={elapsed >= 3900 ? "is-visible" : ""}>└ get-call-recording</small>
        <small className={elapsed >= 4300 ? "is-visible" : ""}>└ create-task</small>
      </div>
      <div className={`terminal-live-answer ${elapsed >= 5350 ? "is-visible" : ""}`}>
        <i />
        <span>{answerTyped}{answerTyping && <em className="terminal-caret" />}</span>
      </div>
    </div>
  );
}

function HeroWorkspace() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const sceneScaleTarget = useTransform(scrollY, (value) => (value < 190 ? 0.9286 : 0.7143));
  const sceneScale = useSpring(sceneScaleTarget, { stiffness: 190, damping: 27, mass: 0.76 });
  const sceneLiftTarget = useTransform(scrollY, (value) => (value < 190 ? 0 : -20));
  const sceneLift = useSpring(sceneLiftTarget, { stiffness: 190, damping: 27, mass: 0.76 });
  const scenePointerEvents = useTransform(scrollY, (value) => (value >= 140 ? "auto" : "none"));
  const windowWidth = useTransform(sceneScale, (value) => `${value * 100}%`);
  const windowHeight = useTransform(sceneScale, (value) => `${value * 100}%`);
  const windowInset = useTransform(sceneScale, (value) => `${(1 - value) * 50}%`);
  const floatingOpacity = useTransform(scrollY, [0, 120, 225, 300], [0, 0, 1, 1]);

  return (
    <motion.div ref={ref} className="hero-stage" style={{ y: sceneLift }}>
      <div className="hero-aura" />
      <motion.div
        className="hero-window"
        style={{
          width: windowWidth,
          height: windowHeight,
          top: windowInset,
          left: windowInset,
          right: "auto",
          pointerEvents: scenePointerEvents,
        }}
        drag
        dragConstraints={{ left: -140, right: 140, top: -80, bottom: 110 }}
        dragElastic={0.06}
        dragMomentum={false}
        whileDrag={{ cursor: "grabbing", zIndex: 12 }}
        initial={{ opacity: 0, y: 90 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          className="hero-reference-main"
          src="/assets/hero-reference-main.png"
          alt="Attio workflow editor with run history"
          draggable="false"
        />
        <div className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <div className="crm-shell">
          <aside className="crm-sidebar">
            <div className="workspace-name">
              <span className="workspace-icon">⠿</span>
              Basepoint <ChevronDown size={13} />
            </div>
            <div className="quick-action">
              <Command size={14} /> Quick Actions <kbd>⌘K</kbd>
            </div>
            <div className="side-nav-list">
              <span><Inbox size={14} /> Home</span>
              <span><CircleHelp size={14} /> Notifications</span>
              <span><Check size={14} /> Tasks</span>
              <span>
                <Mail size={14} /> Notes
              </span>
              <span><Mic2 size={14} /> Calls</span>
              <span><BarChart3 size={14} /> Reports</span>
              <span><Bot size={14} /> Automations</span>
              <span><Send size={14} /> Sequences</span>
              <span className="active"><Workflow size={14} /> Workflows</span>
              <small>Lead workflows</small>
              <span><Layers3 size={14} /> Pipeline Deals</span>
              <span><Users size={14} /> Outreach</span>
            </div>
          </aside>
          <div className="crm-main">
            <div className="crm-topbar">
              <span>
                <Workflow size={15} /> Workflows <ChevronRight size={12} /> Smartflow
              </span>
              <div>
                <span className="avatar-stack">A</span>
                <span>Share</span>
                <CircleHelp size={14} />
                <button><Sparkles size={13} /> Ask Attio</button>
              </div>
            </div>
            <HeroWorkflowPreview />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="floating-card meeting-card"
        style={{ scale: sceneScale, opacity: floatingOpacity, pointerEvents: scenePointerEvents }}
        drag
        dragConstraints={{ left: -180, right: 420, top: -120, bottom: 250 }}
        dragElastic={0.06}
        dragMomentum={false}
        whileDrag={{ cursor: "grabbing", zIndex: 20 }}
      >
        <div className="hero-slack-snapshot">
          <div className="hero-card-titlebar">
            <div className="mini-dots"><i /><i /><i /></div>
          </div>
          <img src="/assets/hero-reference-slack.png" alt="Attio Slack pipeline assistant" draggable="false" />
        </div>
        <SlackLiveReply />
        <div className="mini-dots">
          <i />
          <i />
          <i />
        </div>
        <strong># pipeline</strong>
        <span>Today · 10:00</span>
        <div className="meeting-person">
          <img src={asset("5bce7e88098e3e9d", "jpg")} alt="" />
          <p>
            <b>@Attio</b>
            What deals should I focus on today?
          </p>
        </div>
        <div className="slack-bot">
          <Sparkles size={12} />
          <p><b>Attio</b> GreenLeaf and Ramp. Both need an owner action today.</p>
        </div>
      </motion.div>

      <motion.div
        className="floating-card terminal-card"
        style={{ scale: sceneScale, opacity: floatingOpacity, pointerEvents: scenePointerEvents }}
        drag
        dragConstraints={{ left: -180, right: 420, top: -250, bottom: 120 }}
        dragElastic={0.06}
        dragMomentum={false}
        whileDrag={{ cursor: "grabbing", zIndex: 20 }}
      >
        <img
          className="hero-card-snapshot"
          src="/assets/hero-reference-terminal.png"
          alt="Agent terminal completing a follow-up task"
          draggable="false"
        />
        <TerminalLive />
        <div className="terminal-top">
          <span>Claude Code</span>
          <MoreHorizontal size={13} />
        </div>
        <p className="terminal-prompt"><b>› Find yesterday&apos;s demo call and create the right follow-up task.</b></p>
        <div className="terminal-steps">
          <span><i /> Ran 3 commands</span>
          <small>└ search-call-recordings-by-metadata</small>
          <small>└ get-call-recording</small>
          <small>└ create-task</small>
        </div>
        <p className="bot-answer"><Sparkles size={11} /> Pulled the transcript, flagged pricing, and queued the AE follow-up.</p>
        <div className="terminal-input">›</div>
        <div className="terminal-model">▶ auto&nbsp;&nbsp; Opus 4.8 · 1M context</div>
      </motion.div>

      <motion.div
        className="floating-card video-card"
        style={{ scale: sceneScale, opacity: floatingOpacity, pointerEvents: scenePointerEvents }}
        drag
        dragConstraints={{ left: -420, right: 150, top: -140, bottom: 210 }}
        dragElastic={0.06}
        dragMomentum={false}
        whileDrag={{ cursor: "grabbing", zIndex: 20 }}
      >
        <img
          className="hero-card-snapshot"
          src="/assets/hero-reference-call.png"
          alt="GreenLeaf product demo transcript"
          draggable="false"
        />
        <video
          className="hero-live-video"
          src={asset("b898d9a1b9f9f548", "mp4")}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <span className="video-live-progress"><i /></span>
        <div className="mini-dots"><i /><i /><i /></div>
        <strong>Product Demo w/ GreenLeaf</strong>
        <video src={asset("b898d9a1b9f9f548", "mp4")} autoPlay muted loop playsInline />
        <div className="video-tabs"><span>Meeting</span><b>Transcript</b><span>Speakers</span></div>
        <p><b>Ashley</b> Everything&apos;s in spreadsheets right now. I&apos;d like the whole team moved over.</p>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <motion.a
        className="atlas-pill"
        href="#platform"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        GTM lessons from Elena Verna and more <ChevronRight size={14} />
      </motion.a>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Welcome to agentic revenue.
      </motion.h1>
      <motion.p
        className="hero-copy"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Attio is the CRM that builds pipeline, advances
        <br />
        deals, and grows accounts around the clock.
      </motion.p>
      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.42 }}
      >
        <Button>Talk to sales</Button>
        <Button dark>Start for free</Button>
      </motion.div>
      <HeroWorkspace />
    </section>
  );
}

function LogoWall() {
  return (
    <section className="logo-wall" aria-label="Customer logos">
      {customerLogos.map(([id, ext, name], index) => (
        <motion.div
          key={name}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: (index % 5) * 0.06 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <img src={asset(id, ext)} alt={name} />
        </motion.div>
      ))}
    </section>
  );
}

function PlatformIntro() {
  return (
    <section className="platform-intro grid-surface" id="platform">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }}>
        <span className="section-kicker">Platform</span>
        <h2>
          The intelligent system that never sleeps.
          <span> Picks up leads at 2am. Catches renewals before they slip. Hands you the answer before you ask.</span>
        </h2>
      </motion.div>
    </section>
  );
}

function DraggableCanvasTrack({ children, className = "", trackClassName = "", label = "Drag to explore" }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [dragLimit, setDragLimit] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const trackWidth = trackRef.current?.scrollWidth ?? 0;
      setDragLimit(Math.max(0, trackWidth - viewportWidth));
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (dragX.get() < -dragLimit) dragX.set(-dragLimit);
    if (dragLimit === 0) dragX.set(0);
  }, [dragLimit, dragX]);

  return (
    <div ref={viewportRef} className={`drag-viewport ${dragLimit > 1 ? "is-draggable" : ""} ${className}`}>
      <motion.div
        ref={trackRef}
        className={`drag-track ${trackClassName}`}
        drag={dragLimit > 1 ? "x" : false}
        dragConstraints={{ left: -dragLimit, right: 0 }}
        dragElastic={0.035}
        dragMomentum={false}
        style={{ x: dragX }}
        whileDrag={{ cursor: "grabbing" }}
      >
        {children}
      </motion.div>
      {dragLimit > 1 && label && (
        <motion.span
          className="drag-hint"
          initial={{ opacity: 0, x: 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <MousePointer2 size={13} /> {label}
        </motion.span>
      )}
    </div>
  );
}

function LeadTable() {
  return (
    <div className="ui-canvas table-canvas">
      <DraggableCanvasTrack trackClassName="table-track">
        <div className="table-stage">
          <div className="canvas-toolbar">
            <span>
              <Table2 size={16} /> Companies to work
            </span>
            <div>
              <span className="avatar-stack">A</span>
              <span className="avatar-stack violet">L</span>
              <span className="avatar-stack photo">M</span>
              <button>Share</button>
              <button className="ask-btn">
                <Sparkles size={13} /> Ask Attio
              </button>
            </div>
          </div>
          <div className="table-viewbar">
            <button>
              <Table2 size={14} /> All Companies <ChevronDown size={13} />
            </button>
            <button>
              <PanelLeft size={14} /> View settings <ChevronDown size={13} />
            </button>
          </div>
          <div className="data-table">
            <div className="data-head">
              <span>Company</span>
              <span>ICP Score</span>
              <span>Owner</span>
              <span>Research agent</span>
            </div>
            {pipelineCompanies.map(([name, score, owner, signal, image], index) => (
              <motion.div
                className="data-row"
                key={name}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.045 }}
                viewport={{ once: true }}
              >
                <span>
                  <img src={asset(image, "avif")} alt="" />
                  {name}
                </span>
                <span className="score">{score}</span>
                <span>{owner}</span>
                <span>{signal}</span>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="email-compose"
            initial={{ opacity: 0, scale: 0.96, x: 34 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ delay: 0.26, duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="compose-head">
              <span>
                <Mail size={15} /> Send follow up email to Maya White
              </span>
              <MoreHorizontal size={15} />
            </div>
            <div className="compose-summary">
              <small>Send email</small>
              <b>Send follow up email to Maya White</b>
              <p>The intro email ties Maya&apos;s new VP role, the Series C, and 14 open AE roles to faster hiring.</p>
            </div>
            <div className="compose-to">
              To <span>M</span> Maya White <small>CC / BCC</small>
            </div>
            <p>
              Hi Maya,
              <br />
              <br />
              Congrats on the new VP Sales role. With the Series C closed and 14 AE roles already open, Attio can
              help your team build faster.
              <br />
              <br />
              Best,
              <br />
              Daniel
            </p>
            <div className="compose-actions">
              <button className="send-button">Send email</button>
              <button>Discard</button>
              <button>Save draft</button>
            </div>
          </motion.div>
        </div>
      </DraggableCanvasTrack>
    </div>
  );
}

function WorkflowCanvasLegacy() {
  const nodes = [
    ["Trigger", "Record created", "New record created", Zap, "Triggered"],
    ["Web agent", "Web agent", "Enrich lead with web research", Globe2, "Completed"],
    ["Custom agent", "Custom agent", "Score lead for ICP fit", Bot, "Completed"],
    ["If", "If", "Route lead by segment", GitBranch, "Completed"],
    ["Sequence", "Enroll in sequence", "Enterprise sequence", Mail, "Completed"],
    ["Sequence", "Enroll in sequence", "SMB sequence", Mail, "Ready"],
  ];

  return (
    <div className="ui-canvas workflow-canvas">
      <DraggableCanvasTrack trackClassName="workflow-track" label="Drag the workflow">
        <svg className="workflow-connectors" viewBox="0 0 1380 655" aria-hidden="true">
          {[
            "M435 160 H630",
            "M900 160 H945 Q985 160 985 205 V300 Q985 330 950 330 H270 Q225 330 225 375 H135",
            "M405 390 H555",
            "M825 390 H970 Q1010 390 1010 420",
            "M825 410 H940 Q970 410 970 555 H1010",
          ].map((path, index) => (
            <motion.path
              key={path}
              d={path}
              fill="none"
              stroke={index === 4 ? "#cbd0d7" : "#2f83f6"}
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + index * 0.12, duration: 0.75 }}
            />
          ))}
        </svg>
        {nodes.map(([type, title, detail, Icon, status], index) => (
          <motion.div
            className={`workflow-node n${index + 1}`}
            key={`${title}-${detail}`}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.11, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="node-status">{status === "Triggered" ? "▷" : "✓"} {status}</span>
            <span className="node-icon">
              <Icon size={17} />
            </span>
            <small>{type}</small>
            <strong>{title}</strong>
            <p>{detail}</p>
            {index === 3 && (
              <span className="branch-labels">
                <b>True</b>
                <b>False</b>
              </span>
            )}
            <MoreHorizontal size={15} />
          </motion.div>
        ))}
      </DraggableCanvasTrack>
    </div>
  );
}

const workflowInitialNodes = [
  {
    id: "record",
    type: "attio",
    position: { x: 168, y: 95 },
    data: { type: "Trigger", title: "Record created", detail: "New record created", status: "Triggered", icon: Zap },
  },
  {
    id: "research",
    type: "attio",
    position: { x: 535, y: 95 },
    data: { type: "Web agent", title: "Web agent", detail: "Enrich lead with web research", status: "Completed", icon: Globe2 },
  },
  {
    id: "score",
    type: "attio",
    position: { x: 135, y: 330 },
    data: { type: "Custom agent", title: "Custom agent", detail: "Score lead for ICP fit", status: "Completed", icon: Bot },
  },
  {
    id: "route",
    type: "attio",
    position: { x: 480, y: 330 },
    data: { type: "If", title: "If", detail: "Route lead by segment", status: "Completed", icon: GitBranch, branch: true },
  },
  {
    id: "enterprise",
    type: "attio",
    position: { x: 820, y: 330 },
    data: { type: "Sequence", title: "Enroll in sequence", detail: "Enterprise sequence", status: "Completed", icon: Mail, terminal: true },
  },
  {
    id: "smb",
    type: "attio",
    position: { x: 820, y: 495 },
    data: { type: "Sequence", title: "Enroll in sequence", detail: "SMB sequence", status: "Ready", icon: Mail, terminal: true },
  },
];

const workflowInitialEdges = [
  { id: "record-research", source: "record", target: "research", type: "smoothstep" },
  { id: "research-score", source: "research", target: "score", type: "smoothstep" },
  { id: "score-route", source: "score", target: "route", type: "smoothstep" },
  { id: "route-enterprise", source: "route", sourceHandle: "true", target: "enterprise", type: "smoothstep" },
  { id: "route-smb", source: "route", sourceHandle: "false", target: "smb", type: "smoothstep", className: "muted-edge" },
].map((edge) => ({
  ...edge,
  style: { stroke: edge.className === "muted-edge" ? "#cbd0d7" : "#2f83f6", strokeWidth: 1.5 },
}));

function AttioWorkflowNode({ data }) {
  const Icon = data.icon;
  return (
    <div className={`workflow-flow-node ${data.branch ? "is-branch" : ""}`}>
      <span className={`node-status ${data.status === "Triggered" ? "is-trigger" : ""}`}>
        {data.status === "Triggered" ? "▷" : "✓"} {data.status}
      </span>
      <Handle className="attio-handle" type="target" position={Position.Left} />
      <span className="node-icon"><Icon size={17} /></span>
      <small>{data.type}</small>
      <strong>{data.title}</strong>
      <p>{data.detail}</p>
      <MoreHorizontal size={15} />
      {data.branch ? (
        <>
          <span className="flow-branch-label true">True</span>
          <span className="flow-branch-label false">False</span>
          <Handle className="attio-handle branch-true" id="true" type="source" position={Position.Right} />
          <Handle className="attio-handle branch-false" id="false" type="source" position={Position.Right} />
        </>
      ) : !data.terminal ? (
        <Handle className="attio-handle" type="source" position={Position.Right} />
      ) : null}
    </div>
  );
}

const workflowNodeTypes = { attio: AttioWorkflowNode };

const heroWorkflowNodes = workflowInitialNodes.slice(0, 5).map((node, index) => ({
  ...node,
  position: [
    { x: 52, y: 94 },
    { x: 345, y: 94 },
    { x: 70, y: 265 },
    { x: 360, y: 265 },
    { x: 650, y: 265 },
  ][index],
}));

const heroWorkflowEdges = workflowInitialEdges.slice(0, 4);

function HeroWorkflowPreview() {
  return (
    <div className="hero-workflow-preview">
      <div className="hero-flow-tabs">
        <span className="active">Editor</span>
        <span>Runs <b>13</b></span>
        <span>Settings</span>
        <button>Live</button>
        <button><Play size={11} /> Trigger manually</button>
      </div>
      <ReactFlow
        nodes={heroWorkflowNodes}
        edges={heroWorkflowEdges}
        nodeTypes={workflowNodeTypes}
        defaultViewport={{ x: 4, y: 20, zoom: 0.78 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#c8cdd4" gap={15} size={1} />
      </ReactFlow>
      <div className="hero-run-panel">
        <b>Run history</b>
        <span><i className="running" /> Run #14 <small>Running</small></span>
        <span><i /> Run #13 <small>Yesterday</small></span>
        <span><i className="done" /> Run #12 <small>4 days ago</small></span>
        <span><i /> Run #11 <small>4 days ago</small></span>
        <div className="run-overview">
          <small>Overview</small>
          <div><b>149</b><span>Completed</span></div>
          <div className="failed"><b>2</b><span>Failed</span></div>
        </div>
      </div>
    </div>
  );
}

function WorkflowCanvas() {
  const [nodes, , onNodesChange] = useNodesState(workflowInitialNodes);
  const [edges, , onEdgesChange] = useEdgesState(workflowInitialEdges);

  return (
    <div className="ui-canvas workflow-canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={workflowNodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultViewport={{ x: 0, y: 24, zoom: 1 }}
        minZoom={0.82}
        maxZoom={1.12}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#c8cdd4" gap={15} size={1} />
      </ReactFlow>
      <span className="drag-hint workflow-library-hint"><MousePointer2 size={13} /> Drag nodes or canvas</span>
    </div>
  );
}

const columns = [
  {
    name: "Discovery",
    color: "#ff9d45",
    cards: [
      ["Lumio AI", "Sep 30, 2026", "$20,800", "Amelia Carter", "Set Next step...", "12d"],
      ["Verda Labs", "Sep 10, 2026", "$36,400", "George Hall", "Scheduling demo", "15d"],
    ],
  },
  { name: "Demo", color: "#3478ef", cards: [["Pinevox", "Jul 20, 2026", "$11,000", "Rachel Adams", "Add note...", "9d"]] },
  {
    name: "Proposal",
    color: "#af7cff",
    cards: [
      ["Cortexa", "Aug 28, 2026", "$54,000", "Theo Marshall", "Demo went well, sending follow-up", "7d"],
      ["Driftwave", "Jul 31, 2026", "$31,200", "Nathan Cole", "Proposal sent, in procurement", "22d"],
      ["Synthred", "Aug 12, 2026", "$62,500", "Isla Harrington", "Security review underway", "25d"],
    ],
  },
  {
    name: "Negotiation",
    color: "#43cc87",
    cards: [
      ["Northpeak", "Jun 30, 2026", "$78,000", "Samuel", "Verbal yes, drafting contract", "31d"],
      ["Westwind", "Jul 8, 2026", "$26,400", "Paul", "Finalizing terms", "18d"],
    ],
  },
];

function KanbanCanvas() {
  return (
    <div className="ui-canvas kanban-canvas">
      <DraggableCanvasTrack trackClassName="kanban-track" label="">
        {columns.map((column) => (
          <div className="kanban-column" key={column.name}>
            <div className="kanban-heading">
              <i style={{ background: column.color }} />
              {column.name}
              <small>{column.cards.length}</small>
              <Plus size={13} />
            </div>
            {column.cards.map((card) => (
              <motion.div className="deal-card" key={card[0]} whileHover={{ y: -3, boxShadow: "0 12px 24px #18203312" }}>
                <strong><HeartHandshake size={14} /><u>{card[0]}</u></strong>
                <span>
                  <CalendarDays size={14} /> {card[1]}
                </span>
                <span>
                  <CircleDollarSign size={14} /> <em>USD</em> <b>{card[2]}</b>
                </span>
                <span>
                  <Users size={14} /><span className="tiny-avatar">{card[3][0]}</span> {card[3]}
                </span>
                <p><Table2 size={14} /> {card[4]}</p>
                <div className="deal-icons">
                  <span><File size={14} /><SquareCheckBig size={14} /><MessageCircle size={14} /></span>
                  <small><Clock3 size={14} /> {card[5]}</small>
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </DraggableCanvasTrack>
    </div>
  );
}

function ForecastCanvas() {
  return (
    <div className="ui-canvas forecast-canvas">
      <motion.div
        className="question-bubble"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        What is the estimate of this week’s closed-won deal value
      </motion.div>
      <motion.div
        className="answer-window"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.18 }}
      >
        <div className="thinking-line">
          <Sparkles size={14} />
          <span>2 tools used</span>
        </div>
        <p>
          Let me query for deals that are either Closed-Won this week, or have an estimated close date this week.
        </p>
        <div className="tool-strip">
          <Search size={13} /> Attributes searched: <b>19 results</b>
        </div>
        <div className="tool-strip">
          <Database size={13} /> SQL query executed: <b>1452 rows in 6.2s</b>
        </div>
        <pre>{`SQL

SELECT
  record_id,
  name,
  value AS deal_value,
  closed_won_date,
  estimated_close_date,
  (stage).title AS stage
FROM deals
WHERE
  (
    -- Closed-Won this week (week of June 15-21, 2026)
    closed_won_date >= '2026-06-15'
    AND closed_won_date <= '2026-06-21'
  )
  OR
  (
    estimated_close_date >= '2026-06-15'
    AND estimated_close_date <= '2026-06-21'
  );`}</pre>
      </motion.div>
    </div>
  );
}

function BarChart() {
  const values = [
    [68, 18, 8],
    [63, 20, 10],
    [55, 22, 11],
    [48, 18, 13],
    [72, 15, 7],
  ];
  return (
    <div className="bar-chart">
      <div className="chart-legend">
        <span>
          <i className="healthy" /> Healthy
        </span>
        <span>
          <i className="watch" /> Watch
        </span>
        <span>
          <i className="risk" /> At risk
        </span>
      </div>
      <div className="bars">
        {values.map((parts, i) => (
          <div className="bar-wrap" key={i}>
            <motion.div
              className="bar"
              initial={{ height: 0 }}
              whileInView={{ height: `${parts.reduce((a, b) => a + b, 0)}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
            >
              <i className="healthy" style={{ flex: parts[0] }} />
              <i className="watch" style={{ flex: parts[1] }} />
              <i className="risk" style={{ flex: parts[2] }} />
            </motion.div>
            <span>{["Jan", "Feb", "Mar", "Apr", "May"][i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RetentionCanvasLegacy() {
  return (
    <div className="ui-canvas retention-canvas">
      <div className="metrics-panel">
        <div className="line-chart-card">
          <span>Book Size · ARR</span>
          <div className="line-chart">
            <svg viewBox="0 0 500 130" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fillBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#278cff" stopOpacity=".25" />
                  <stop offset="1" stopColor="#278cff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 106 C80 106, 100 92, 160 91 S250 82, 300 66 S420 52, 500 24 V130 H0Z" fill="url(#fillBlue)" />
              <motion.path
                d="M0 106 C80 106, 100 92, 160 91 S250 82, 300 66 S420 52, 500 24"
                fill="none"
                stroke="#278cff"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />
            </svg>
          </div>
        </div>
        <div className="health-card">
          <span>Account Health</span>
          <BarChart />
        </div>
      </div>
      <motion.div
        className="risk-answer"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <span className="tools-used">
          <Sparkles size={13} /> 2 tools used
        </span>
        <p>Here are the top 5 accounts at risk that CS should prioritize this week:</p>
        {[
          ["Brightloop", "$107,000 ARR", "Last two invoices failed in Stripe. Logins down 40%."],
          ["Vela", "$86,000 ARR", "Subscription past due. Renewal is two weeks out."],
          ["Sierra", "$72,000 ARR", "Executive sponsor changed roles last week."],
        ].map(([name, arr, text], i) => (
          <div className="risk-item" key={name}>
            <b>
              {i + 1}. {name} — {arr}
            </b>
            <span>High</span>
            <p>{text}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function PremiumBarChartLegacy() {
  const values = [
    [45, 18, 27],
    [49, 20, 19],
    [49, 14, 15],
    [59, 6, 10],
    [78, 6, 8],
  ];

  return (
    <div className="bar-chart premium-bar-chart">
      <div className="chart-legend">
        <span><i className="healthy" /> Healthy</span>
        <span><i className="watch" /> Watch</span>
        <span><i className="risk" /> At risk</span>
      </div>
      <div className="bar-plot">
        <div className="chart-y-axis">
          {["100", "80", "60", "40", "20", "0"].map((value) => <span key={value}>{value}</span>)}
        </div>
        <div className="bars">
          {values.map((parts, index) => (
            <div className="bar-wrap" key={index}>
              <motion.div
                className="bar"
                initial={{ height: 0 }}
                whileInView={{ height: `${parts.reduce((total, value) => total + value, 0)}%` }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <i className="healthy" style={{ flex: parts[0] }} />
                <i className="watch" style={{ flex: parts[1] }} />
                <i className="risk" style={{ flex: parts[2] }} />
              </motion.div>
              <span>{["Jan", "Feb", "Mar", "Apr", "May"][index]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const retentionLineData = [
  { quarter: "Q1", us: 0.42, emea: 0.34 },
  { quarter: "Q2", us: 0.5, emea: 0.38 },
  { quarter: "Q3", us: 0.58, emea: 0.41 },
  { quarter: "Q4", us: 0.68, emea: 0.45 },
  { quarter: "Q1 ", us: 1.0, emea: 0.9 },
  { quarter: "Q2 ", us: 1.16, emea: 0.88 },
];

const retentionHealthData = [
  { month: "Jan", healthy: 45, watch: 18, risk: 27 },
  { month: "Feb", healthy: 49, watch: 20, risk: 19 },
  { month: "Mar", healthy: 49, watch: 14, risk: 15 },
  { month: "Apr", healthy: 59, watch: 6, risk: 10 },
  { month: "May", healthy: 78, watch: 6, risk: 8 },
];

function RetentionLineChart() {
  return (
    <div className="line-chart recharts-line-chart">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={retentionLineData} margin={{ top: 8, right: 5, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="rechartsBlueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2d73ef" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#2d73ef" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#e8ebef" />
          <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fill: "#737a85", fontSize: 10 }} />
          <YAxis
            domain={[0, 1.4]}
            ticks={[0, 0.7, 1.4]}
            axisLine={false}
            tickLine={false}
            width={38}
            tick={{ fill: "#858b94", fontSize: 10 }}
            tickFormatter={(value) => `${value.toFixed(1)}m`}
          />
          <Area type="monotone" dataKey="us" stroke="#2d73ef" strokeWidth={3} fill="url(#rechartsBlueFill)" isAnimationActive />
          <Area type="monotone" dataKey="emea" stroke="#4bcf93" strokeWidth={3} fill="transparent" isAnimationActive />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function PremiumBarChart() {
  return (
    <div className="bar-chart premium-bar-chart">
      <div className="chart-legend">
        <span><i className="healthy" /> Healthy</span>
        <span><i className="watch" /> Watch</span>
        <span><i className="risk" /> At risk</span>
      </div>
      <div className="recharts-bar-plot">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={retentionHealthData} margin={{ top: 10, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#e6e9ed" strokeDasharray="4 4" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#575e68", fontSize: 10 }} />
            <YAxis domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} axisLine={false} tickLine={false} tick={{ fill: "#575e68", fontSize: 10 }} />
            <Bar dataKey="risk" stackId="health" fill="#ff5658" isAnimationActive />
            <Bar dataKey="watch" stackId="health" fill="#f5a400" isAnimationActive />
            <Bar dataKey="healthy" stackId="health" fill="#2d70eb" radius={[3, 3, 0, 0]} isAnimationActive />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function RetentionCanvas() {
  const risks = [
    {
      name: "Brightloop",
      arr: "$107,000 ARR",
      signal: "Last two invoices failed in Stripe. Logins down 40% over 30 days.",
      action: "Named T0 — Reach out today to fix the billing file and check whether the usage drop signals broader risk.",
    },
    {
      name: "Vela",
      arr: "$86,000 ARR",
      signal: "Subscription past due. Renewal is two weeks out, with no renewal call booked.",
      action: "Named T1 — Confirm renewal intent and clear the past-due balance before June 30.",
    },
    {
      name: "Sierra",
      arr: "$72,000 ARR",
      signal: "Executive sponsor changed roles last week and product usage is cooling.",
      action: "Named T1 — Map the new buyer and schedule an executive alignment call.",
    },
  ];

  return (
    <div className="ui-canvas retention-canvas">
      <DraggableCanvasTrack trackClassName="retention-track" label="Drag the report">
        <div className="metrics-panel">
          <div className="line-chart-card">
            <div className="chart-card-title">
              <span>Book Size · ARR</span>
              <CircleHelp size={13} />
              <MoreHorizontal size={16} />
            </div>
            <div className="line-legend">
              <span><i className="us" /> US</span>
              <span><i className="emea" /> EMEA</span>
            </div>
            <RetentionLineChart />
          </div>
          <div className="health-card">
            <div className="chart-card-title">
              <span>Account Health</span>
              <CircleHelp size={13} />
              <MoreHorizontal size={16} />
            </div>
            <PremiumBarChart />
          </div>
        </div>
        <motion.div
          className="risk-answer"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="tools-used">
            <Sparkles size={15} /> 2 tools used <ChevronDown size={13} />
          </span>
          <p>Here are the top 5 accounts at risk that CS should prioritize this week:</p>
          {risks.map((risk, index) => (
            <div className="risk-item" key={risk.name}>
              <h5>{index + 1}. {risk.name} — {risk.arr} <span><i /> High</span></h5>
              <div className="risk-company"><Database size={14} /> {risk.name}</div>
              <ul>
                <li><b>Risk Signals:</b> {risk.signal}</li>
                <li><b>CSM Tier:</b> {risk.action}</li>
              </ul>
            </div>
          ))}
        </motion.div>
      </DraggableCanvasTrack>
    </div>
  );
}

function FeatureSection({ item, title, visual, children, onActive }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 88%", "end 12%"],
  });
  const headingY = useTransform(scrollYProgress, [0, 0.14, 0.72, 1], [42, 0, 0, -28]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.1, 0.78, 1], [0.2, 1, 1, 0.55]);
  const visualY = useTransform(scrollYProgress, [0, 0.2, 0.76, 1], [110, 0, 0, -45]);
  const visualScale = useTransform(scrollYProgress, [0, 0.18, 0.8, 1], [0.975, 1, 1, 0.99]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.12, 0.86, 1], [0.25, 1, 1, 0.8]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onActive(item.id);
      },
      { rootMargin: "-35% 0px -45% 0px" },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [item.id, onActive]);

  return (
    <article id={item.id} className="feature-article" ref={sectionRef}>
      <div className="feature-heading">
        <motion.h3 style={{ y: headingY, opacity: headingOpacity }}>
          {title}
        </motion.h3>
      </div>
      <motion.div
        className={`feature-visual-shell feature-visual-${item.id}`}
        style={{ y: visualY, scale: visualScale, opacity: visualOpacity }}
      >
        {visual}
      </motion.div>
      {children && <div className="feature-details">{children}</div>}
    </article>
  );
}

const outreachTargets = [
  ["Granola", "Raised $125M Series C", "2a17146b8a96ee50"],
  ["Harvey", "Building out its sales team", "0abf550c61dce997"],
  ["Notion", "New VP Sales from enterprise SaaS", "f94a9b7544eb582f"],
  ["OpenAI", "Scaling faster than it can hire", "c15e984ac1912df0"],
  ["Browserbase", "Doubling down on enterprise sales", "1f7da6673743e381"],
  ["Cursor", "GTM reset under a new CRO", "ee7e3add0264ac96"],
];

function PipelineResearchDemo() {
  const elapsed = useLoopingElapsed(8200);
  const query = "Show me outreach targets";
  const isTyping = elapsed >= 700 && elapsed < 2350;
  const isReady = elapsed >= 2350 && elapsed < 2700;
  const showResults = elapsed >= 2700 && elapsed < 7500;
  const typedQuery = getTypedText(query, elapsed, 700, 1500);

  return (
    <div className="pipeline-research-stage" aria-label="Animated outreach research">
      <div className={`pipeline-query ${isTyping || isReady ? "is-active" : ""}`}>
        <span className={isTyping || isReady ? "has-query" : ""}>
          {isTyping || isReady ? typedQuery : "Ask something..."}
          {isTyping && <i className="typing-caret" />}
        </span>
        <span className={`pipeline-query-send ${isReady ? "is-ready" : ""}`} aria-hidden="true">
          <ArrowRight size={15} />
        </span>
      </div>
      <AnimatePresence>
        {showResults && (
          <motion.div
            className="outreach-results"
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="outreach-results-label">10 accounts ready for outreach</span>
            <ul>
              {outreachTargets.map(([name, signal, image], index) => (
                <motion.li
                  key={name}
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.055, duration: 0.32 }}
                >
                  <span className="outreach-company-logo">
                    <img src={asset(image, "avif")} alt="" />
                  </span>
                  <strong>{name}</strong>
                  <small>{signal}</small>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PipelineRadar() {
  return (
    <div className="pipeline-radar-stage" aria-label="Animated lead qualification signals">
      <svg className="pipeline-radar" viewBox="0 0 320 320" aria-hidden="true">
        <circle className="radar-ring radar-ring-outer" cx="160" cy="160" r="148" />
        <circle className="radar-ring radar-ring-inner" cx="160" cy="160" r="100" />
        <circle className="radar-core" cx="160" cy="160" r="56" />
        <g className="radar-mark" transform="translate(139 141)">
          <polygon points="6,0 17,0 10,19 0,19" />
          <polygon points="19,5 28,5 23,19 14,19" />
          <polygon points="30,10 39,10 35,19 26,19" />
        </g>
        <g className="radar-chip radar-chip-one">
          <rect x="39.5" y="94" width="71" height="26" rx="9" />
          <text x="75" y="107">ICP: 98</text>
        </g>
        <g className="radar-chip radar-chip-two">
          <rect x="229" y="46" width="78" height="26" rx="9" />
          <text x="268" y="59">New Exec</text>
        </g>
        <g className="radar-chip radar-chip-three">
          <rect x="2.5" y="255" width="151" height="26" rx="9" />
          <text x="78" y="268">Warm intro via a16z</text>
        </g>
        <g className="radar-chip radar-chip-four">
          <rect x="194" y="268" width="104" height="26" rx="9" />
          <text x="246" y="281">$5B Series H</text>
        </g>
      </svg>
    </div>
  );
}

const motionContacts = [
  ["M", "#9b69ff", "Michael James", "VP Sales at Cortexa", "michael@cortexa.ai", "+3", "San Francisco, California", "Cortexa", "4", "1d"],
  ["S", "#ec6d9e", "Sarah Chen", "Head of Growth at Northgate", "sarah@northgate.io", "+2", "New York, New York", "Northgate", "6", "2d"],
  ["D", "#4f8df7", "David Okafor", "CTO at Fairwind", "david@fairwind.dev", "+5", "Austin, Texas", "Fairwind", "3", "4h"],
  ["E", "#ef9c43", "Elena Rossi", "RevOps Lead at Goldcrest", "elena@goldcrest.co", "+1", "London, United Kingdom", "Goldcrest", "8", "3d"],
].map(([initial, color, name, role, email, extra, city, company, messages, age]) => ({
  initial, color, name, role, email, extra, city, company, messages, age,
}));

function MotionContactCard({ contact }) {
  return (
    <div className="motion-contact-card">
      <div className="motion-contact-name">
        <span style={{ backgroundColor: contact.color }}>{contact.initial}</span>
        <strong>{contact.name}</strong>
      </div>
      <div className="motion-contact-row">
        <Users size={14} />
        <span>{contact.role}</span>
      </div>
      <div className="motion-contact-row is-email">
        <Mail size={14} />
        <span>{contact.email}</span>
        <b>{contact.extra}</b>
      </div>
      <div className="motion-contact-row">
        <MapPin size={14} />
        <span>{contact.city}</span>
      </div>
      <div className="motion-contact-row">
        <Box size={14} />
        <span>{contact.company}</span>
      </div>
      <div className="motion-contact-meta">
        <span><MessageCircle size={14} /> {contact.messages}</span>
        <span>⌁</span>
        <span>↗</span>
        <span>{contact.age} <Clock3 size={14} /></span>
      </div>
    </div>
  );
}

function MotionContactCardAccurate({ contact }) {
  return (
    <div className="motion-contact-card">
      <div className="motion-contact-name">
        <span style={{ backgroundColor: contact.color }}>{contact.initial}</span>
        <strong>{contact.name}</strong>
      </div>
      <div className="motion-contact-row">
        <Users size={14} />
        <span>{contact.role}</span>
      </div>
      <div className="motion-contact-row is-email">
        <Mail size={14} />
        <span>{contact.email}</span>
        <b>{contact.extra}</b>
      </div>
      <div className="motion-contact-row">
        <MapPin size={14} />
        <span>{contact.city}</span>
      </div>
      <div className="motion-contact-row">
        <Box size={14} />
        <span>{contact.company}</span>
      </div>
      <div className="motion-contact-meta">
        <span><File size={14} /> {contact.messages}</span>
        <span><SquareCheckBig size={14} /></span>
        <span><MessageCircle size={14} /></span>
        <span><Clock3 size={14} /> {contact.age}</span>
      </div>
    </div>
  );
}

function MotionContactStack() {
  const elapsed = useLoopingElapsed(9800);
  const active = Math.floor(elapsed / 2450) % motionContacts.length;
  const visible = [0, 1, 2].map((depth) => motionContacts[(active + depth) % motionContacts.length]);

  return (
    <div className="motion-contact-stage" aria-label="Animated contact changes">
      <div className="motion-contact-stack">
        <AnimatePresence mode="popLayout">
          {visible.map((contact, depth) => (
            <motion.div
              className="motion-contact-layer"
              key={contact.name}
              initial={{ opacity: 0, scale: 0.9, rotate: 7, filter: "blur(2px)" }}
              animate={{
                opacity: 1,
                scale: 1 - depth * 0.025,
                rotate: depth * 2.5,
                filter: "blur(0px)",
                zIndex: 30 - depth * 10,
              }}
              exit={{ opacity: 0, y: -22, rotate: -2, filter: "blur(2px)", zIndex: 40 }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
            >
              <MotionContactCardAccurate contact={contact} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ReviewBriefingDemo() {
  const elapsed = useLoopingElapsed(9200);
  const showBriefing = elapsed >= 1450 && elapsed < 8300;

  return (
    <div className="review-briefing-stage" aria-label="Animated deal risk briefing">
      <div className="review-card-stack">
        <span className="review-card-back" />
        <span className="review-card-middle" />
        <div className="review-card">
          <div className="review-thinking">
            <span>Thinking<i>Thinking</i></span>
            <ChevronRight size={14} />
          </div>
          <div className="review-answer-window">
            <AnimatePresence>
              {showBriefing && (
                <motion.div
                  className="review-answer"
                  initial={{ opacity: 0, y: 12, clipPath: "inset(0 0 100% 0)" }}
                  animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                  exit={{ opacity: 0, y: 7, clipPath: "inset(0 0 100% 0)" }}
                  transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p>🚨 Deals at Risk</p>
                  <p>These are in late stages but showing warning signs:</p>
                  <ul>
                    <li><b>Forage</b> - Negotiation, $29,288. Close date passed today with no signature. Jordan asked for a demo to share internally, a sign a new stakeholder needs convincing.</li>
                    <li><b>Helix</b> - Procurement/Signing, $18,280. Unsigned since June 1 despite a June 15 follow-up. Stalling in legal.</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

const retentionSignals = [
  { initial: "D", color: "#b8794d", name: "Drew Austin", label: "Changed roles", value: "Head of IT", tone: "neutral" },
  { initial: "G", color: "#22b879", name: "GreenLeaf", label: "New funding round", value: "$250M", tone: "purple" },
  { initial: "J", color: "#2879e8", name: "Joshua Reed", label: "Upcoming renewal date", value: "Joshua to send documentation on the renewal", tone: "neutral" },
  { initial: "M", color: "#9b69e8", name: "Maya Lin", label: "Usage spike", value: "+42% seats", tone: "green" },
];

const retentionSuggestions = [
  {
    title: "Ahead of your renewal",
    avatars: ["J", "P"],
    body: "Hi Joshua, your renewal is coming up at the end of the month. Happy to review usage together beforehand and make sure the plan still fits where the team is headed.",
  },
  {
    title: "Looking for more seats?",
    avatars: ["M", "E"],
    body: "Hi Marcus, saw Quanta's usage jumped 42% this month. Looks like the team is scaling fast. Happy to add more seats whenever you're ready.",
  },
  {
    title: "A new chapter at GreenLeaf",
    avatars: ["D", "A"],
    body: "Hi Drew, congratulations on the new role. I pulled together the account context and next steps so your team can keep moving without missing a beat.",
  },
];

function RetentionSignalRail() {
  const loop = [...retentionSignals, ...retentionSignals];
  return (
    <div className="retention-signal-stage" aria-label="Account signals updating">
      <div className="retention-signal-track">
        {loop.map((signal, index) => (
          <div className="retention-signal-item" key={`${signal.name}-${index}`}>
            <div className="retention-signal-person">
              <span style={{ backgroundColor: signal.color }}>{signal.initial}</span>
              <strong>{signal.name}</strong>
            </div>
            <div className="retention-signal-card">
              <small>{signal.label} <CircleHelp size={12} /></small>
              <b className={`is-${signal.tone}`}>{signal.value}</b>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RetentionSuggestionRail() {
  const loop = [...retentionSuggestions, ...retentionSuggestions];
  return (
    <div className="retention-suggestion-stage" aria-label="Email suggestions updating">
      <div className="retention-suggestion-track">
        {loop.map((suggestion, index) => (
          <div className="retention-suggestion-item" key={`${suggestion.title}-${index}`}>
            <div className="retention-suggestion-card">
              <small>Email suggestion</small>
              <div className="retention-suggestion-title">
                <b>{suggestion.title}</b>
                <span>
                  {suggestion.avatars.map((avatar, avatarIndex) => (
                    <i key={avatarIndex}>{avatar}</i>
                  ))}
                </span>
              </div>
              <p>{suggestion.body}</p>
            </div>
            <div className="retention-suggestion-actions">
              <Copy size={14} />
              <ThumbsUp size={14} />
              <ThumbsDown size={14} />
              <RotateCw size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Showcase() {
  const [active, setActive] = useState("pipeline");
  return (
    <section className="showcase grid-surface">
      <aside className="showcase-nav">
        {showcase.map((item) => (
          <a href={`#${item.id}`} className={active === item.id ? "active" : ""} key={item.id}>
            {item.label}
          </a>
        ))}
      </aside>
      <div className="showcase-content">
        <FeatureSection
          item={showcase[0]}
          onActive={setActive}
          title={
            <>
              Your team, amplified. <span>Agents prospect and reach out when buyers are looking, building a pipeline of deals ready to win.</span>
            </>
          }
          visual={<LeadTable />}
        >
          <div className="feature-split pipeline-feature-split">
            <div className="pipeline-detail-panel">
              <div className="pipeline-detail-copy">
                <h4>Free your reps to sell.</h4>
                <p>Agents handle the research and busywork. Reps focus their time where deals get won.</p>
              </div>
              <PipelineResearchDemo />
            </div>
            <div className="pipeline-detail-panel">
              <div className="pipeline-detail-copy">
                <h4>Agents dig. You close.</h4>
                <p>Every lead is enriched and qualified, so reps know when and why to engage.</p>
              </div>
              <PipelineRadar />
            </div>
          </div>
        </FeatureSection>

        <FeatureSection
          item={showcase[1]}
          onActive={setActive}
          title={
            <>
              Speed to lead, every time. <span>New leads get enriched, scored, and routed to the right rep before they ever cool off.</span>
            </>
          }
          visual={<WorkflowCanvas />}
        />

        <FeatureSection
          item={showcase[2]}
          onActive={setActive}
          title={
            <>
              Run every motion, your way. <span>Pipeline built for how you sell, while agents brief the meetings and keep deals moving.</span>
            </>
          }
          visual={<KanbanCanvas />}
        >
          <div className="feature-split motions-feature-split">
            <div>
              <div className="motions-detail-copy">
                <h4>Catch changes to the deal.</h4>
                <p>Spot new stakeholders, competitor moves, and stalls before your next call.</p>
              </div>
              <div className="contact-card">
                <span className="contact-avatar">M</span>
                <b>Michael James</b>
                <small>VP Sales at Cortexa</small>
                <span>michael@cortexa.ai · +3</span>
                <span>San Francisco, California</span>
              </div>
              <MotionContactStack />
            </div>
            <div>
              <div className="motions-detail-copy">
                <h4>Skip the review scramble.</h4>
                <p>Walk in with quota coverage, deal velocity, and potential risks already mapped.</p>
              </div>
              <div className="thinking-card">
                <span>Thinking</span>
                <i />
                <i />
                <i />
              </div>
              <ReviewBriefingDemo />
            </div>
          </div>
        </FeatureSection>

        <FeatureSection
          item={showcase[3]}
          onActive={setActive}
          title={
            <>
              For the people who own the number. <span>Ask any revenue question. From the weekly forecast to performance by rep, get the answer in seconds.</span>
            </>
          }
          visual={<ForecastCanvas />}
        />

        <FeatureSection
          item={showcase[4]}
          onActive={setActive}
          title={
            <>
              Keep more. Grow more. <span>Agents track the whole book, so you save what&apos;s slipping and grow what&apos;s rising.</span>
            </>
          }
          visual={<RetentionCanvas />}
        >
          <div className="feature-split retain-split">
            <div>
              <h4>Spot the shift early.</h4>
              <p>Whether an account&apos;s climbing or cooling, you&apos;ll know weeks before the call.</p>
              <RetentionSignalRail />
              <div className="signal-list">
                <span>
                  <b>D</b> Drew Austin <small>Changed roles</small>
                </span>
                <span>
                  <b>G</b> GreenLeaf <small>New funding round · $250M</small>
                </span>
                <span>
                  <b>J</b> Joshua Reed <small>Upcoming renewal date</small>
                </span>
              </div>
            </div>
            <div>
              <h4>The move&apos;s ready. You make the call.</h4>
              <p>Save, upsell, or renewal, agents draft the play for you to approve and run.</p>
              <RetentionSuggestionRail />
              <div className="suggestion-card">
                <small>Email suggestion</small>
                <b>Looking for more seats?</b>
                <p>Hi Marcus, saw Quanta&apos;s usage jumped 42% this month. Looks like the team is scaling fast.</p>
              </div>
            </div>
          </div>
        </FeatureSection>
      </div>
    </section>
  );
}

function ProfileWorkspace() {
  return (
    <div className="profile-workspace">
      <aside className="profile-workspace-sidebar">
        <img src={asset("59f51cb319310ca6", "avif")} alt="Sarah Johnson" />
        <h3>Sarah Johnson</h3>
        <div className="profile-workspace-actions">
          <button><Mail size={15} /> Compose email</button>
          <button aria-label="Add note"><File size={15} /></button>
          <button aria-label="Create task"><SquareCheckBig size={15} /></button>
          <button aria-label="Start sequence"><Send size={15} /></button>
          <button aria-label="More options"><MoreHorizontal size={15} /></button>
        </div>
        <p className="profile-workspace-label"><ChevronDown size={13} /> Details</p>
        <dl>
          <dt><File size={14} /> Name</dt><dd>Sarah Johnson</dd>
          <dt><File size={14} /> Description</dt><dd>Head of IT at GreenLeaf Inc.</dd>
          <dt><Mail size={14} /> Email</dt><dd><a href="#context">sarah@greenleaf.com</a></dd>
          <dt><MapPin size={14} /> Location</dt><dd>San Francisco, CA</dd>
          <dt><Box size={14} /> Company</dt><dd>GreenLeaf Inc.</dd>
          <dt><Clock3 size={14} /> Last interaction</dt><dd>6 hours ago</dd>
        </dl>
      </aside>

      <main className="profile-workspace-main">
        <header><Sparkles size={16} /> Highlights</header>
        <div className="profile-highlight-grid">
          <article className="profile-summary-card">
            <small>Summary <Sparkles size={14} /></small>
            <p>Sarah Johnson, the Head of IT, is leading the initiative to modernize their data infrastructure, which aligns with GreenLeaf&apos;s growth and sustainability goals.</p>
          </article>
          <article className="profile-linkedin-card">
            <small>LinkedIn <Linkedin size={14} /></small>
            <a href="#context">sarahjohnson</a>
          </article>
        </div>
        <div className="profile-metric-grid">
          <article>
            <small>Upcoming <CalendarDays size={14} /></small>
            <b>Demo Call</b>
            <span>Aug 29, 10:40 AM</span>
          </article>
          <article>
            <small>Company <Box size={14} /></small>
            <b>GreenLeaf Inc.</b>
            <span>San Francisco, CA</span>
          </article>
          <article>
            <small>Sales Outreach <Send size={14} /></small>
            <b>Step 2 <em>Automated email</em></b>
            <i><span /></i>
          </article>
        </div>
        <h3 className="profile-activity-title"><Zap size={15} /> Activity <ChevronRight size={14} /></h3>
        <div className="profile-activity-list">
          <div><span className="is-photo">M</span><p><b>Michael Chang</b> attended an <u>in-person meeting</u></p><small>6 hours ago</small></div>
          <div><span className="is-photo">S</span><p><b>Sarah Johnson</b> attended an <u>event</u></p><small>2 days ago</small></div>
          <div><span className="is-photo">M</span><p><b>Michael Chang</b> made an <u>outbound phone call</u></p><small>4 days ago</small></div>
        </div>
      </main>
    </div>
  );
}

function SelfBuilding() {
  return (
    <section className="self-building grid-surface">
      <motion.div className="self-heading" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <span className="section-kicker">Self-building</span>
        <h2>
          Live from day one. <span>Connect your inbox and calendar. Attio learns your business and builds itself around it, before your first agent even gets to work.</span>
        </h2>
        <Button>Start for free</Button>
      </motion.div>
      <motion.div
        className="profile-ui"
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      >
        <ProfileWorkspace />
        <aside>
          <img src={asset("59f51cb319310ca6", "jpg")} alt="" />
          <b>Sarah Johnson</b>
          <button>
            <Mail size={13} /> Compose email
          </button>
          <dl>
            <dt>Position</dt>
            <dd>Head of IT at GreenLeaf Inc.</dd>
            <dt>Email</dt>
            <dd>sarah@greenleaf.com</dd>
            <dt>Location</dt>
            <dd>San Francisco, CA</dd>
            <dt>Company</dt>
            <dd>GreenLeaf Inc.</dd>
          </dl>
        </aside>
        <main>
          <div className="profile-tabs">
            <span className="active">Highlights</span>
            <span>Summary</span>
          </div>
          <h4>Summary</h4>
          <p>
            Sarah Johnson, the Head of IT, is leading the initiative to modernize their data infrastructure, which
            aligns with GreenLeaf&apos;s growth and sustainability goals.
          </p>
          <div className="profile-grid">
            <div>
              <small>Upcoming</small>
              <b>Demo Call</b>
              <span>Aug 29, 10:40 AM</span>
            </div>
            <div>
              <small>Company</small>
              <b>GreenLeaf Inc.</b>
              <span>San Francisco, CA</span>
            </div>
            <div>
              <small>Sales Outreach</small>
              <b>Step 2</b>
              <span>Automated email</span>
            </div>
          </div>
          <h4>Activity</h4>
          <div className="activity-line">
            <span>M</span>
            <p>
              <b>Michael Chang</b> attended an in-person meeting
            </p>
            <small>6 hours ago</small>
          </div>
          <div className="activity-line">
            <span>S</span>
            <p>
              <b>Sarah Johnson</b> attended an event
            </p>
            <small>2 days ago</small>
          </div>
        </main>
        <aside className="profile-links">
          <small>LinkedIn</small>
          <a href="#context">sarahjohnson</a>
          <small>Last contacted</small>
          <span>Aug 24, 2026</span>
          <div className="sequence-progress">
            <Check size={13} />
            Step 2 Automated email
          </div>
        </aside>
      </motion.div>
    </section>
  );
}

const contextItems = [
  ["It logs itself.", "Emails, calls, product, billing, captured automatically.", Inbox],
  ["Your tools finally talk.", "Granola, Slack, your whole stack, always in sync.", Network],
  ["Gets to know you.", "So each play is sharper than the last.", Sparkles],
  ["Ask, and it’s there.", "Any record, any answer, in a second.", MessageCircle],
  ["No agent left guessing.", "Working from the same facts as your team.", Bot],
];

function ContextSection() {
  return (
    <section className="context-dark" id="context">
      <div className="context-story">
        <div className="context-grid">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          The only CRM with
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
        >
          Universal Context<sup>™</sup>
        </motion.h2>
        <motion.div
          className="context-spectrum"
          initial={{ opacity: 0, scaleX: 0.7, y: 50 }}
          whileInView={{ opacity: 1, scaleX: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div />
        </motion.div>
        </div>
      </div>
      <div className="context-points">
        {contextItems.map(([title, body, Icon]) => (
          <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Icon size={17} />
            <b>{title}</b>
            <p>{body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const integrationAssets = [
  ["994e4972120e2c7c", "Claude"],
  ["c5980be627c5027f", "Slack"],
  ["60a140a18b975396", "Notion"],
  ["7051d84864792616", "Linear"],
  ["15d3ac18b22b328e", "Stripe"],
  ["87012aaba36cbc4c", "ChatGPT"],
  ["c7d99a5fd198e919", "Apollo"],
  ["e4b1e761fb96e9ea", "Fin"],
];

function ConnectivityRail() {
  const loop = [...integrationAssets, ...integrationAssets];

  return (
    <div className="connectivity-rail-window" aria-label="Connected integrations">
      <div className="connectivity-rail-track">
        {loop.map(([id, name], index) => (
          <div className="connectivity-tile" key={`${name}-${index}`}>
            <img src={asset(id, "svg")} alt={index < integrationAssets.length ? name : ""} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SignalsSection() {
  const [tab, setTab] = useState("context");
  return (
    <section className="signals-dark">
      <div className="signals-copy">
        <span className="section-kicker">Signals</span>
        <h2>
          All of the signals, none of the noise. <span>Ready to act on.</span>
        </h2>
        <a href="#ecosystem">
          See more <ArrowRight size={13} />
        </a>
        <Tabs value={tab} onValueChange={setTab} className="signals-tabs">
          <TabsList>
            {[
              ["context", "Context"],
              ["agents", "Agents + automations"],
              ["ecosystem", "Ecosystem"],
            ].map(([id, label]) => (
              <TabsTrigger key={id} value={id}>
                <span>{label}</span>
                {id === "context" && <small>Emails, calls, records, product usage, connected tools. All live.</small>}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="signals-visual">
        <AnimatePresence mode="wait">
          <motion.div
            className="signals-state"
            key={tab}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.35 }}
          >
            <span className="signal-core">
              <AttioMark word={false} light />
              <i />
              <i />
              <i />
            </span>
            {integrationAssets.map(([id, name], index) => (
              <motion.span
                className={`integration-orb orb-${index}`}
                key={name}
                animate={{ scale: [1, 1.035, 1], opacity: [0.82, 1, 0.82] }}
                transition={{ duration: 3.6 + index * 0.25, delay: index * 0.12, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src={asset(id, "svg")} alt={name} />
              </motion.span>
            ))}
            <svg className="orb-lines" viewBox="0 0 900 700">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                const ends = [
                  [100, 90],
                  [390, 60],
                  [760, 130],
                  [90, 380],
                  [790, 400],
                  [210, 630],
                  [500, 610],
                  [780, 640],
                ];
                return <line key={i} x1="450" y1="350" x2={ends[i][0]} y2={ends[i][1]} />;
              })}
            </svg>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="connectivity-stage" id="ecosystem">
        <div className="connectivity-copy">
          <span className="section-kicker">Connectivity</span>
          <h3>Your whole stack, connected.</h3>
          <p>Claude, Slack, Clay, Linear, Notion, and anything your team and agents run on.</p>
          <a href="#footer">
            Explore the ecosystem <ArrowRight size={13} />
          </a>
        </div>
        <ConnectivityRail />
      </div>
    </section>
  );
}

function DeveloperSection() {
  return (
    <section className="developer-dark">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <h2>
          SDK. API. MCP.
          <span> Build anything on Attio.</span>
        </h2>
        <a href="#footer">
          View docs <ArrowRight size={13} />
        </a>
      </motion.div>
      <div className="wire-logo">
        <span className="wire w1" />
        <span className="wire w2" />
        <span className="wire w3" />
        <span className="wire-dot d1" />
        <span className="wire-dot d2" />
        <span className="wire-dot d3" />
      </div>
    </section>
  );
}

function QuoteSection() {
  const words = "“When I first opened Attio, I instantly got the feeling this was the next generation of CRM.”".split(" ");
  return (
    <section className="quote-section">
      <p className="quote">
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            initial={{ opacity: 0.12 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: index * 0.035 }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </p>
      <div className="quote-author">
        <span className="author-avatar">M</span>
        <div>
          <b>Margaret Shen</b>
          <small>Head of Business Operations · Modal</small>
        </div>
      </div>
    </section>
  );
}

function ScaleSection() {
  const stats = [
    ["2.6M", "MCP calls/month"],
    ["400M", "API calls/week"],
    ["76k", "active customer agents"],
    ["15M", "emails synced/day"],
  ];
  return (
    <section className="scale-section grid-surface">
      <div className="scale-copy">
        <span className="section-kicker">Built to scale</span>
        <h2>
          Run at any scale. <span>Production-grade for your team and agents.</span>
        </h2>
      </div>
      <div className="stats-grid">
        {stats.map(([number, label], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <strong>{number}</strong>
            <span>{label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const customerStories = [
  {
    id: "granola",
    label: "Granola",
    logo: ["4821ff2c95fb93b3", "svg"],
    cover: ["7b946374c47992fb", "avif"],
    category: "Artificial Intelligence",
    title: "83% faster lead triage.",
    body: "How Granola turns product signals into revenue at scale.",
  },
  {
    id: "railway",
    label: "Railway",
    logo: ["c5e292a82c78692e", "svg"],
    cover: ["cf7d10780a713f5c", "avif"],
    category: "Infrastructure",
    title: "One operating system.",
    body: "How Railway keeps every customer motion connected.",
  },
  {
    id: "modal",
    label: "Modal",
    logo: ["26cee29fa06bb587", "svg"],
    cover: ["991d4f800cbf03a6", "avif"],
    category: "Cloud computing",
    title: "Built for velocity.",
    body: "How Modal scales relationships without slowing down.",
  },
  {
    id: "taskrabbit",
    label: "Taskrabbit",
    logo: ["4b02f9ead071ac7a", "svg"],
    cover: ["229b91aa5851214c", "avif"],
    category: "Marketplace",
    title: "Every market in context.",
    body: "How Taskrabbit brings clarity to a global customer base.",
  },
];

function CustomersSection() {
  const [story, setStory] = useState(customerStories[0]);
  return (
    <section className="customers-section grid-surface" id="customers">
      <div className="customer-heading">
        <span className="section-kicker">Customer stories</span>
        <h2>
          Trusted by 30,000+ customers. <span>From first agent to enterprise scale.</span>
        </h2>
        <a href="#footer">
          Read more <ArrowRight size={13} />
        </a>
      </div>
      <Tabs
        value={story.id}
        onValueChange={(id) => setStory(customerStories.find((item) => item.id === id) ?? customerStories[0])}
        className="customer-tabs"
      >
        <TabsList>
          {customerStories.map((item) => (
            <TabsTrigger value={item.id} key={item.id}>
              <img src={asset(...item.logo)} alt={item.label} />
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <AnimatePresence mode="wait">
        <motion.div
          key={story.id}
          className="story-panel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="story-copy">
            <small>{story.category}</small>
            <h3>{story.title}</h3>
            <p>{story.body}</p>
            <img src={asset(...story.logo)} alt={story.label} />
          </div>
          <div className="story-image">
            <img src={asset(...story.cover)} alt="" />
            <span>
              Read the story <ArrowRight size={14} />
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

const changelog = [
  ["What’s new in Workflows", "More of the work, off your plate.", Workflow, "#d9e5ff"],
  ["New activity timeline", "Eliminate noise in your records.", Layers3, "#e8e2ff"],
  ["Calls on mobile", "Call recordings are now on mobile.", Mic2, "#daf3eb"],
  ["More App Store updates", "Connect Attio to more of the tools you use.", Box, "#f5e8d8"],
];

function ChangelogSection() {
  return (
    <section className="changelog-section grid-surface">
      <div className="changelog-heading">
        <span className="section-kicker">Changelog</span>
        <h2>
          Better as you grow. <span>New features every week to keep pace with you.</span>
        </h2>
        <a href="#footer">
          View all <ArrowRight size={13} />
        </a>
      </div>
      <div className="changelog-grid">
        {changelog.map(([title, body, Icon, color], index) => (
          <motion.a
            href="#footer"
            key={title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="change-art" style={{ "--art": color }}>
              <Icon size={38} strokeWidth={1.1} />
              <span />
            </div>
            <small>June 29, 2026</small>
            <h3>{title}</h3>
            <p>{body}</p>
          </motion.a>
        ))}
      </div>
      <div className="newsletter">
        <p>
          <b>Stay ahead of GTM.</b>
          Product updates in your inbox.
        </p>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input aria-label="Your email address" placeholder="Your email address" type="email" />
          <Button dark>Subscribe</Button>
        </form>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta">
      <div className="final-glow" />
      <motion.h2 variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        Agentic revenue
        <br />
        runs on Attio.
      </motion.h2>
      <motion.div
        className="hero-actions"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Button>Talk to sales</Button>
        <Button className="button-light">Start for free</Button>
      </motion.div>
    </section>
  );
}

const footerColumns = [
  ["Platform", ["Refer a team · New", "Changelog", "Gmail extension", "iOS app", "Android app"]],
  ["Company", ["Customers", "Announcements", "Engineering blog · New", "Careers", "Manifesto", "Become a partner"]],
  ["Import from", ["Salesforce", "Hubspot", "Pipedrive", "Zoho", "Excel", "CSV"]],
  ["Attio for", ["Startups", "Deal flow"]],
  ["Apps", ["Gmail", "Outlook", "Segment", "Mailchimp", "Slack", "Outreach", "Mixmax", "Typeform", "Zapier"]],
  ["Resources", ["Startup program", "Help center", "Developers", "System status", "Hire an expert", "Downloads", "Trust Center"]],
];

function Footer() {
  return (
    <footer id="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <AttioMark />
          <p>The CRM for agentic revenue.</p>
        </div>
        <div className="footer-columns">
          {footerColumns.map(([title, links]) => (
            <div key={title}>
              <h2>{title}</h2>
              {links.map((link) => (
                <a href="#top" key={link}>
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
        <Accordion type="single" collapsible className="footer-accordion">
          {footerColumns.map(([title, links], index) => (
            <AccordionItem value={`footer-${index}`} key={title}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>
                {links.map((link) => (
                  <a href="#top" key={link}>
                    {link}
                  </a>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Attio Ltd. All rights reserved.</p>
        <div>
          <a href="#top">Services Agreement</a>
          <a href="#top">Privacy Policy</a>
          <a href="#top">LLMs</a>
        </div>
        <div className="socials">
          <span>in</span>
          <span>𝕏</span>
          <span>◉</span>
          <span>▶</span>
        </div>
      </div>
    </footer>
  );
}

function ChatButton() {
  return (
    <TooltipProvider delayDuration={250}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button className="chat-button" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} aria-label="Open chat">
            <MessageCircle size={20} fill="currentColor" />
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="left">Chat with Attio</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function App() {
  const [announcement, setAnnouncement] = useState(true);
  const [darkHeader, setDarkHeader] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const darkSections = Array.from(
      document.querySelectorAll(".context-dark, .signals-dark, .developer-dark, .final-cta"),
    );
    const syncHeaderTheme = () => {
      const headerLine = announcement ? 116 : 68;
      setDarkHeader(
        darkSections.some((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= headerLine && rect.bottom > headerLine;
        }),
      );
    };

    syncHeaderTheme();
    window.addEventListener("scroll", syncHeaderTheme, { passive: true });
    window.addEventListener("resize", syncHeaderTheme);
    return () => {
      window.removeEventListener("scroll", syncHeaderTheme);
      window.removeEventListener("resize", syncHeaderTheme);
    };
  }, [announcement]);

  return (
    <>
      <motion.div className="page-progress" style={{ scaleX: progress }} />
      <AnimatePresence>{announcement && <Announcement onDismiss={() => setAnnouncement(false)} />}</AnimatePresence>
      <Header announcementVisible={announcement} dark={darkHeader} />
      <main>
        <Hero />
        <LogoWall />
        <PlatformIntro />
        <Showcase />
        <SelfBuilding />
        <ContextSection />
        <SignalsSection />
        <DeveloperSection />
        <QuoteSection />
        <ScaleSection />
        <CustomersSection />
        <ChangelogSection />
        <FinalCta />
      </main>
      <Footer />
      <ChatButton />
    </>
  );
}

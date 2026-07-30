import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import { BrandMark } from "./founders/BrandMark";
import {
  BrainAnatomy,
  CompoundingSection,
  FinalCta,
  Hero,
  LayerSection,
  LocalOwnership,
  MethodSection,
  ProductShowcase,
  SystemIntro,
} from "./founders/Sections";

const NAV_ITEMS = [
  ["Sistema", "#sistema"],
  ["Cérebro", "#cerebro"],
  ["Obsidian", "#obsidian"],
  ["Camadas", "#camadas"],
  ["Método", "#metodo"],
];

function Header({ onOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="announcement">
        <span className="announcement-dot" />
        <span>FoundersOS · o segundo cérebro do fundador</span>
        <a href="#sistema">
          Conheça o sistema <ArrowRight size={13} />
        </a>
      </div>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <a className="brand-link" href="#top" aria-label="FoundersOS — início">
            <BrandMark />
          </a>

          <nav className="desktop-nav" aria-label="Navegação principal">
            {NAV_ITEMS.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <span className="playbook-signature">por Playbook Lab</span>
            <button className="button button-dark button-small" onClick={onOpen}>
              Agendar conversa
            </button>
            <button
              className="menu-button"
              type="button"
              aria-label="Abrir menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            aria-label="Navegação móvel"
          >
            {NAV_ITEMS.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMobileOpen(false)}>
                {label}
                <ChevronRight size={16} />
              </a>
            ))}
            <button
              className="button button-dark"
              onClick={() => {
                setMobileOpen(false);
                onOpen();
              }}
            >
              Agendar conversa
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer({ onOpen }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <BrandMark light />
        <p>
          Um sistema operacional de IA que aprende o contexto do fundador e
          trabalha dentro das ferramentas que ele já usa.
        </p>
        <button className="footer-contact" onClick={onOpen}>
          Agendar uma conversa <ArrowRight size={15} />
        </button>
      </div>

      <div className="footer-bottom">
        <span>© 2026 FoundersOS</span>
        <span>Um produto Playbook Lab</span>
        <a href="#top">Voltar ao topo ↑</a>
      </div>
    </footer>
  );
}

export default function App() {
  const [qualifierOpen, setQualifierOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div className="site-shell theme-light">
      <motion.div className="page-progress" style={{ scaleX: progress }} />
      <Header onOpen={() => setQualifierOpen(true)} />
      <main>
        <Hero onOpen={() => setQualifierOpen(true)} />
        <SystemIntro />
        <ProductShowcase />
        <BrainAnatomy />
        <LayerSection />
        <CompoundingSection />
        <MethodSection />
        <LocalOwnership />
        <FinalCta onOpen={() => setQualifierOpen(true)} />
      </main>
      <Footer onOpen={() => setQualifierOpen(true)} />

      <button
        className="floating-chat"
        type="button"
        aria-label="Agendar uma conversa"
        onClick={() => setQualifierOpen(true)}
      >
        <MessageCircle size={19} fill="currentColor" />
      </button>

      <QualificationDialog
        open={qualifierOpen}
        onClose={() => setQualifierOpen(false)}
      />
    </div>
  );
}

const QUESTIONS = [
  {
    key: "frentes",
    title: "Quantas frentes você toca hoje?",
    options: ["Só comercial", "Comercial + entrega", "Todas as frentes"],
  },
  {
    key: "crm",
    title: "Qual CRM você usa?",
    options: ["Pipedrive", "HubSpot", "Outro", "Ainda nenhum"],
  },
  {
    key: "reunioes",
    title: "Você grava suas reuniões?",
    options: ["Sempre", "Às vezes", "Ainda não"],
  },
];

function QualificationDialog({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      const timer = window.setTimeout(() => {
        setStep(0);
        setAnswers({});
      }, 250);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [open]);

  const select = (value) => {
    const question = QUESTIONS[step];
    const nextAnswers = { ...answers, [question.key]: value };
    setAnswers(nextAnswers);
    setStep((current) => current + 1);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Quero conversar sobre o FoundersOS.\n\n` +
      `Frentes que toco: ${answers.frentes || "—"}\n` +
      `CRM: ${answers.crm || "—"}\n` +
      `Grava reuniões: ${answers.reunioes || "—"}`,
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
        >
          <motion.section
            className="qualifier-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="qualifier-title"
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.22 }}
          >
            <div className="dialog-head">
              <BrandMark compact />
              <button type="button" onClick={onClose} aria-label="Fechar">
                <X size={17} />
              </button>
            </div>

            <div className="dialog-progress">
              <span
                style={{
                  width: `${Math.min(step + 1, QUESTIONS.length) * (100 / QUESTIONS.length)}%`,
                }}
              />
            </div>

            <AnimatePresence mode="wait">
              {step < QUESTIONS.length ? (
                <motion.div
                  className="dialog-body"
                  key={QUESTIONS[step].key}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.18 }}
                >
                  <p className="eyebrow">
                    Pergunta {step + 1} de {QUESTIONS.length}
                  </p>
                  <h2 id="qualifier-title">{QUESTIONS[step].title}</h2>
                  <div className="answer-list">
                    {QUESTIONS[step].options.map((option) => (
                      <button key={option} onClick={() => select(option)}>
                        {option}
                        <ArrowRight size={16} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="dialog-body dialog-result"
                  key="result"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="live-chip">
                    <i /> Contexto pronto
                  </span>
                  <h2 id="qualifier-title">
                    A conversa já começa sabendo o básico.
                  </h2>
                  <p>
                    Suas respostas vão junto para a equipe da Playbook Lab. Sem
                    formulário longo e sem repetir tudo de novo.
                  </p>
                  <a
                    className="button button-dark button-wide"
                    href={`https://wa.me/5541999224109?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Continuar no WhatsApp <ArrowRight size={16} />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

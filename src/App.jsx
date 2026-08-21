import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Menu,
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
  ScheduleSection,
} from "./founders/Sections";

const NAV_ITEMS = [
  ["Sistema", "#sistema"],
  ["Cérebro", "#cerebro"],
  ["Obsidian", "#obsidian"],
  ["Camadas", "#camadas"],
  ["Método", "#metodo"],
];

function Header() {
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
            <a className="button button-dark button-small" href="#agendar">
              Agendar conversa
            </a>
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
            <a
              className="button button-dark"
              href="#agendar"
              onClick={() => {
                setMobileOpen(false);
              }}
            >
              Agendar conversa
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <BrandMark light />
        <p>
          Um sistema operacional de IA que aprende o contexto do fundador e
          trabalha dentro das ferramentas que ele já usa.
        </p>
        <a className="footer-contact" href="#agendar">
          Agendar uma conversa <ArrowRight size={15} />
        </a>
      </div>

      <nav className="footer-guides" aria-label="Guias">
        <span>Guias</span>
        <a href="/guias/empresa-nao-roda-sem-mim/">A empresa não roda sem você</a>
        <a href="/guias/segundo-cerebro-para-empresas/">
          Segundo cérebro para empresas
        </a>
        <a href="/guias/ia-que-conhece-seu-negocio/">
          IA que conhece seu negócio
        </a>
        <a href="/guias/onde-guardar-a-memoria-da-empresa/">
          Onde guardar a memória da empresa
        </a>
        <a href="/guias/">Ver todos</a>
      </nav>

      <div className="footer-bottom">
        <span>© 2026 FoundersOS</span>
        <span>Um produto Playbook Lab</span>
        <a href="#top">Voltar ao topo ↑</a>
      </div>
    </footer>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div className="site-shell theme-light">
      <motion.div className="page-progress" style={{ scaleX: progress }} />
      <Header />
      <main>
        <Hero />
        <ProductShowcase />
        <BrainAnatomy />
        <LayerSection />
        <CompoundingSection />
        <MethodSection />
        <LocalOwnership />
        <FinalCta />
        <ScheduleSection />
      </main>
      <Footer />
    </div>
  );
}

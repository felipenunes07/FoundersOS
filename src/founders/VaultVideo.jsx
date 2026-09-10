import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * O mock interativo do vault virou uma gravação da tela real do sistema.
 * A moldura de janela continua a mesma do ObsidianVaultDemo — o vídeo entra
 * no lugar do corpo, em loop mudo, do jeito que um gif se comportaria.
 *
 * A gravação original tinha a barra do Chrome com abas pessoais e a URL de
 * localhost; os arquivos em /public já vêm cortados 104px no topo.
 */
export function VaultVideoDemo({ id, className = "" }) {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef(null);

  /**
   * Só o atributo autoplay não basta: o Chrome pausa o vídeo quando ele sai da
   * viewport e nem sempre religa ao voltar. O observer garante que, sempre que
   * a janela estiver à vista, o loop esteja rodando.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

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

      <div className="obsidian-frame-body vault-video-body">
        <video
          ref={videoRef}
          className="vault-video"
          poster="/obsidian-demo-poster.jpg"
          autoPlay={!reducedMotion}
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-label="Gravação do FoundersOS mapeando o vault da empresa"
        >
          <source src="/obsidian-demo.webm" type="video/webm" />
          <source src="/obsidian-demo.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

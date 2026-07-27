export function BrandMark({ light = false, compact = false }) {
  return (
    <span
      className={`brand-mark ${light ? "is-light" : ""} ${compact ? "is-compact" : ""}`}
    >
      <svg
        className="brand-brain"
        viewBox="0 0 32 32"
        role="img"
        aria-label="FoundersOS, cérebro e sistema operacional"
      >
        <path
          className="brand-brain-shell"
          d="M14.35 5.15c-1.12-1.42-3.62-1.36-4.7.33-2.3-.35-4.2 1.58-3.77 3.86-2.18.76-2.83 3.45-1.2 5.08-1.52 1.83-.48 4.57 1.84 4.98-.13 2.35 2.15 4.06 4.34 3.22.58 2.04 2.4 3.06 3.49 2.17V5.15Z"
        />
        <path
          className="brand-brain-shell"
          d="M17.65 5.15c1.12-1.42 3.62-1.36 4.7.33 2.3-.35 4.2 1.58 3.77 3.86 2.18.76 2.83 3.45 1.2 5.08 1.52 1.83.48 4.57-1.84 4.98.13 2.35-2.15 4.06-4.34 3.22-.58 2.04-2.4 3.06-3.49 2.17V5.15Z"
        />

        <path
          className="brand-brain-fold"
          d="M9.55 5.58c.08 1.56.9 2.42 2.24 2.74M6.05 9.28c1.48-.23 2.67.28 3.38 1.39M4.65 14.45c1.42-.42 2.74-.05 3.63 1.02M6.42 19.42c1.35.04 2.3-.54 2.86-1.74M10.82 22.64c-.1-1.38.54-2.4 1.9-3.04"
        />
        <path
          className="brand-brain-fold"
          d="M22.45 5.58c-.08 1.56-.9 2.42-2.24 2.74M25.95 9.28c-1.48-.23-2.67.28-3.38 1.39M27.35 14.45c-1.42-.42-2.74-.05-3.63 1.02M25.58 19.42c-1.35.04-2.3-.54-2.86-1.74M21.18 22.64c.1-1.38-.54-2.4-1.9-3.04"
        />

        <path
          className="brand-brain-trace"
          d="M9.35 12.05h3.25l1.55 1.55M22.65 12.05H19.4l-1.55 1.55M9.2 17.95h3.4l1.55-1.55M22.8 17.95h-3.4l-1.55-1.55"
        />
        <circle className="brand-brain-node" cx="8.55" cy="12.05" r="1" />
        <circle className="brand-brain-node" cx="23.45" cy="12.05" r="1" />
        <circle className="brand-brain-node" cx="8.4" cy="17.95" r="1" />
        <circle className="brand-brain-node" cx="23.6" cy="17.95" r="1" />

        <rect
          className="brand-brain-core"
          x="12.7"
          y="11.7"
          width="6.6"
          height="6.6"
          rx="1.45"
        />
        <path className="brand-brain-core-mark" d="M14.8 14.05h2.4v3h-2.4" />
      </svg>
      <span>
        founders<span>OS</span>
      </span>
    </span>
  );
}

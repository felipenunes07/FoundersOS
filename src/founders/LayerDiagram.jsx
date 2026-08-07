import { motion, useReducedMotion } from "framer-motion";

const CENTER = 330;
const RADII = [68, 126, 184, 244];
const MEMORY_POINTS = Array.from({ length: 34 }, (_, index) => {
  const angle = index * 2.399963;
  const radius = 82 + (index % 7) * 6.1;
  return {
    x: Math.round((CENTER + Math.cos(angle) * radius) * 100) / 100,
    y: Math.round((CENTER + Math.sin(angle) * radius) * 100) / 100,
    size: 1.3 + (index % 3) * 0.45,
  };
});
const OPERATION_POINTS = Array.from({ length: 10 }, (_, index) => {
  const angle = (index / 10) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Math.round((CENTER + Math.cos(angle) * RADII[2]) * 100) / 100,
    y: Math.round((CENTER + Math.sin(angle) * RADII[2]) * 100) / 100,
  };
});
const CONNECTORS = ["CRM", "Gmail", "Drive", "tl;dv"].map((label, index) => {
  const angle = (index / 4) * Math.PI * 2 - Math.PI / 4;
  return {
    label,
    x1: CENTER + Math.cos(angle) * RADII[3],
    y1: CENTER + Math.sin(angle) * RADII[3],
    x2: CENTER + Math.cos(angle) * 295,
    y2: CENTER + Math.sin(angle) * 295,
  };
});

export function LayerDiagram({ active, onChange }) {
  const reducedMotion = useReducedMotion();
  const ringStyle = (layer) => ({
    stroke: active === layer ? "var(--green)" : "currentColor",
    opacity: active === layer ? 1 : 0.18,
  });

  return (
    <svg
      className="layer-svg"
      viewBox="0 0 660 660"
      role="img"
      aria-label="Quatro camadas do FoundersOS: DNA, memória, skills e rotinas, e conectores."
    >
      <defs>
        <radialGradient id="core-glow">
          <stop offset="0%" stopColor="var(--green)" stopOpacity="0.24" />
          <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.g
        onMouseEnter={() => onChange(4)}
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reducedMotion ? 0 : 0.7, delay: 0.24 }}
        style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADII[3]}
          fill="none"
          strokeWidth="1"
          strokeDasharray="3 8"
          {...ringStyle(4)}
        />
        {CONNECTORS.map((connector, index) => (
          <g key={connector.label}>
            <motion.line
              x1={connector.x1}
              y1={connector.y1}
              x2={connector.x2}
              y2={connector.y2}
              stroke={active === 4 ? "var(--green)" : "currentColor"}
              opacity={active === 4 ? 0.8 : 0.2}
              strokeWidth="1"
              strokeDasharray="4 7"
              animate={
                reducedMotion ? undefined : { strokeDashoffset: [0, -22] }
              }
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            {/* 58 de largura: cabe o rótulo ampliado que telas estreitas usam
                sem depender de mexer na geometria do rect via CSS. */}
            <rect
              x={connector.x2 - 29}
              y={connector.y2 - 12}
              width="58"
              height="24"
              rx="5"
              fill="#0b0d0c"
              stroke={active === 4 ? "var(--green)" : "currentColor"}
              strokeOpacity={active === 4 ? 0.9 : 0.25}
            />
            <text
              x={connector.x2}
              y={connector.y2 + 3}
              textAnchor="middle"
              fill={active === 4 ? "var(--green)" : "currentColor"}
              opacity={active === 4 ? 1 : 0.45}
              fontSize="9"
              fontFamily="var(--font-mono)"
            >
              {connector.label}
            </text>
          </g>
        ))}
      </motion.g>

      <motion.g
        onMouseEnter={() => onChange(3)}
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reducedMotion ? 0 : 0.7, delay: 0.16 }}
        style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADII[2]}
          fill="none"
          strokeWidth="1"
          {...ringStyle(3)}
        />
        {OPERATION_POINTS.map((point, index) => (
          <motion.rect
            key={`${point.x}-${point.y}`}
            x={point.x - 4}
            y={point.y - 4}
            width="8"
            height="8"
            rx="2"
            fill={active === 3 ? "var(--green)" : "#0b0d0c"}
            stroke={active === 3 ? "var(--green)" : "currentColor"}
            opacity={active === 3 ? 1 : 0.3}
            animate={
              reducedMotion || active !== 3
                ? undefined
                : { opacity: [0.35, 1, 0.35] }
            }
            transition={{
              duration: 2.3,
              repeat: Infinity,
              delay: index * 0.12,
            }}
          />
        ))}
      </motion.g>

      <motion.g
        onMouseEnter={() => onChange(2)}
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reducedMotion ? 0 : 0.7, delay: 0.08 }}
        style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
      >
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADII[1]}
          fill="none"
          strokeWidth="1"
          {...ringStyle(2)}
        />
        {MEMORY_POINTS.map((point, index) => (
          <motion.circle
            key={`${point.x}-${point.y}`}
            cx={point.x}
            cy={point.y}
            r={point.size}
            fill={active === 2 ? "var(--green)" : "currentColor"}
            opacity={active === 2 ? 0.9 : 0.22}
            animate={
              reducedMotion || active !== 2
                ? undefined
                : { opacity: [0.28, 0.95, 0.28] }
            }
            transition={{
              duration: 2.7,
              repeat: Infinity,
              delay: (index % 8) * 0.16,
            }}
          />
        ))}
      </motion.g>

      <motion.g
        onMouseEnter={() => onChange(1)}
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reducedMotion ? 0 : 0.7 }}
        style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
      >
        {!reducedMotion && (
          <motion.circle
            cx={CENTER}
            cy={CENTER}
            r={RADII[0] + 32}
            fill="url(#core-glow)"
            animate={{ opacity: [0.4, 0.75, 0.4], scale: [0.94, 1.04, 0.94] }}
            transition={{ duration: 3.2, repeat: Infinity }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          />
        )}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADII[0]}
          fill="#0f1210"
          stroke={active === 1 ? "var(--green)" : "currentColor"}
          strokeOpacity={active === 1 ? 1 : 0.35}
          strokeWidth="1.4"
        />
        <text
          x={CENTER}
          y={CENTER - 5}
          textAnchor="middle"
          fill={active === 1 ? "var(--green)" : "currentColor"}
          opacity={active === 1 ? 1 : 0.72}
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="1.4"
        >
          CLAUDE
        </text>
        <text
          x={CENTER}
          y={CENTER + 13}
          textAnchor="middle"
          fill={active === 1 ? "var(--green)" : "currentColor"}
          opacity={active === 1 ? 1 : 0.72}
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="1.4"
        >
          .md
        </text>
      </motion.g>

      <text
        x={CENTER}
        y={CENTER - RADII[1] - 13}
        textAnchor="middle"
        fill="currentColor"
        opacity="0.32"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="1.5"
      >
        PERCEPÇÃO
      </text>
      <text
        x={CENTER}
        y={CENTER - RADII[3] - 14}
        textAnchor="middle"
        fill="currentColor"
        opacity="0.32"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="1.5"
      >
        AÇÃO
      </text>
    </svg>
  );
}

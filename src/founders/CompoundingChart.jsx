import { motion, useReducedMotion } from "framer-motion";

const WIDTH = 1240;
const HEIGHT = 590;
const PLOT = { left: 120, right: 1140, top: 112, bottom: 500 };
const plotWidth = PLOT.right - PLOT.left;
const plotHeight = PLOT.bottom - PLOT.top;

const sigmoid = (value) => 1 / (1 + Math.exp(-9.4 * (value - 0.43)));
const start = sigmoid(0);
const end = sigmoid(1);
const pointX = (t) => PLOT.left + t * plotWidth;
const pointY = (value) => PLOT.bottom - value * plotHeight;
const round = (value) => Math.round(value * 10) / 10;

const curve = Array.from({ length: 91 }, (_, index) => {
  const t = index / 90;
  const normalized = (sigmoid(t) - start) / (end - start);
  return {
    x: round(pointX(t)),
    y: round(pointY(0.04 + normalized * 0.9)),
  };
});
const flat = Array.from({ length: 91 }, (_, index) => {
  const t = index / 90;
  return {
    x: round(pointX(t)),
    y: round(pointY(0.07 + t * 0.035)),
  };
});
const toPath = (points) =>
  points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`)
    .join(" ");
const curvePath = toPath(curve);
const flatPath = toPath(flat);
const areaPath = `${curvePath} L${PLOT.right} ${PLOT.bottom} L${PLOT.left} ${PLOT.bottom} Z`;
const ticks = [
  [0.1, "Semana 4"],
  [0.34, "Mês 3"],
  [0.56, "Mês 6"],
  [0.78, "Mês 9"],
  [0.96, "Ano 1"],
];

export function CompoundingChart() {
  const reducedMotion = useReducedMotion();

  return (
    <figure className="compounding-chart">
      <div className="chart-rainbow" />
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="A inteligência acumulada do FoundersOS cresce com o tempo, enquanto o contexto disperso permanece quase parado."
      >
        <defs>
          <pattern
            id="chart-dot-grid"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.25" cy="1.25" r="1.1" fill="rgba(16,18,17,.14)" />
          </pattern>
          <linearGradient id="chart-green-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a9f5a" stopOpacity=".18" />
            <stop offset="100%" stopColor="#0a9f5a" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width={WIDTH} height={HEIGHT} fill="url(#chart-dot-grid)" />
        <text className="chart-heading" x="64" y="62">
          INTELIGÊNCIA ACUMULADA
        </text>
        <line
          x1="310"
          y1="57"
          x2="930"
          y2="57"
          stroke="rgba(16,18,17,.16)"
        />
        <text className="chart-heading" x={WIDTH - 64} y="62" textAnchor="end">
          TEMPO DESDE O DIA 1
        </text>

        <line
          x1={PLOT.left}
          x2={PLOT.left}
          y1={PLOT.top}
          y2={PLOT.bottom + 8}
          className="chart-axis"
        />
        <line
          x1={PLOT.left}
          x2={PLOT.right + 20}
          y1={PLOT.bottom + 8}
          y2={PLOT.bottom + 8}
          className="chart-axis"
        />

        <motion.path
          d={areaPath}
          fill="url(#chart-green-area)"
          initial={{ opacity: reducedMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: reducedMotion ? 0 : 0.8, duration: 0.8 }}
        />

        <motion.path
          d={flatPath}
          className="chart-flat"
          initial={{ pathLength: reducedMotion ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reducedMotion ? 0 : 1.1 }}
        />
        <motion.path
          d={curvePath}
          className="chart-growth"
          initial={{ pathLength: reducedMotion ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            delay: reducedMotion ? 0 : 0.2,
            duration: reducedMotion ? 0 : 1.8,
            ease: "easeInOut",
          }}
        />

        <motion.text
          className="chart-label growth-label"
          x={PLOT.left + 44}
          y={PLOT.top + 54}
          initial={{ opacity: reducedMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: reducedMotion ? 0 : 1.15 }}
        >
          FOUNDERSOS
        </motion.text>
        <motion.text
          className="chart-label flat-label"
          x={PLOT.right - 10}
          y={PLOT.bottom - 15}
          textAnchor="end"
          initial={{ opacity: reducedMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: reducedMotion ? 0 : 0.9 }}
        >
          CONTEXTO DISPERSO
        </motion.text>

        <motion.g
          initial={{ opacity: reducedMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: reducedMotion ? 0 : 0.55 }}
        >
          <line
            x1={pointX(0.12)}
            x2={pointX(0.12)}
            y1={PLOT.top}
            y2={PLOT.bottom + 8}
            className="handoff-line"
          />
          <text
            className="handoff-label"
            x={pointX(0.12) + 12}
            y={PLOT.top + 6}
          >
            SEMANA 4 · ENTREGA
          </text>
        </motion.g>

        {ticks.map(([position, label], index) => {
          const point = curve[Math.round(position * 90)];
          return (
            <motion.g
              key={label}
              initial={{
                opacity: reducedMotion ? 1 : 0,
                scale: reducedMotion ? 1 : 0.5,
              }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: reducedMotion ? 0 : 0.62 + index * 0.18,
                duration: 0.35,
              }}
              style={{ transformOrigin: `${point.x}px ${point.y}px` }}
            >
              <circle
                cx={point.x}
                cy={point.y}
                r="10"
                className="chart-marker"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="3.5"
                className="chart-marker-core"
              />
            </motion.g>
          );
        })}

        {ticks.map(([position, label]) => (
          <text
            key={label}
            x={pointX(position)}
            y={PLOT.bottom + 47}
            textAnchor="middle"
            className="chart-tick"
          >
            {label}
          </text>
        ))}
      </svg>
      <figcaption>
        A IA avulsa recomeça. O FoundersOS parte do que já foi acumulado.{" "}
        <strong>A distância entre as duas linhas é o ativo.</strong>
      </figcaption>
    </figure>
  );
}

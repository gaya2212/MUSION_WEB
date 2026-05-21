import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { BrainCircuit, Database, Sparkles, Target } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

type FlywheelNode = {
  label: string;
  detail: string;
};

const flywheel: FlywheelNode[] = [
  {
    label: 'More Projects',
    detail: 'Every completed release adds fresh production outcomes into the system.',
  },
  {
    label: 'Richer Data',
    detail: 'Musion accumulates patterns across genre, budgets, timelines, and team behavior.',
  },
  {
    label: 'Smarter Matching',
    detail: 'The model ranks teams by fit probability, not just availability.',
  },
  {
    label: 'Higher Completion Rates',
    detail: 'Better fit reduces rework loops and improves finish probability.',
  },
  {
    label: 'More Artists',
    detail: 'As outcomes improve, more artists trust the platform and join.',
  },
];

const engineCards = [
  {
    title: 'Input',
    text: 'Completed projects, revisions, turnaround times, and budget outcomes.',
    icon: Database,
  },
  {
    title: 'Model',
    text: 'Pattern learning by genre, team fit, reliability, and budget efficiency.',
    icon: BrainCircuit,
  },
  {
    title: 'Output',
    text: 'Ranked best-fit studios and engineers for your exact release context.',
    icon: Target,
  },
];

const ringSize = 380;
const center = ringSize / 2;
const radius = 138;

function buildArcPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  cx: number,
  cy: number,
  offset = 26
) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const vx = mx - cx;
  const vy = my - cy;
  const vLen = Math.hypot(vx, vy) || 1;
  const cpx = mx + (vx / vLen) * offset;
  const cpy = my + (vy / vLen) * offset;
  return `M ${x1} ${y1} Q ${cpx} ${cpy} ${x2} ${y2}`;
}

export default function Scene5Intelligence() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flywheel.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const points = useMemo(
    () =>
      flywheel.map((_, i) => {
        const angle = (i / flywheel.length) * Math.PI * 2 - Math.PI / 2;
        return {
          x: center + Math.cos(angle) * radius,
          y: center + Math.sin(angle) * radius,
        };
      }),
    []
  );

  const selectedIndex = selectedNode ?? activeStep;
  const selectedData = flywheel[selectedIndex];

  return (
    <section className="scene-section">
      <div className="relative z-10 w-full max-w-6xl px-6 py-10 flex flex-col gap-8">
        <div className="max-w-4xl">
          <p
            className="font-body text-sm tracking-[0.18em] uppercase"
            style={{ color: 'var(--accent-cyan)' }}
          >
            Powered by Production Intelligence
          </p>

          <h2
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(30px, 4vw, 52px)',
              lineHeight: 1.12,
              marginTop: 10,
            }}
          >
            The more artists use Musion, the smarter it gets.
          </h2>

          <p
            className="font-body text-base md:text-lg leading-relaxed mt-4"
            style={{ color: 'var(--text-dim)', maxWidth: 920 }}
          >
            Every completed project teaches Musion which studios deliver, which engineers fit which genres,
            and which budgets actually lead to finished records. That data compounds, so when it is your turn,
            you are not guessing. You are matched by a system that has seen thousands of productions like yours.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 items-stretch">
          <div className="glass-card p-6 md:p-7" style={{ borderColor: 'rgba(0,217,255,0.2)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} style={{ color: 'var(--accent-cyan)' }} />
              <p className="font-body text-xs tracking-[0.16em] uppercase" style={{ color: 'var(--accent-cyan)' }}>
                AI Engine
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {engineCards.map((card, i) => {
                const Icon = card.icon;
                const focused = i === activeStep % 3;
                return (
                  <motion.div
                    key={card.title}
                    className="rounded-xl p-4"
                    animate={{
                      borderColor: focused ? 'rgba(0,217,255,0.42)' : 'rgba(255,255,255,0.08)',
                      backgroundColor: focused ? 'rgba(0,217,255,0.07)' : 'rgba(255,255,255,0.02)',
                    }}
                    transition={{ duration: 0.35 }}
                    style={{ border: '1px solid' }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={15} style={{ color: 'var(--accent-cyan)' }} />
                      <p className="font-body text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {card.title}
                      </p>
                    </div>
                    <p className="font-body text-xs leading-relaxed mt-2" style={{ color: 'var(--text-dim)' }}>
                      {card.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div
              className="mt-4 rounded-xl p-4"
              style={{ border: '1px solid rgba(0,217,255,0.2)', background: 'rgba(0,217,255,0.05)' }}
            >
              <p className="font-body text-xs tracking-[0.14em] uppercase" style={{ color: 'var(--accent-cyan)' }}>
                Explainability
              </p>
              <p className="font-body text-sm mt-1" style={{ color: 'var(--text-primary)' }}>
                {selectedData.label}
              </p>
              <p className="font-body text-xs leading-relaxed mt-1" style={{ color: 'var(--text-dim)' }}>
                {selectedData.detail}
              </p>
            </div>
          </div>

          <div className="hidden xl:flex items-center justify-center glass-card p-6">
            <div style={{ width: ringSize, height: ringSize, position: 'relative' }}>
              <svg width={ringSize} height={ringSize} style={{ position: 'absolute', inset: 0 }}>
                <defs>
                  <marker
                    id="fwArrow"
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M0,0 L8,4 L0,8 Z" fill="rgba(0,217,255,0.9)" />
                  </marker>
                </defs>

                {points.map((pt, i) => {
                  const next = points[(i + 1) % points.length];
                  const path = buildArcPath(pt.x, pt.y, next.x, next.y, center, center);
                  const isActiveEdge = i === activeStep;
                  return (
                    <g key={`edge-${i}`}>
                      <path
                        d={path}
                        fill="none"
                        stroke={isActiveEdge ? 'rgba(0,217,255,0.86)' : 'rgba(0,217,255,0.2)'}
                        strokeWidth={isActiveEdge ? 2.7 : 1.6}
                        markerEnd={isActiveEdge ? 'url(#fwArrow)' : undefined}
                        strokeDasharray={isActiveEdge ? '8 6' : '5 6'}
                      />
                      {isActiveEdge && (
                        <motion.path
                          d={path}
                          fill="none"
                          stroke="rgba(255,255,255,0.8)"
                          strokeWidth={1.2}
                          strokeDasharray="4 10"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.9, ease: 'easeInOut' }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              <motion.div
                className="rounded-full flex items-center justify-center text-center"
                animate={{
                  boxShadow:
                    '0 0 26px rgba(0,217,255,0.3), 0 0 62px rgba(0,217,255,0.1), inset 0 0 22px rgba(0,217,255,0.16)',
                }}
                transition={{ repeat: Infinity, duration: 2.4, repeatType: 'reverse' }}
                style={{
                  position: 'absolute',
                  left: center - 64,
                  top: center - 64,
                  width: 128,
                  height: 128,
                  border: '1px solid rgba(0,217,255,0.35)',
                  background: 'radial-gradient(circle, rgba(0,217,255,0.16) 0%, rgba(0,0,0,0.45) 70%)',
                }}
              >
                <p className="font-body text-sm font-semibold px-3" style={{ color: 'var(--text-primary)' }}>
                  Musion AI
                </p>
              </motion.div>

              {points.map((point, i) => {
                const isActiveNode = i === activeStep;
                const isSelected = i === selectedNode;
                return (
                  <motion.button
                    key={flywheel[i].label}
                    type="button"
                    onClick={() => setSelectedNode((prev) => (prev === i ? null : i))}
                    className="rounded-full text-center px-2"
                    animate={{
                      scale: isActiveNode || isSelected ? 1.08 : 1,
                      backgroundColor: isActiveNode || isSelected ? 'rgba(0,217,255,0.14)' : 'rgba(255,255,255,0.03)',
                      borderColor: isActiveNode || isSelected ? 'rgba(0,217,255,0.55)' : 'rgba(255,255,255,0.1)',
                    }}
                    transition={{ duration: 0.28 }}
                    style={{
                      position: 'absolute',
                      left: point.x - 52,
                      top: point.y - 52,
                      width: 104,
                      height: 104,
                      border: '1px solid',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                    }}
                  >
                    <span className="font-body text-xs leading-tight">{flywheel[i].label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="xl:hidden glass-card p-5">
            <p className="font-body text-xs tracking-[0.16em] uppercase mb-4" style={{ color: 'var(--accent-cyan)' }}>
              Data Flywheel
            </p>

            <div className="flex flex-col gap-2">
              {flywheel.map((node, i) => {
                const active = i === activeStep;
                const selected = i === selectedNode;
                const next = i < flywheel.length - 1;
                return (
                  <div key={node.label} className="flex flex-col gap-2">
                    <motion.button
                      type="button"
                      onClick={() => setSelectedNode((prev) => (prev === i ? null : i))}
                      className="rounded-lg px-4 py-3 text-left"
                      animate={{
                        borderColor: active || selected ? 'rgba(0,217,255,0.52)' : 'rgba(255,255,255,0.1)',
                        backgroundColor: active || selected ? 'rgba(0,217,255,0.09)' : 'rgba(255,255,255,0.02)',
                      }}
                      transition={{ duration: 0.28 }}
                      style={{ border: '1px solid', cursor: 'pointer' }}
                    >
                      <p className="font-body text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {node.label}
                      </p>
                      {(selected || active) && (
                        <p className="font-body text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-dim)' }}>
                          {node.detail}
                        </p>
                      )}
                    </motion.button>
                    {next && <div style={{ height: 10, width: 2, background: 'rgba(0,217,255,0.35)', marginLeft: 14 }} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      <ParticleCanvas mode="constellation" particleCount={14} maxOpacity={0.15} />
    </section>
  );
}

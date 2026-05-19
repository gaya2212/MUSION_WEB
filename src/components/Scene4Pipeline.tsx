import { motion } from 'framer-motion';
import { Lightbulb, Mic, Sliders, Megaphone, Globe, Users } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

const nodes = [
  { label: 'Ideation', icon: Lightbulb, tag: 'Define Your Vision' },
  { label: 'Recording', icon: Mic, tag: 'Match With the Right Studio' },
  { label: 'Mixing & Mastering', icon: Sliders, tag: 'Your Mix, Handled by Experts' },
  { label: 'Promotion & Design', icon: Megaphone, tag: 'Build Your Release' },
  { label: 'Distribution', icon: Globe, tag: 'Your Music, Everywhere It Belongs' },
  { label: 'Community', icon: Users, tag: 'The Global Industry, All in One Place' },
];

export default function Scene4Pipeline() {
  return (
    <section className="scene-section">
      <ParticleCanvas mode="orbital" particleCount={30} maxOpacity={0.2} />

      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center gap-14">
        {/* Desktop: horizontal pipeline */}
        <div className="hidden md:flex items-start w-full justify-between relative pt-4">
          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <div
                key={node.label}
                className="flex flex-col items-center relative"
                style={{ minWidth: '100px', maxWidth: '120px' }}
              >
                {/* Node circle */}
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center relative z-10"
                  style={{
                    border: '2px solid rgba(255,255,255,0.08)',
                    background: 'rgba(14, 14, 24, 0.9)',
                  }}
                  initial={{ scale: 0.7, opacity: 0.2 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.25, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: false }}
                >
                  <Icon size={18} style={{ color: 'var(--text-dim)' }} />

                  {/* Cyan glow overlay */}
                  <motion.div
                    className="absolute inset-[-2px] rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)',
                      boxShadow: '0 0 24px rgba(0,229,255,0.25), inset 0 0 12px rgba(0,229,255,0.1)',
                      border: '2px solid rgba(0,229,255,0.3)',
                    }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.25 + 0.15, duration: 0.5 }}
                    viewport={{ once: false }}
                  />
                </motion.div>

                {/* Label */}
                <span
                  className="mt-3 font-body text-xs font-medium tracking-wide text-center"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {node.label}
                </span>

                {/* Tag below label */}
                <motion.span
                  className="mt-1 font-body text-[10px] text-center leading-tight px-1"
                  style={{ color: 'var(--accent-cyan)' }}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.25, duration: 0.5 }}
                  viewport={{ once: false }}
                >
                  {node.tag}
                </motion.span>

                {/* Connecting dashed line */}
                {i < nodes.length - 1 && (
                  <svg
                    className="absolute top-6 left-[calc(50%+24px)] h-[2px]"
                    style={{ width: 'calc(100% - 48px)' }}
                  >
                    <line
                      x1="0"
                      y1="1"
                      x2="100%"
                      y2="1"
                      stroke="rgba(0,229,255,0.25)"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      className="animate-dash-march"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical pipeline */}
        <div className="flex md:hidden flex-col items-center gap-5 w-full max-w-sm">
          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <motion.div
                key={node.label}
                className="flex items-center gap-4 w-full"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: false }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    border: '2px solid rgba(0,229,255,0.25)',
                    background: 'rgba(0,229,255,0.06)',
                    boxShadow: '0 0 16px rgba(0,229,255,0.15)',
                  }}
                >
                  <Icon size={16} style={{ color: 'var(--accent-cyan)' }} />
                </div>
                <div className="flex flex-col">
                  <p className="font-body text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {node.label}
                  </p>
                  <p className="font-body text-xs" style={{ color: 'var(--accent-cyan)' }}>
                    {node.tag}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="font-body text-center max-w-2xl font-light px-4 leading-relaxed"
          style={{
            color: 'var(--text-primary)',
            fontSize: 'clamp(14px, 1.4vw, 18px)',
          }}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: false }}
        >
          One platform. Idea to finished product. Every stage structured, tracked, and protected.
        </motion.p>
      </div>
    </section>
  );
}

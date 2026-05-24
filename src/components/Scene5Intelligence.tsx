import { motion } from 'framer-motion';

const flywheelNodes = [
  { label: 'More Projects', angle: -90 },
  { label: 'Richer Data', angle: -18 },
  { label: 'Smarter Matching', angle: 54 },
  { label: 'More Finished\nRecords', angle: 126 },
  { label: 'More Artists', angle: 198 },
];

const RADIUS = 130;
const CX = 180;
const CY = 180;

function toXY(angleDeg: number, r = RADIUS) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

export default function Scene5Intelligence() {
  return (
    <section className="scene-section">
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* Left: text */}
        <div className="flex flex-col gap-5 w-full md:w-[50%]">
          <motion.p
            className="font-body text-sm tracking-[0.18em] uppercase"
            style={{ color: 'var(--accent-cyan)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            Powered by Production Intelligence
          </motion.p>

          <motion.h2
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(24px, 3.2vw, 44px)',
              lineHeight: 1.15,
              margin: 0,
              fontWeight: 300,
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: false }}
          >
            Every artist who came before you{' '}
            <span style={{ color: 'var(--accent-cyan)' }}>made Musion better for you.</span>
          </motion.h2>

          <motion.p
            className="font-body leading-relaxed"
            style={{ color: 'var(--text-dim)', fontSize: 'clamp(13px, 1.3vw, 17px)' }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: false }}
          >
            Every project teaches us which studios deliver, which engineers fit which sounds,
            and which timelines actually hold. That knowledge lives in the platform — not with
            one person. So when you start, you're not starting from zero.
          </motion.p>

          <motion.p
            className="font-body leading-relaxed"
            style={{ color: 'var(--text-primary)', fontSize: 'clamp(14px, 1.4vw, 18px)', fontWeight: 300 }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: false }}
          >
            The more music gets made here, the better we get at making yours.
          </motion.p>
        </div>

        {/* Right: flywheel visualization */}
        <motion.div
          className="w-full md:w-[50%] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: false }}
        >
          <div style={{ position: 'relative', width: 360, height: 360 }}>
            <svg
              width="360"
              height="360"
              viewBox="0 0 360 360"
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              {/* Outer glow ring */}
              <circle
                cx={CX}
                cy={CY}
                r={RADIUS}
                fill="none"
                stroke="rgba(0,229,255,0.06)"
                strokeWidth="1"
              />

              {/* Connecting arcs between nodes */}
              {flywheelNodes.map((_node, i) => {
                const node = flywheelNodes[i];
                const next = flywheelNodes[(i + 1) % flywheelNodes.length];
                const from = toXY(node.angle, RADIUS);
                const to = toXY(next.angle, RADIUS);
                const mx = (from.x + to.x) / 2;
                const my = (from.y + to.y) / 2;
                const dx = mx - CX;
                const dy = my - CY;
                const len = Math.sqrt(dx * dx + dy * dy);
                const cx2 = mx + (dx / len) * 20;
                const cy2 = my + (dy / len) * 20;
                return (
                  <motion.path
                    key={i}
                    d={`M ${from.x} ${from.y} Q ${cx2} ${cy2} ${to.x} ${to.y}`}
                    fill="none"
                    stroke="rgba(0,229,255,0.28)"
                    strokeWidth="1.5"
                    strokeDasharray="5 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.2, duration: 0.6 }}
                    viewport={{ once: false }}
                  />
                );
              })}

              {/* Arrow heads */}
              {flywheelNodes.map((_node, i) => {
                const node = flywheelNodes[i];
                const next = flywheelNodes[(i + 1) % flywheelNodes.length];
                const pos = toXY(next.angle, RADIUS);
                const prev = toXY(node.angle, RADIUS);
                const angle = Math.atan2(pos.y - prev.y, pos.x - prev.x) * (180 / Math.PI);
                return (
                  <motion.polygon
                    key={`arrow-${i}`}
                    points="-5,-3 5,0 -5,3"
                    fill="rgba(0,229,255,0.45)"
                    transform={`translate(${pos.x}, ${pos.y}) rotate(${angle})`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.1 + i * 0.2, duration: 0.3 }}
                    viewport={{ once: false }}
                  />
                );
              })}
            </svg>

            {/* Node dots + labels */}
            {flywheelNodes.map((node, i) => {
              const { x, y } = toXY(node.angle);
              const lines = node.label.split('\n');
              const dy = y - CY;
              const labelOffsetY = dy > 0 ? 18 : -26 - (lines.length - 1) * 12;
              return (
                <motion.div
                  key={node.label}
                  style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  viewport={{ once: false }}
                >
                  {/* Glow dot */}
                  <motion.div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: 'var(--accent-cyan)',
                      flexShrink: 0,
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 6px rgba(0,229,255,0.3)',
                        '0 0 18px rgba(0,229,255,0.9)',
                        '0 0 6px rgba(0,229,255,0.3)',
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
                  />

                  {/* Label */}
                  <div
                    style={{
                      position: 'absolute',
                      top: labelOffsetY,
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {lines.map((line, li) => (
                      <div
                        key={li}
                        style={{
                          fontSize: 10,
                          fontFamily: 'var(--font-body)',
                          color: 'rgba(224,224,240,0.65)',
                          letterSpacing: '0.04em',
                          lineHeight: 1.3,
                        }}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* Center label */}
            <motion.div
              style={{
                position: 'absolute',
                left: CX,
                top: CY,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                textAlign: 'center',
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.8 }}
              viewport={{ once: false }}
            >
              <span style={{
                fontSize: 8,
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-cyan)',
                opacity: 0.45,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}>
                the
              </span>
              <span style={{
                fontSize: 13,
                fontFamily: 'var(--font-body)',
                color: 'var(--text-primary)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
              }}>
                flywheel
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

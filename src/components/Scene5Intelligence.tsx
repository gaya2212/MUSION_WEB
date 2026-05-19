import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

const blocks = [
  { text: 'More projects create more data', accent: false },
  { text: 'More data means smarter matching', accent: false },
  { text: 'Smarter matching means higher completion rates', accent: false },
];

export default function Scene5Intelligence() {
  return (
    <section className="scene-section">
      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Left: constellation */}
        <div className="w-full md:w-[40%] h-[280px] md:h-[420px] relative rounded-2xl overflow-hidden"
          style={{ border: '1px solid rgba(255,255,255,0.04)' }}
        >
          <ParticleCanvas mode="constellation" particleCount={35} maxOpacity={0.5} />
        </div>

        {/* Right: text blocks */}
        <div className="w-full md:w-[60%] flex flex-col items-start gap-2">
          {blocks.map((block, i) => (
            <div key={block.text} className="flex flex-col items-start w-full">
              <motion.p
                className="font-body font-normal leading-relaxed"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: 'clamp(16px, 2vw, 22px)',
                }}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: i * 0.35,
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                viewport={{ once: false }}
              >
                {block.text}
              </motion.p>

              {i < blocks.length - 1 && (
                <motion.div
                  className="my-3 ml-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: i * 0.35 + 0.25,
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  viewport={{ once: false }}
                >
                  <ChevronRight
                    size={16}
                    style={{ color: 'var(--accent-cyan)', opacity: 0.6 }}
                  />
                </motion.div>
              )}
            </div>
          ))}

          <motion.p
            className="font-body font-semibold mt-6"
            style={{
              color: 'var(--accent-cyan)',
              fontSize: 'clamp(18px, 2.2vw, 26px)',
              textShadow: '0 0 30px rgba(0, 229, 255, 0.2)',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: false }}
          >
            This is the data flywheel.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

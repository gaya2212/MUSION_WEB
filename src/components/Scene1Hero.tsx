import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ParticleCanvas from './ParticleCanvas';

export default function Scene1Hero() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const wrapperOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const wrapperY = useTransform(scrollYProgress, [0, 0.45], [0, -60]);

  return (
    <section ref={ref} className="scene-section">
      <ParticleCanvas mode="drift" particleCount={20} maxOpacity={0.1} />

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full"
        style={{ opacity: wrapperOpacity, y: wrapperY }}
      >
        <div style={{ width: '100%', textAlign: 'center', padding: '0 24px' }}>
          <h1
            style={{
              fontSize: 'clamp(30px, 4.5vw, 62px)',
              fontWeight: 300,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}
          >
            You wrote the song.
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 28px)',
              fontWeight: 300,
              marginTop: '0.6em',
              lineHeight: 1.4,
              fontFamily: 'var(--font-body)',
              color: 'var(--text-dim)',
            }}
          >
            That was the <span style={{ color: 'var(--accent-cyan)' }}>easy part</span>.
          </p>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ position: 'absolute', bottom: -80, left: '50%', transform: 'translateX(-50%)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <div style={{
            width: 20, height: 32, borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 4,
          }}>
            <motion.div
              style={{ width: 4, height: 6, borderRadius: 2, background: 'var(--accent-cyan)' }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

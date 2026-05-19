import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ParticleCanvas from './ParticleCanvas';

export default function Scene1Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -80]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.05, 0.35], [1, 0]);

  return (
    <section ref={ref} className="scene-section">
      <ParticleCanvas mode="drift" particleCount={50} maxOpacity={0.25} />

      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl"
        style={{ opacity: textOpacity, y: textY }}
      >
        <motion.h1
          className="font-display font-semibold leading-[1.15] tracking-tight"
          style={{ fontSize: 'clamp(36px, 5.5vw, 68px)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: false }}
        >
          You wrote the song.
        </motion.h1>

        <motion.div
          style={{ opacity: subtitleOpacity }}
        >
          <motion.h1
            className="font-display font-semibold leading-[1.15] tracking-tight mt-3"
            style={{ fontSize: 'clamp(36px, 5.5vw, 68px)' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.7 }}
            viewport={{ once: false }}
          >
            That was the{' '}
            <span
              className="font-normal"
              style={{
                color: 'var(--accent-cyan)',
                textShadow: '0 0 40px rgba(56, 182, 204, 0.25)',
              }}
            >
              easy part
            </span>
            .
          </motion.h1>
        </motion.div>

        {/* Subtle scroll indicator */}
        <motion.div
          className="absolute -bottom-24 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1"
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-accent-cyan"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

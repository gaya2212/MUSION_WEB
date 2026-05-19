import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import ParticleCanvas from './ParticleCanvas';

const slides = [
  {
    headline: 'You wrote the song.',
    sub: (
      <>
        That was the{' '}
        <span style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}>easy part</span>.
      </>
    ),
  },
  {
    headline: 'Your music deserves to be finished.',
    sub: <>Not forgotten in a folder.</>,
  },
  {
    headline: 'One platform. Idea to release.',
    sub: (
      <>
        The{' '}
        <span style={{ color: 'var(--accent-cyan)', fontWeight: 500 }}>production intelligence</span>{' '}
        layer.
      </>
    ),
  },
];

const variants = {
  enter: { opacity: 0, scale: 0.97 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function Scene1Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const wrapperOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const wrapperY = useTransform(scrollYProgress, [0, 0.45], [0, -60]);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, next]);

  return (
    <section ref={ref} className="scene-section">
      <ParticleCanvas mode="drift" particleCount={20} maxOpacity={0.1} />

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full px-6"
        style={{ opacity: wrapperOpacity, y: wrapperY }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slide content */}
        <div className="relative flex items-center justify-center" style={{ minHeight: 'clamp(140px, 20vw, 220px)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-center absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              <h1
                className="font-body font-extralight leading-[1.1] tracking-tight"
                style={{ fontSize: 'clamp(32px, 5vw, 64px)', color: 'var(--text-primary)' }}
              >
                {slides[active].headline}
              </h1>
              <h2
                className="font-body font-extralight mt-3 leading-snug"
                style={{
                  fontSize: 'clamp(22px, 3.2vw, 44px)',
                  color: 'var(--text-dim)',
                  fontWeight: 300,
                }}
              >
                {slides[active].sub}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center gap-2.5 mt-14">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 8000); }}
              className="cursor-pointer transition-all duration-400"
              style={{
                width: i === active ? 22 : 6,
                height: 6,
                borderRadius: 3,
                background: i === active ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.15)',
                border: 'none',
                padding: 0,
                transition: 'width 0.4s ease, background 0.3s ease',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-1.5 rounded-full"
              style={{ background: 'var(--accent-cyan)' }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

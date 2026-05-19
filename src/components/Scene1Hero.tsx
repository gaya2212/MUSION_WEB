import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import ParticleCanvas from './ParticleCanvas';

const slides = [
  { headline: 'You wrote the song.', sub: 'That was the easy part.', accent: 'easy part' },
  { headline: 'Your music deserves to be finished.', sub: 'Not forgotten in a folder.', accent: null },
  { headline: 'One platform. Idea to release.', sub: 'The production intelligence layer.', accent: 'production intelligence' },
];

export default function Scene1Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const wrapperOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const wrapperY = useTransform(scrollYProgress, [0, 0.45], [0, -60]);

  const goTo = useCallback((i: number) => {
    setActive(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((prev: number) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  const slide = slides[active];

  // Render sub with optional accent highlight
  const renderSub = (sub: string, accentWord: string | null) => {
    if (!accentWord) return <span style={{ color: 'var(--text-dim)' }}>{sub}</span>;
    const parts = sub.split(accentWord);
    return (
      <span style={{ color: 'var(--text-dim)' }}>
        {parts[0]}
        <span style={{ color: 'var(--accent-cyan)' }}>{accentWord}</span>
        {parts[1]}
      </span>
    );
  };

  return (
    <section ref={ref} className="scene-section">
      <ParticleCanvas mode="drift" particleCount={20} maxOpacity={0.1} />

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full"
        style={{ opacity: wrapperOpacity, y: wrapperY }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fixed-height slide stage */}
        <div
          style={{
            width: '100%',
            height: 'clamp(160px, 22vw, 240px)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.9, ease: 'easeInOut' } }}
              exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
              style={{
                position: 'absolute',
                width: '100%',
                textAlign: 'center',
                padding: '0 24px',
              }}
            >
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
                {slide.headline}
              </h1>
              <p
                style={{
                  fontSize: 'clamp(16px, 2vw, 28px)',
                  fontWeight: 300,
                  marginTop: '0.6em',
                  lineHeight: 1.4,
                  fontFamily: 'var(--font-body)',
                }}
              >
                {renderSub(slide.sub, slide.accent)}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 36 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                height: 6,
                width: i === active ? 24 : 6,
                borderRadius: 3,
                background: i === active ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.18)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 0.4s ease, background 0.3s ease',
              }}
            />
          ))}
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

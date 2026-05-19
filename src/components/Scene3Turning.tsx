import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import ParticleCanvas from './ParticleCanvas';

export default function Scene3Turning() {
  const [phase, setPhase] = useState(0); // 0=empty, 1=dot, 2=text, 3=ring, 4=particles
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase(0);
          const t1 = setTimeout(() => setPhase(1), 500);
          const t2 = setTimeout(() => setPhase(2), 1800);
          const t3 = setTimeout(() => setPhase(3), 2800);
          const t4 = setTimeout(() => setPhase(4), 3200);
          return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
          };
        } else {
          setPhase(0);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="scene-section">
      {phase >= 4 && (
        <ParticleCanvas mode="burst" particleCount={12} maxOpacity={0.15} />
      )}

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* The dot */}
        {phase >= 1 && (
          <motion.div
            className="relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: 'var(--accent-cyan)',
                opacity: 0.85,
              }}
            />

            {/* Expanding ring */}
            {phase >= 3 && (
              <div
                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full animate-ring-expand"
                style={{ border: '1.5px solid var(--accent-cyan)' }}
              />
            )}
            {phase >= 3 && (
              <div
                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full animate-ring-expand"
                style={{
                  border: '1px solid var(--accent-cyan)',
                  animationDelay: '0.5s',
                }}
              />
            )}
          </motion.div>
        )}

        {/* The text */}
        {phase >= 2 && (
          <motion.p
            className="font-body font-normal text-center px-8 max-w-xl"
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(18px, 2.5vw, 26px)',
              lineHeight: 1.4,
            }}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            We built Musion because this story is too common.
          </motion.p>
        )}
      </div>
    </section>
  );
}

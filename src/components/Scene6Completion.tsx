import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Scene6Completion() {
  const ref = useRef<HTMLDivElement>(null);
  const [showCheck, setShowCheck] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const fillProgress = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);
  const circleScale = useTransform(scrollYProgress, [0.1, 0.5], [0.85, 1]);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setShowCheck(v > 0.45);
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <section ref={ref} className="scene-section">
      <div className="relative z-10 flex flex-col items-center gap-10 px-6">
        {/* Progress circle */}
        <motion.div
          className="relative w-[200px] h-[200px]"
          style={{ scale: circleScale }}
        >
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            {/* Background ring */}
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="3"
            />
            {/* Progress ring */}
            <motion.circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="url(#completionGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                pathLength: fillProgress,
              }}
            />
            <defs>
              <linearGradient id="completionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00e5ff" />
                <stop offset="100%" stopColor="#e040fb" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner radial fill */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)`,
            }}
          />

          {/* Checkmark */}
          {showCheck && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <svg width="56" height="56" viewBox="0 0 56 56">
                <motion.path
                  d="M14 28 L24 38 L42 18"
                  fill="none"
                  stroke="#00e5ff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </svg>
            </motion.div>
          )}
        </motion.div>

        <div className="flex flex-col items-center gap-4 max-w-lg text-center">
          <motion.p
            className="font-body font-normal leading-relaxed"
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(16px, 2vw, 22px)',
            }}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: false }}
          >
            Because the world doesn't need another place to book a service.
          </motion.p>

          <motion.p
            className="font-body leading-relaxed"
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(16px, 2vw, 22px)',
            }}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: false }}
          >
            It needs a place where music{' '}
            <span
              style={{
                color: 'var(--accent-cyan)',
                fontWeight: 600,
              }}
            >
              actually gets finished
            </span>
            .
          </motion.p>
        </div>
      </div>
    </section>
  );
}

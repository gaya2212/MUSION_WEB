import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import ParticleCanvas from './ParticleCanvas';
import WaitlistModal from './WaitlistModal';

export default function Scene1Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const wrapperOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const wrapperY = useTransform(scrollYProgress, [0, 0.45], [0, -60]);

  const scrollToHowItWorks = () => {
    const sections = document.querySelectorAll('section');
    const pipelineSection = sections[2];
    if (pipelineSection) {
      pipelineSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="scene-section">
      <ParticleCanvas mode="drift" particleCount={20} maxOpacity={0.1} />

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full"
        style={{ opacity: wrapperOpacity, y: wrapperY }}
      >
        <div style={{ width: '100%', textAlign: 'center', padding: '0 24px', maxWidth: 980 }}>
          <h1
            style={{
              fontSize: 'clamp(30px, 4.5vw, 62px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              margin: 0,
            }}
          >
            Your music deserves to be finished
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 28px)',
              fontWeight: 300,
              marginTop: '1em',
              lineHeight: 1.4,
              fontFamily: 'var(--font-body)',
              color: 'var(--text-dim)',
              maxWidth: 760,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Musion is the production intelligence layer that takes independent artists from first idea to finished, released music - with the right professionals, matched to your project, at every stage.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: 32,
            }}
          >
            <motion.button
              className="font-body font-semibold text-sm md:text-base rounded-full px-10 py-4 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #00e5ff, #e040fb)',
                color: '#06060c',
                letterSpacing: '0.02em',
              }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(0,229,255,0.2)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setModalOpen(true)}
            >
              Join the Waitlist
            </motion.button>

            <motion.button
              className="font-body font-semibold text-sm md:text-base rounded-full px-10 py-4 cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.03)',
                color: 'var(--text-primary)',
                letterSpacing: '0.02em',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              whileHover={{ scale: 1.03, borderColor: 'rgba(0,229,255,0.35)' }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToHowItWorks}
            >
              See How It Works
            </motion.button>
          </div>
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

      {modalOpen && <WaitlistModal onClose={() => setModalOpen(false)} />}
    </section>
  );
}

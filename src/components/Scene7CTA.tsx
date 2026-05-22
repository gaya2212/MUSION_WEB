import { useState } from 'react';
import { motion } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';
import WaitlistModal from './WaitlistModal';
import logoSrc from '../assets/musion-logo.png';

export default function Scene7CTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="scene-section">
      <ParticleCanvas mode="orbital" particleCount={16} maxOpacity={0.1} />

      <div className="relative z-10 flex flex-col items-center gap-7 px-6">
        {/* Logo with pulsing glow */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: false }}
        >
          {/* MUSION in real logo font — PNG text portion, inverted to white */}
          <div style={{
            position: 'relative',
            width: 'clamp(220px, 55vw, 380px)',
            height: 'clamp(52px, 13vw, 89px)',
            overflow: 'hidden',
            filter: 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.2))',
          }}>
            <img
              src={logoSrc}
              alt="MUSION"
              style={{
                width: '100%',
                height: 'auto',
                position: 'absolute',
                bottom: 0,
                left: 0,
                filter: 'invert(1) grayscale(1) brightness(3) sepia(1) hue-rotate(155deg) saturate(8)',
                display: 'block',
              }}
            />
          </div>
        </motion.div>

        <div className="max-w-3xl text-center">
          <motion.p
            className="font-body text-lg md:text-2xl leading-relaxed"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            viewport={{ once: false }}
          >
            Most platforms were built for the industry.
          </motion.p>

          <motion.p
            className="font-body text-lg md:text-2xl leading-relaxed mt-2"
            style={{ color: 'var(--text-primary)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: false }}
          >
            Musion was built for the artist.
          </motion.p>
        </div>

        {/* Tagline */}
        <motion.p
          className="font-mono text-[11px] md:text-xs text-center tracking-wider"
          style={{ color: 'var(--text-dim)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          viewport={{ once: false }}
        >
          The Production Intelligence Layer for Independent Artists
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="mt-3 font-body font-semibold text-sm md:text-base rounded-full px-12 py-4 cursor-pointer relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #00e5ff, #e040fb)',
            color: '#06060c',
            letterSpacing: '0.02em',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: false }}
          whileHover={{
            scale: 1.03,
            boxShadow: '0 0 20px rgba(0,229,255,0.2)',
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setModalOpen(true)}
        >
          Join the Waitlist - It's Free
        </motion.button>

        {modalOpen && <WaitlistModal onClose={() => setModalOpen(false)} />}
      </div>
    </section>
  );
}

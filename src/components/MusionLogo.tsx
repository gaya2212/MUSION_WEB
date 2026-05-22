import { useState } from 'react';
import { motion } from 'framer-motion';
import logoSrc from '../assets/musion-logo.png';
import WaitlistModal from './WaitlistModal';

export default function MusionLogo() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(20px, 5vw, 56px)',
          height: 64,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Left: MUSION text + small butterfly icon after the N */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* MUSION text — bottom portion of PNG */}
          <div style={{ width: 90, height: 22, overflow: 'hidden', position: 'relative' }}>
            <img
              src={logoSrc}
              alt="MUSION"
              style={{
                width: '90px',
                height: 'auto',
                position: 'absolute',
                bottom: 0,
                left: 0,
                filter: 'invert(1) grayscale(1) brightness(3)',
                display: 'block',
              }}
            />
          </div>
          {/* Small butterfly icon after the N */}
          <div style={{ width: 18, height: 14, overflow: 'hidden', marginBottom: 2 }}>
            <img
              src={logoSrc}
              alt="Musion icon"
              style={{
                width: '18px',
                height: 'auto',
                display: 'block',
                filter: 'brightness(1.1) opacity(0.9)',
              }}
            />
          </div>
        </div>

        <motion.button
          onClick={() => setModalOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #00e5ff, #e040fb)',
            color: '#06060c',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: '0.8rem',
            letterSpacing: '0.02em',
            borderRadius: 999,
            padding: '8px 22px',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
          whileHover={{ scale: 1.04, boxShadow: '0 0 18px rgba(0,229,255,0.25)' }}
          whileTap={{ scale: 0.97 }}
        >
          Get Early Access
        </motion.button>
      </motion.header>

      {modalOpen && <WaitlistModal onClose={() => setModalOpen(false)} />}
    </>
  );
}


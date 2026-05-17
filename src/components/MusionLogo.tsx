import { motion } from 'framer-motion';
import logoSrc from '../assets/musion-logo.png';

export default function MusionLogo() {
  return (
    <motion.div
      className="fixed top-5 left-6 md:top-7 md:left-8 z-50 flex flex-col items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Butterfly icon — crop to top 76% of image */}
      <div style={{ width: 62, height: 48, overflow: 'hidden' }}>
        <img
          src={logoSrc}
          alt="Musion icon"
          style={{ width: '62px', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Gap */}
      <div style={{ height: 5 }} />

      {/* MUSION text — bottom 22% of image, inverted to white */}
      <div style={{ width: 70, height: 17, overflow: 'hidden', position: 'relative' }}>
        <img
          src={logoSrc}
          alt="MUSION"
          style={{
            width: '70px',
            height: 'auto',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            filter: 'invert(1) grayscale(1) brightness(3)',
            display: 'block',
          }}
        />
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import intelligenceVideo from '../assets/intelligence-preview.mov';

export default function Scene5Intelligence() {
  return (
    <section className="scene-section">
      <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* Left: text */}
        <div className="flex flex-col gap-5 w-full md:w-[45%]">
          <motion.p
            className="font-body text-sm tracking-[0.18em] uppercase"
            style={{ color: 'var(--accent-cyan)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            Powered by Production Intelligence
          </motion.p>

          <motion.h2
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(24px, 3.2vw, 44px)',
              lineHeight: 1.15,
              margin: 0,
              fontWeight: 300,
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: false }}
          >
            The more music gets made here,{' '}
            <span style={{ color: 'var(--accent-cyan)' }}>the better we get at making yours.</span>
          </motion.h2>

          <motion.p
            className="font-body leading-relaxed"
            style={{ color: 'var(--text-dim)', fontSize: 'clamp(13px, 1.3vw, 17px)' }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: false }}
          >
            Every collaboration is scored across creative compatibility, genre, workflow, budget, timelines and production style.
          </motion.p>
        </div>

        {/* Right: video preview */}
        <motion.div
          className="w-full md:w-[55%] flex items-center justify-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: false }}
        >
          {/* Outer glow halo */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: -1,
              borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(0,229,255,0.25), rgba(224,64,251,0.15))',
              filter: 'blur(18px)',
              zIndex: 0,
            }} />

            {/* Video frame */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              borderRadius: 18,
              overflow: 'hidden',
              border: '1px solid rgba(0,229,255,0.18)',
              background: '#000',
              boxShadow: '0 0 40px rgba(0,229,255,0.08), 0 24px 60px rgba(0,0,0,0.6)',
              maxWidth: 480,
              width: '100%',
            }}>
              {/* Faux browser / app top bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.03)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                <div style={{
                  marginLeft: 8,
                  fontSize: 9,
                  fontFamily: 'var(--font-mono)',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '0.08em',
                }}>
                  musion.one — intelligence layer
                </div>
              </div>

              {/* The actual video */}
              <video
                src={intelligenceVideo}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  display: 'block',
                  maxHeight: 340,
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

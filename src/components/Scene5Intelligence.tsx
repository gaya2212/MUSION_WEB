import { motion } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';

export default function Scene5Intelligence() {
  return (
    <section className="scene-section">
      <ParticleCanvas mode="constellation" particleCount={14} maxOpacity={0.15} />

      <div className="relative z-10 w-full max-w-3xl px-6 py-10 flex flex-col gap-8">
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: false }}
        >
          <p
            className="font-body text-sm tracking-[0.18em] uppercase"
            style={{ color: 'var(--accent-cyan)' }}
          >
            Powered by Production Intelligence
          </p>

          <h2
            style={{
              color: 'var(--text-primary)',
              fontSize: 'clamp(28px, 4vw, 52px)',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Every artist who came before you
            <br />
            made Musion better for you.
          </h2>

          <p
            className="font-body text-base md:text-lg leading-relaxed"
            style={{ color: 'var(--text-dim)' }}
          >
            Every project teaches us which studios deliver, which engineers fit which sounds,
            and which timelines actually hold. That knowledge lives in the platform — not with
            one person. So when you start, you're not starting from zero. You're backed by
            every project that came before yours.
          </p>

          <p
            className="font-body text-sm md:text-base leading-relaxed"
            style={{ color: 'var(--accent-cyan)' }}
          >
            More Artists → Richer Data → Smarter Matching → More Finished Records → More Artists
          </p>

          <p
            className="font-body text-base md:text-lg leading-relaxed"
            style={{ color: 'var(--text-primary)' }}
          >
            The more music gets made here, the better we get at making yours.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { DollarSign, RefreshCw, FolderClock } from 'lucide-react';

const painPoints = [
  {
    title: 'The studio that ate your budget',
    body: "The rate looked fine. The clock didn't care. You left with less money and no usable take.",
    icon: DollarSign,
  },
  {
    title: 'You finished the album. Now what?',
    body: "Marketing, social, PR, playlist pitching — nobody teaches you this. So it sits there. Finished and invisible.",
    icon: RefreshCw,
  },
  {
    title: 'The project collecting dust',
    body: "One thing fell apart. Then the momentum died. Six months later it's still in a folder, waiting to be heard.",
    icon: FolderClock,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export default function Scene2Pain() {
  return (
    <section className="scene-section">
      <div className="relative z-10 w-full max-w-6xl px-6 py-8 flex flex-col items-center">
        <motion.p
          className="text-center mb-4 font-body text-sm tracking-[0.16em] uppercase"
          style={{ color: 'var(--accent-cyan)' }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: false }}
        >
          If you've made music independently, you know exactly how this goes.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:[&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:max-w-[calc(50%-10px)] md:[&>*:last-child:nth-child(odd)]:mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
        >
          {painPoints.map((point) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                variants={cardVariants}
                className="glass-card p-7 group transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: 'rgba(0, 229, 255, 0.06)',
                      border: '1px solid rgba(0, 229, 255, 0.1)',
                    }}
                  >
                    <Icon
                      size={20}
                      className="transition-colors duration-500"
                      style={{ color: 'var(--accent-cyan)' }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3
                      className="font-body text-sm font-semibold leading-snug"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {point.title}
                    </h3>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: 'var(--text-dim)' }}
                    >
                      {point.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="text-center mt-10 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: false, margin: '-80px' }}
        >
          <p
            className="font-body text-base md:text-xl leading-relaxed mt-3"
            style={{ color: 'var(--text-dim)' }}
          >
            None of this happened because you're not talented enough.
            <br />
            It happened because nobody built you the infrastructure to finish.
            <br />
            Until now.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

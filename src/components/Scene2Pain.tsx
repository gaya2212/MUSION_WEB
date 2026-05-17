import { motion } from 'framer-motion';
import { MessageSquareOff, DollarSign, RefreshCw, FolderClock } from 'lucide-react';

const painPoints = [
  {
    title: 'The producer who ghosted',
    subtitle: 'Weeks of silence. No replies. Just gone.',
    icon: MessageSquareOff,
  },
  {
    title: 'The studio that broke your budget',
    subtitle: 'Hidden fees. Overtime charges. No transparency.',
    icon: DollarSign,
  },
  {
    title: 'The mix that came back wrong. Three times.',
    subtitle: 'Revision loops that drain your creative energy.',
    icon: RefreshCw,
  },
  {
    title: 'The EP sitting in a folder from 8 months ago',
    subtitle: 'Started with fire. Now collecting digital dust.',
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
      <div className="relative z-10 w-full max-w-4xl px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
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
                      className="font-body text-xs leading-relaxed"
                      style={{ color: 'var(--text-dim)' }}
                    >
                      {point.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          className="text-center mt-10 font-body text-sm tracking-wide"
          style={{ color: 'var(--text-dim)' }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: false }}
        >
          Sound familiar?
        </motion.p>
      </div>
    </section>
  );
}

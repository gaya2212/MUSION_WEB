import { motion } from 'framer-motion';
import { MessageSquareOff, DollarSign, RefreshCw, FolderClock } from 'lucide-react';

const painPoints = [
  {
    title: 'The producer who ghosted',
    body: "You found someone promising. Sent the files. Waited three weeks. Then two more. The project is still sitting there, half-built, in someone else's hands.",
    icon: MessageSquareOff,
  },
  {
    title: 'The studio that broke your budget',
    body: "The hourly rate sounded fine. The hidden fees didn't. By the time you were done, you'd spent twice what you planned and still didn't have a mix.",
    icon: DollarSign,
  },
  {
    title: 'The mix that came back wrong. Three times.',
    body: "You gave notes. They said they got it. You listened back and it still wasn't right. No accountability. No structure. Just endless back and forth going nowhere.",
    icon: RefreshCw,
  },
  {
    title: 'The EP sitting in a folder from 8 months ago',
    body: "You started with fire. The sessions were good. Then one thing fell through, then another, and now the whole project lives in a folder you haven't opened since.",
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
          Sound familiar?
        </motion.p>

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
            className="font-body text-lg md:text-2xl leading-relaxed"
            style={{ color: 'var(--text-primary)' }}
          >
            We built Musion because this story is too common.
          </p>
          <p
            className="font-body text-base md:text-xl leading-relaxed mt-3"
            style={{ color: 'var(--text-dim)' }}
          >
            Not because artists lack talent.
            <br />
            Because the industry has never given them the infrastructure to finish.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

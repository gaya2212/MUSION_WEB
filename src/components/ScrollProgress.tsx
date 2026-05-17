import { motion } from 'framer-motion';

interface ScrollProgressProps {
  activeScene: number;
}

const scenes = [1, 2, 3, 4, 5, 6, 7];

export default function ScrollProgress({ activeScene }: ScrollProgressProps) {
  return (
    <div className="fixed right-5 md:right-7 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3.5">
      {scenes.map((scene) => {
        const isActive = scene === activeScene;
        return (
          <motion.div
            key={scene}
            className="rounded-full cursor-pointer"
            animate={{
              width: isActive ? 8 : 6,
              height: isActive ? 8 : 6,
              backgroundColor: isActive ? '#00e5ff' : 'rgba(80, 80, 104, 0.5)',
              boxShadow: isActive
                ? '0 0 8px rgba(0, 229, 255, 0.6), 0 0 20px rgba(0, 229, 255, 0.2)'
                : 'none',
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          />
        );
      })}
    </div>
  );
}

import { useEffect, useState, useCallback, useRef } from 'react';
import Scene1Hero from './components/Scene1Hero';
import Scene2Pain from './components/Scene2Pain';
import Scene3Turning from './components/Scene3Turning';
import Scene4Pipeline from './components/Scene4Pipeline';
import Scene5Intelligence from './components/Scene5Intelligence';
import Scene6Completion from './components/Scene6Completion';
import Scene7CTA from './components/Scene7CTA';
import ScrollProgress from './components/ScrollProgress';
import MusionLogo from './components/MusionLogo';

const TOTAL_SCENES = 7;
const AUTO_INTERVAL = 5000; // ms per scene
const PAUSE_AFTER_INTERACTION = 12000; // ms pause after user scrolls/clicks

function App() {
  const [activeScene, setActiveScene] = useState(1);
  const pausedUntil = useRef<number>(0);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToScene = useCallback((index: number) => {
    const sections = document.querySelectorAll('section');
    const target = sections[index];
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleScroll = useCallback(() => {
    const sections = document.querySelectorAll('section');
    const viewportCenter = window.innerHeight / 2;
    let closest = 0;
    let closestDist = Infinity;
    sections.forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const dist = Math.abs(sectionCenter - viewportCenter);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    setActiveScene(closest + 1);
  }, []);

  // Pause auto-advance when user interacts
  const handleUserInteraction = useCallback(() => {
    pausedUntil.current = Date.now() + PAUSE_AFTER_INTERACTION;
  }, []);

  // Auto-advance
  useEffect(() => {
    autoTimer.current = setInterval(() => {
      if (Date.now() < pausedUntil.current) return;
      setActiveScene((prev) => {
        const next = prev < TOTAL_SCENES ? prev : 1; // stop at last scene, loop back to 1
        scrollToScene(next - 1);
        return next;
      });
    }, AUTO_INTERVAL);
    return () => { if (autoTimer.current) clearInterval(autoTimer.current); };
  }, [scrollToScene]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [handleScroll, handleUserInteraction]);

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)' }}>
      <MusionLogo />
      <ScrollProgress activeScene={activeScene} />
      <Scene1Hero />
      <Scene2Pain />
      <Scene3Turning />
      <Scene4Pipeline />
      <Scene5Intelligence />
      <Scene6Completion />
      <Scene7CTA />
    </div>
  );
}

export default App;

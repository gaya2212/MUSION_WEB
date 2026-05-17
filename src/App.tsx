import { useEffect, useState, useCallback } from 'react';
import Scene1Hero from './components/Scene1Hero';
import Scene2Pain from './components/Scene2Pain';
import Scene3Turning from './components/Scene3Turning';
import Scene4Pipeline from './components/Scene4Pipeline';
import Scene5Intelligence from './components/Scene5Intelligence';
import Scene6Completion from './components/Scene6Completion';
import Scene7CTA from './components/Scene7CTA';
import ScrollProgress from './components/ScrollProgress';
import MusionLogo from './components/MusionLogo';

function App() {
  const [activeScene, setActiveScene] = useState(1);

  const handleScroll = useCallback(() => {
    const sections = document.querySelectorAll('section');
    const viewportCenter = window.innerHeight / 2;

    let closest = 0;
    let closestDist = Infinity;

    sections.forEach((section, i) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const dist = Math.abs(sectionCenter - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });

    setActiveScene(closest + 1);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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

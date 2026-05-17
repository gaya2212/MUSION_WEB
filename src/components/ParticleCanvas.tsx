import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  angle: number;
  radius: number;
  centerX: number;
  centerY: number;
  angularSpeed: number;
  baseOpacity: number;
}

type Mode = 'drift' | 'burst' | 'orbital' | 'constellation';

interface ParticleCanvasProps {
  mode: Mode;
  particleCount?: number;
  maxOpacity?: number;
  className?: string;
}

export default function ParticleCanvas({
  mode,
  particleCount = 50,
  maxOpacity = 0.4,
  className = '',
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });

  const initParticles = useCallback(() => {
    const { w, h } = sizeRef.current;
    if (w === 0 || h === 0) return;

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseOpacity = Math.random() * maxOpacity * 0.6 + maxOpacity * 0.1;

      if (mode === 'drift') {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.8 + 0.4,
          opacity: baseOpacity,
          baseOpacity,
          angle: 0,
          radius: 0,
          centerX: 0,
          centerY: 0,
          angularSpeed: 0,
        });
      } else if (mode === 'orbital') {
        const cx = w / 2;
        const cy = h / 2;
        const r = Math.random() * Math.min(w, h) * 0.38 + 20;
        const a = Math.random() * Math.PI * 2;
        particles.push({
          x: cx + Math.cos(a) * r,
          y: cy + Math.sin(a) * r,
          vx: 0,
          vy: 0,
          size: Math.random() * 1.5 + 0.5,
          opacity: baseOpacity,
          baseOpacity,
          angle: a,
          radius: r,
          centerX: cx,
          centerY: cy,
          angularSpeed: (Math.random() * 0.003 + 0.0008) * (Math.random() > 0.5 ? 1 : -1),
        });
      } else if (mode === 'burst') {
        const a = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.6 + 0.15;
        particles.push({
          x: w / 2,
          y: h / 2,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed,
          size: Math.random() * 2 + 0.5,
          opacity: baseOpacity,
          baseOpacity,
          angle: 0,
          radius: 0,
          centerX: 0,
          centerY: 0,
          angularSpeed: 0,
        });
      } else if (mode === 'constellation') {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 2 + 0.8,
          opacity: baseOpacity,
          baseOpacity,
          angle: 0,
          radius: 0,
          centerX: 0,
          centerY: 0,
          angularSpeed: 0,
        });
      }
    }

    particlesRef.current = particles;
  }, [mode, particleCount, maxOpacity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const w = rect.width;
      const h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      initParticles();
    };

    resize();
    window.addEventListener('resize', resize);

    const connectionDist = mode === 'constellation' ? 130 : 0;

    const animate = () => {
      const { w, h } = sizeRef.current;
      if (w === 0 || h === 0) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;

      for (const p of particles) {
        if (mode === 'orbital') {
          p.angle += p.angularSpeed;
          p.x = p.centerX + Math.cos(p.angle) * p.radius;
          p.y = p.centerY + Math.sin(p.angle) * p.radius;
        } else {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }

        // Subtle opacity breathing
        p.opacity = p.baseOpacity + Math.sin(Date.now() * 0.001 + p.angle) * p.baseOpacity * 0.3;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${Math.max(0, Math.min(1, p.opacity))})`;
        ctx.fill();
      }

      // Constellation connections
      if (mode === 'constellation' && connectionDist > 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionDist) {
              const alpha = (1 - dist / connectionDist) * 0.12;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [mode, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../../lib/motion';

// Voguestock palette: oranges, warm ink and sand.
const PALETTE = [
  'rgba(239, 126, 46, ',
  'rgba(251, 122, 46, ',
  'rgba(217, 102, 26, ',
  'rgba(244, 146, 77, ',
  'rgba(163, 77, 14, ',
  'rgba(36, 22, 9, ',
  'rgba(99, 86, 76, ',
  'rgba(214, 180, 150, ',
];

interface Particle {
  x: number;
  y: number;
  z: number;
  baseSize: number;
  color: string;
  alpha: number;
}

interface ParticleSphereProps {
  /** Run the rotation loop; when false a single static frame is drawn. */
  active?: boolean;
}

export default function ParticleSphereAnimation({ active = true }: ParticleSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const parent = canvas.parentElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const angleX = 0.0015;
    const angleY = 0.0035;
    let width = 0;
    let radius = 0;
    let particles: Particle[] = [];
    let raf = 0;

    const build = () => {
      width = parent?.clientWidth || 300;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(width * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      radius = width * 0.42;
      const count = width < 400 ? 1600 : 3200;
      const phi = (1 + Math.sqrt(5)) / 2;
      particles = [];
      for (let i = 0; i < count; i++) {
        const theta = (2 * Math.PI * i) / phi;
        const y = 1 - (i / (count - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const jitter = radius * (0.94 + Math.random() * 0.12);
        const rand = Math.random();
        let color: string;
        if (y < -0.6) color = rand > 0.5 ? PALETTE[0] : rand > 0.25 ? PALETTE[2] : PALETTE[5];
        else if (y > 0.4) color = rand > 0.4 ? PALETTE[3] : rand > 0.2 ? PALETTE[7] : PALETTE[6];
        else color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        particles.push({
          x: Math.cos(theta) * radiusAtY * jitter,
          y: y * radius,
          z: Math.sin(theta) * radiusAtY * jitter,
          baseSize: 0.8 + Math.random() * 1.4,
          color,
          alpha: 0.4 + Math.random() * 0.6,
        });
      }
      particles.sort((a, b) => a.z - b.z);
    };

    const draw = (rotate: boolean) => {
      ctx.clearRect(0, 0, width, width);
      const center = width / 2;
      if (rotate) {
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        for (const p of particles) {
          const x1 = p.x * cosY - p.z * sinY;
          const z1 = p.z * cosY + p.x * sinY;
          const y2 = p.y * cosX - z1 * sinX;
          const z2 = z1 * cosX + p.y * sinX;
          p.x = x1;
          p.y = y2;
          p.z = z2;
        }
        particles.sort((a, b) => a.z - b.z);
      }
      for (const p of particles) {
        const scale = 500 / (500 + p.z);
        const depthAlpha = Math.max(0.15, Math.min(1, (p.z + radius * 1.2) / (2.4 * radius)));
        ctx.fillStyle = `${p.color}${(p.alpha * depthAlpha).toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(center + p.x * scale, center + p.y * scale, p.baseSize * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = active && !reducedMotion;
    const start = () => {
      cancelAnimationFrame(raf);
      if (animate) {
        const loop = () => {
          draw(true);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      } else {
        draw(false);
      }
    };

    build();
    start();
    const ro = new ResizeObserver(() => {
      if (!parent || Math.abs(parent.clientWidth - width) < 1) return;
      build();
      start();
    });
    if (parent) ro.observe(parent);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [active, reducedMotion]);

  return (
    <div className="pointer-events-none relative flex h-full w-full items-center justify-center">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

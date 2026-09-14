import { useEffect, useRef } from 'react';
import { useMotionPaused, useMotionSpeed, usePageVisible } from '../../../lib/motion';

// Voguestock palette: oranges, warm ink and sand.
const PALETTE: [number, number, number][] = [
  [239, 126, 46],
  [251, 122, 46],
  [217, 102, 26],
  [244, 146, 77],
  [163, 77, 14],
  [36, 22, 9],
  [99, 86, 76],
  [214, 180, 150],
];
const ALPHA_STEPS = 24;
const STYLES = PALETTE.map(([r, g, b]) =>
  Array.from({ length: ALPHA_STEPS + 1 }, (_, step) => `rgba(${r}, ${g}, ${b}, ${(step / ALPHA_STEPS).toFixed(3)})`)
);

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  color: number;
  alpha: number;
}

interface Scene {
  particles: Particle[];
  width: number;
  radius: number;
  frames: number;
}

interface ParticleSphereProps {
  /** Whether the sphere is near the viewport; the loop also stops while the tab is hidden or animations are paused. */
  active?: boolean;
}

function buildScene(width: number): Scene {
  const radius = width * 0.42;
  const count = width < 400 ? 1600 : 3200;
  const phi = (1 + Math.sqrt(5)) / 2;
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / phi;
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const jitter = radius * (0.94 + Math.random() * 0.12);
    const rand = Math.random();
    let color: number;
    if (y < -0.6) color = rand > 0.5 ? 0 : rand > 0.25 ? 2 : 5;
    else if (y > 0.4) color = rand > 0.4 ? 3 : rand > 0.2 ? 7 : 6;
    else color = Math.floor(Math.random() * PALETTE.length);
    particles.push({
      x: Math.cos(theta) * radiusAtY * jitter,
      y: y * radius,
      z: Math.sin(theta) * radiusAtY * jitter,
      size: 0.8 + Math.random() * 1.4,
      color,
      alpha: 0.4 + Math.random() * 0.6,
    });
  }
  particles.sort((a, b) => a.z - b.z);
  return { particles, width, radius, frames: 0 };
}

/**
 * Rotating particle globe on a 2D canvas. It runs for every visitor (a little slower under reduced motion) and holds
 * a still frame while off screen, while the tab is hidden and while animations are paused.
 */
export default function ParticleSphereAnimation({ active = true }: ParticleSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const motionPaused = useMotionPaused();
  const pageVisible = usePageVisible();
  const motionSpeed = useMotionSpeed();
  const running = active && pageVisible && !motionPaused;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const parent = canvas?.parentElement;
    if (!canvas || !ctx || !parent) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    const ensureScene = (): Scene => {
      const width = parent.clientWidth || 300;
      const current = sceneRef.current;
      if (current && Math.abs(current.width - width) < 1 && canvas.width === Math.round(width * ratio)) return current;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(width * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const scene = current && Math.abs(current.width - width) < 1 ? current : buildScene(width);
      sceneRef.current = scene;
      return scene;
    };

    const draw = (scene: Scene) => {
      const { width, radius } = scene;
      const center = width / 2;
      ctx.clearRect(0, 0, width, width);
      for (const p of scene.particles) {
        const scale = 500 / (500 + p.z);
        const depth = Math.max(0.15, Math.min(1, (p.z + radius * 1.2) / (2.4 * radius)));
        ctx.fillStyle = STYLES[p.color][Math.round(p.alpha * depth * ALPHA_STEPS)];
        ctx.beginPath();
        ctx.arc(center + p.x * scale, center + p.y * scale, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const rotate = (scene: Scene, factor: number) => {
      const angleY = 0.0035 * factor;
      const angleX = 0.0015 * factor;
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      for (const p of scene.particles) {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        const y2 = p.y * cosX - z1 * sinX;
        p.z = z1 * cosX + p.y * sinX;
        p.x = x1;
        p.y = y2;
      }
      scene.frames += 1;
      if (scene.frames % 8 === 0) scene.particles.sort((a, b) => a.z - b.z);
    };

    draw(ensureScene());

    let frame = 0;
    if (running) {
      let last = performance.now();
      const loop = (now: number) => {
        const scene = sceneRef.current ?? ensureScene();
        rotate(scene, (Math.min(64, now - last) / 16.667) * motionSpeed);
        last = now;
        draw(scene);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    }

    const observer = new ResizeObserver(() => draw(ensureScene()));
    observer.observe(parent);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [running, motionSpeed]);

  return (
    <div className="pointer-events-none relative flex h-full w-full items-center justify-center">
      <canvas ref={canvasRef} data-effect="particles" className="block h-full w-full" />
    </div>
  );
}

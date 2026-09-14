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
const TAU = Math.PI * 2;

// One fill style per (alpha step, colour). Ordered by alpha so dim, far particles are drawn before bright, near ones.
const STYLES: string[] = [];
for (let step = 0; step <= ALPHA_STEPS; step += 1) {
  for (const [r, g, b] of PALETTE) STYLES.push(`rgba(${r}, ${g}, ${b}, ${(step / ALPHA_STEPS).toFixed(3)})`);
}

interface Scene {
  xs: Float64Array;
  ys: Float64Array;
  zs: Float64Array;
  sizes: Float64Array;
  alphas: Float64Array;
  colors: Uint8Array;
  count: number;
  width: number;
  radius: number;
  /** Per fill style: flat x, y, radius triples, reused every frame. */
  buckets: number[][];
}

interface ParticleSphereProps {
  /** Whether the sphere is near the viewport; the loop also stops while the tab is hidden or animations are paused. */
  active?: boolean;
}

function buildScene(width: number): Scene {
  const radius = width * 0.42;
  const count = width < 400 ? 1400 : 2600;
  const phi = (1 + Math.sqrt(5)) / 2;
  const scene: Scene = {
    xs: new Float64Array(count),
    ys: new Float64Array(count),
    zs: new Float64Array(count),
    sizes: new Float64Array(count),
    alphas: new Float64Array(count),
    colors: new Uint8Array(count),
    count,
    width,
    radius,
    buckets: Array.from({ length: STYLES.length }, () => []),
  };
  for (let i = 0; i < count; i += 1) {
    const theta = (TAU * i) / phi;
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const jitter = radius * (0.94 + Math.random() * 0.12);
    const rand = Math.random();
    let color: number;
    if (y < -0.6) color = rand > 0.5 ? 0 : rand > 0.25 ? 2 : 5;
    else if (y > 0.4) color = rand > 0.4 ? 3 : rand > 0.2 ? 7 : 6;
    else color = Math.floor(Math.random() * PALETTE.length);
    scene.xs[i] = Math.cos(theta) * radiusAtY * jitter;
    scene.ys[i] = y * radius;
    scene.zs[i] = Math.sin(theta) * radiusAtY * jitter;
    scene.sizes[i] = 0.8 + Math.random() * 1.4;
    scene.alphas[i] = 0.4 + Math.random() * 0.6;
    scene.colors[i] = color;
  }
  return scene;
}

/**
 * Rotating particle globe on a 2D canvas. It runs for every visitor (a little slower under reduced motion) and holds
 * a still frame while off screen, while the tab is hidden and while animations are paused. Particles are batched into
 * one path per fill style, which keeps the per-frame main-thread cost low.
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
      const sameWidth = current !== null && Math.abs(current.width - width) < 1;
      if (current !== null && sameWidth && canvas.width === Math.round(width * ratio)) return current;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(width * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const scene = current !== null && sameWidth ? current : buildScene(width);
      sceneRef.current = scene;
      return scene;
    };

    const draw = (scene: Scene) => {
      const { xs, ys, zs, sizes, alphas, colors, count, width, radius, buckets } = scene;
      const center = width / 2;
      for (const bucket of buckets) bucket.length = 0;
      for (let i = 0; i < count; i += 1) {
        const z = zs[i];
        const scale = 500 / (500 + z);
        const depth = Math.max(0.15, Math.min(1, (z + radius * 1.2) / (2.4 * radius)));
        const step = Math.round(alphas[i] * depth * ALPHA_STEPS);
        buckets[step * PALETTE.length + colors[i]].push(center + xs[i] * scale, center + ys[i] * scale, sizes[i] * scale);
      }
      ctx.clearRect(0, 0, width, width);
      for (let s = 0; s < buckets.length; s += 1) {
        const bucket = buckets[s];
        if (bucket.length === 0) continue;
        ctx.fillStyle = STYLES[s];
        ctx.beginPath();
        for (let k = 0; k < bucket.length; k += 3) {
          ctx.moveTo(bucket[k] + bucket[k + 2], bucket[k + 1]);
          ctx.arc(bucket[k], bucket[k + 1], bucket[k + 2], 0, TAU);
        }
        ctx.fill();
      }
    };

    const rotate = (scene: Scene, factor: number) => {
      const cosY = Math.cos(0.0035 * factor);
      const sinY = Math.sin(0.0035 * factor);
      const cosX = Math.cos(0.0015 * factor);
      const sinX = Math.sin(0.0015 * factor);
      const { xs, ys, zs, count } = scene;
      for (let i = 0; i < count; i += 1) {
        const x1 = xs[i] * cosY - zs[i] * sinY;
        const z1 = zs[i] * cosY + xs[i] * sinY;
        const y2 = ys[i] * cosX - z1 * sinX;
        zs[i] = z1 * cosX + ys[i] * sinX;
        xs[i] = x1;
        ys[i] = y2;
      }
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

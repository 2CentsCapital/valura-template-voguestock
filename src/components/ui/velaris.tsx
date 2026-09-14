import { useEffect, useRef, type ReactNode } from 'react';
import { useInView, useMotionPaused, useMotionSpeed, usePageVisible } from '../../lib/motion';

const vertexShaderGLSL = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderGLSL = `
precision highp float;
varying vec2 vUv;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_grain;
uniform vec3  u_colors[4];
uniform vec3  u_bg;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float ratio = u_resolution.x / u_resolution.y;
  vec2 p = uv - 0.5;
  p.x *= ratio;

  float t = u_time * 0.1;

  float n1 = snoise(p * 0.4 + vec2(t * 0.2, -t * 0.3));
  float n2 = snoise(p * 0.55 + vec2(-t * 0.15, t * 0.25) + n1 * 0.25);
  float n3 = snoise(p * 0.75 + vec2(t * 0.1, -t * 0.2) + n2 * 0.2);

  vec3 col = u_bg;

  float dist = length(p) * 0.7;
  float vignette = 1.0 - smoothstep(0.4, 1.5, dist);

  col = mix(col, u_colors[0], smoothstep(-0.2, 0.5, n1) * 0.85);
  col = mix(col, u_colors[1], smoothstep(-0.1, 0.6, n2) * 0.7);
  col = mix(col, u_colors[2], smoothstep(-0.3, 0.4, n3) * 0.6);
  col = mix(col, u_colors[3], smoothstep(0.0, 0.7, n1 * n2) * 0.5);

  float glow = smoothstep(0.8, 0.0, dist) * 0.3;
  col += u_colors[1] * glow;

  col = mix(col * 0.2, col, vignette);

  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 + u_time);
  col += (grain - 0.5) * u_grain * 0.1;

  gl_FragColor = vec4(col, 1.0);
}
`;

export interface VelarisProps {
  bg?: string;
  colors?: string[];
  speed?: number;
  grain?: number;
  height?: string;
  className?: string;
  children?: ReactNode;
}

const DEFAULT_COLORS = ['#7a3510', '#a34d0e', '#1a120b', '#ef7e2e'];
const MAX_DEVICE_PIXEL_RATIO = 1.5;

type Rgb = [number, number, number];

const hexToRgb = (hex: string): Rgb => {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
};

interface Renderer {
  advance(ms: number): void;
  draw(bg: Rgb, palette: Float32Array, grain: number, speed: number): void;
  dispose(): void;
}

function createRenderer(canvas: HTMLCanvasElement, container: HTMLElement, onResize: () => void): Renderer | null {
  const gl = canvas.getContext('webgl', { antialias: false, powerPreference: 'low-power' });
  if (!gl) return null;

  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };
  const program = gl.createProgram();
  const vertex = compile(gl.VERTEX_SHADER, vertexShaderGLSL);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentShaderGLSL);
  if (!program || !vertex || !fragment) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const locations = {
    resolution: gl.getUniformLocation(program, 'u_resolution'),
    time: gl.getUniformLocation(program, 'u_time'),
    grain: gl.getUniformLocation(program, 'u_grain'),
    colors: gl.getUniformLocation(program, 'u_colors'),
    bg: gl.getUniformLocation(program, 'u_bg'),
  };

  let elapsed = 4000;

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
    const width = Math.max(1, Math.round(container.clientWidth * ratio));
    const height = Math.max(1, Math.round(container.clientHeight * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  };
  resize();
  const observer = new ResizeObserver(() => {
    resize();
    onResize();
  });
  observer.observe(container);

  return {
    advance(ms) {
      elapsed += ms;
    },
    draw(bg, palette, grain, speed) {
      gl.uniform2f(locations.resolution, canvas.width, canvas.height);
      gl.uniform1f(locations.time, elapsed * 0.001 * speed);
      gl.uniform1f(locations.grain, grain);
      gl.uniform3f(locations.bg, bg[0], bg[1], bg[2]);
      gl.uniform3fv(locations.colors, palette);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    dispose() {
      observer.disconnect();
    },
  };
}

/**
 * Animated WebGL noise background. It runs for every visitor (a little slower under reduced motion), creates its GL
 * context only when the section nears the viewport, renders at most 1.5 device pixels per CSS pixel, and holds a still
 * frame while off screen, while the tab is hidden and while animations are paused.
 */
export default function Velaris({
  bg = '#000000',
  colors = DEFAULT_COLORS,
  speed = 2.0,
  grain = 0.3,
  height = '100vh',
  className = '',
  children,
}: VelarisProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const failedRef = useRef(false);
  const redrawRef = useRef<() => void>(() => undefined);
  const near = useInView(containerRef, '150px');
  const pageVisible = usePageVisible();
  const motionPaused = useMotionPaused();
  const motionSpeed = useMotionSpeed();
  const colorKey = colors.join(',');

  useEffect(() => {
    if (!near || rendererRef.current || failedRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    rendererRef.current = createRenderer(canvas, container, () => redrawRef.current());
    if (!rendererRef.current) failedRef.current = true;
  }, [near]);

  useEffect(
    () => () => {
      rendererRef.current?.dispose();
      rendererRef.current = null;
    },
    []
  );

  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    const bgRgb = hexToRgb(bg);
    const palette = new Float32Array(colorKey.split(',').slice(0, 4).flatMap(hexToRgb));
    const draw = () => renderer.draw(bgRgb, palette, grain, speed);
    redrawRef.current = draw;
    draw();
    if (!near || !pageVisible || motionPaused) return;

    let frame = 0;
    let last = performance.now();
    const loop = (now: number) => {
      renderer.advance(Math.min(100, now - last) * motionSpeed);
      last = now;
      draw();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [near, pageVisible, motionPaused, motionSpeed, bg, colorKey, speed, grain]);

  return (
    <div ref={containerRef} style={{ height }} className={`relative w-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} data-effect="velaris" className="pointer-events-none absolute inset-0 h-full w-full" />
      {children ? <div className="relative z-10 h-full w-full">{children}</div> : null}
    </div>
  );
}

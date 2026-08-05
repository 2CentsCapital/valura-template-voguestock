"use client";

import { useEffect, useRef } from "react";

export default function ParticleSphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = width);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = width;
    };

    window.addEventListener("resize", handleResize);

    // High density particle count matching the reference image
    const numParticles = 3200;
    const particles: {
      x: number;
      y: number;
      z: number;
      baseSize: number;
      color: string;
      alpha: number;
    }[] = [];

    const radius = Math.min(width, height) * 0.42;

    // Palette tailored to stand out vividly on white background while matching reference colors
    const colorPalette = [
      "rgba(37, 99, 235, ",   // Blue-600
      "rgba(59, 130, 246, ",  // Blue-500
      "rgba(96, 165, 250, ",  // Blue-400
      "rgba(30, 41, 59, ",    // Slate-800
      "rgba(71, 85, 105, ",   // Slate-600
      "rgba(14, 165, 233, ",  // Sky-500
      "rgba(6, 182, 212, ",   // Cyan-500
      "rgba(249, 115, 22, ",  // Orange-500
      "rgba(16, 185, 129, ",  // Emerald-500
      "rgba(99, 102, 241, ",  // Indigo-500
    ];

    const phi = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numParticles; i++) {
      const theta = (2 * Math.PI * i) / phi;
      const y = 1 - (i / (numParticles - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);

      // Slight shell volume jitter for depth texture
      const rJitter = radius * (0.94 + Math.random() * 0.12);
      const x = Math.cos(theta) * radiusAtY * rJitter;
      const z = Math.sin(theta) * radiusAtY * rJitter;

      // Pick color based on vertical position & randomness
      let colorPrefix: string;
      const rand = Math.random();

      if (y < -0.6) {
        // Bottom region has orange/green accents like the image
        colorPrefix = rand > 0.5 ? colorPalette[7] : rand > 0.25 ? colorPalette[8] : colorPalette[0];
      } else if (y > 0.4) {
        // Top region is predominantly blue/cyan/white-slate
        colorPrefix = rand > 0.4 ? colorPalette[1] : rand > 0.2 ? colorPalette[5] : colorPalette[3];
      } else {
        // Middle body
        const colorIdx = Math.floor(Math.random() * colorPalette.length);
        colorPrefix = colorPalette[colorIdx];
      }

      particles.push({
        x: x,
        y: y * radius,
        z: z,
        baseSize: 0.8 + Math.random() * 1.4,
        color: colorPrefix,
        alpha: 0.4 + Math.random() * 0.6,
      });
    }

    let angleX = 0.0015;
    let angleY = 0.0035;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Sort particles by Z so rear particles render behind front ones
      particles.sort((a, b) => a.z - b.z);

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];

        // 3D rotation Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // 3D rotation X
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        p.x = x1;
        p.y = y2;
        p.z = z2;

        // Perspective
        const perspective = 500;
        const scale = perspective / (perspective + p.z);
        const projX = cx + p.x * scale;
        const projY = cy + p.y * scale;

        // Fade back particles slightly for depth
        const depthAlpha = Math.max(0.15, Math.min(1, (p.z + radius * 1.2) / (2.4 * radius)));
        const finalAlpha = (p.alpha * depthAlpha).toFixed(2);
        const size = p.baseSize * scale;

        ctx.fillStyle = `${p.color}${finalAlpha})`;
        ctx.beginPath();
        ctx.arc(projX, projY, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full relative flex items-center justify-center pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

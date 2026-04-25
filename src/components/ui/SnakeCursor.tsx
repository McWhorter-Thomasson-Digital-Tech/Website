'use client';

import { useEffect, useRef } from 'react';

interface Ball {
  x: number;
  y: number;
}

// MTDT brand colors — strictly these three, no interpolation
const BRAND_COLORS = [
  { h: 217, s: 91, l: 60 },  // Blue  (#3B82F6)
  { h: 160, s: 84, l: 39 },  // Emerald/Teal
  { h: 25, s: 95, l: 53 },  // Orange (#F97316)
];

const BALL_COUNT = 18;
const BASE_RADIUS = 18;
const EASE_FACTOR = 0.28;
const SHIFT_INTERVAL = 120; // frames between color shifts

export function SnakeCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const mouseRef = useRef({ x: -200, y: -200 });
  const animationRef = useRef<number>(0);
  const frameRef = useRef(0);
  const colorOffsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    if (ballsRef.current.length === 0) {
      for (let i = 0; i < BALL_COUNT; i++) {
        ballsRef.current.push({ x: -200, y: -200 });
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const balls = ballsRef.current;
      frameRef.current++;

      // Shift the color assignment every SHIFT_INTERVAL frames
      if (frameRef.current % SHIFT_INTERVAL === 0) {
        colorOffsetRef.current = (colorOffsetRef.current + 1) % BRAND_COLORS.length;
      }

      for (let i = 0; i < balls.length; i++) {
        const target = i === 0 ? mouseRef.current : balls[i - 1];
        const ease = EASE_FACTOR * (1 - i * 0.028);
        balls[i].x += (target.x - balls[i].x) * ease;
        balls[i].y += (target.y - balls[i].y) * ease;
      }

      for (let i = balls.length - 1; i >= 0; i--) {
        const b = balls[i];
        const t = i / (balls.length - 1); // 0 = head, 1 = tail
        const radius = BASE_RADIUS * (1 - t * 0.6);
        const opacity = 0.85 - t * 0.55;

        // Each ball picks directly from the brand palette — no interpolation
        const colorIdx = (i + colorOffsetRef.current) % BRAND_COLORS.length;
        const { h, s, l } = BRAND_COLORS[colorIdx];

        // Outer bloom glow
        const bloom = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, radius * 3);
        bloom.addColorStop(0, `hsla(${h}, ${s}%, ${l + 10}%, ${opacity * 0.3})`);
        bloom.addColorStop(0.4, `hsla(${h}, ${s}%, ${l}%, ${opacity * 0.1})`);
        bloom.addColorStop(1, `hsla(${h}, ${s}%, ${l - 10}%, 0)`);
        ctx.beginPath();
        ctx.arc(b.x, b.y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = bloom;
        ctx.fill();

        // Core ball gradient
        const grad = ctx.createRadialGradient(
          b.x - radius * 0.25,
          b.y - radius * 0.25,
          radius * 0.05,
          b.x,
          b.y,
          radius
        );
        grad.addColorStop(0, `hsla(${h}, ${s}%, 92%, ${opacity})`);
        grad.addColorStop(0.35, `hsla(${h}, ${s}%, ${l + 12}%, ${opacity * 0.9})`);
        grad.addColorStop(0.7, `hsla(${h}, ${s}%, ${l}%, ${opacity * 0.7})`);
        grad.addColorStop(1, `hsla(${h}, ${s}%, ${l - 15}%, ${opacity * 0.3})`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Specular highlight
        ctx.beginPath();
        ctx.arc(
          b.x - radius * 0.28,
          b.y - radius * 0.3,
          radius * 0.3,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `hsla(0, 0%, 100%, ${opacity * 0.45})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}

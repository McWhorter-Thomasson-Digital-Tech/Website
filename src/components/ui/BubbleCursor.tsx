'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Bubble {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
}

const BUBBLE_HUES = [210, 185, 160, 25, 195, 340];

export function BubbleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const animationRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);

  const spawnBubbles = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastSpawnRef.current < 25) return;
    lastSpawnRef.current = now;

    const count = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 1.5;
      const maxLife = 50 + Math.random() * 70;

      bubblesRef.current.push({
        x: x + (Math.random() - 0.5) * 24,
        y: y + (Math.random() - 0.5) * 24,
        vx: Math.cos(angle) * speed,
        vy: -0.8 - Math.random() * 2.5,
        radius: 3 + Math.random() * 18,
        opacity: 0.35 + Math.random() * 0.35,
        hue: BUBBLE_HUES[Math.floor(Math.random() * BUBBLE_HUES.length)],
        life: 0,
        maxLife,
      });
    }
  }, []);

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

    const onMouseMove = (e: MouseEvent) => {
      spawnBubbles(e.clientX, e.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        spawnBubbles(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchMove);
    window.addEventListener('touchmove', onTouchMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bubbles = bubblesRef.current;
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.life++;
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= 0.985;
        b.vy *= 0.975;

        const progress = b.life / b.maxLife;
        const currentOpacity = b.opacity * (1 - progress);
        const currentRadius = b.radius * (1 - progress * 0.4);

        if (b.life >= b.maxLife || currentOpacity <= 0.01) {
          bubbles.splice(i, 1);
          continue;
        }

        // Glassy bubble body
        const grad = ctx.createRadialGradient(
          b.x - currentRadius * 0.3,
          b.y - currentRadius * 0.3,
          currentRadius * 0.05,
          b.x,
          b.y,
          currentRadius
        );
        grad.addColorStop(0, `hsla(${b.hue}, 85%, 78%, ${currentOpacity * 0.7})`);
        grad.addColorStop(0.45, `hsla(${b.hue}, 75%, 62%, ${currentOpacity * 0.35})`);
        grad.addColorStop(1, `hsla(${b.hue}, 65%, 50%, ${currentOpacity * 0.08})`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Rim highlight
        ctx.strokeStyle = `hsla(${b.hue}, 80%, 82%, ${currentOpacity * 0.25})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Specular shine
        ctx.beginPath();
        ctx.arc(
          b.x - currentRadius * 0.28,
          b.y - currentRadius * 0.28,
          currentRadius * 0.25,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `hsla(0, 0%, 100%, ${currentOpacity * 0.35})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [spawnBubbles]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
}

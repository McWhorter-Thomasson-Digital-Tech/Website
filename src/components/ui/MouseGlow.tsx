'use client';

import { useEffect, useState } from 'react';

export function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [hue, setHue] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let idleTimeout: NodeJS.Timeout;

    const handleInteraction = (x: number, y: number) => {
      setMousePosition({ x, y });
      setOpacity(1);

      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        setOpacity(0);
      }, 2000);
    };

    const onMouseMove = (e: MouseEvent) => handleInteraction(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchMove);
    window.addEventListener('touchmove', onTouchMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      clearTimeout(idleTimeout);
    };
  }, []);

  useEffect(() => {
    let animationFrame: number;
    const updateColor = () => {
      setHue((prev) => (prev + 0.5) % 360);
      animationFrame = requestAnimationFrame(updateColor);
    };
    animationFrame = requestAnimationFrame(updateColor);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-1000"
      style={{
        opacity,
        background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, hsla(${hue}, 100%, 65%, 0.12), transparent 60%)`,
      }}
    />
  );
}

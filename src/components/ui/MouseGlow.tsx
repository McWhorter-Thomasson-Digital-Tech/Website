'use client';

import { useEffect, useState } from 'react';

export function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [hue, setHue] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      className="pointer-events-none fixed inset-0 z-50 transition-colors duration-100"
      style={{
        background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, hsla(${hue}, 100%, 65%, 0.12), transparent 60%)`,
      }}
    />
  );
}

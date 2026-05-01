'use client';

import { useEffect, useState } from 'react';
import { useGlobalCursor } from '@/lib/CursorContext';
import { MouseGlow } from './MouseGlow';
import { BubbleCursor } from './BubbleCursor';
import { SnakeCursor } from './SnakeCursor';

const CURSOR_MAP = {
  glow: MouseGlow,
  bubbles: BubbleCursor,
  snake: SnakeCursor,
} as const;

export function GlobalCursor() {
  const { cursorType } = useGlobalCursor();
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the device has a fine pointer (mouse/stylus)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // We no longer block mobile, as we now handle transient visibility in the sub-components
  // if (isDesktop === false || isDesktop === null) return null;

  const ActiveCursor = CURSOR_MAP[cursorType];
  return <ActiveCursor />;
}

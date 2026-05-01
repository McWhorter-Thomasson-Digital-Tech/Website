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
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Check if the device has a fine pointer (mouse/stylus)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    // Detect Safari
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(isSafariBrowser);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Only disable for Safari on mobile/tablet to prevent immersive UI/border transparency issues
  // Desktop Safari is reportedly fine.
  if (isSafari && isDesktop === false) return null;

  // We no longer block mobile, as we now handle transient visibility in the sub-components
  // if (isDesktop === false || isDesktop === null) return null;

  const ActiveCursor = CURSOR_MAP[cursorType];
  return <ActiveCursor />;
}

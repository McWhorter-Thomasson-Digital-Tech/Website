'use client';

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
  const ActiveCursor = CURSOR_MAP[cursorType];
  return <ActiveCursor />;
}

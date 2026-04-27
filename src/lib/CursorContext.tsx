'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type CursorType = 'glow' | 'bubbles' | 'snake';

interface CursorContextValue {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
}

const CursorContext = createContext<CursorContextValue>({
  cursorType: 'glow',
  setCursorType: () => { },
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorType, setCursorType] = useState<CursorType>('glow');

  return (
    <CursorContext.Provider value={{ cursorType, setCursorType }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useGlobalCursor() {
  return useContext(CursorContext);
}

import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-8">
        <Link 
          href="/" 
          className="font-black text-2xl tracking-tighter uppercase text-foreground transition-colors hover:text-primary"
        >
          MTDT
        </Link>
        
        <nav className="hidden md:flex flex-1 items-center justify-end gap-12 mr-12">
          <Link href="/services" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Services</Link>
          <Link href="/pricing" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
          <Link href="/about" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">About</Link>
        </nav>

        <div>
          <Link 
            href="/contact" 
            className={buttonVariants({ variant: "default", className: "font-black uppercase tracking-widest" })}
          >
            INITIALIZE
          </Link>
        </div>
      </div>
    </header>
  );
}

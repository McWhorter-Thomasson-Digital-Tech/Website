import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full bg-background bg-blueprint border-b border-border overflow-hidden flex items-center">
      {/* Decorative vertical technical slice */}
      <div className="absolute right-0 top-0 bottom-0 w-[20%] border-l border-border bg-muted/30 hidden xl:flex flex-col justify-end p-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <div className="mb-4">MTDT / Core</div>
        <div className="w-full h-[1px] bg-border mb-4" />
        <div className="animate-pulse text-primary mb-2">● SYS ONLINE</div>
        <div>v2.0.2 / React</div>
      </div>
      
      <div className="mx-auto px-4 sm:px-8 xl:px-16 relative z-10 w-full pt-16 xl:max-w-none">
        <div className="flex flex-col xl:flex-row w-full gap-12 xl:gap-0">
          
          {/* Massive Typographic Focus */}
          <div className="w-full xl:w-[80%] flex flex-col justify-center">
            <h1 className="font-black text-[12vw] sm:text-[10vw] xl:text-[8vw] leading-[0.85] tracking-tighter uppercase text-foreground mb-8">
              WE BUILD <br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--foreground)' }}>DIGITAL</span> <br/>
              MACHINES
            </h1>
            
            <p className="max-w-2xl text-lg sm:text-xl md:text-2xl font-medium text-muted-foreground mb-12 border-l-8 border-primary pl-6">
              Engineering high-velocity React ecosystems and immutable backend pipelines for modern innovators.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link 
                href="#react-websites" 
                className={buttonVariants({ variant: "default", size: "lg", className: "h-16 px-10 text-lg font-black uppercase tracking-widest border border-primary hover:bg-transparent hover:text-primary transition-all duration-300" })}
              >
                DEPLOY FRONTEND
              </Link>
              <Link 
                href="#backend" 
                className={buttonVariants({ variant: "outline", size: "lg", className: "h-16 px-10 text-lg font-black uppercase tracking-widest bg-background hover:bg-muted transition-all duration-300" })}
              >
                COMPILE BACKEND
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

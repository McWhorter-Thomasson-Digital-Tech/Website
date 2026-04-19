import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background relative overflow-hidden pt-24 pb-8">
      
      {/* Massive Background Wordmark */}
      <div className="absolute bottom-0 left-0 w-full flex justify-center translate-y-[20%] pointer-events-none select-none opacity-[0.04]">
        <span className="font-black text-[25vw] leading-none tracking-tighter uppercase whitespace-nowrap">
          MTDT
        </span>
      </div>
      
      <div className="mx-auto px-4 sm:px-8 xl:px-16 xl:max-w-none relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          
          <div className="lg:col-span-2">
            <Link href="/" className="font-black text-4xl md:text-6xl tracking-tighter uppercase text-foreground mb-6 block hover:text-primary transition-colors">MTDT</Link>
            <p className="font-mono text-muted-foreground uppercase max-w-md border-l-4 border-primary pl-4">
              {`[INSERT_COMPANY_MISSION_OR_TAGLINE]`}
            </p>
          </div>
          
          <div>
            <h4 className="font-mono text-sm text-primary uppercase tracking-[0.2em] mb-6">Directory</h4>
            <ul className="flex flex-col gap-4 font-black uppercase tracking-widest text-sm border-l border-border pl-6">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
             <h4 className="font-mono text-sm text-primary uppercase tracking-[0.2em] mb-6">Terminal</h4>
             <div className="font-mono text-xs text-muted-foreground p-6 border border-border bg-muted/20">
               {'>'} SYSTEM_READY <br/>
               {'>'} WAITING_FOR_INPUT <br/>
               <span className="animate-pulse inline-block w-2 h-4 bg-primary align-middle mt-2" />
             </div>
          </div>
          
        </div>
        
        <div className="w-full border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs uppercase text-muted-foreground tracking-widest">
            &copy; {new Date().getFullYear()} McWhorter-Thomasson Digital Technologies.
          </p>
          <div className="font-mono text-xs uppercase text-primary font-bold tracking-widest">
            ALL SYSTEMS NOMINAL
          </div>
        </div>
      </div>
    </footer>
  );
}

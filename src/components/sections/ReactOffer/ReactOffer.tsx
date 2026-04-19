import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export function ReactOffer() {
  return (
    <section id="react-websites" className="w-full bg-background border-b border-border py-24 relative overflow-hidden">
      <div className="mx-auto px-4 sm:px-8 xl:px-16 xl:max-w-none">
        
        {/* Header Block */}
        <div className="mb-16 border-l-8 border-primary pl-6">
          <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter text-foreground mb-4">
            {`[INSERT_REACT_OFFER_H2]`}
          </h2>
          <p className="text-xl md:text-2xl font-mono text-muted-foreground uppercase tracking-widest">
            {`[INSERT_REACT_OFFER_DESCRIPTION]`}
          </p>
        </div>
        
        {/* Technical Pricing Block */}
        <div className="w-full border border-border bg-card p-0 flex flex-col xl:flex-row">
          
          <div className="xl:w-1/3 p-8 md:p-12 border-b xl:border-b-0 xl:border-r border-border bg-muted/20 flex flex-col justify-center">
            <div className="font-mono text-sm text-primary uppercase tracking-[0.2em] mb-4">Pricing_Tier</div>
            <h3 className="font-black text-4xl uppercase mb-6 truncate">{`[INSERT_REACT_TIER_NAME]`}</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-mono">$</span>
              <span className="text-7xl font-black tracking-tighter">199</span>
              <span className="text-xl font-mono text-muted-foreground">/mo</span>
            </div>
            <p className="font-mono text-sm text-muted-foreground border-l-2 border-border pl-4">{`[INSERT_REACT_PRICE_DESC]`}</p>
          </div>
          
          <div className="xl:w-2/3 p-8 md:p-12 flex flex-col justify-between">
            <div className="font-mono text-sm text-primary uppercase tracking-[0.2em] mb-8">System_Specs</div>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
              <li className="flex gap-4 items-start border-b border-border/50 pb-4">
                <span className="font-black text-primary mt-1">01</span>
                <span className="font-medium text-lg uppercase">{`[INSERT_REACT_FEATURE_1]`}</span>
              </li>
              <li className="flex gap-4 items-start border-b border-border/50 pb-4">
                <span className="font-black text-primary mt-1">02</span>
                <span className="font-medium text-lg uppercase">{`[INSERT_REACT_FEATURE_2]`}</span>
              </li>
              <li className="flex gap-4 items-start border-b border-border/50 pb-4">
                <span className="font-black text-primary mt-1">03</span>
                <span className="font-medium text-lg uppercase">{`[INSERT_REACT_FEATURE_3]`}</span>
              </li>
              <li className="flex gap-4 items-start border-b border-border/50 pb-4">
                <span className="font-black text-primary mt-1">04</span>
                <span className="font-medium text-lg uppercase">{`[INSERT_REACT_FEATURE_4]`}</span>
              </li>
            </ul>
            
            <Link 
              href="/contact" 
              className={buttonVariants({ variant: "default", size: "lg", className: "w-full md:w-auto self-start h-16 px-12 text-lg font-black uppercase tracking-widest border border-primary hover:bg-transparent hover:text-primary transition-colors" })}
            >
              EXECUTE DEPLOYMENT
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}

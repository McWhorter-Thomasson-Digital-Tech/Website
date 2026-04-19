import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Settings, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function BackendAutomation() {
  return (
    <section id="backend" className="w-full bg-background border-b border-border py-24 relative bg-blueprint overflow-hidden">
      <div className="mx-auto px-4 sm:px-8 xl:px-16 xl:max-w-none">
        
        <div className="flex flex-col xl:flex-row gap-16">
          
          <div className="xl:w-1/3">
            <div className="sticky top-32">
              <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter text-foreground mb-6 leading-none">
                {`[INSERT_BACKEND_AUTOMATION_H2]`}
              </h2>
              <p className="text-xl font-mono text-muted-foreground uppercase border-l-4 border-primary pl-4 mb-12">
                {`[INSERT_BACKEND_AUTOMATION_DESCRIPTION]`}
              </p>
              
              <div className="border border-border bg-card p-8">
                <h3 className="font-black text-2xl uppercase mb-4">{`[INSERT_BACKEND_CTA_TITLE]`}</h3>
                <p className="font-mono text-sm text-muted-foreground mb-8">{`[INSERT_BACKEND_CTA_DESC]`}</p>
                <Link 
                  href="/contact" 
                  className={buttonVariants({ variant: "default", size: "lg", className: "w-full font-black uppercase tracking-widest h-14 border border-primary hover:bg-transparent hover:text-primary transition-colors" })}
                >
                  INITIATE CONSULT
                </Link>
              </div>
            </div>
          </div>
          
          <div className="xl:w-2/3 border-l border-border pl-0 sm:pl-12 py-8 flex flex-col gap-16">
            
            <div className="relative pl-8 sm:pl-16 border-b border-border pb-16">
              <div className="absolute left-[-24px] sm:left-[-24px] top-0 bg-background border border-border p-3 text-primary">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-4">{`[INSERT_BACKEND_BENEFIT_1_TITLE]`}</h3>
              <p className="text-xl text-muted-foreground font-medium uppercase">{`[INSERT_BACKEND_BENEFIT_1_DESC]`}</p>
            </div>
            
            <div className="relative pl-8 sm:pl-16 border-b border-border pb-16 ml-0 md:ml-12 lg:ml-24">
              <div className="absolute left-[-24px] sm:left-[-24px] top-0 bg-background border border-border p-3 text-primary">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-4">{`[INSERT_BACKEND_BENEFIT_2_TITLE]`}</h3>
              <p className="text-xl text-muted-foreground font-medium uppercase">{`[INSERT_BACKEND_BENEFIT_2_DESC]`}</p>
            </div>

            <div className="relative pl-8 sm:pl-16 ml-0 md:ml-24 lg:ml-48">
              <div className="absolute left-[-24px] sm:left-[-24px] top-0 bg-background border border-border p-3 text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-black text-3xl md:text-5xl uppercase tracking-tight mb-4">{`[INSERT_BACKEND_BENEFIT_3_TITLE]`}</h3>
              <p className="text-xl text-muted-foreground font-medium uppercase">{`[INSERT_BACKEND_BENEFIT_3_DESC]`}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

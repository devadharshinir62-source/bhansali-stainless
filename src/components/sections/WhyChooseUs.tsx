'use client';

import React from 'react';
import { VALUE_PROPOSITIONS } from '@/lib/data';
import { Badge } from '@/components/ui/Badge';
import { Ship, Layers, ShieldCheck, Boxes, Cpu, Clock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Ship: <Ship className="w-5 h-5 text-sky-400" />,
    Layers: <Layers className="w-5 h-5 text-sky-400" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    Boxes: <Boxes className="w-5 h-5 text-amber-400" />,
    Cpu: <Cpu className="w-5 h-5 text-sky-400" />,
    Clock: <Clock className="w-5 h-5 text-sky-400" />,
  };

  return (
    <section id="why-us" className="py-20 bg-slate-950 border-b border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <Badge variant="blue" className="mb-3">
            B2B Advantage
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Why Industrial Buyers Choose Bhansali Stainless
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Delivering the reliability, metallurgical consistency, and documentation transparency required
            by high-stakes industrial projects across the Gulf Cooperation Council (GCC).
          </p>
        </div>

        {/* 6 Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUE_PROPOSITIONS.map((prop) => (
            <div
              key={prop.id}
              className="bg-slate-900/40 border border-slate-800 hover:border-slate-700 p-6 rounded-sm transition-all duration-200 hover:bg-slate-900/70 group"
            >
              <div className="w-10 h-10 rounded-sm bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 group-hover:border-sky-500/60 transition-colors">
                {iconMap[prop.iconName] || <ShieldCheck className="w-5 h-5 text-sky-400" />}
              </div>

              <div className="text-xs font-mono text-sky-400 uppercase tracking-wider mb-1">
                {prop.subtitle}
              </div>

              <h3 className="text-lg font-bold text-white mb-2.5">
                {prop.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Metric Strip */}
        <div className="mt-12 bg-slate-900/80 border border-slate-800 p-6 rounded-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="block text-2xl sm:text-3xl font-bold text-white font-mono">PMI</span>
            <span className="text-xs text-slate-400 font-mono mt-1 block">As per Inspection Plan</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-bold text-sky-400 font-mono">Responsive RFQ Support</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-bold text-white font-mono">NPS 1/2–24 ASME B16.5 | NPS 26–60 ASME B16.47</span>
            
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-bold text-emerald-400 font-mono">EN 10204 3.1</span>
            <span className="text-xs text-slate-400 font-mono mt-1 block">Material Test Certificate</span>
          </div>
        </div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { CERTIFICATIONS } from '@/lib/data';
import { Badge } from '@/components/ui/Badge';
import { ShieldAlert, FileText, CheckCircle2, SearchCode, Building2, HelpCircle } from 'lucide-react';

export const Certifications: React.FC = () => {
  const certIcons: Record<string, React.ReactNode> = {
    'astm-asme': <SearchCode className="w-5 h-5 text-sky-400" />,
    'iso-quality': <Building2 className="w-5 h-5 text-amber-400" />,
    'mtc-31': <FileText className="w-5 h-5 text-emerald-400" />,
    'tpi-inspection': <CheckCircle2 className="w-5 h-5 text-blue-400" />,
  };

  return (
    <section id="certifications" className="py-20 bg-slate-950 border-b border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <Badge variant="blue" className="mb-3">
            Quality Assurance & Framework
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Inspection Protocols & Certification Framework
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Inspection and verification are performed according to the applicable project inspection plan.
          </p>
        </div>

        {/* Prominent Assignment Transparency Alert */}
        <div className="mb-10 bg-slate-900/90 border border-amber-800/60 p-4 sm:p-5 rounded-sm flex items-start gap-3.5 shadow-md">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong className="text-amber-300 font-semibold block sm:inline">
              Quality Documentation Framework Advisory:{' '}
            </strong>
            The certification standards and QA methodologies outlined below illustrate Bhansali Stainless&apos;s
            engineering compliance benchmarks and standard documentation procedures. Specific registration numbers,
            accreditation seals, and third-party audit dossiers are placeholders for this technical assignment and are
            verified per project tender upon formal inquiry.
          </div>
        </div>

        {/* 4 Certification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="bg-slate-900/50 border border-slate-800 hover:border-slate-700 p-6 rounded-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-sm">
                      {certIcons[cert.id]}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">{cert.title}</h3>
                      <span className="text-xs font-mono text-slate-400 block">{cert.issuer}</span>
                    </div>
                  </div>

                  {cert.isPlaceholder && (
                    <span className="text-[10px] font-mono uppercase bg-amber-950/60 text-amber-300 border border-amber-900/60 px-2 py-0.5 rounded-xs shrink-0">
                      Standard Placeholder
                    </span>
                  )}
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="bg-slate-950/70 p-3 border border-slate-800/80 rounded-sm">
                    <span className="text-slate-400 text-[11px] font-mono block mb-1">
                      Applicable Technical Scope:
                    </span>
                    <span className="text-slate-200 font-medium leading-relaxed">{cert.scope}</span>
                  </div>

                  <div className="text-xs text-slate-300 leading-relaxed">
                    <span className="text-slate-400 block font-mono text-[11px] mb-0.5">
                      Verification Deliverable:
                    </span>
                    {cert.complianceDoc}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="italic text-[11px]">{cert.disclaimer}</span>
                <span className="font-mono text-sky-400 text-[11px]">Material Traceability</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Workflow Steps */}
        <div className="mt-12 bg-slate-900/30 border border-slate-800/80 p-6 rounded-sm">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
            Standard 5-Step QA Inspection Sequence:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xs">
              <span className="text-sky-400 font-mono font-bold block mb-1">01. Raw Ingot / Billet</span>
              <p className="text-slate-300">Spectrometer heat chemistry verification before forging.</p>
            </div>
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xs">
              <span className="text-sky-400 font-mono font-bold block mb-1">02. Forging & Annealing</span>
              <p className="text-slate-300">Solution annealing and rapid cooling as required by applicable ASTM A182 grade.</p>
            </div>
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xs">
              <span className="text-sky-400 font-mono font-bold block mb-1">03. CNC Machining</span>
              <p className="text-slate-300">Tolerance inspection on CNC lathes for gasket face finish and bolt PCD.</p>
            </div>
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xs">
              <span className="text-sky-400 font-mono font-bold block mb-1">04. PMI Testing (Per ITP)</span>
              <p className="text-slate-300">Calibrated XRF analysis verifying Cr, Ni, Mo element ranges per inspection plan.</p>
            </div>
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xs">
              <span className="text-sky-400 font-mono font-bold block mb-1">05. Packaging Audit</span>
                <p className="text-slate-300">Corrosion-protection measures and flange-face protection are applied according to project and shipping requirements. Wooden export packaging, where used, is prepared in accordance with applicable ISPM-15 requirements.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

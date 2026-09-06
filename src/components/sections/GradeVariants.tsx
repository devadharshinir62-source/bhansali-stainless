'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { FLANGE_GRADES } from '@/lib/data';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, CheckCircle2, FlaskConical, Gauge } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface GradeVariantsProps {
  onSelectGrade?: (gradeName: string) => void;
}

export const GradeVariants: React.FC<GradeVariantsProps> = ({ onSelectGrade }) => {
  const handleEnquireGrade = (grade: string) => {
    trackEvent('grade_tab_selected', { grade });
    if (onSelectGrade) {
      onSelectGrade(grade);
    }
    // Dispatch window event so Enquiry form catches it
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bhansali-select-grade', { detail: grade }));
      const formElement = document.getElementById('enquiry');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Viewport scroll reveal animation variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        delay: index * 0.15,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section id="grades" className="py-20 bg-slate-950 border-b border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <Badge variant="blue" className="mb-3">
            Metallurgy & Grade Specifications
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Stainless Steel Flange Grade Variants
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Selecting the exact metallurgical grade ensures dependable resistance against pitting, chloride-induced
            stress corrosion cracking, and thermal mechanical fatigue. We stock and manufacture three primary austenitic grades.
          </p>
        </div>

        {/* Grade Cards with Scroll Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FLANGE_GRADES.map((grade, index) => {
            const isPopular = grade.id === 'ss-316l';
            return (
              <motion.div
                key={grade.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className={`relative flex flex-col justify-between rounded-sm transition-all duration-200 ${
                  isPopular
                    ? 'bg-slate-900/90 border-2 border-sky-500/80 shadow-2xl shadow-sky-950/50'
                    : 'bg-slate-900/40 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Popular Specification Banner */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-600 to-sky-500 text-white text-[11px] font-mono font-semibold uppercase tracking-wider py-1 px-3.5 rounded-xs shadow-md border border-sky-300/40">
                    Commonly specified for corrosive and welded service
                  </div>
                )}

                {/* Card Top Section */}
                <div className="p-6 sm:p-7 space-y-5">
                  <div className="border-b border-slate-800 pb-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-sky-400 font-semibold uppercase">
                        {grade.standard}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 border border-slate-800 rounded-xs">
                        {grade.code.split(' ')[0]}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
                      {grade.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-1">
                      {grade.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {grade.description}
                  </p>

                  {/* Typical Characteristics */}
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Key Characteristics:
                    </h4>
                    <ul className="space-y-1.5">
                      {grade.characteristics.map((char, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span>{char}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Chemistry Highlights */}
                  <div className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-sm">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-2">
                      <FlaskConical className="w-3.5 h-3.5 text-sky-400" />
                      <span>Chemistry Composition (%):</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      {grade.chemicalHighlights.map((chem, chemIdx) => (
                        <div key={chemIdx} className="flex justify-between border-b border-slate-800/50 pb-1">
                          <span className="text-slate-400">{chem.element.split(' ')[0]}</span>
                          <span className="text-slate-200">{chem.range}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mechanical Properties */}
                  <div className="bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-sm">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-2">
                      <Gauge className="w-3.5 h-3.5 text-amber-400" />
                      <span>Mechanical Properties (Min):</span>
                    </div>
                    <div className="space-y-1 text-xs font-mono">
                      {grade.mechanicalProperties.map((mech, mIdx) => (
                        <div key={mIdx} className="flex justify-between border-b border-slate-800/50 pb-1">
                          <span className="text-slate-400">{mech.property}</span>
                          <span className="text-slate-200">{mech.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Suitable Applications */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Suitable Applications:
                    </h4>
                    <ul className="space-y-1">
                      {grade.suitableApplications.slice(0, 3).map((app, aIdx) => (
                        <li key={aIdx} className="text-xs text-slate-300 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => handleEnquireGrade(grade.name)}
                      className={`w-full py-2.5 px-4 text-xs font-semibold rounded-sm transition-all flex items-center justify-center gap-2 ${
                        isPopular
                          ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-950'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <span>Enquire for {grade.name.split(' ')[2] || grade.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dual Certification Footnote */}
        <div className="mt-10 bg-slate-900/60 border border-slate-800 p-4 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <strong className="text-slate-200">Dual Certification Available:</strong> Dual-certified flanges can be
            supplied as <span className="font-mono text-sky-400">ASTM A182 F316 / F316L</span> or{' '}
            <span className="font-mono text-sky-400">F304 / F304L</span> when the specified chemical and mechanical
            requirements are satisfied.
          </div>
          <a
            href="#enquiry"
            className="shrink-0 text-sky-400 hover:underline font-mono text-xs inline-flex items-center gap-1"
          >
            <span>Request Dual-Spec MTC</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};

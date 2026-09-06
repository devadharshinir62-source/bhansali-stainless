'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, MessageSquare, Phone, Mail, ShieldCheck, Globe, CheckCircle2, Award } from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/data';
import { trackWhatsAppClick, trackPhoneClick, trackEvent } from '@/lib/analytics';
import { Badge } from '@/components/ui/Badge';

export const Hero: React.FC = () => {
  // Staggered entrance animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-800/80 bg-industrial-grid">
      {/* Subtle radial lighting accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-900/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Heading, Value Narrative, CTAs */}
          <div className="lg:col-span-7 space-y-7">
            {/* Target Market & Standard Eyebrow */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5">
              <Badge variant="blue" icon={<Globe className="w-3.5 h-3.5 text-sky-400" />}>
                Export Hub: Saudi Arabia • UAE • Middle East
              </Badge>
              <Badge variant="steel" icon={<ShieldCheck className="w-3.5 h-3.5 text-slate-400" />}>
                ASTM A182 / ASME B16.5
              </Badge>
            </motion.div>

            {/* Main H1 Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]"
            >
              Stainless Steel Flanges for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-slate-100 to-sky-300">
                Global Industrial Applications
              </span>
            </motion.h1>

            {/* Supporting Value Narrative */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal"
            >
              Bhansali Stainless supplies precision-forged stainless steel flanges (Grades 304, 316, 316L)
              for industrial buyers, distributors, fabricators, and critical project requirements across{' '}
              <strong className="text-white font-semibold">Saudi Arabia</strong>,{' '}
              <strong className="text-white font-semibold">UAE</strong>, and the wider{' '}
              <strong className="text-white font-semibold">Middle East</strong>.
            </motion.p>

            {/* Trust Highlights Checklist */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-sm">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>PMI as per Inspection Plan</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-sm">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>EN 10204 3.1 MTC Available</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-sm">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>GCC Export Support</span>
              </div>
            </motion.div>

            {/* Action CTA Group */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#enquiry"
                onClick={() => trackEvent('rfq_initiated', { location: 'hero_primary' })}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 transition-all rounded-sm shadow-lg shadow-sky-950/60 border border-sky-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Bhansali%20Stainless,%20I%20am%20looking%20for%20a%20quotation%20for%20Stainless%20Steel%20Flanges%20for%20our%20Middle%20East%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('hero_secondary')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-700/60 transition-all rounded-sm shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>
            </motion.div>

            {/* Direct Contact Bar */}
            <motion.div
              variants={itemVariants}
              className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>Direct Desk:</span>
                <a
                  href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
                  onClick={() => trackPhoneClick('hero_contact_bar')}
                  className="text-slate-200 hover:text-sky-400 font-mono font-medium transition-colors"
                >
                  {COMPANY_DETAILS.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>Email:</span>
                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="text-slate-200 hover:text-sky-400 font-mono font-medium transition-colors"
                >
                  {COMPANY_DETAILS.email}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: High-Precision Industrial Technical Visual Asset */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <div className="relative rounded-sm bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-sm">
              {/* Technical Spec Tag Overlays */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                    Precision Forged Flange Specimen
                  </span>
                </div>
                <span className="text-[11px] font-mono text-sky-400 bg-sky-950/60 px-2 py-0.5 border border-sky-800/60 rounded-xs">
                  ASME B16.5 CLASS 300
                </span>
              </div>

              {/* Detailed Industrial CAD-Style Flange Schematic SVG */}
              <div className="relative py-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 400 320"
                  className="w-full max-w-[340px] h-auto drop-shadow-[0_10px_25px_rgba(2,132,199,0.15)]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient id="steelGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="metalRim" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#94a3b8" />
                      <stop offset="30%" stopColor="#cbd5e1" />
                      <stop offset="50%" stopColor="#475569" />
                      <stop offset="70%" stopColor="#e2e8f0" />
                      <stop offset="100%" stopColor="#334155" />
                    </linearGradient>
                    <linearGradient id="boreShade" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#020617" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>

                  {/* Backdrop radial */}
                  <circle cx="200" cy="160" r="140" fill="url(#steelGlow)" />

                  {/* Outer Flange Diameter Disc */}
                  <circle cx="200" cy="160" r="125" stroke="url(#metalRim)" strokeWidth="8" fill="#111827" />
                  <circle cx="200" cy="160" r="118" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Bolt Circle (PCD) */}
                  <circle cx="200" cy="160" r="92" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

                  {/* 8 Bolt Holes with chamfer rings */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                    const rad = (deg * Math.PI) / 180;
                    const bx = 200 + 92 * Math.cos(rad);
                    const by = 160 + 92 * Math.sin(rad);
                    return (
                      <g key={deg}>
                        <circle cx={bx} cy={by} r="10" stroke="#64748b" strokeWidth="2" fill="#090d16" />
                        <circle cx={bx} cy={by} r="6" fill="#020617" />
                        <circle cx={bx} cy={by} r="10.5" stroke="#94a3b8" strokeWidth="0.5" opacity="0.4" />
                      </g>
                    );
                  })}

                  {/* Raised Face (RF) Step */}
                  <circle cx="200" cy="160" r="64" stroke="url(#metalRim)" strokeWidth="6" fill="#1e293b" />
                  
                  {/* Concentric Phonographic Serrations */}
                  <circle cx="200" cy="160" r="58" stroke="#475569" strokeWidth="0.8" opacity="0.7" />
                  <circle cx="200" cy="160" r="52" stroke="#475569" strokeWidth="0.8" opacity="0.7" />
                  <circle cx="200" cy="160" r="46" stroke="#475569" strokeWidth="0.8" opacity="0.7" />

                  {/* Internal Bore */}
                  <circle cx="200" cy="160" r="38" stroke="#94a3b8" strokeWidth="2" fill="url(#boreShade)" />
                  <circle cx="200" cy="160" r="30" stroke="#0284c7" strokeWidth="1" opacity="0.8" />

                  {/* Engineering Dimension Callout Overlays */}
                  <line x1="75" y1="35" x2="325" y2="35" stroke="#38bdf8" strokeWidth="1" />
                  <line x1="75" y1="30" x2="75" y2="40" stroke="#38bdf8" strokeWidth="1" />
                  <line x1="325" y1="30" x2="325" y2="40" stroke="#38bdf8" strokeWidth="1" />
                  <text x="200" y="28" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    OUTER DIAMETER (O.D.)
                  </text>

                  {/* Cross-hair Center lines */}
                  <line x1="200" y1="18" x2="200" y2="302" stroke="#475569" strokeWidth="0.75" strokeDasharray="6 3" opacity="0.4" />
                  <line x1="58" y1="160" x2="342" y2="160" stroke="#475569" strokeWidth="0.75" strokeDasharray="6 3" opacity="0.4" />
                </svg>
              </div>

              {/* Flange Spec Detail Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-slate-800">
                <div className="bg-slate-950/80 p-2 border border-slate-800/80 rounded-xs">
                  <span className="text-slate-500 block text-[10px]">FACING:</span>
                  <span className="text-slate-200 font-medium">RF (per Project Spec)</span>
                </div>
                <div className="bg-slate-950/80 p-2 border border-slate-800/80 rounded-xs">
                  <span className="text-slate-500 block text-[10px]">HEAT NO:</span>
                  <span className="text-sky-400 font-medium">BS-MTC-89422</span>
                </div>
                <div className="bg-slate-950/80 p-2 border border-slate-800/80 rounded-xs">
                  <span className="text-slate-500 block text-[10px]">FORGING CODE:</span>
                  <span className="text-slate-200 font-medium">ASTM A182 F316L</span>
                </div>
                <div className="bg-slate-950/80 p-2 border border-slate-800/80 rounded-xs">
                  <span className="text-slate-500 block text-[10px]">RATING:</span>
                  <span className="text-emerald-400 font-medium">Classes 150 to 1500 (Class 2500 within applicable sizes)</span>
                </div>
              </div>

              {/* Bottom Assurance Badge */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/50">
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Material Traceability</span>
                </span>
                <span className="text-slate-400 font-mono">Dimensional Inspection per Standard</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import { COMPANY_DETAILS } from '@/lib/data';
import { trackWhatsAppClick, trackPhoneClick, trackEvent } from '@/lib/analytics';
import { Phone, MessageSquare, Mail, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export const ContactCta: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border-2 border-sky-600/40 rounded-sm p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-sky-500/10 blur-[100px] pointer-events-none" />

          <div className="max-w-3xl space-y-4 mb-10">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-sky-400">
              International Export Support Desk
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Source Stainless Steel Flanges?
            </h2>
            <p className="text-base text-slate-300 leading-relaxed">
              Connect directly with our engineering sales specialists for quotation support, mill test certificate
              clarifications, or project container dispatch schedules across Saudi Arabia, UAE, and GCC ports.
            </p>
          </div>

          {/* High-Visibility Contact Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {/* Phone Channel */}
            <a
              href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
              onClick={() => trackPhoneClick('final_cta_card')}
              className="bg-slate-950/90 border border-slate-800 hover:border-sky-500/80 p-5 rounded-sm transition-all group shadow-md"
            >
              <div className="w-10 h-10 rounded-sm bg-sky-950/70 border border-sky-800/80 flex items-center justify-center text-sky-400 mb-3 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-slate-400 block mb-1">Direct Phone Desk</span>
              <span className="text-sm font-bold text-white group-hover:text-sky-400 font-mono block transition-colors">
                {COMPANY_DETAILS.phoneDisplay}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">Mon - Sat: 8:00 - 19:00 IST</span>
            </a>

            {/* WhatsApp Channel */}
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Bhansali%20Stainless,%20I%20am%20ready%20to%20source%20Stainless%20Steel%20Flanges%20for%20our%20project.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('final_cta_card')}
              className="bg-slate-950/90 border border-emerald-900/60 hover:border-emerald-500 p-5 rounded-sm transition-all group shadow-md"
            >
              <div className="w-10 h-10 rounded-sm bg-emerald-950/70 border border-emerald-800/80 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-emerald-400/90 block mb-1">WhatsApp Enquiry (Demo)</span>
              <span className="text-sm font-bold text-emerald-300 font-mono block group-hover:text-emerald-200 transition-colors">
                {COMPANY_DETAILS.whatsappDisplay}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">Responsive RFQ Support</span>
            </a>

            {/* Email Channel */}
            <a
              href={`mailto:${COMPANY_DETAILS.email}?subject=Stainless%20Steel%20Flanges%20Quotation%20Inquiry`}
              className="bg-slate-950/90 border border-slate-800 hover:border-sky-500/80 p-5 rounded-sm transition-all group shadow-md"
            >
              <div className="w-10 h-10 rounded-sm bg-sky-950/70 border border-sky-800/80 flex items-center justify-center text-sky-400 mb-3 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-slate-400 block mb-1">Sales Email</span>
              <span className="text-sm font-bold text-white group-hover:text-sky-400 font-mono block transition-colors truncate">
                {COMPANY_DETAILS.email}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">Tender Bidding & BOMs</span>
            </a>

            {/* Quick RFQ Button */}
            <div className="bg-slate-950/90 border border-sky-600/50 p-5 rounded-sm flex flex-col justify-between shadow-md">
              <div>
                <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block mb-1">
                  Online Specification
                </span>
                <h3 className="text-sm font-bold text-white">Full RFQ Portal</h3>
                <p className="text-[11px] text-slate-400 mt-1">Configure size, pressure & grade schedule</p>
              </div>

              <a
                href="#enquiry"
                onClick={() => trackEvent('rfq_initiated', { location: 'final_contact_cta' })}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-sm transition-colors shadow"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Bottom Reassurance Banner */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>EN 10204 3.1 Material Test Certificates provided; heat numbers stamped on physical flange rim.</span>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Export shipping coordinated from Western Indian ports to Dammam, Jubail, Jebel Ali &amp; GCC ports.</span>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Illustrative QA Inspection Sequence</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-amber-500">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>BS‑MTC‑89422 — DEMO / ILLUSTRATIVE — NOT A REAL MTC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

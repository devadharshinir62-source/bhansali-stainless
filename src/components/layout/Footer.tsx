'use client';

import React from 'react';
import Link from 'next/link';
import { COMPANY_DETAILS, EXPORT_REGIONS } from '@/lib/data';
import { ShieldCheck, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Upper Footer: 4 Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Company Profile (2 Cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-slate-800 to-sky-950 border border-slate-700 flex items-center justify-center p-1.5">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-sky-400" stroke="currentColor" strokeWidth="1.75">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
                  <circle cx="12" cy="5" r="1" fill="currentColor" />
                  <circle cx="12" cy="19" r="1" fill="currentColor" />
                  <circle cx="5" cy="12" r="1" fill="currentColor" />
                  <circle cx="19" cy="12" r="1" fill="currentColor" />
                </svg>
              </div>
              <span className="text-base font-bold text-white tracking-wider font-mono uppercase">
                Bhansali<span className="text-sky-400">.</span>Stainless
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">B2B supplier and exporter of stainless steel flanges to ASTM A182 / ASME SA182 and applicable dimensional standards.</p>

            <div className="pt-2 flex items-center gap-2 text-slate-400 text-[11px] font-mono">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Conforming to ASTM A182 / ASME B16.5 &amp; B16.47 Requirements</span>
            </div>
          </div>

          {/* Column 2: Flange Products */}
          <div className="space-y-3">
            <h4 className="text-white font-mono uppercase tracking-wider text-xs font-semibold">
              Flange Products
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#products" className="hover:text-sky-400 transition-colors">
                  Weld Neck Flanges (WNRF)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-sky-400 transition-colors">
                  Slip-On Flanges (SORF)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-sky-400 transition-colors">
                  Blind Flanges (BLRF)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-sky-400 transition-colors">
                  Socket Weld Flanges (SWRF)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-sky-400 transition-colors">
                  Threaded Flanges (ASME / EN)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-sky-400 transition-colors">
                  Lap Joint Flanges (LJRF)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Material Grades */}
          <div className="space-y-3">
            <h4 className="text-white font-mono uppercase tracking-wider text-xs font-semibold">
              Stainless Grades
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#grades" className="hover:text-sky-400 transition-colors">
                  Stainless Steel 304 Flanges
                </a>
              </li>
              <li>
                <a href="#grades" className="hover:text-sky-400 transition-colors">
                  Stainless Steel 304L Flanges
                </a>
              </li>
              <li>
                <a href="#grades" className="hover:text-sky-400 transition-colors">
                  Stainless Steel 316 Flanges
                </a>
              </li>
              <li>
                <a href="#grades" className="hover:text-sky-400 transition-colors">
                  Stainless Steel 316L Flanges
                </a>
              </li>
              <li>
                <a href="#grades" className="hover:text-sky-400 transition-colors">
                  Dual Certified 316/316L
                </a>
              </li>
              <li>
                <a href="#specifications" className="hover:text-sky-400 transition-colors">
                  Duplex & Super Duplex
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Middle East Ports & Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-mono uppercase tracking-wider text-xs font-semibold">
              Export Destination Ports
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li>• King Abdulaziz Port, Dammam (KSA)</li>
              <li>• Jubail Commercial Port (KSA)</li>
              <li>• Jeddah Islamic Port (KSA)</li>
              <li>• Jebel Ali Port, Dubai (UAE)</li>
              <li>• Khalifa Port, Abu Dhabi (UAE)</li>
              <li>• Sohar & Salalah Ports (Oman)</li>
              <li>• Hamad Port, Doha (Qatar)</li>
            </ul>

            <div className="pt-3 border-t border-slate-800 space-y-1.5">
              <a
                href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
                className="hover:text-sky-400 transition-colors flex items-center gap-1.5 font-mono text-slate-300"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>{COMPANY_DETAILS.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${COMPANY_DETAILS.email}`}
                className="hover:text-sky-400 transition-colors flex items-center gap-1.5 font-mono text-slate-300"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>{COMPANY_DETAILS.email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Assignment Compliance & Legal Disclaimers */}
      <div className="bg-slate-950 border-t border-slate-900 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-sm text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Assignment Presentation Disclaimer:</strong> This web portal has been developed as an engineering B2B product category showcase for Bhansali Stainless. Standard technical specifications (ASME B16.5, ASTM A182) and logistical port workflows reflect standard international trade parameters. ISO registration badges, third-party inspection certificates, and company logistics details serve as structural placeholders for review.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-[11px] text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} {COMPANY_DETAILS.name}. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <a href="#specifications" className="hover:text-slate-400 transition-colors">
                Dimensional Standards
              </a>
              <span>•</span>
              <a href="#export" className="hover:text-slate-400 transition-colors">
                Middle East Export Guidelines
              </a>
              <span>•</span>
              <button
                type="button"
                onClick={scrollToTop}
                className="hover:text-sky-400 transition-colors flex items-center gap-1"
                aria-label="Back to top"
              >
                <span>Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

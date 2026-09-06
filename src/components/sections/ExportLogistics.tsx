'use client';

import React, { useState } from 'react';
import { EXPORT_REGIONS, LOGISTICS_FEATURES } from '@/lib/data';
import { Badge } from '@/components/ui/Badge';
import { Ship, PackageCheck, FileCheck2, Clock, Anchor, Boxes, ShieldAlert, ArrowRight } from 'lucide-react';

export const ExportLogistics: React.FC = () => {
  const [activeRegionIndex, setActiveRegionIndex] = useState<number>(0);
  const activeRegion = EXPORT_REGIONS[activeRegionIndex];

  return (
    <section id="export" className="py-20 bg-slate-900/50 border-b border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <Badge variant="blue" className="mb-3">
            GCC & Middle East Corridors
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Export Readiness & Supply Capabilities
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Bhansali Stainless specializes in end-to-end B2B supply coordination tailored for EPC contractors,
            petrochemical plants, and industrial piping distributors across Saudi Arabia, UAE, and the wider Gulf region.
          </p>
        </div>

        {/* Region Selector Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {EXPORT_REGIONS.map((region, idx) => (
            <button
              key={region.country}
              onClick={() => setActiveRegionIndex(idx)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-sm transition-all flex items-center gap-2 border ${
                activeRegionIndex === idx
                  ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-950'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <span className="text-base">{region.flag}</span>
              <span>{region.country}</span>
            </button>
          ))}
        </div>

        {/* Selected Region Detailed Card */}
        <div className="bg-slate-950 border border-slate-700/80 rounded-sm p-6 sm:p-8 shadow-xl mb-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
            <div>
              <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">
                Logistics Destination Profile
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 flex items-center gap-2">
                <span>{activeRegion.flag}</span>
                <span>{activeRegion.country}</span>
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 px-3 py-2 rounded-xs border border-slate-800 text-slate-300">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Transit Time: {activeRegion.transitTimeEstimate}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Direct Ports Served */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Anchor className="w-4 h-4 text-sky-400" />
                <span>Primary Destination Ports Handled:</span>
              </h4>
              <ul className="space-y-2">
                {activeRegion.ports.map((port, pIdx) => (
                  <li
                    key={pIdx}
                    className="text-xs sm:text-sm text-slate-200 bg-slate-900/60 p-2.5 rounded-xs border border-slate-800/80 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 mt-1.5" />
                    <span>{port}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documentation Checklist */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Documentation & Customs Clearance Readiness:</span>
              </h4>
              <ul className="space-y-2">
                {activeRegion.documentation.map((doc, dIdx) => (
                  <li
                    key={dIdx}
                    className="text-xs sm:text-sm text-slate-200 bg-slate-900/60 p-2.5 rounded-xs border border-slate-800/80 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 4 Core Logistics Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {LOGISTICS_FEATURES.map((feat, fIdx) => (
            <div
              key={fIdx}
              className="bg-slate-950/60 border border-slate-800 p-5 rounded-sm hover:border-slate-700 transition-colors"
            >
              <div className="w-8 h-8 rounded-sm bg-sky-950/60 border border-sky-800/60 flex items-center justify-center mb-3 text-sky-400">
                {fIdx === 0 && <PackageCheck className="w-4 h-4" />}
                {fIdx === 1 && <Boxes className="w-4 h-4" />}
                {fIdx === 2 && <Clock className="w-4 h-4" />}
                {fIdx === 3 && <FileCheck2 className="w-4 h-4" />}
              </div>
              <h4 className="font-bold text-sm text-white mb-2">{feat.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>

        {/* Operational Disclaimer */}
        <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-sm text-xs text-slate-400 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-300 font-medium">Logistics Disclaimer:</strong> Transit schedules and port
            handling capabilities represent typical export routing from Western Indian maritime hubs (Nhava Sheva JNPT / Mundra)
            to regional Gulf ports under standard maritime conditions. Specific freight rates, CIF/FOB terms, and carrier schedules
            are confirmed at quote issuance.
          </p>
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FLANGE_TYPES, INDUSTRIES } from '@/lib/data';
import { Badge } from '@/components/ui/Badge';
import { Layers, Flame, Droplets, Zap, Anchor, Wrench, CheckCircle, ArrowUpRight } from 'lucide-react';

export const ProductOverview: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>(FLANGE_TYPES[0].id);

  const industryIcons: Record<string, React.ReactNode> = {
    'Oil & Gas Upstream & Downstream': <Flame className="w-5 h-5 text-amber-400" />,
    'Petrochemical & Chemical Processing': <Layers className="w-5 h-5 text-sky-400" />,
    'Desalination & Water Treatment': <Droplets className="w-5 h-5 text-cyan-400" />,
    'Power Generation & Utilities': <Zap className="w-5 h-5 text-yellow-400" />,
    'Offshore & Marine Engineering': <Anchor className="w-5 h-5 text-blue-400" />,
    'Industrial Piping & Skid Fabrication': <Wrench className="w-5 h-5 text-slate-300" />,
  };

  const activeTypeData = FLANGE_TYPES.find((t) => t.id === selectedType) || FLANGE_TYPES[0];

  return (
    <section id="products" className="py-20 bg-slate-900/60 border-b border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <Badge variant="blue" className="mb-3">
            Product Portfolio & Overview
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Engineering Precision in Every Flange Connection
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Stainless steel flanges form the critical mechanical joint in pressurized industrial piping systems.
            Engineered to connect pipes, valves, pumps, and specialized process vessels, they permit seamless inspection,
            routine cleaning, and pipeline modification while containing extreme working pressures.
          </p>
        </div>

        {/* Flange Type Selector Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          <div className="lg:col-span-4 space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 px-2">
              Select Flange Type:
            </h3>
            {FLANGE_TYPES.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`w-full text-left p-3.5 rounded-sm transition-all border flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-800 border-sky-500 shadow-md shadow-sky-950/40'
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-sm text-slate-100 flex items-center gap-2">
                      <span>{type.name}</span>
                      <span className="text-xs font-mono text-sky-400 bg-sky-950/50 px-1.5 py-0.5 rounded-xs border border-sky-900/40">
                        {type.code}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {type.standards}
                    </div>
                  </div>
                  <ArrowUpRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-sky-400 translate-x-0.5 -translate-y-0.5' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Detailed Flange Profile Card */}
          <div className="lg:col-span-8 bg-slate-950/90 border border-slate-700/80 rounded-sm p-6 sm:p-8 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
              <div>
                <span className="text-xs font-mono text-sky-400 uppercase tracking-wider">
                  Profile Specification
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {activeTypeData.name} ({activeTypeData.code})
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-mono">Governing Standards:</span>
                <span className="text-xs font-mono text-slate-200 font-medium">
                  {activeTypeData.standards}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {activeTypeData.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-sm">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                  Core Engineering Features:
                </h4>
                <ul className="space-y-2">
                  {activeTypeData.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                    Typical Operational Environment:
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activeTypeData.commonUses}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">Available Pressure:</span>
                  <span className="text-xs font-mono text-amber-400 font-medium">Classes 150 to 1500 (Class 2500 within applicable sizes)</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Custom drillings, legacy DIN/BS, and EN 1092-1 metric facings available upon request.
              </span>
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 px-4 py-2 rounded-sm transition-colors"
              >
                <span>Request {activeTypeData.code} Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Industrial Applications Section */}
        <div className="pt-8 border-t border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="steel" className="mb-2">
              Critical Sectors
            </Badge>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Industrial Applications Across Saudi Arabia & the Middle East
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Applications include oil & gas, petrochemical, power, desalination, marine and industrial piping systems, subject to service conditions and material selection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.title}
                className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 p-5 rounded-sm transition-all hover:bg-slate-950"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-slate-900 border border-slate-800 rounded-sm">
                    {industryIcons[ind.title]}
                  </div>
                  <h4 className="font-semibold text-sm text-white">{ind.title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {ind.description}
                </p>
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Standard Spec:</span>
                  <span className="text-sky-400">{ind.specs}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

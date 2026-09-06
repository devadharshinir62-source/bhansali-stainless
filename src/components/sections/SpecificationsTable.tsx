'use client';

import React, { useState } from 'react';
import { TECHNICAL_SPECIFICATIONS } from '@/lib/data';
import { Badge } from '@/components/ui/Badge';
import { FileSpreadsheet, Search, Check, AlertCircle } from 'lucide-react';

export const SpecificationsTable: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Material & Metallurgy',
    'Dimensional Standards',
    'Pressure & Ratings',
    'Facing & Gasket Surfaces',
    'Manufacturing Process',
    'Inspection & Testing',
  ];

  const filteredSpecs = TECHNICAL_SPECIFICATIONS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery =
      searchQuery === '' ||
      item.parameter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specification.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="specifications" className="py-20 bg-slate-900/40 border-b border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <Badge variant="blue" className="mb-3">
              Engineering Matrix
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Technical Specifications & Manufacturing Range
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Complete engineering parameters for stainless steel flanges conforming to international ASME, ASTM, and DIN standards.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search specs (e.g., RTJ, A182, 600#)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-xs text-slate-200 pl-9 pr-3 py-2 rounded-sm focus:outline-none focus:border-sky-500 w-full sm:w-64"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono whitespace-nowrap rounded-sm transition-colors border ${
                activeCategory === cat
                  ? 'bg-sky-600 text-white border-sky-500 shadow-sm'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Technical Specifications Table */}
        <div className="overflow-hidden border border-slate-800 rounded-sm bg-slate-950/90 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6 w-1/4">Engineering Parameter</th>
                  <th className="py-3.5 px-4 sm:px-6 w-1/2">Standard Specification</th>
                  <th className="py-3.5 px-4 sm:px-6 w-1/4">Notes & Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredSpecs.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-slate-900/60 transition-colors"
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-200 align-top">
                      <div className="flex flex-col">
                        <span>{item.parameter}</span>
                        <span className="text-[10px] font-mono text-slate-500 font-normal">
                          {item.category}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-slate-300 font-mono text-xs sm:text-sm leading-relaxed align-top">
                      {item.specification}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-xs text-slate-400 align-top">
                      <div className="flex items-start gap-1.5">
                        {item.isPlaceholder ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 bg-amber-950/50 border border-amber-900/50 px-1.5 py-0.5 rounded-xs shrink-0">
                            <AlertCircle className="w-3 h-3" />
                            <span>Verification Required</span>
                          </span>
                        ) : (
                          <Check className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        )}
                        <span>{item.notes}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSpecs.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm font-mono">
              No specifications matching &ldquo;{searchQuery}&rdquo;. Try another search term.
            </div>
          )}
        </div>

        {/* Specification Disclaimers & Notes */}
        <div className="mt-4 p-3 bg-slate-950/60 border border-slate-800/80 rounded-sm text-xs text-slate-400 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-300">Engineering Note & Placeholder Advisory:</strong> Standard industry dimensional
            tolerances comply with ASME B16.5 / B16.47. Special flange dimensions, weld preps (bevel angle, land thickness),
            custom face serrations, and specific company MTC endorsements are subject to engineering drawing approval upon inquiry.
          </p>
        </div>
      </div>
    </section>
  );
};

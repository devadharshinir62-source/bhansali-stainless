'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/data';
import { trackWhatsAppClick, trackPhoneClick } from '@/lib/analytics';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Grades', href: '#grades' },
    { label: 'Specifications', href: '#specifications' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Middle East Export', href: '#export' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Utility Bar for Direct Middle East B2B Contact */}
      <div className="bg-slate-950 border-b border-slate-800 text-xs text-slate-400 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Manufacturer & Exporter of Stainless Steel Flanges to ASTM A182 / ASME SA182 Requirements</span>
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Export Support for GCC Markets</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
              onClick={() => trackPhoneClick('top-bar')}
              className="hover:text-sky-400 transition-colors flex items-center gap-1.5 text-slate-300"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>{COMPANY_DETAILS.phoneDisplay}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Bhansali%20Stainless,%20I%20would%20like%20to%20enquire%20about%20Stainless%20Steel%20Flanges.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('top-bar')}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-emerald-400 font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp: {COMPANY_DETAILS.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/90 shadow-lg shadow-black/40 py-3'
            : 'bg-slate-950/85 backdrop-blur-sm border-b border-slate-800/50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-sm"
          >
            {/* Precision Flange Emblem */}
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-slate-800 via-slate-900 to-sky-950 border border-slate-700 flex items-center justify-center p-2 shadow-inner group-hover:border-sky-500 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-sky-400" stroke="currentColor" strokeWidth="1.75">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
                <circle cx="12" cy="5" r="1" fill="currentColor" />
                <circle cx="12" cy="19" r="1" fill="currentColor" />
                <circle cx="5" cy="12" r="1" fill="currentColor" />
                <circle cx="19" cy="12" r="1" fill="currentColor" />
                <circle cx="7" cy="7" r="1" fill="currentColor" />
                <circle cx="17" cy="17" r="1" fill="currentColor" />
                <circle cx="7" cy="17" r="1" fill="currentColor" />
                <circle cx="17" cy="7" r="1" fill="currentColor" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-wider text-slate-100 uppercase font-mono group-hover:text-sky-300 transition-colors">
                Bhansali<span className="text-sky-400">.</span>Stainless
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 font-sans uppercase font-medium">
                Industrial Piping & Flanges Exporter
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-sky-400 transition-colors py-1 focus:outline-none focus-visible:text-sky-400 focus-visible:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#enquiry"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 transition-all rounded-sm shadow-md shadow-sky-950/50 border border-sky-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="#enquiry"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 rounded-sm"
            >
              Quote
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label={mobileMenuOpen ? 'Close main navigation' : 'Open main navigation'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 shadow-2xl">
            <div className="flex flex-col space-y-2 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium text-slate-200 hover:text-sky-400 hover:bg-slate-900 rounded-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2.5">
              <a
                href="#enquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-sm shadow"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <a
                  href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-1.5 py-2 px-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  <span>Call Us</span>
                </a>
                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hello%20Bhansali%20Stainless,%20I%20need%20a%20quote%20for%20Stainless%20Steel%20Flanges.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-2 bg-slate-900 border border-emerald-900/50 text-emerald-400 rounded-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

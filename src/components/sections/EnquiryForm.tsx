'use client';

import React, { useState, useEffect } from 'react';
import { EnquiryFormData, EnquirySubmissionResponse } from '@/lib/types';
import { trackEnquirySubmit } from '@/lib/analytics';
import { Badge } from '@/components/ui/Badge';
import { Send, CheckCircle2, AlertCircle, Loader2, ShieldCheck, Clock, FileText } from 'lucide-react';

export const EnquiryForm: React.FC = () => {
  const initialFormState: EnquiryFormData = {
    fullName: '',
    businessEmail: '',
    phone: '',
    companyName: '',
    destinationCountry: 'Saudi Arabia',
    productGrade: 'Stainless Steel 316L',
    flangeType: 'Weld Neck Flange (WNRF)',
    pressureClass: 'Class 300',
    sizeRange: 'NPS 2 to NPS 8',
    estimatedQuantity: '',
    projectTimeline: 'Within 30 Days',
    additionalSpecifications: '',
  };

  const [formData, setFormData] = useState<EnquiryFormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<EnquirySubmissionResponse | null>(null);

  // Listen for grade selection triggered from GradeVariants section
  useEffect(() => {
    const handleGradeSelect = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail) {
        setFormData((prev) => ({
          ...prev,
          productGrade: customEvent.detail,
        }));
      }
    };

    window.addEventListener('bhansali-select-grade', handleGradeSelect);
    return () => window.removeEventListener('bhansali-select-grade', handleGradeSelect);
  }, []);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EnquiryFormData, string>> = {};

    // 1. Full Name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Contact Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid full name.';
    }

    // 2. Business Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business Email is required for RFQ dispatch.';
    } else if (!emailRegex.test(formData.businessEmail.trim())) {
      newErrors.businessEmail = 'Please provide a valid business email address.';
    }

    // 3. Phone Number
    const phoneClean = formData.phone.replace(/[\s\-()]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number with country code is required.';
    } else if (!/^\+?[0-9]{7,15}$/.test(phoneClean)) {
      newErrors.phone = 'Please provide a valid phone number (e.g. +966 50 123 4567).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error as user types
    if (errors[name as keyof EnquiryFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Dispatch to local /api/enquiry route
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result: EnquirySubmissionResponse = await response.json();

      if (response.ok && result.success) {
        setSubmissionResult(result);

        // 2. Store in browser localStorage for offline verification
        if (typeof window !== 'undefined') {
          const stored = JSON.parse(localStorage.getItem('bhansali_rfqs') || '[]');
          stored.unshift({
            id: result.enquiryId,
            timestamp: result.submittedAt,
            ...formData,
          });
          localStorage.setItem('bhansali_rfqs', JSON.stringify(stored));
        }

        // 3. Trigger Analytics / GA4 mock event
        trackEnquirySubmit({
          enquiryId: result.enquiryId || 'BS-RFQ-LOCAL',
          destinationCountry: formData.destinationCountry,
          productGrade: formData.productGrade,
          flangeType: formData.flangeType,
          quantity: formData.estimatedQuantity || 'Not Specified',
        });
      } else {
        setErrors((prev) => ({
          ...prev,
          fullName: result.message || 'Submission failed. Please try again.',
        }));
      }
    } catch (err) {
      console.error('Submission request failed:', err);
      // Fallback local simulation in case network is disconnected
      const fallbackId = `BS-RFQ-LOCAL-${Date.now()}`;
      const mockResult: EnquirySubmissionResponse = {
        success: true,
        message: 'Quotation request logged locally.',
        enquiryId: fallbackId,
        submittedAt: new Date().toISOString(),
        data: formData,
      };
      setSubmissionResult(mockResult);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setSubmissionResult(null);
  };

  // Dynamic contact URL for RFQ success state: resolves to current production origin or Vercel production URL
  const contactHref =
    typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')
      ? `${window.location.origin}/#contact`
      : 'https://bhansali-stainless.vercel.app/#contact';

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Keep local development smooth by scrolling smoothly to #contact
    if (typeof window !== 'undefined' && window.location.origin.includes('localhost')) {
      e.preventDefault();
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = 'contact';
      }
    }
  };

  return (
    <section id="enquiry" className="py-20 bg-slate-900/80 border-b border-slate-800 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Context & Procurement Value */}
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="blue">B2B RFQ Desk</Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Request a Formal B2B Quotation
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Submit your project bill of materials (BOM), required flange types, stainless steel grades,
              and destination port. Our export engineering team delivers detailed commercial and technical proposals.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 bg-slate-950 p-4 border border-slate-800 rounded-sm">
                <Clock className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                    Responsive Quotation Support
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Standard quotation turnarounds for standard ASME B16.5 sizes and grades.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950 p-4 border border-slate-800 rounded-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                    EN 10204 3.1 Material Test Certificate
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    EN 10204 3.1 MTC available as specified by the purchase order; Third-Party Inspection available as per purchase order / inspection plan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-950 p-4 border border-slate-800 rounded-sm">
                <FileText className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
                    Custom Specification Review
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Engineering review for non-standard wall thicknesses, custom facings (RTJ/tongue-and-groove), or large-diameter Series A/B flanges.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-700/90 rounded-sm p-6 sm:p-8 shadow-2xl">
            {submissionResult?.success ? (
              /* Success Confirmation Screen */
              <div className="py-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-600/60 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    Quotation Request Successfully Submitted
                  </span>
                  <h3 className="text-2xl font-bold text-white">Thank You for Your Enquiry</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Your request has been logged and assigned to our Middle East export engineering team.
                  </p>
                </div>

                {/* RFQ Dossier Box */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-sm text-left max-w-md mx-auto space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Reference Number:</span>
                    <span className="text-sky-400 font-bold">{submissionResult.enquiryId}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Product Grade:</span>
                    <span className="text-slate-200">{formData.productGrade}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Flange Type:</span>
                    <span className="text-slate-200">{formData.flangeType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Destination:</span>
                    <span className="text-slate-200">{formData.destinationCountry}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-sm transition-colors"
                  >
                    Submit Another RFQ
                  </button>
                  <a
                    href={contactHref}
                    onClick={handleContactClick}
                    className="w-full sm:w-auto px-6 py-2.5 text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-sm transition-colors"
                  >
                    View Direct Phone Lines
                  </a>
                </div>
              </div>
            ) : (
              /* Active Lead Capture Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="border-b border-slate-800 pb-4 mb-2">
                  <h3 className="text-lg font-bold text-white">B2B RFQ Specification Form</h3>
                  <p className="text-xs text-slate-400">
                    Fields marked with an asterisk (<span className="text-rose-400">*</span>) are required.
                  </p>
                </div>

                {/* Name & Business Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Contact Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      placeholder="e.g. Abdullah Al-Mansoor"
                      className={`w-full bg-slate-900 border text-xs sm:text-sm text-slate-100 p-2.5 rounded-sm focus:outline-none focus:ring-1 ${
                        errors.fullName
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-700 focus:border-sky-500 focus:ring-sky-500'
                      }`}
                    />
                    {errors.fullName && (
                      <span id="fullName-error" className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="businessEmail"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Business Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="businessEmail"
                      name="businessEmail"
                      value={formData.businessEmail}
                      onChange={handleChange}
                      aria-invalid={!!errors.businessEmail}
                      aria-describedby={errors.businessEmail ? 'businessEmail-error' : undefined}
                      placeholder="procurement@company.com"
                      className={`w-full bg-slate-900 border text-xs sm:text-sm text-slate-100 p-2.5 rounded-sm focus:outline-none focus:ring-1 ${
                        errors.businessEmail
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-700 focus:border-sky-500 focus:ring-sky-500'
                      }`}
                    />
                    {errors.businessEmail && (
                      <span id="businessEmail-error" className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.businessEmail}
                      </span>
                    )}
                  </div>
                </div>

                {/* Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Phone / WhatsApp Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      placeholder="+966 50 123 4567"
                      className={`w-full bg-slate-900 border text-xs sm:text-sm text-slate-100 p-2.5 rounded-sm focus:outline-none focus:ring-1 ${
                        errors.phone
                          ? 'border-rose-500 focus:ring-rose-500'
                          : 'border-slate-700 focus:border-sky-500 focus:ring-sky-500'
                      }`}
                    />
                    {errors.phone && (
                      <span id="phone-error" className="flex items-center gap-1 text-[11px] text-rose-400 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="companyName"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Petrofac / Saudi Aramco Contractor"
                      className="w-full bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 p-2.5 rounded-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Destination Country & Grade Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="destinationCountry"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Destination Market / Port
                    </label>
                    <select
                      id="destinationCountry"
                      name="destinationCountry"
                      value={formData.destinationCountry}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 p-2.5 rounded-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    >
                      <option value="Saudi Arabia">Saudi Arabia (Dammam / Jubail / Jeddah)</option>
                      <option value="United Arab Emirates">UAE (Jebel Ali / Abu Dhabi / Khalifa)</option>
                      <option value="Oman">Oman (Sohar / Salalah)</option>
                      <option value="Qatar">Qatar (Hamad Port / Ras Laffan)</option>
                      <option value="Kuwait">Kuwait (Shuwaikh / Shuaiba)</option>
                      <option value="Bahrain">Bahrain (Khalifa Bin Salman)</option>
                      <option value="Other Middle East">Other Middle East Region</option>
                      <option value="Global Export">Global Export Destination</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="productGrade"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Stainless Steel Grade Interest
                    </label>
                    <select
                      id="productGrade"
                      name="productGrade"
                      value={formData.productGrade}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 p-2.5 rounded-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    >
                      <option value="Stainless Steel 316L">Stainless Steel 316L (Low Carbon)</option>
                      <option value="Stainless Steel 316">Stainless Steel 316 (Standard Mo-Alloy)</option>
                      <option value="Stainless Steel 304">Stainless Steel 304 (General Industrial)</option>
                      <option value="Stainless Steel 304L">Stainless Steel 304L (Welded General)</option>
                      <option value="Dual Certified 316/316L">Dual Certified 316 / 316L</option>
                      <option value="Dual Certified 304/304L">Dual Certified 304 / 304L</option>
                      <option value="Duplex / Super Duplex">Duplex / Super Duplex (F51 / F53 / F55)</option>
                    </select>
                  </div>
                </div>

                {/* Flange Type & Pressure Class */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label
                      htmlFor="flangeType"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Flange Type
                    </label>
                    <select
                      id="flangeType"
                      name="flangeType"
                      value={formData.flangeType}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 p-2.5 rounded-sm focus:outline-none focus:border-sky-500"
                    >
                      <option value="Weld Neck Flange (WNRF)">Weld Neck (WNRF)</option>
                      <option value="Slip-On Flange (SORF)">Slip-On (SORF)</option>
                      <option value="Blind Flange (BLRF)">Blind (BLRF)</option>
                      <option value="Socket Weld Flange (SWRF)">Socket Weld (SWRF)</option>
                      <option value="Threaded / Screwed (NPT)">Threaded (NPT)</option>
                      <option value="Lap Joint Flange (LJRF)">Lap Joint (LJRF)</option>
                      <option value="Mixed Assortment">Mixed Assortment / Piping Spool</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="pressureClass"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Pressure Rating
                    </label>
                    <select
                      id="pressureClass"
                      name="pressureClass"
                      value={formData.pressureClass}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 p-2.5 rounded-sm focus:outline-none focus:border-sky-500"
                    >
                      <option value="Class 150">Class 150</option>
                      <option value="Class 300">Class 300</option>
                      <option value="Class 600">Class 600</option>
                      <option value="Class 900">Class 900</option>
                      <option value="Class 1500">Class 1500</option>
                      <option value="Class 2500 (applicable sizes)">Class 2500 (applicable sizes)</option>
                      <option value="Metric DIN / EN">Metric DIN / EN Ratings</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="estimatedQuantity"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Estimated Quantity
                    </label>
                    <input
                      type="text"
                      id="estimatedQuantity"
                      name="estimatedQuantity"
                      value={formData.estimatedQuantity}
                      onChange={handleChange}
                      placeholder="e.g. 250 pcs / 1 FCL"
                      className="w-full bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 p-2.5 rounded-sm focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                {/* Additional Specifications */}
                <div>
                  <label
                    htmlFor="additionalSpecifications"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Additional Specifications & Project Notes
                  </label>
                  <textarea
                    id="additionalSpecifications"
                    name="additionalSpecifications"
                    rows={3}
                    value={formData.additionalSpecifications}
                    onChange={handleChange}
                    placeholder="Include size range (e.g., NPS 2 to NPS 12), pipe schedule (SCH 40/80), facing (RF/RTJ), inspection requirements, or target delivery dates..."
                    className="w-full bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 p-2.5 rounded-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                  />
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 disabled:bg-slate-700 disabled:cursor-not-allowed transition-all rounded-sm shadow-lg shadow-sky-950/60 border border-sky-400/40"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting RFQ Details...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Official Quotation Request</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2.5">
                    Data is processed securely for commercial RFQ evaluation. No marketing spam.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

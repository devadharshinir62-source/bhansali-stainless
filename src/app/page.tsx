import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { ProductOverview } from '@/components/sections/ProductOverview';
import { GradeVariants } from '@/components/sections/GradeVariants';
import { SpecificationsTable } from '@/components/sections/SpecificationsTable';
import { Certifications } from '@/components/sections/Certifications';
import { ExportLogistics } from '@/components/sections/ExportLogistics';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { EnquiryForm } from '@/components/sections/EnquiryForm';
import { ContactCta } from '@/components/sections/ContactCta';
import { Footer } from '@/components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      {/* 1. Header / Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1" id="main-content">
        {/* 2. Hero Section with entrance animation */}
        <Hero />

        {/* 3. Product Overview (Flange Types & Applications) */}
        <ProductOverview />

        {/* 4. Product / Grade Variants (SS 304, 316, 316L with scroll reveal) */}
        <GradeVariants />

        {/* 5. Technical Specifications Table */}
        <SpecificationsTable />

        {/* 6. Certifications / Quality Section */}
        <Certifications />

        {/* 7. Export & Shipping Section (Saudi Arabia, UAE, Middle East) */}
        <ExportLogistics />

        {/* 8. Why Choose Bhansali Stainless */}
        <WhyChooseUs />

        {/* 9. Working Enquiry Form with client-side validation & local logging */}
        <EnquiryForm />

        {/* 10. Pre-footer Contact CTA */}
        <ContactCta />
      </main>

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}

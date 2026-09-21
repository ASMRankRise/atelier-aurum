'use client';

import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import BuildAtScaleSection from '@/components/home/BuildAtScaleSection';
import MetricsGridSection from '@/components/home/MetricsGridSection';
import TrustPartnersBar from '@/components/home/TrustPartnersBar';
import HorizontalShowcase from '@/components/home/HorizontalShowcase';
import MaterialLaboratory from '@/components/home/MaterialLaboratory';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ConsultationSection from '@/components/home/ConsultationSection';

export default function HomePage() {
  return (
    <div className="relative w-full bg-[#FAFAF8] text-[#141413] flex flex-col min-h-screen selection:bg-[#C5A880] selection:text-[#111111]">
      {/* 1. Hero Section: Architectural Mark, Category Filter, Curved Louver Facade */}
      <HeroSection />

      {/* 2. Build at Scale. Build for Impact. with Animated Architectural Hatch Stat Boxes (40%, 80%, 95%) */}
      <BuildAtScaleSection />

      {/* 3. Metrics & Innovation Grid: 28% BIM Material Waste Reduction + Siemens, NASA, Pfizer */}
      <MetricsGridSection />

      {/* 4. Institutional Trust Partner Bar: City of Oslo, Pfizer, Merck, Harvard, Siemens, IBM, MIT */}
      <TrustPartnersBar />

      {/* 5. Pinned Horizontal Signature Works Showcase */}
      <HorizontalShowcase />

      {/* 6. Interactive Material Laboratory: Roman Travertine, Brushed Brass, Fluted Glass, Yakisugi Cedar, Nero Marquina */}
      <MaterialLaboratory />

      {/* 7. Client Testimonial Section: Dr. Michael Kraus (Merck) & Institutional Partners */}
      <TestimonialsSection />

      {/* 8. Let's Build Together Contact & Consultation Section with Curved Golden Bronze Facade */}
      <ConsultationSection />
    </div>
  );
}

'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animations';
import {
  Compass,
  ArrowUpRight,
  MapPin,
  Building,
} from 'lucide-react';
import { ProjectCategory } from '@/data/projects';
import { openConsultationModal } from '@/components/ConsultationModal';

interface CategoryTabItem {
  key: ProjectCategory;
  label: string;
}

const HERO_TABS: CategoryTabItem[] = [
  { key: 'all', label: 'ALL' },
  { key: 'education', label: 'EDUCATION' },
  { key: 'civic', label: 'CIVIC & URBAN INFRASTRUCTURE' },
  { key: 'corporate', label: 'CORPORATE CAMPUSES' },
  { key: 'healthcare', label: 'HEALTHCARE' },
];

// Highlighted showcase data tailored to each category
const CATEGORY_SHOWCASE = {
  all: {
    title: 'Summit University Campus, Toronto',
    subtitle: 'Vertical mass timber quadrangle with dynamic computational bronze shading louvers',
    location: 'Toronto, Ontario, Canada',
    coordinates: '43°39\'48"N 79°23\'24"W',
    area: '64,000 sqm',
    year: '2025',
    metric: '42% Solar Load Reduction',
    facadeSpec: 'Curved Vertical Louvers • Mass Timber Ribs',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=2400&q=85',
    slug: 'summit-university-campus',
  },
  education: {
    title: 'Summit University Campus, Toronto',
    subtitle: 'Vertical academic quadrangle reinterpreting collegiate gathering with solar-tracking bronze fins',
    location: 'Toronto, Ontario, Canada',
    coordinates: '43°39\'48"N 79°23\'24"W',
    area: '64,000 sqm',
    year: '2025',
    metric: '42% Peak Heat Reduction',
    facadeSpec: 'Double-Skin Glazing • Precast Basalt',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=2400&q=85',
    slug: 'summit-university-campus',
  },
  civic: {
    title: 'Solarium Civic Pavilion, Zurich',
    subtitle: 'Parabolic public forum hovering over Lake Zurich with acoustic timber vaulting',
    location: 'Zurich, Switzerland',
    coordinates: '47°22\'00"N 8°32\'30"E',
    area: '18,200 sqm',
    year: '2024',
    metric: '56% Embodied Carbon Reduction',
    facadeSpec: 'Titanium Zinc Shingles • Pozzolanic Concrete',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=85',
    slug: 'solarium-pavilion',
  },
  corporate: {
    title: 'Merck Global Discovery Centre, Darmstadt',
    subtitle: 'Interconnected pharmaceutical research campus organized around biophilic circular courtyards',
    location: 'Darmstadt, Germany',
    coordinates: '49°52\'18"N 8°39\'03"E',
    area: '112,000 sqm',
    year: '2024',
    metric: '28% Structural Steel Tonnage Saved',
    facadeSpec: 'Roman Travertine Panels • Curved Thermal Glass',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    slug: 'merck-discovery-campus',
  },
  healthcare: {
    title: 'Aurum Life Science Hub, Boston',
    subtitle: 'Translational research tower with vibration-damped floorplates and laser microscopy cores',
    location: 'Boston, Massachusetts, USA',
    coordinates: '42°20\'17"N 71°06\'12"W',
    area: '88,000 sqm',
    year: '2026',
    metric: 'LEED Platinum Pre-Certified',
    facadeSpec: 'Dynamic Kinetic Micro-Louvers • Ceramic Frit',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85',
    slug: 'aurum-biomedical-tower',
  },
};

interface HeroSectionProps {
  onSelectCategory?: (cat: ProjectCategory) => void;
}

export default function HeroSection({ onSelectCategory }: HeroSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const facadeWrapperRef = useRef<HTMLDivElement>(null);
  const facadeImageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const currentShowcase = CATEGORY_SHOWCASE[activeCategory as keyof typeof CATEGORY_SHOWCASE] || CATEGORY_SHOWCASE.all;

  const handleTabClick = (category: ProjectCategory) => {
    setActiveCategory(category);
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  useGSAP(
    () => {
      // 1. Initial entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(pillsRef.current, {
        y: -15,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
      })
        .from(
          markRef.current,
          {
            y: 30,
            opacity: 0,
            scale: 0.97,
            duration: 1.1,
          },
          '-=0.5'
        )
        .from(
          subtitleRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.9,
          },
          '-=0.7'
        )
        .from(
          tabsRef.current,
          {
            y: 15,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          facadeWrapperRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: 'expo.out',
          },
          '-=0.6'
        )
        .from(
          badgeRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4'
        );

      // 2. Parallax zoom on the huge curved facade image on scroll
      if (facadeImageRef.current && facadeWrapperRef.current) {
        gsap.to(facadeImageRef.current, {
          yPercent: 12,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: facadeWrapperRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 bg-[#FAFAF8] text-[#141413] overflow-hidden"
    >
      {/* CAD Architectural Hairline Drafting Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,#141413_1px,transparent_1px),linear-gradient(to_bottom,#141413_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Decorative Technical Crosshairs in Hero Margins */}
      <div className="absolute top-28 left-6 sm:left-12 text-[#141413]/25 font-mono text-[10px] hidden sm:flex items-center gap-2 select-none pointer-events-none">
        <span className="text-[#C5A880]">+</span>
        <span>ARCHIØN // GRID 01-A</span>
      </div>
      <div className="absolute top-28 right-6 sm:right-12 text-[#141413]/25 font-mono text-[10px] hidden sm:flex items-center gap-2 select-none pointer-events-none">
        <span>REF: CAD 2026-HQ</span>
        <span className="text-[#C5A880]">+</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Experience Pills */}
        <div
          ref={pillsRef}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#E5E3DD] bg-[#F5F4F0]/80 backdrop-blur-sm text-[11px] sm:text-xs font-mono tracking-wider text-[#6B6862] shadow-sm hover:border-[#C5A880]/60 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span className="font-semibold text-[#141413]">24 Years</span> of expertise
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-[#E5E3DD] bg-[#F5F4F0]/80 backdrop-blur-sm text-[11px] sm:text-xs font-mono tracking-wider text-[#6B6862] shadow-sm hover:border-[#C5A880]/60 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-[#141413]" />
            <span className="font-semibold text-[#141413]">357</span> Completed projects
          </div>

          <div className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E5E3DD] bg-[#F5F4F0]/80 backdrop-blur-sm text-[11px] font-mono tracking-wider text-[#6B6862] shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>London • New York • Riyadh</span>
          </div>
        </div>

        {/* Center Prominent Architectural Brand Mark */}
        <div className="text-center max-w-5xl mx-auto">
          <h1
            ref={markRef}
            className="tracking-[0.24em] sm:tracking-[0.28em] font-light text-5xl sm:text-7xl md:text-8xl lg:text-[108px] text-[#141413] leading-none uppercase select-none transition-all duration-300"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            <span>ARCHI</span>
            <span className="relative inline-flex items-center justify-center font-serif italic text-[#C5A880] mx-0.5 sm:mx-1">
              Ø
              <span className="absolute -top-2 sm:-top-3 right-0 text-[11px] sm:text-sm text-[#A67C52] font-mono not-italic">
                °
              </span>
            </span>
            <span>N</span>
          </h1>

          {/* Architectural Subtitle */}
          <p
            ref={subtitleRef}
            className="mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-[#6B6862] max-w-2xl sm:max-w-3xl mx-auto font-light leading-relaxed tracking-tight px-2"
          >
            Deliver large-scale architectural and construction projects that shape cities, communities, and industries.
          </p>
        </div>

        {/* Interactive Category Pill Filter Tabs */}
        <div
          ref={tabsRef}
          className="mt-8 sm:mt-10 flex items-center justify-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 p-1.5 rounded-full bg-[#F5F4F0] border border-[#E5E3DD] shadow-inner max-w-full overflow-x-auto">
            {HERO_TABS.map((tab) => {
              const isActive = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleTabClick(tab.key)}
                  className={`px-3.5 sm:px-5 py-2 rounded-full text-[11px] sm:text-xs font-mono tracking-[0.14em] uppercase transition-all duration-300 whitespace-nowrap cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#141413] text-[#FAFAF8] shadow-md shadow-black/10 font-semibold'
                      : 'text-[#6B6862] hover:text-[#141413] hover:bg-white/60'
                  }`}
                  data-cursor-text={tab.label}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Huge Cinematic Curved Facade Image with Vertical Louvers */}
        <div
          ref={facadeWrapperRef}
          className="mt-10 sm:mt-14 relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E5E3DD] shadow-2xl shadow-stone-900/10 bg-stone-900 aspect-[16/9] md:aspect-[21/9] min-h-[380px] sm:min-h-[480px] group"
        >
          {/* Parallax inner image layer */}
          <div
            ref={facadeImageRef}
            className="absolute -inset-y-12 -inset-x-4 w-[calc(100%+2rem)] h-[calc(100%+6rem)] will-change-transform"
          >
            <Image
              src={currentShowcase.image}
              alt={currentShowcase.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 95vw, 1280px"
              className="object-cover object-center filter brightness-[0.92] contrast-[1.04] transition-all duration-700 group-hover:scale-[1.02]"
            />
          </div>

          {/* Cinematic Vignette & Drafting Layer Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none" />
          
          {/* Subtle Vertical Louver Shading Lines in Top Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_24px,rgba(255,255,255,0.12)_24px,rgba(255,255,255,0.12)_25px)]" />

          {/* Architectural CAD Corner Ticks */}
          <div className="absolute top-4 left-4 text-white/50 font-mono text-xs select-none pointer-events-none">
            ┌ CAD REF // {currentShowcase.coordinates}
          </div>
          <div className="absolute top-4 right-4 text-white/50 font-mono text-xs select-none pointer-events-none">
            {currentShowcase.area} ┐
          </div>

          {/* Floating Architectural Badge Tag (bottom-left to bottom-right) */}
          <div
            ref={badgeRef}
            className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 z-20 pointer-events-auto"
          >
            {/* Primary Project Information Card */}
            <div className="bg-[#111111]/85 backdrop-blur-xl border border-white/15 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white max-w-xl shadow-2xl">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 text-[10px] sm:text-[11px] font-mono tracking-wider text-[#EAD7BB] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                  KEY SIGNATURE MONOGRAPH
                </span>
                <span className="text-[11px] font-mono text-stone-300">
                  {currentShowcase.year} COMPLETED
                </span>
              </div>

              <h2 className="text-lg sm:text-2xl md:text-3xl font-light tracking-tight text-white font-serif">
                {currentShowcase.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 font-light line-clamp-2 leading-relaxed">
                {currentShowcase.subtitle}
              </p>

              {/* Technical Specifications Strip */}
              <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-mono text-stone-300">
                <div className="flex items-center gap-1 text-stone-300">
                  <MapPin className="w-3 h-3 text-[#C5A880]" />
                  <span>{currentShowcase.location}</span>
                </div>
                <div className="flex items-center gap-1 text-stone-300">
                  <Building className="w-3 h-3 text-[#C5A880]" />
                  <span>{currentShowcase.area}</span>
                </div>
                <div className="text-[#EAD7BB] font-medium">
                  {currentShowcase.metric}
                </div>
              </div>
            </div>

            {/* Right Action Pill: Direct Consultation / Monograph Trigger */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => openConsultationModal('Education')}
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#C5A880] hover:from-[#EAD7BB] hover:to-[#C5A880] text-[#111111] text-xs font-mono tracking-[0.18em] uppercase font-bold transition-all shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>INITIATE COMMISSION</span>
                <ArrowUpRight className="w-4 h-4 text-[#111111]" />
              </button>
            </div>
          </div>
        </div>

        {/* Sub-hero Hairline Metric Readout Strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-[#E5E3DD] text-[11px] sm:text-xs font-mono text-[#6B6862]">
          <div>
            <span className="text-[#C5A880] font-semibold">01 / GEOMETRY</span>
            <p className="text-[#141413] mt-0.5 font-sans text-xs sm:text-sm font-medium">
              Parametric Façade Shading
            </p>
          </div>
          <div>
            <span className="text-[#C5A880] font-semibold">02 / CARBON</span>
            <p className="text-[#141413] mt-0.5 font-sans text-xs sm:text-sm font-medium">
              -38% Embodied Mass Timber
            </p>
          </div>
          <div>
            <span className="text-[#C5A880] font-semibold">03 / FABRICATION</span>
            <p className="text-[#141413] mt-0.5 font-sans text-xs sm:text-sm font-medium">
              99.7% Direct-to-BIM Match
            </p>
          </div>
          <div>
            <span className="text-[#C5A880] font-semibold">04 / DELIVERY</span>
            <p className="text-[#141413] mt-0.5 font-sans text-xs sm:text-sm font-medium">
              Turnkey Engineering & Assembly
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

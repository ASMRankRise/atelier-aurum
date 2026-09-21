'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animations';
import { ArrowUpRight, Globe2, Cpu, Clock } from 'lucide-react';
import ArchitecturalHatch from '@/components/ArchitecturalHatch';

export default function BuildAtScaleSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [count1, setCount1] = useState(40);
  const [count2, setCount2] = useState(80);
  const [count3, setCount3] = useState(95);

  useGSAP(
    () => {
      // 1. Reveal header split
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none',
        },
      });

      tl.from(headlineRef.current, {
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      }).from(
        paragraphRef.current,
        {
          y: 25,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      );

      // 2. Animate stat cards entrance
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 88%',
            once: true,
            toggleActions: 'play none none none',
          },
        });
      }

      // 3. Count up animation for 40%, 80%, 95%
      const counterTarget = { c1: 0, c2: 0, c3: 0 };
      gsap.to(counterTarget, {
        c1: 40,
        c2: 80,
        c3: 95,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 88%',
          once: true,
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          setCount1(Math.round(counterTarget.c1));
          setCount2(Math.round(counterTarget.c2));
          setCount3(Math.round(counterTarget.c3));
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative py-24 sm:py-32 bg-[#FAFAF8] text-[#141413] hairline-t hairline-b overflow-hidden"
    >
      {/* Background Architectural Watermark Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[radial-gradient(#141413_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Tracker & Moniker */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#C5A880]">
            01 / INSTITUTIONAL ARCHITECTURE & ENGINEERING
          </span>
        </div>

        {/* Two-Column Editorial Header Split matching Conceptzilla ARCHIØN style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-16 sm:pb-20 border-b border-[#E5E3DD]">
          
          {/* Left Column: Bold Architectural Title */}
          <div ref={headlineRef} className="lg:col-span-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#141413] leading-[1.08] font-sans">
              <span>Build at Scale.</span>
              <br />
              <span className="font-serif italic font-normal text-[#141413] selection:text-[#C5A880]">
                Build for Impact.
              </span>
            </h2>

            <div className="mt-6 flex items-center gap-4 text-xs font-mono text-[#6B6862]">
              <span className="inline-block w-8 h-[1px] bg-[#C5A880]" />
              <span className="uppercase tracking-widest">
                INTEGRATED PRAXIS • 2026 EDITION
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div ref={paragraphRef} className="lg:col-span-6 space-y-5">
            <p className="text-base sm:text-lg text-[#6B6862] font-light leading-relaxed">
              ARCHIØN redefines modern monumental construction by bridging conceptual architectural gravitas with direct-to-fabrication computational engineering. From collegiate research quads in Toronto to subterranean cultural archives in Kyoto, we orchestrate the complete project lifecycle with uncompromising structural and environmental rigor.
            </p>

            <p className="text-sm text-[#8C8983] font-light leading-relaxed">
              Our multidisciplinary studios in London, New York, and Riyadh unite licensed master architects, parametric façade scientists, and digital-twin BIM coordinators under a single unified praxis—delivering turnkey certainty for sovereign and institutional clients worldwide.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-[#141413]">
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 text-[#141413] hover:text-[#C5A880] transition-colors border-b border-[#141413] pb-0.5 tracking-wider uppercase group"
              >
                <span>Explore signature commissions</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <span className="text-[#E5E3DD]">•</span>
              <span className="text-[#6B6862]">Zero Unbudgeted Change Orders</span>
            </div>
          </div>
        </div>

        {/* Architectural Hatch Stat Boxes (as seen in Conceptzilla ARCHIØN screenshot) */}
        <div
          ref={cardsRef}
          className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          
          {/* Box 1: 40% with Diagonal 45° Hatch Lines */}
          <div className="relative group bg-[#F5F4F0] border border-[#E5E3DD] hover:border-[#C5A880] rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#C5A880]/10 flex flex-col justify-between min-h-[300px]">
            {/* Background SVG 45° Diagonal Hatch Pattern */}
            <ArchitecturalHatch
              pattern="diagonal"
              density="normal"
              strokeColor="#D4D1C8"
              strokeWidth={1}
              patternOpacity={0.45}
              interactiveHover={true}
              className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl sm:rounded-3xl"
            />

            {/* Top Indicator */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-[#6B6862] uppercase">
                <Globe2 className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>PORTFOLIO DIVERSITY</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/70 border border-[#E5E3DD] text-[#8C8983]">
                45° DIAGONAL
              </span>
            </div>

            {/* Stat Number & Narrative */}
            <div className="relative z-10 my-6">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-light text-[#141413] tracking-tight font-sans">
                <span>{count1}</span>
                <span className="text-[#C5A880] text-5xl sm:text-6xl font-light ml-0.5">%</span>
              </div>
              <h3 className="mt-3 text-lg sm:text-xl font-light text-[#141413] font-serif">
                of our portfolio is international
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#6B6862] font-light leading-relaxed">
                Active commissions and built masterplans across Western Europe, North America, Japan, and the GCC.
              </p>
            </div>

            {/* Bottom Meta */}
            <div className="relative z-10 pt-4 border-t border-[#E5E3DD]/80 flex items-center justify-between text-[11px] font-mono text-[#8C8983]">
              <span>GLOBAL PRACTICE</span>
              <span className="text-[#C5A880] font-semibold">14 COUNTRIES</span>
            </div>
          </div>

          {/* Box 2: 80% with Vertical Louver Hatch Lines */}
          <div className="relative group bg-[#F5F4F0] border border-[#E5E3DD] hover:border-[#C5A880] rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#C5A880]/10 flex flex-col justify-between min-h-[300px]">
            {/* Background SVG Vertical Louver Hatch Pattern */}
            <ArchitecturalHatch
              pattern="vertical"
              density="dense"
              strokeColor="#D4D1C8"
              strokeWidth={1}
              patternOpacity={0.45}
              interactiveHover={true}
              className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl sm:rounded-3xl"
            />

            {/* Top Indicator */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-[#6B6862] uppercase">
                <Cpu className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>COMPUTATIONAL PROTOCOL</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/70 border border-[#E5E3DD] text-[#8C8983]">
                VERTICAL LOUVERS
              </span>
            </div>

            {/* Stat Number & Narrative */}
            <div className="relative z-10 my-6">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-light text-[#141413] tracking-tight font-sans">
                <span>{count2}</span>
                <span className="text-[#C5A880] text-5xl sm:text-6xl font-light ml-0.5">%</span>
              </div>
              <h3 className="mt-3 text-lg sm:text-xl font-light text-[#141413] font-serif">
                of projects use BIM technologies
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#6B6862] font-light leading-relaxed">
                ISO 19650 Level 3 parametric digital-twin modeling eliminating structural clashes before ground-breaking.
              </p>
            </div>

            {/* Bottom Meta */}
            <div className="relative z-10 pt-4 border-t border-[#E5E3DD]/80 flex items-center justify-between text-[11px] font-mono text-[#8C8983]">
              <span>DIGITAL TWIN FABRICATION</span>
              <span className="text-[#C5A880] font-semibold">ISO 19650 LEVEL 3</span>
            </div>
          </div>

          {/* Box 3: 95% with Crosshatch Lines */}
          <div className="relative group bg-[#F5F4F0] border border-[#E5E3DD] hover:border-[#C5A880] rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-[#C5A880]/10 flex flex-col justify-between min-h-[300px]">
            {/* Background SVG Crosshatch Pattern */}
            <ArchitecturalHatch
              pattern="crosshatch"
              density="normal"
              strokeColor="#D4D1C8"
              strokeWidth={1}
              patternOpacity={0.4}
              interactiveHover={true}
              className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl sm:rounded-3xl"
            />

            {/* Top Indicator */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-[#6B6862] uppercase">
                <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>CERTAINTY OF DELIVERY</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/70 border border-[#E5E3DD] text-[#8C8983]">
                CROSSHATCH GRID
              </span>
            </div>

            {/* Stat Number & Narrative */}
            <div className="relative z-10 my-6">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-light text-[#141413] tracking-tight font-sans">
                <span>{count3}</span>
                <span className="text-[#C5A880] text-5xl sm:text-6xl font-light ml-0.5">%</span>
              </div>
              <h3 className="mt-3 text-lg sm:text-xl font-light text-[#141413] font-serif">
                of projects delivered on time
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-[#6B6862] font-light leading-relaxed">
                Integrated construction management and modular prefabrication safeguarding institutional milestones.
              </p>
            </div>

            {/* Bottom Meta */}
            <div className="relative z-10 pt-4 border-t border-[#E5E3DD]/80 flex items-center justify-between text-[11px] font-mono text-[#8C8983]">
              <span>CRITICAL PATH RECORD</span>
              <span className="text-[#C5A880] font-semibold">ON SCHEDULE</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animations';
import {
  ShieldCheck,
  TrendingDown,
  Activity,
  CheckCircle2,
} from 'lucide-react';
import ArchitecturalHatch from '@/components/ArchitecturalHatch';

export default function MetricsGridSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const featureCardRef = useRef<HTMLDivElement>(null);
  const bulletsGridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          once: true,
        },
      });

      tl.fromTo(
        headlineRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', clearProps: 'all' }
      )
        .fromTo(
          featureCardRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', clearProps: 'all' },
          '-=0.4'
        )
        .fromTo(
          bulletsGridRef.current?.children || [],
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            clearProps: 'all',
          },
          '-=0.5'
        );
    }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-[#FAFAF8] text-[#141413] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Tag & Title */}
        <div ref={headlineRef} className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#C5A880]">
              02 / COMPUTATIONAL BENCHMARKS & INNOVATION
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#141413] leading-[1.1] font-sans">
            Rigorous engineering meets{' '}
            <span className="font-serif italic font-normal text-[#141413]">
              unyielding precision.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B6862] font-light leading-relaxed">
            By embedding algorithmic topology optimization into our parametric 5D BIM pipeline, ARCHIØN eliminates guesswork, slashes excess embodied carbon, and enforces sub-millimeter tolerances on site.
          </p>
        </div>

        {/* Primary Feature Card: 28% Material Waste Reduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-10">
          
          {/* Main 28% Hero Innovation Card */}
          <div
            ref={featureCardRef}
            className="lg:col-span-7 bg-[#111111] text-[#ededed] border border-stone-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            {/* Background CAD Drafting Blueprint Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:28px_28px]" />
            
            {/* Subtle Diagonal Gold Texture */}
            <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-15 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C5A880] via-transparent to-transparent" />

            {/* Top Bar Status */}
            <div className="relative z-10 flex items-center justify-between pb-6 border-b border-stone-800/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
                <span className="text-[11px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                  BIM 4.0 PROTOCOL • STRESS TENSOR MODELING
                </span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-stone-400">
                PATENTED ALGORITHM
              </span>
            </div>

            {/* Center: Big 28% Readout & Explanation */}
            <div className="relative z-10 my-8">
              <div className="flex items-baseline gap-2">
                <span className="text-7xl sm:text-8xl lg:text-9xl font-light text-white tracking-tight font-sans">
                  28
                </span>
                <span className="text-5xl sm:text-6xl text-[#C5A880] font-light">%</span>
              </div>
              
              <h3 className="mt-2 text-xl sm:text-2xl font-light text-white font-serif">
                ARCHIØN reduces material waste by 28% through precise BIM modeling.
              </h3>

              <p className="mt-3 text-sm text-stone-400 font-light leading-relaxed max-w-xl">
                Deploying finite element analysis (FEA) directly into fabrication geometry strips over-engineered concrete footings and redundant structural steel tonnage without sacrificing safety margins.
              </p>
            </div>

            {/* Bottom CAD Metric Readouts */}
            <div className="relative z-10 pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-stone-300 block">CONCRETE SAVINGS</span>
                <span className="text-[#C5A880] font-semibold text-sm">2,400 TONS</span>
              </div>
              <div>
                <span className="text-stone-300 block">STEEL WEIGHT</span>
                <span className="text-[#C5A880] font-semibold text-sm">-28.4% TONNAGE</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-stone-300 block">SITE ERECTION</span>
                <span className="text-[#C5A880] font-semibold text-sm">+4 MOS FASTER</span>
              </div>
            </div>
          </div>

          {/* Right Side: Visual CAD Blueprint & Structural Wireframe */}
          <div className="lg:col-span-5 bg-[#F5F4F0] border border-[#E5E3DD] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <ArchitecturalHatch
              pattern="crosshatch"
              density="dense"
              strokeColor="#D4D1C8"
              strokeWidth={1}
              patternOpacity={0.35}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#6B6862]">
                <span className="tracking-widest uppercase text-[#C5A880]">
                  STRUCTURAL DIGITAL TWIN
                </span>
                <span>FEA VERIFICATION // 04</span>
              </div>

              <h4 className="mt-4 text-xl font-light text-[#141413] font-serif">
                Zero-Clash Tolerance Guarantee
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-[#6B6862] font-light leading-relaxed">
                Before a single steel truss is fabricated, 100% of MEP, HVAC, acoustic dampers, and post-tensioned cables undergo continuous parametric clash detection down to 0.5mm.
              </p>

              {/* Blueprint Vector Graphic */}
              <div className="mt-6 p-4 rounded-xl bg-white border border-[#E5E3DD] shadow-sm font-mono text-[11px] text-[#6B6862] space-y-2">
                <div className="flex justify-between items-center text-[#141413] font-medium pb-2 border-b border-[#E5E3DD]">
                  <span>SIMULATION STATUS</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> PASSED
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Load Cases Analyzed:</span>
                  <span className="text-[#141413]">400 Simultaneous</span>
                </div>
                <div className="flex justify-between">
                  <span>Dynamic Wind Deflection:</span>
                  <span className="text-[#141413]">1/500 Max Ratio</span>
                </div>
                <div className="flex justify-between">
                  <span>Seismic Shear Absorption:</span>
                  <span className="text-[#141413]">+32% Buffer</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-[#E5E3DD] mt-6 flex items-center justify-between text-xs font-mono text-[#141413]">
              <span>ISO 19650-2 COMPLIANT</span>
              <span className="text-[#C5A880] font-semibold">DIRECT-TO-CNC</span>
            </div>
          </div>
        </div>

        {/* Metric Bullets Grid: Siemens, NASA, Pfizer, Harvard */}
        <div
          ref={bulletsGridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          
          {/* Card 1: Siemens Zero Safety Incidents */}
          <div className="bg-[#F5F4F0] border border-[#E5E3DD] hover:border-[#C5A880] rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E3DD] flex items-center justify-center text-[#141413] mb-4 group-hover:border-[#C5A880] transition-colors">
                <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
              </div>
              <div className="text-[11px] font-mono tracking-wider uppercase text-[#C5A880]">
                SIEMENS SMART INFRASTRUCTURE
              </div>
              <h4 className="text-lg font-light text-[#141413] font-serif mt-1">
                Zero Safety Incidents
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-[#6B6862] font-light leading-relaxed">
                Siemens reported zero lost-time safety incidents across 1.8M construction labor hours using ARCHIØN&apos;s digital-twin predictive site simulation.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E3DD] text-[11px] font-mono text-[#8C8983] flex items-center justify-between">
              <span>1.8M HOURS</span>
              <span className="text-[#141413] font-semibold">100% COMPLIANCE</span>
            </div>
          </div>

          {/* Card 2: NASA Infrastructure Reliability */}
          <div className="bg-[#F5F4F0] border border-[#E5E3DD] hover:border-[#C5A880] rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E3DD] flex items-center justify-center text-[#141413] mb-4 group-hover:border-[#C5A880] transition-colors">
                <Activity className="w-5 h-5 text-[#C5A880]" />
              </div>
              <div className="text-[11px] font-mono tracking-wider uppercase text-[#C5A880]">
                AEROSPACE & QUANTUM CRITERIA
              </div>
              <h4 className="text-lg font-light text-[#141413] font-serif mt-1">
                NASA Boosts Infrastructure Reliability
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-[#6B6862] font-light leading-relaxed">
                Tuned-mass vibration damping and micro-seismic floorplates maintain extreme dimensional stability for sensitive cryo-electron and laser optics.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E3DD] text-[11px] font-mono text-[#8C8983] flex items-center justify-between">
              <span>VIBRATION BUFFER</span>
              <span className="text-[#141413] font-semibold">VC-E CRITERIA</span>
            </div>
          </div>

          {/* Card 3: Pfizer Cuts Operational Costs */}
          <div className="bg-[#F5F4F0] border border-[#E5E3DD] hover:border-[#C5A880] rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E3DD] flex items-center justify-center text-[#141413] mb-4 group-hover:border-[#C5A880] transition-colors">
                <TrendingDown className="w-5 h-5 text-[#C5A880]" />
              </div>
              <div className="text-[11px] font-mono tracking-wider uppercase text-[#C5A880]">
                GLOBAL LIFE SCIENCES R&D
              </div>
              <h4 className="text-lg font-light text-[#141413] font-serif mt-1">
                Pfizer Cuts Facility Operational Costs
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-[#6B6862] font-light leading-relaxed">
                Thermodynamic double-skin louvers and ground-source thermal energy storage reduced ongoing operational HVAC expenditure by 34%.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E3DD] text-[11px] font-mono text-[#8C8983] flex items-center justify-between">
              <span>THERMAL EFFICIENCY</span>
              <span className="text-[#141413] font-semibold">-34% OPEX</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animations';
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  MapPin,
  X,
  Compass,
} from 'lucide-react';
import { PROJECTS, Project } from '@/data/projects';
import { openConsultationModal } from '@/components/ConsultationModal';

// Select 6 premier signature projects
const SIGNATURE_PROJECTS = PROJECTS.slice(0, 6);

export default function HorizontalShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: Pinned horizontal scroll timeline driven by vertical wheel
      mm.add('(min-width: 1024px)', () => {
        if (!trackRef.current || !containerRef.current) return;

        const track = trackRef.current;
        const totalDistance = track.scrollWidth - window.innerWidth + 80;

        const tween = gsap.to(track, {
          x: -totalDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            start: 'top top',
            end: () => `+=${totalDistance + 400}`,
            scrub: 1.1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
            },
          },
        });

        // Parallax image shift inside cards while sliding
        const imageInners = track.querySelectorAll('.parallax-card-image');
        imageInners.forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -10, scale: 1.05 },
            {
              xPercent: 10,
              scale: 1.12,
              ease: 'none',
              scrollTrigger: {
                trigger: img,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  // Mobile scroll buttons
  const handleMobileScroll = (direction: 'prev' | 'next') => {
    if (!trackRef.current) return;
    const cardWidth = 320;
    const newIndex =
      direction === 'next'
        ? Math.min(SIGNATURE_PROJECTS.length - 1, activeMobileIndex + 1)
        : Math.max(0, activeMobileIndex - 1);

    setActiveMobileIndex(newIndex);
    trackRef.current.scrollTo({
      left: newIndex * cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative bg-[#111111] text-[#ededed] py-20 lg:py-0 overflow-hidden font-sans border-b border-stone-800"
    >
      {/* Background Architectural Drafting Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:44px_44px]" />

      {/* Desktop Sticky Header Banner */}
      <div className="lg:h-screen flex flex-col justify-between pt-8 lg:pt-14 pb-8 lg:pb-12 px-4 sm:px-8 lg:px-12 max-w-full">
        
        {/* Section Title & Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-stone-800/80">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.28em] text-[#C5A880] uppercase">
                03 / SIGNATURE WORKS SHOWCASE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white font-serif">
              Monumental Works in Motion
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-light mt-1 max-w-xl">
              Scroll downward to navigate horizontally through ARCHIØN&apos;s latest high-performance commissions worldwide.
            </p>
          </div>

          {/* Desktop Progress Bar & Controls */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col items-end gap-1.5 font-mono text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <span>INDEX // 01 — 0{SIGNATURE_PROJECTS.length}</span>
                <span className="text-[#C5A880] font-semibold">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>
              <div className="w-48 h-1 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C5A880] to-[#EAD7BB] transition-all duration-150"
                  style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex lg:hidden items-center justify-between pt-2">
            <span className="text-xs font-mono text-[#C5A880]">
              SWIPE OR USE ARROWS: 0{activeMobileIndex + 1} / 0{SIGNATURE_PROJECTS.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleMobileScroll('prev')}
                disabled={activeMobileIndex === 0}
                className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#C5A880]"
                aria-label="Previous Project"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleMobileScroll('next')}
                disabled={activeMobileIndex === SIGNATURE_PROJECTS.length - 1}
                className="p-2 rounded-lg bg-stone-900 border border-stone-800 text-stone-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#C5A880]"
                aria-label="Next Project"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Slider Track */}
        <div
          ref={trackRef}
          className="my-auto flex gap-6 sm:gap-8 overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory py-4 lg:py-0 will-change-transform"
        >
          {SIGNATURE_PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              className="w-[85vw] sm:w-[520px] lg:w-[620px] shrink-0 bg-[#161616] border border-stone-800/90 rounded-2xl sm:rounded-3xl overflow-hidden group hover:border-[#C5A880]/70 transition-all duration-500 shadow-2xl flex flex-col justify-between snap-center"
            >
              {/* Card Image Wrapper with Parallax Inner Container */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-stone-900">
                <div className="parallax-card-image absolute -inset-6 w-[calc(100%+3rem)] h-[calc(100%+3rem)] will-change-transform">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 85vw, 640px"
                    className="object-cover object-center filter brightness-[0.88] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-black/30 pointer-events-none" />

                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-stone-200">
                    {project.categoryLabel}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[#C5A880] font-semibold">
                    {project.year} • {project.status}
                  </span>
                </div>

                {/* Floating Bottom Metric Tag */}
                <div className="absolute bottom-3 left-4 text-xs font-mono text-white/90 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                  <span className="text-[#C5A880] font-semibold">{project.stats.energyReduction}</span>{' '}
                  <span className="text-stone-300">Energy Reduction</span>
                </div>
              </div>

              {/* Card Content & Specifications */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-stone-400 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{project.location}</span>
                    <span className="text-stone-600">•</span>
                    <span>{project.area}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-light text-white font-serif tracking-wide group-hover:text-[#EAD7BB] transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-stone-400 font-light line-clamp-2 leading-relaxed">
                    {project.architecturalNarrative}
                  </p>

                  {/* Materials Badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.materials.slice(0, 3).map((mat) => (
                      <span
                        key={mat}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="mt-6 pt-5 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setActiveProjectModal(project)}
                    className="inline-flex items-center gap-2 text-stone-300 group-hover:text-[#C5A880] transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    <span>EXPLORE PROJECT</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>

                  <span className="text-stone-400 text-[11px]">
                    0{idx + 1} / 0{SIGNATURE_PROJECTS.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Architectural Notation */}
        <div className="hidden lg:flex items-center justify-between text-[11px] font-mono text-stone-400 pt-4 border-t border-stone-800/80">
          <div className="flex items-center gap-4">
            <span className="text-stone-300">SCROLL DOWN TO ADVANCE SHOWCASE</span>
            <span>•</span>
            <span>ALL PROJECTS ARCHIVED UNDER ISO 19650 SPECIFICATIONS</span>
          </div>
          <div className="flex items-center gap-2 text-stone-300">
            <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>GLOBAL ARCHITECTURAL PRAXIS</span>
          </div>
        </div>

      </div>

      {/* Interactive Project Modal Drawer for In-depth Inspection */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md animate-in fade-in"
            onClick={() => setActiveProjectModal(null)}
          />

          <div className="relative w-full max-w-3xl bg-[#111111] text-white border border-stone-800 rounded-3xl overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 my-auto max-h-[90vh] flex flex-col">
            {/* Header Image */}
            <div className="relative h-64 sm:h-80 w-full shrink-0">
              <Image
                src={activeProjectModal.heroImage}
                alt={activeProjectModal.title}
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent" />

              <button
                type="button"
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-stone-800 text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[11px] font-mono tracking-widest text-[#C5A880] uppercase">
                  {activeProjectModal.categoryLabel} • {activeProjectModal.year}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1">
                  {activeProjectModal.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-mono tracking-widest text-[#C5A880] uppercase mb-2">
                  ARCHITECTURAL NARRATIVE
                </h4>
                <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
                  {activeProjectModal.architecturalNarrative}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">ENERGY REDUCTION</span>
                  <span className="text-[#C5A880] text-lg font-semibold">{activeProjectModal.stats.energyReduction}</span>
                </div>
                <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">DAYLIGHTING</span>
                  <span className="text-white text-lg font-semibold">{activeProjectModal.stats.daylighting}</span>
                </div>
                <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">BIM PRECISION</span>
                  <span className="text-[#C5A880] text-lg font-semibold">{activeProjectModal.stats.bimPrecision}</span>
                </div>
                <div className="bg-stone-900/80 p-3 rounded-xl border border-stone-800">
                  <span className="text-stone-400 block text-[10px]">GROSS AREA</span>
                  <span className="text-white text-lg font-semibold">{activeProjectModal.area}</span>
                </div>
              </div>

              {/* Materials & Engineers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-4 border-t border-stone-800">
                <div>
                  <span className="text-stone-400 uppercase tracking-wider block mb-2">
                    KEY MATERIALS SPECIFIED
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProjectModal.materials.map((m) => (
                      <span key={m} className="px-2.5 py-1 bg-stone-900 rounded border border-stone-800 text-stone-200">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-stone-400 uppercase tracking-wider block mb-1">
                    STRUCTURAL & ENVELOPE ENGINEERS
                  </span>
                  <p className="text-stone-200">{activeProjectModal.structuralEngineers}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveProjectModal(null);
                    openConsultationModal(activeProjectModal.categoryLabel);
                  }}
                  className="flex-1 py-3.5 bg-[#C5A880] hover:bg-[#EAD7BB] text-stone-950 font-mono tracking-[0.2em] uppercase text-xs font-bold rounded-xl transition-colors text-center"
                >
                  REQUEST BRIEF ON THIS COMMISSION
                </button>
                <button
                  type="button"
                  onClick={() => setActiveProjectModal(null)}
                  className="py-3.5 px-6 border border-stone-700 hover:border-stone-500 text-stone-300 font-mono tracking-wider uppercase text-xs rounded-xl transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

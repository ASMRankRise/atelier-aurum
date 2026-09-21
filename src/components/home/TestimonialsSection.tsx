'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animations';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { CLIENT_TESTIMONIALS, ClientTestimonial } from '@/data/monographs';

// Ensure Dr. Michael Kraus's exact quote requested in prompt is the primary featured testimonial
const TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'merck-kraus-primary',
    quote:
      'Our collaboration with Archion has been exceptional. Their team understood the specific needs of healthcare and research facilities, delivering our new campus on time, on budget, and in full compliance with top international standards.',
    author: 'Dr. Michael Kraus',
    role: 'Head of Global Infrastructure & Real Estate',
    organization: 'MERCK KGaA',
    organizationDivision: 'Executive Infrastructure Directorate',
    projectRef: 'Merck Global Discovery Centre',
    projectLocation: 'Darmstadt, Germany',
    year: 2024,
    highlightMetric: 'Delivered On Schedule & On Budget',
  },
  ...CLIENT_TESTIMONIALS.filter((t) => t.id !== 'merck-kraus'),
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const currentTestimonial = TESTIMONIALS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 35,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-[#FAFAF8] text-[#141413] hairline-b overflow-hidden"
    >
      {/* CAD Grid Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#141413_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Tag */}
        <div className="flex items-center justify-between pb-8 border-b border-[#E5E3DD] mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
            <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#6B6862]">
              05 / CLIENT RECORD & INSTITUTIONAL TRUST
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-[#E5E3DD] bg-white hover:border-[#C5A880] hover:text-[#C5A880] text-[#141413] transition-colors"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-[#8C8983] px-2">
              0{currentIndex + 1} / 0{TESTIMONIALS.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="p-2.5 rounded-full border border-[#E5E3DD] bg-white hover:border-[#C5A880] hover:text-[#C5A880] text-[#141413] transition-colors"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Testimonial Body */}
        <div className="relative">
          {/* Prominent Golden Quote Mark Accent */}
          <div
            className="absolute -top-12 sm:-top-16 -left-4 sm:-left-8 text-8xl sm:text-9xl text-[#C5A880]/30 font-serif select-none pointer-events-none leading-none"
            aria-hidden="true"
          >
            “
          </div>

          <div ref={quoteRef} className="relative z-10">
            {/* The Quote Statement */}
            <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-light text-[#141413] font-serif leading-[1.3] tracking-tight max-w-4xl">
              &ldquo;{currentTestimonial.quote}&rdquo;
            </blockquote>

            {/* Author Attribution & Commission Meta */}
            <div className="mt-10 sm:mt-14 pt-8 border-t border-[#E5E3DD] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="text-lg sm:text-xl font-semibold text-[#141413] font-sans">
                  {currentTestimonial.author}
                </div>
                <div className="text-xs sm:text-sm text-[#6B6862] mt-0.5">
                  {currentTestimonial.role} —{' '}
                  <span className="font-semibold text-[#141413]">
                    {currentTestimonial.organization}
                  </span>
                </div>
                {currentTestimonial.organizationDivision && (
                  <div className="text-[11px] font-mono text-[#8C8983] mt-0.5">
                    {currentTestimonial.organizationDivision}
                  </div>
                )}
              </div>

              {/* Commission Badge */}
              <div className="bg-[#F5F4F0] border border-[#E5E3DD] rounded-xl p-4 sm:p-5 flex flex-col items-start sm:items-end text-xs font-mono">
                <div className="text-[#C5A880] font-semibold flex items-center gap-1.5 mb-1">
                  <Award className="w-4 h-4" />
                  <span>{currentTestimonial.highlightMetric}</span>
                </div>
                <div className="text-[#141413] font-medium">
                  {currentTestimonial.projectRef}
                </div>
                <div className="text-[#8C8983] text-[11px]">
                  {currentTestimonial.projectLocation} • {currentTestimonial.year}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Organization Switcher Pills */}
        <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-6 border-t border-[#E5E3DD]">
          {TESTIMONIALS.map((item, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#141413] text-white font-semibold shadow-md'
                    : 'bg-[#F5F4F0] text-[#6B6862] hover:bg-white hover:text-[#141413] border border-[#E5E3DD]'
                }`}
              >
                <span>{item.organization}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

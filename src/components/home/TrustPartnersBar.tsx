'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animations';
import { ShieldCheck } from 'lucide-react';

interface Partner {
  name: string;
  category: string;
  location: string;
  tagline: string;
}

const PARTNERS: Partner[] = [
  {
    name: 'CITY OF OSLO',
    category: 'Civic Governance',
    location: 'Norway',
    tagline: 'Waterfront Marine Masterplan',
  },
  {
    name: 'PFIZER',
    category: 'Life Sciences R&D',
    location: 'New York / Global',
    tagline: 'Clean-Room Research Envelopes',
  },
  {
    name: 'MERCK',
    category: 'Global Pharmaceuticals',
    location: 'Darmstadt',
    tagline: 'Discovery Centre Campus (112,000 sqm)',
  },
  {
    name: 'HARVARD UNIVERSITY',
    category: 'Higher Education',
    location: 'Cambridge, MA',
    tagline: 'Translational Bioscience Facilities',
  },
  {
    name: 'SIEMENS',
    category: 'Smart Infrastructure',
    location: 'Munich / Zug',
    tagline: 'Digital Twin Sensor Integration',
  },
  {
    name: 'IBM',
    category: 'Quantum Computing',
    location: 'Armonk / Zurich',
    tagline: 'Cryogenic Vibration Isolation Cores',
  },
  {
    name: 'MIT MEDIA LAB',
    category: 'Architectural Research',
    location: 'Cambridge, MA',
    tagline: 'Computational Material Kinetics',
  },
  {
    name: 'ETH ZÜRICH',
    category: 'Structural Engineering',
    location: 'Zurich, Switzerland',
    tagline: 'Post-Tensioned Shell Research',
  },
];

export default function TrustPartnersBar() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 95%',
          once: true,
        },
      });

      tl.fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', clearProps: 'all' }
      ).fromTo(
        gridRef.current?.children || [],
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.out',
          clearProps: 'all',
        },
        '-=0.3'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-16 sm:py-20 bg-[#F5F4F0] border-y border-[#E5E3DD] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title & Metadata Strip */}
        <div
          ref={titleRef}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#E5E3DD]"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
            <h3 className="text-xs font-mono tracking-[0.25em] uppercase text-[#6B6862]">
              INSTITUTIONAL TRUST PARTNERS & COMMISSION CLIENTS
            </h3>
          </div>

          <div className="text-[11px] font-mono text-[#8C8983] flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>CONFIDENTIAL & PUBLIC MASTERPLANS</span>
          </div>
        </div>

        {/* Monochrome & Gold Tinted Typographic Logo Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-[#E5E3DD] border border-[#E5E3DD] mt-8 rounded-xl overflow-hidden"
        >
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="bg-[#FAFAF8] p-4 sm:p-5 flex flex-col items-center justify-center text-center group hover:bg-white transition-all duration-300 min-h-[110px]"
            >
              {/* Partner Typographic Name */}
              <span className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#141413] group-hover:text-[#A67C52] transition-colors font-sans">
                {partner.name}
              </span>

              {/* Sub-label */}
              <span className="text-[10px] font-mono text-[#8C8983] mt-1.5 uppercase tracking-wider group-hover:text-[#6B6862] transition-colors line-clamp-1">
                {partner.category}
              </span>

              <span className="text-[9px] font-mono text-[#C5A880] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {partner.location}
              </span>
            </div>
          ))}
        </div>

        {/* Micro Guarantee Note */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[#8C8983]">
          <span>ALL CLIENT COMMISSIONS COMPLY WITH ISO 19650-1/2 DATA PROTOCOLS</span>
          <span className="text-[#141413] font-medium">100% REGULATORY AUDIT APPROVAL RATE</span>
        </div>

      </div>
    </section>
  );
}

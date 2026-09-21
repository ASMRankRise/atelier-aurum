'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { openConsultationModal } from './ConsultationModal';

interface FooterProps {
  onOpenConsultation?: () => void;
}

export default function Footer({ onOpenConsultation }: FooterProps) {
  const handleOpenConsultation = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      openConsultationModal();
    }
  };

  const offices = [
    {
      country: 'Saudi Arabia',
      city: 'Riyadh',
      role: 'Middle East & GCC Praxis',
      address: 'Building 12, Olaya Towers, King Fahd Road, Al Olaya, Riyadh 11564',
      tel: '+966 11 482 9900',
      email: 'riyadh@archion.architects',
      timezone: 'AST (UTC+3)',
      highlight: 'Desert Microclimates & High-Performance Stone Facades',
    },
    {
      country: 'United Kingdom',
      city: 'London',
      role: 'European & Urban Architecture',
      address: '22 Redchurch Street, Shoreditch, London E2 7DJ',
      tel: '+44 20 7946 0192',
      email: 'london@archion.architects',
      timezone: 'GMT (UTC+0)',
      highlight: 'Mass Timber Engineering & Heritage Interventions',
    },
    {
      country: 'United States',
      city: 'New York',
      role: 'Americas & Institutional Campus',
      address: '1420 West 29th Street, Apt. 7C, New York, NY 10001',
      tel: '+1 212 555 0184',
      email: 'newyork@archion.architects',
      timezone: 'EST (UTC-5)',
      highlight: 'Life Sciences, Clean-Room Towers & Computational BIM',
    },
  ];

  const quickLinks = [
    { label: 'All Projects', href: '/projects' },
    { label: 'Education Praxes', href: '/projects?category=education' },
    { label: 'Civic & Urban Infrastructure', href: '/projects?category=civic' },
    { label: 'Corporate Campuses', href: '/projects?category=corporate' },
    { label: 'Healthcare & Life Sciences', href: '/projects?category=healthcare' },
    { label: 'Private Residential', href: '/projects?category=residential' },
  ];

  const praxisLinks = [
    { label: 'Architectural Philosophy', href: '/studio#philosophy' },
    { label: 'Façade Thermodynamics Research', href: '/monograph' },
    { label: 'BIM 4.0 Digital Twin Protocol', href: '/monograph' },
    { label: 'Material Archive & Three Pillars', href: '/studio#pillars' },
    { label: 'Institutional Advisory', href: '/contact' },
    { label: 'Global Studios & Presence', href: '/studio#studios' },
  ];

  const certifications = [
    { title: 'ISO 19650-1/2', subtitle: 'BIM Level 3 Digital Delivery' },
    { title: 'LEED Platinum', subtitle: 'Certified Environmental Design' },
    { title: 'BREEAM Outstanding', subtitle: 'Global Ecological Benchmark' },
    { title: 'AIA 2030', subtitle: 'Net-Zero Carbon Signatory' },
    { title: 'DGNB Gold', subtitle: 'Sustainable Building Council' },
  ];

  return (
    <footer className="relative bg-[#111111] text-[#dedede] border-t border-stone-800/80 overflow-hidden font-sans">
      {/* Architectural hairline grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Top Banner: Prominent Consultation Invitation */}
      <div className="relative border-b border-stone-800/60 bg-gradient-to-r from-stone-900/60 via-[#141414] to-stone-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-amber-400">
                  INTERNATIONAL COMMISSIONS 2026–2028
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-white font-serif">
                Shaping the civic skyline with poetic rigor.
              </h3>
              <p className="text-stone-400 text-sm sm:text-base mt-2 font-light leading-relaxed">
                Consult with our international partners in London, New York, or Riyadh to discuss site feasibility, environmental envelope modeling, or institutional masterplanning.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={handleOpenConsultation}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-mono tracking-[0.2em] text-xs font-bold uppercase rounded-xl transition-all duration-300 shadow-xl shadow-amber-500/15 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>REQUEST A CONSULTATION</span>
                <ArrowUpRight className="w-4 h-4 text-stone-950" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Brand Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 pb-12 border-b border-stone-800/80">
          <div>
            <div className="flex items-center tracking-[0.32em] font-light text-3xl sm:text-4xl text-white font-sans">
              <span>ARCHI</span>
              <span className="relative inline-flex items-center justify-center font-serif italic text-amber-400 mx-1">
                Ø
                <span className="absolute -top-1.5 right-0 text-[10px] text-amber-500/80 font-mono not-italic">
                  °
                </span>
              </span>
              <span>N</span>
            </div>
            <div className="text-[11px] font-mono tracking-[0.28em] text-stone-400 uppercase mt-2">
              PRAXIS & HIGH-PERFORMANCE FAÇADES
            </div>
          </div>

          <div className="text-xs font-mono text-stone-400 max-w-md md:text-right">
            <span>RIYADH • LONDON • NEW YORK</span>
            <div className="text-[11px] text-stone-400 mt-1">
              Zurich Registration: CHE-419.820.104 • VAT GB839201948
            </div>
          </div>
        </div>

        {/* Three International Office Columns matching Conceptzilla ARCHIØN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-b border-stone-800/70">
          {offices.map((office) => (
            <div
              key={office.city}
              className="bg-[#151515]/70 border border-stone-800/80 rounded-2xl p-6 hover:border-amber-400/40 transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800/60">
                <div>
                  <div className="text-[11px] font-mono tracking-[0.25em] text-amber-400 uppercase">
                    {office.country}
                  </div>
                  <h4 className="text-xl font-light text-white tracking-wide mt-0.5">
                    {office.city} Studio
                  </h4>
                </div>
                <div className="text-[10px] font-mono px-2.5 py-1 bg-stone-900 border border-stone-800 rounded-full text-stone-400">
                  {office.timezone}
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5 text-xs text-stone-300 mb-3 leading-relaxed">
                <MapPin className="w-4 h-4 text-amber-400/80 shrink-0 mt-0.5" />
                <span>{office.address}</span>
              </div>

              {/* Specialization */}
              <div className="text-[11px] text-stone-400 font-mono mb-4 pb-3 border-b border-stone-800/40">
                <span className="text-stone-400">Focus: </span>
                <span className="text-stone-300">{office.highlight}</span>
              </div>

              {/* Communication */}
              <div className="space-y-2 text-xs font-mono">
                <a
                  href={`tel:${office.tel.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 text-stone-400 hover:text-amber-300 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>{office.tel}</span>
                </a>
                <a
                  href={`mailto:${office.email}`}
                  className="flex items-center gap-2 text-stone-400 hover:text-amber-300 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>{office.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation & Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-stone-800/70">
          {/* Column 1: Portfolio Sectors */}
          <div>
            <h5 className="text-xs font-mono tracking-[0.25em] text-amber-400 uppercase mb-4">
              Project Sectors
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-stone-400 group-hover:text-amber-400 transition-colors" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Architectural Praxis */}
          <div>
            <h5 className="text-xs font-mono tracking-[0.25em] text-amber-400 uppercase mb-4">
              Praxis & Theory
            </h5>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              {praxisLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-stone-400 group-hover:text-amber-400 transition-colors" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 & 4: Certifications & Building Standards */}
          <div className="lg:col-span-2">
            <h5 className="text-xs font-mono tracking-[0.25em] text-amber-400 uppercase mb-4 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>BIM & Environmental Accreditations</span>
            </h5>
            <p className="text-xs text-stone-400 mb-4 leading-relaxed font-light">
              Every ARCHIØN commission is managed under strict digital-twin verification, guaranteeing material provenance, carbon accounting, and millimeter-accurate fabrication tolerances.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="bg-[#161616] border border-stone-800 rounded-lg p-2.5 text-left"
                >
                  <div className="text-xs font-mono text-amber-300 font-semibold">
                    {cert.title}
                  </div>
                  <div className="text-[10px] text-stone-400 mt-0.5">
                    {cert.subtitle}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© 2026 ARCHIØN Architectural Praxis AG.</span>
            <span>All rights reserved.</span>
            <a href="#" className="hover:text-stone-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-stone-400 transition-colors">
              Environmental Charter
            </a>
            <a href="#" className="hover:text-stone-400 transition-colors">
              ISO 19650 Compliance
            </a>
          </div>

          <div className="text-[11px] text-stone-400 flex items-center gap-2">
            <span>Design Concept: Conceptzilla ARCHIØN</span>
            <span>•</span>
            <span className="text-amber-400/80">Atelier Aurum</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

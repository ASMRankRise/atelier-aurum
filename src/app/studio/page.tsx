'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Compass,
  Clock,
  MapPin,
  ArrowUpRight,
  Cpu,
  Feather,
  Gem,
} from 'lucide-react';
import ArchitecturalHatch from '@/components/ArchitecturalHatch';
import { openConsultationModal } from '@/components/ConsultationModal';

interface Partner {
  name: string;
  role: string;
  credentials: string;
  portrait: string;
  bio: string;
  keyProjects: string[];
  education: string;
}

const PARTNERS: Partner[] = [
  {
    name: 'Henrik Sörensen, FAIA',
    role: 'Founding Principal & Director of Façade Systems',
    credentials: 'FAIA • RIBA • MAA',
    portrait:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
    bio: 'Pioneered ARCHIØN’s kinetic bronze louver envelope algorithms. Prior to founding the praxis in Zurich, Henrik led facade engineering groups in Copenhagen and Cambridge, specializing in high-latitude thermodynamic daylight capture.',
    keyProjects: ['Summit University Campus', 'Geneva Diplomatic Assembly'],
    education: 'ETH Zürich Master of Architecture • MIT Building Technology Fellowship',
  },
  {
    name: 'Astrid Lindholm, ETH SIA',
    role: 'Lead Partner, Civic & Institutional Praxis',
    credentials: 'ETH SIA • MNAL',
    portrait:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
    bio: 'Renowned for post-tensioned shell geometries and monolithic stone volumes. Astrid directs our Swiss and Nordic civic commissions, fusing alpine tectonic traditions with open democratic assembly spaces.',
    keyProjects: ['Solarium Civic Pavilion', 'Engadin Valley Sanctuary', 'Oslo Marine Institute'],
    education: 'ETH Zürich Diploma Arch. • Sverre Fehn Memorial Scholar',
  },
  {
    name: 'Dr. Lukas von Berg, BDA',
    role: 'Computational Design & Digital Fabrication Lead',
    credentials: 'BDA • Dr.-Ing. Architecture',
    portrait:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85',
    bio: 'Architect and structural computer scientist. Lukas created ARCHIØN’s BIM 4.0 generative stress tensor engine, which strips up to 28% of redundant material out of concrete cores prior to fabrication.',
    keyProjects: ['Merck Global Discovery Centre', 'Aalto CleanTech Innovation Center'],
    education: 'University of Stuttgart (ICD) • Technical University of Munich',
  },
  {
    name: 'Marcus Vance, FAIA',
    role: 'Partner, Acoustic Engineering & Civic Systems',
    credentials: 'FAIA • LEED Fellow',
    portrait:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=85',
    bio: 'Directs the Americas praxis from New York. Marcus calibrates unamplified acoustic auditoriums and vibration-isolated research hubs for biotechnology and institutional consortia.',
    keyProjects: ['Aurum Life Science Hub, Boston', 'Geneva Assembly Hall'],
    education: 'Harvard Graduate School of Design • Cornell University Architecture',
  },
];

interface HonorItem {
  year: number;
  award: string;
  project: string;
  conferringBody: string;
  category: string;
}

const HONORS_TIMELINE: HonorItem[] = [
  {
    year: 2026,
    award: 'Mies Crown Hall Americas Prize (MCHAP) Finalist',
    project: 'Aurum Life Science Hub, Boston',
    conferringBody: 'Illinois Institute of Technology College of Architecture',
    category: 'Institutional High-Performance Design',
  },
  {
    year: 2025,
    award: 'Governor General’s Medal in Architecture',
    project: 'Summit University Campus, Toronto',
    conferringBody: 'Royal Architectural Institute of Canada (RAIC)',
    category: 'Educational Excellence & Mass Timber Innovation',
  },
  {
    year: 2025,
    award: 'RIBA International Award of Excellence',
    project: 'Geneva International Assembly, Switzerland',
    conferringBody: 'Royal Institute of British Architects',
    category: 'Diplomatic & Civic Masterplanning',
  },
  {
    year: 2024,
    award: 'Swiss Architecture Prize (Grand Prix)',
    project: 'Solarium Civic Pavilion, Zurich',
    conferringBody: 'Swiss Arts & Architecture Directorate',
    category: 'Acoustic Shell & Public Forum Engineering',
  },
  {
    year: 2024,
    award: 'German Architecture Design Prize (Baukultur)',
    project: 'Merck Global Discovery Centre, Darmstadt',
    conferringBody: 'Association of German Architects (BDA)',
    category: 'Corporate Research Campus of the Year',
  },
  {
    year: 2023,
    award: 'Japan Institute of Architects Grand Prix',
    project: 'The Monolith Public Archive, Kyoto',
    conferringBody: 'Japan Institute of Architects (JIA)',
    category: 'Subterranean Cultural Preservation',
  },
  {
    year: 2022,
    award: 'Holcim Gold Award for Sustainable Construction',
    project: 'Summit University Mass Timber Research',
    conferringBody: 'Holcim Foundation for Sustainable Construction',
    category: 'Global Net-Zero Embodied Carbon Protocol',
  },
  {
    year: 2020,
    award: 'Pritzker Architecture Prize Nomination Citation',
    project: 'ARCHIØN Praxis Monolithic Stone Studies',
    conferringBody: 'Hyatt Foundation Architectural Committee',
    category: 'Enduring Contributions to Tectonic Philosophy',
  },
];

interface StudioLocation {
  city: string;
  country: string;
  role: string;
  address: string;
  coordinates: string;
  partnerInCharge: string;
  timeZone: string;
  phone: string;
  email: string;
}

const STUDIOS: StudioLocation[] = [
  {
    city: 'Zurich',
    country: 'Switzerland',
    role: 'Global Headquarters & Façade Physics Lab',
    address: 'Neugasse 29, 8005 Zürich, Switzerland',
    coordinates: '47.3769° N, 8.5417° E',
    partnerInCharge: 'Astrid Lindholm, ETH SIA',
    timeZone: 'Europe/Zurich',
    phone: '+41 44 291 8000',
    email: 'zurich@archion.architects',
  },
  {
    city: 'Riyadh',
    country: 'Kingdom of Saudi Arabia',
    role: 'Middle East & Desert Microclimates Praxis',
    address: 'Building 12, Olaya Towers, King Fahd Road, Al Olaya, Riyadh 11564',
    coordinates: '24.7136° N, 46.6753° E',
    partnerInCharge: 'Mansoor Al-Rashid & Henrik Sörensen',
    timeZone: 'Asia/Riyadh',
    phone: '+966 11 482 9900',
    email: 'riyadh@archion.architects',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    role: 'European Urbanism & Mass Timber Engineering',
    address: '22 Redchurch Street, Shoreditch, London E2 7DJ',
    coordinates: '51.5246° N, 0.0768° W',
    partnerInCharge: 'Henrik Sörensen, FAIA',
    timeZone: 'Europe/London',
    phone: '+44 20 7946 0192',
    email: 'london@archion.architects',
  },
  {
    city: 'New York',
    country: 'United States',
    role: 'Americas Life Sciences & Computational BIM',
    address: '1420 West 29th Street, Apt. 7C, New York, NY 10001',
    coordinates: '40.7484° N, 73.9967° W',
    partnerInCharge: 'Marcus Vance, FAIA',
    timeZone: 'America/New_York',
    phone: '+1 212 555 0184',
    email: 'newyork@archion.architects',
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    role: 'Seismic Tectonics & Subterranean Preservation',
    address: '5-7-2 Minami-Aoyama, Minato-ku, Tokyo 107-0062',
    coordinates: '35.6628° N, 139.7126° E',
    partnerInCharge: 'Kenzo Tange Fellow / Dr. Lukas von Berg',
    timeZone: 'Asia/Tokyo',
    phone: '+81 3 5468 1120',
    email: 'tokyo@archion.architects',
  },
];

export default function StudioPage() {
  const [activeStudioIndex, setActiveStudioIndex] = useState(0);
  const [studioTimes, setStudioTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const times: Record<string, string> = {};
      STUDIOS.forEach((studio) => {
        try {
          times[studio.city] = new Intl.DateTimeFormat('en-GB', {
            timeZone: studio.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }).format(now);
        } catch {
          times[studio.city] = '--:--:--';
        }
      });
      setStudioTimes(times);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeStudio = STUDIOS[activeStudioIndex];

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#141413] pt-28 sm:pt-36 pb-24">
      {/* 1. Page Header & Manifesto Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#6B6862]">
            ARCHIØN STUDIO • PRAXIS & TECTONIC MANIFESTO
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-16 border-b border-[#E5E3DD]">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-[#141413] tracking-tight leading-[1.06]">
              Architecture as Enduring Geological Sculpture and Human Catalyst.
            </h1>

            <p className="text-lg sm:text-xl text-[#6B6862] font-light mt-6 leading-relaxed">
              We reject the disposable, fragile curtain-wall architecture of the past fifty years. ARCHIØN designs buildings as civic bedrock: structures rooted in thermodynamic common sense, shaped from authentic stone and mass timber, and executed with sub-millimeter robotic precision.
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#F5F4F0] border border-[#E5E3DD] p-6 sm:p-8 rounded-2xl relative overflow-hidden">
            <ArchitecturalHatch
              pattern="diagonal"
              density="normal"
              patternOpacity={0.09}
              className="absolute inset-0"
            />
            <div className="relative z-10 space-y-4 font-mono text-xs">
              <span className="text-[10px] tracking-widest uppercase text-[#A67C52] block">
                ATELIER ESSENTIALS
              </span>
              <div className="divide-y divide-[#E5E3DD] text-[#6B6862]">
                <div className="py-2.5 flex justify-between">
                  <span>FOUNDED:</span>
                  <span className="text-[#141413] font-semibold">2014 • Zürich</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span>GLOBAL STUDIOS:</span>
                  <span className="text-[#141413] font-semibold">5 Metropolises</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span>PRACTICE SIZE:</span>
                  <span className="text-[#141413] font-semibold">82 Architects & BIM Specialists</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span>DISCIPLINE:</span>
                  <span className="text-[#141413] font-semibold">Haute Architecture & Envelope Physics</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openConsultationModal('Masterplanning & Strategy')}
                className="w-full mt-4 py-3 bg-[#111111] hover:bg-[#A67C52] text-white text-xs font-mono tracking-widest uppercase rounded-lg transition-colors"
              >
                Initiate Commission
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Three Pillars Section */}
      <section id="pillars" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
            <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#6B6862]">
              FOUNDATIONAL TENETS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#141413]">
            The Three Pillars of ARCHIØN
          </h2>
          <p className="text-sm sm:text-base text-[#6B6862] font-light mt-2 leading-relaxed">
            Every drawing, joint, and specification adheres to our tripartite philosophy of tectonic integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Material Truth */}
          <div className="relative bg-[#F5F4F0] border border-[#E5E3DD] p-8 rounded-2xl overflow-hidden hover:border-[#C5A880]/60 transition-all duration-300 group flex flex-col justify-between">
            <ArchitecturalHatch
              pattern="vertical"
              density="dense"
              patternOpacity={0.08}
              className="absolute inset-0"
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E3DD] flex items-center justify-center text-[#A67C52] mb-6 group-hover:scale-110 transition-transform">
                <Gem className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono tracking-widest text-[#A67C52] uppercase block mb-1">
                PILLAR 01
              </span>
              <h3 className="text-2xl font-serif font-light text-[#141413] mb-3">
                Material Truth
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6862] font-light leading-relaxed mb-6">
                Authentic raw stone, self-shading bronze louvers, and low-carbon monolithic structures. We avoid synthetic cladding and imitation finishes. Materials are specified to weather with dignity, building living patinas over centuries.
              </p>
            </div>
            <div className="relative z-10 pt-4 border-t border-[#E5E3DD] font-mono text-[11px] text-[#A67C52]">
              Valser Quartzite • Bronze Alloy • Cross-Laminated Timber
            </div>
          </div>

          {/* Pillar 2: Computational Precision */}
          <div className="relative bg-[#F5F4F0] border border-[#E5E3DD] p-8 rounded-2xl overflow-hidden hover:border-[#C5A880]/60 transition-all duration-300 group flex flex-col justify-between">
            <ArchitecturalHatch
              pattern="crosshatch"
              density="dense"
              patternOpacity={0.06}
              className="absolute inset-0"
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E3DD] flex items-center justify-center text-[#A67C52] mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono tracking-widest text-[#A67C52] uppercase block mb-1">
                PILLAR 02
              </span>
              <h3 className="text-2xl font-serif font-light text-[#141413] mb-3">
                Computational Precision
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6862] font-light leading-relaxed mb-6">
                BIM 4.0, parametric solar path modeling, and millimeter-tolerance prefabrication. We leverage generative finite-element optimization to eliminate 28% of redundant structural mass while accelerating on-site erection.
              </p>
            </div>
            <div className="relative z-10 pt-4 border-t border-[#E5E3DD] font-mono text-[11px] text-[#A67C52]">
              ISO 19650 Level 3 • Digital Twins • Robotic CNC Joinery
            </div>
          </div>

          {/* Pillar 3: Spatial Poetics */}
          <div className="relative bg-[#F5F4F0] border border-[#E5E3DD] p-8 rounded-2xl overflow-hidden hover:border-[#C5A880]/60 transition-all duration-300 group flex flex-col justify-between">
            <ArchitecturalHatch
              pattern="diagonal"
              density="loose"
              patternOpacity={0.08}
              className="absolute inset-0"
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E3DD] flex items-center justify-center text-[#A67C52] mb-6 group-hover:scale-110 transition-transform">
                <Feather className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono tracking-widest text-[#A67C52] uppercase block mb-1">
                PILLAR 03
              </span>
              <h3 className="text-2xl font-serif font-light text-[#141413] mb-3">
                Spatial Poetics
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6862] font-light leading-relaxed mb-6">
                Natural daylighting dynamics, acoustical tranquility, and proportion harmony. Engineering serves human contemplation: public auditoriums tuned for unamplified acoustic clarity, and atriums illuminated by diffuse solstice sunlight.
              </p>
            </div>
            <div className="relative z-10 pt-4 border-t border-[#E5E3DD] font-mono text-[11px] text-[#A67C52]">
              Daylight Autonomy 94% • Reverberation Tuning • Zen Atriums
            </div>
          </div>
        </div>
      </section>

      {/* 3. Founding Partners & Principals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
            <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#6B6862]">
              LEADERSHIP & PRAXIS HEADS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#141413]">
            Founding Partners & Principals
          </h2>
          <p className="text-sm sm:text-base text-[#6B6862] font-light mt-2 leading-relaxed">
            The partners personally oversee every commission from initial microclimatic site analysis to final structural bolt verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="bg-[#F5F4F0] border border-[#E5E3DD] rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start hover:border-[#C5A880]/60 transition-all group"
            >
              <div className="relative w-28 h-36 sm:w-36 sm:h-48 rounded-xl overflow-hidden shrink-0 bg-stone-900 border border-[#E5E3DD]">
                <Image
                  src={partner.portrait}
                  alt={partner.name}
                  fill
                  sizes="200px"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <div className="flex-1">
                <div className="text-[10px] font-mono tracking-widest text-[#A67C52] uppercase">
                  {partner.credentials}
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-light text-[#141413] mt-0.5">
                  {partner.name}
                </h3>
                <div className="text-xs font-mono text-[#6B6862] mt-1 mb-3">
                  {partner.role}
                </div>
                <p className="text-xs sm:text-sm text-[#6B6862] font-light leading-relaxed mb-4">
                  {partner.bio}
                </p>
                <div className="text-[11px] font-mono text-stone-500">
                  <span className="text-[#141413] font-semibold">Commissions: </span>
                  <span>{partner.keyProjects.join(' • ')}</span>
                </div>
                <div className="text-[10px] font-mono text-stone-500 mt-1">
                  <span className="text-[#141413]">Education: </span>
                  <span>{partner.education}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. International Honors & Awards Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
            <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#6B6862]">
              GLOBAL CITATIONS & DISTINCTIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#141413]">
            International Honors & Awards
          </h2>
          <p className="text-sm sm:text-base text-[#6B6862] font-light mt-2 leading-relaxed">
            A chronological timeline of peer recognition celebrating structural audacity, environmental stewardship, and civic poetics.
          </p>
        </div>

        <div className="relative border-l border-[#E5E3DD] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-10">
          {HONORS_TIMELINE.map((honor, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Pin Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-4 h-4 rounded-full bg-[#FAFAF8] border-2 border-[#C5A880] group-hover:bg-[#C5A880] transition-colors" />

              <div className="bg-[#F5F4F0] border border-[#E5E3DD] p-6 rounded-xl hover:border-[#C5A880]/60 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-[#A67C52]">
                    {honor.year}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#EAE7E0] text-[#6B6862] rounded">
                    {honor.category}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-light text-[#141413]">
                  {honor.award}
                </h3>
                <div className="text-xs sm:text-sm text-[#141413] mt-1 font-mono">
                  Project: {honor.project}
                </div>
                <div className="text-xs text-[#6B6862] font-light mt-1">
                  Conferred by {honor.conferringBody}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Global Presence Map & Interactive Studio Directory */}
      <section id="studios" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
            <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#6B6862]">
              GLOBAL NETWORK • 5 CONTINENTAL HUBS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#141413]">
            Global Presence & Studios
          </h2>
          <p className="text-sm sm:text-base text-[#6B6862] font-light mt-2 leading-relaxed">
            Direct coordination between our five interlinked studios guarantees 24-hour architectural modeling, structural FEA analysis, and municipal feasibility workflows.
          </p>
        </div>

        {/* Studio Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scrollbar-none">
          {STUDIOS.map((s, idx) => (
            <button
              key={s.city}
              type="button"
              onClick={() => setActiveStudioIndex(idx)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs tracking-wider uppercase transition-all shrink-0 flex items-center gap-2 ${
                activeStudioIndex === idx
                  ? 'bg-[#111111] text-white shadow-md'
                  : 'bg-[#F5F4F0] text-[#6B6862] hover:text-[#141413]'
              }`}
            >
              <span>{s.city}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeStudioIndex === idx ? 'bg-[#C5A880] text-[#111111]' : 'bg-[#EAE7E0]'
                }`}
              >
                {studioTimes[s.city] || '--:--'}
              </span>
            </button>
          ))}
        </div>

        {/* Active Studio Dossier Card */}
        <div className="bg-[#111111] text-[#FAFAF8] rounded-2xl border border-stone-800 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Background drafting grid */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880] animate-pulse" />
                <span className="text-xs font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                  {activeStudio.country} • STUDIO PRAXIS
                </span>
              </div>

              <h3 className="text-4xl sm:text-5xl font-serif font-light text-white">
                {activeStudio.city} Atelier
              </h3>

              <div className="text-sm sm:text-base text-stone-300 font-light max-w-xl leading-relaxed">
                {activeStudio.role}
              </div>

              <div className="space-y-3 font-mono text-xs pt-4 border-t border-stone-800">
                <div className="flex items-start gap-2.5 text-stone-400">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <span>{activeStudio.address}</span>
                </div>
                <div className="flex items-center gap-2.5 text-stone-400">
                  <Compass className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>COORDINATES: {activeStudio.coordinates}</span>
                </div>
                <div className="flex items-center gap-2.5 text-stone-400">
                  <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>LOCAL TIME: {studioTimes[activeStudio.city] || 'Calculating...'} ({activeStudio.timeZone})</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-stone-900/80 border border-stone-800 p-6 rounded-xl space-y-4 font-mono text-xs">
              <div className="pb-3 border-b border-stone-800">
                <span className="text-[10px] text-stone-500 uppercase block">PARTNER IN CHARGE:</span>
                <span className="text-sm font-serif text-white mt-1 block">
                  {activeStudio.partnerInCharge}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-stone-500 uppercase block">DIRECT TELEPHONE:</span>
                <a
                  href={`tel:${activeStudio.phone.replace(/\s+/g, '')}`}
                  className="text-stone-300 hover:text-[#C5A880] mt-1 block transition-colors"
                >
                  {activeStudio.phone}
                </a>
              </div>

              <div>
                <span className="text-[10px] text-stone-500 uppercase block">INQUIRIES & DISPATCH:</span>
                <a
                  href={`mailto:${activeStudio.email}`}
                  className="text-[#C5A880] hover:underline mt-1 block transition-colors"
                >
                  {activeStudio.email}
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openConsultationModal('Masterplanning & Strategy')}
                  className="w-full py-3 bg-[#C5A880] hover:bg-[#dfc49e] text-[#111111] font-semibold text-xs tracking-widest uppercase rounded-lg transition-colors"
                >
                  Schedule Studio Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bottom Consultation Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5F4F0] border border-[#E5E3DD] p-8 sm:p-12 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#141413]">
              Collaborate with the ARCHIØN Fellowship
            </h3>
            <p className="text-sm text-[#6B6862] font-light mt-1 max-w-xl">
              From competitive architectural masterplans to parametric thermal envelopes, our partners accept select commissions globally.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#111111] hover:bg-[#A67C52] text-white text-xs font-mono tracking-widest uppercase rounded-xl transition-colors shrink-0"
          >
            <span>Commission Inquiry</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

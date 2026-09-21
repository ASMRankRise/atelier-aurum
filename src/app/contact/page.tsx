'use client';

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building2,
  FileDown,
  Camera,
  Globe,
  Loader2,
  Compass,
  Printer,
} from 'lucide-react';
import ArchitecturalHatch from '@/components/ArchitecturalHatch';

interface StudioContact {
  city: string;
  country: string;
  region: string;
  address: string;
  phone: string;
  email: string;
  lead: string;
  timeZone: string;
  coordinates: string;
}

const STUDIOS: StudioContact[] = [
  {
    city: 'Zurich',
    country: 'Switzerland',
    region: 'Central Europe & Headquarters',
    address: 'Neugasse 29, 8005 Zürich, Switzerland',
    phone: '+41 44 291 8000',
    email: 'zurich@archion.architects',
    lead: 'Astrid Lindholm, ETH SIA',
    timeZone: 'Europe/Zurich',
    coordinates: '47.3769° N, 8.5417° E',
  },
  {
    city: 'Riyadh',
    country: 'Saudi Arabia',
    region: 'Middle East & GCC Praxis',
    address: 'Building 12, Olaya Towers, King Fahd Road, Riyadh 11564',
    phone: '+966 11 482 9900',
    email: 'riyadh@archion.architects',
    lead: 'Mansoor Al-Rashid & Henrik Sörensen',
    timeZone: 'Asia/Riyadh',
    coordinates: '24.7136° N, 46.6753° E',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    region: 'UK & Western Europe',
    address: '22 Redchurch Street, Shoreditch, London E2 7DJ',
    phone: '+44 20 7946 0192',
    email: 'london@archion.architects',
    lead: 'Henrik Sörensen, FAIA',
    timeZone: 'Europe/London',
    coordinates: '51.5246° N, 0.0768° W',
  },
  {
    city: 'New York',
    country: 'United States',
    region: 'Americas & Institutional Campuses',
    address: '1420 West 29th Street, Apt. 7C, New York, NY 10001',
    phone: '+1 212 555 0184',
    email: 'newyork@archion.architects',
    lead: 'Marcus Vance, FAIA',
    timeZone: 'America/New_York',
    coordinates: '40.7484° N, 73.9967° W',
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    region: 'Asia-Pacific & Seismic Innovation',
    address: '5-7-2 Minami-Aoyama, Minato-ku, Tokyo 107-0062',
    phone: '+81 3 5468 1120',
    email: 'tokyo@archion.architects',
    lead: 'Dr. Lukas von Berg & Kenzo Tange Fellow',
    timeZone: 'Asia/Tokyo',
    coordinates: '35.6628° N, 139.7126° E',
  },
];

const SECTORS = [
  'Civic & Urban Infrastructure',
  'Higher Education & Campus',
  'Corporate Headquarters',
  'Healthcare & Life Sciences',
  'Private Residential Sanctuary',
  'Masterplanning & Feasibility',
];

const SCALES = [
  { label: 'Under 10,000 sqm', detail: 'Pavilions & Boutique Sanctuaries' },
  { label: '10,000 – 50,000 sqm', detail: 'Medium Institutional & Research' },
  { label: '50,000 – 150,000 sqm', detail: 'Campuses & High-Rise Envelopes' },
  { label: '150,000+ sqm', detail: 'Civic Urban District Masterplans' },
];

const TIMELINES = [
  'Target Completion 2026–2027',
  'Target Completion 2028',
  'Target Completion 2029+',
  'Immediate Feasibility Study Only',
];

export default function ContactPage() {
  // Form state
  const [fullName, setFullName] = useState('');
  const [officialEmail, setOfficialEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [entityName, setEntityName] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [selectedSector, setSelectedSector] = useState(SECTORS[0]);
  const [selectedScale, setSelectedScale] = useState(SCALES[1].label);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINES[1]);
  const [briefMessage, setBriefMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedDossier, setSubmittedDossier] = useState<{
    refCode: string;
    date: string;
  } | null>(null);

  // Press download simulated states
  const [downloadingPressKit, setDownloadingPressKit] = useState(false);
  const [pressKitDownloaded, setPressKitDownloaded] = useState(false);

  // Live Studio Times
  const [studioTimes, setStudioTimes] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const times: Record<string, string> = {};
      STUDIOS.forEach((s) => {
        try {
          times[s.city] = new Intl.DateTimeFormat('en-GB', {
            timeZone: s.timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          }).format(now);
        } catch {
          times[s.city] = '--:--:--';
        }
      });
      setStudioTimes(times);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury architect partner dispatch
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const refNumber = `ARC-COMM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedDossier({
      refCode: refNumber,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    });
    setIsSubmitting(false);
  };

  const handleDownloadPressKit = () => {
    setDownloadingPressKit(true);
    setTimeout(() => {
      setDownloadingPressKit(false);
      setPressKitDownloaded(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#141413] pt-28 sm:pt-36 pb-24">
      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#6B6862]">
            INTERNATIONAL COMMISSIONS & CLIENT PRAXIS
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#E5E3DD]">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-serif font-light text-[#141413] tracking-tight leading-[1.08]">
              Engage ARCHIØN for Bespoke Architectural Commissions
            </h1>
            <p className="text-base sm:text-lg text-[#6B6862] font-light mt-4 leading-relaxed max-w-2xl">
              From competitive masterplans to high-performance facade engineering, we review project briefs with strict non-disclosure protections under ISO 19650 protocols.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#6B6862]">
            <div className="p-4 bg-[#F5F4F0] border border-[#E5E3DD] rounded-xl text-center">
              <span className="text-2xl font-mono text-[#141413] font-light block">24h</span>
              <span className="text-[10px] uppercase text-[#6B6862]">Partner Response</span>
            </div>
            <div className="p-4 bg-[#F5F4F0] border border-[#E5E3DD] rounded-xl text-center">
              <span className="text-2xl font-mono text-[#A67C52] font-light block">CHE</span>
              <span className="text-[10px] uppercase text-[#6B6862]">Swiss Reg CHE-419</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Commission Inquiry Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context, Trust, & Partner Assurances */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#6B6862]">
                  COMMISSION PROTOCOL
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#141413]">
                Client Engagement & Delivery Framework
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6862] font-light mt-3 leading-relaxed">
                ARCHIØN limits its annual intake to twelve global commissions to preserve executive partner immersion across every schematic milestone.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-5 bg-[#F5F4F0] border border-[#E5E3DD] rounded-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#A67C52] font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>ISO 19650-2 Confidentiality</span>
                </div>
                <p className="text-xs text-[#6B6862] font-light leading-relaxed">
                  All geographical coordinates, programmatic specifications, and budgetary frameworks are encrypted and bound by mutual non-disclosure before site inspections.
                </p>
              </div>

              <div className="p-5 bg-[#F5F4F0] border border-[#E5E3DD] rounded-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#A67C52] font-semibold mb-1">
                  <Building2 className="w-4 h-4" />
                  <span>Multidisciplinary Engineering Alignment</span>
                </div>
                <p className="text-xs text-[#6B6862] font-light leading-relaxed">
                  We integrate seamlessly with your local executive architects, structural consultants (e.g. Arup, Buro Happold), and general contractors.
                </p>
              </div>

              <div className="p-5 bg-[#F5F4F0] border border-[#E5E3DD] rounded-xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#A67C52] font-semibold mb-1">
                  <Globe className="w-4 h-4" />
                  <span>Direct Partner Dispatch</span>
                </div>
                <p className="text-xs text-[#6B6862] font-light leading-relaxed">
                  Your primary contact is a named ARCHIØN partner in Zurich, London, New York, or Riyadh with complete design authority.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Commission Form or Submitted Dossier */}
          <div className="lg:col-span-8">
            {submittedDossier ? (
              /* Success / Dossier Receipt Card */
              <div className="bg-[#111111] text-white p-8 sm:p-12 rounded-3xl border border-stone-800 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
                <ArchitecturalHatch
                  pattern="diagonal"
                  density="dense"
                  patternOpacity={0.06}
                  strokeColor="#C5A880"
                  className="absolute inset-0 pointer-events-none"
                />

                <div className="relative z-10 max-w-xl">
                  <div className="w-16 h-16 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <span className="text-xs font-mono tracking-[0.25em] text-[#C5A880] uppercase block mb-2">
                    COMMISSION DOSSIER GENERATED
                  </span>

                  <h3 className="text-3xl sm:text-4xl font-serif font-light text-white mb-3">
                    Inquiry Transmitted to Senior Partner
                  </h3>

                  <p className="text-sm text-stone-300 font-light leading-relaxed mb-6">
                    Thank you, <strong className="text-white font-medium">{fullName}</strong>. Your programmatic brief for <strong className="text-white font-medium">{entityName || 'your entity'}</strong> has been registered with our executive committee. An ARCHIØN partner will contact you directly within 24 business hours.
                  </p>

                  {/* Summary Dossier Ticket */}
                  <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 mb-8 font-mono text-xs space-y-3">
                    <div className="flex justify-between items-center pb-3 border-b border-stone-800 text-[#C5A880] font-semibold text-sm">
                      <span>REFERENCE ACCESSION:</span>
                      <span>{submittedDossier.refCode}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-stone-300 pt-1">
                      <div>
                        <span className="text-stone-500 uppercase block text-[10px]">SECTOR</span>
                        <span className="mt-0.5 block">{selectedSector}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 uppercase block text-[10px]">ESTIMATED SCALE</span>
                        <span className="mt-0.5 block">{selectedScale}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 uppercase block text-[10px]">SITE LOCATION</span>
                        <span className="mt-0.5 block">{siteLocation || 'Confidential'}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 uppercase block text-[10px]">TIMELINE</span>
                        <span className="mt-0.5 block">{selectedTimeline}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 uppercase block text-[10px]">OFFICIAL CONTACT</span>
                        <span className="mt-0.5 block">{officialEmail}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 uppercase block text-[10px]">TRANSMITTED</span>
                        <span className="mt-0.5 block">{submittedDossier.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono tracking-wider uppercase rounded-xl transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Receipt</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmittedDossier(null)}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C5A880] hover:bg-[#dfc49e] text-[#111111] font-semibold text-xs font-mono tracking-wider uppercase rounded-xl transition-colors"
                    >
                      <span>Submit Another Inquiry</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* The Commission Form */
              <form
                onSubmit={handleSubmit}
                className="bg-[#F5F4F0] border border-[#E5E3DD] rounded-3xl p-8 sm:p-12 shadow-sm space-y-6"
              >
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#141413]">
                    Commission Proposal Dossier
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B6862] font-light mt-1">
                    Please provide detailed parameters regarding your site, programmatic function, and delivery objectives.
                  </p>
                </div>

                {/* Section 1: Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-[#141413] mb-1.5">
                      Full Legal Name <span className="text-[#A67C52]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Julian Sterling"
                      className="w-full bg-white border border-[#E5E3DD] focus:border-[#C5A880] rounded-xl px-4 py-3 text-sm text-[#141413] placeholder:text-stone-400 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-[#141413] mb-1.5">
                      Official Email <span className="text-[#A67C52]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={officialEmail}
                      onChange={(e) => setOfficialEmail(e.target.value)}
                      placeholder="j.sterling@institution.org"
                      className="w-full bg-white border border-[#E5E3DD] focus:border-[#C5A880] rounded-xl px-4 py-3 text-sm text-[#141413] placeholder:text-stone-400 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Section 2: Entity & Telephone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-[#141413] mb-1.5">
                      Entity / Institution / Family Office
                    </label>
                    <input
                      type="text"
                      value={entityName}
                      onChange={(e) => setEntityName(e.target.value)}
                      placeholder="Royal Commission / Trust"
                      className="w-full bg-white border border-[#E5E3DD] focus:border-[#C5A880] rounded-xl px-4 py-3 text-sm text-[#141413] placeholder:text-stone-400 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-wider uppercase text-[#141413] mb-1.5">
                      Direct Telephone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+41 44 000 0000"
                      className="w-full bg-white border border-[#E5E3DD] focus:border-[#C5A880] rounded-xl px-4 py-3 text-sm text-[#141413] placeholder:text-stone-400 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Section 3: Site Location */}
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-[#141413] mb-1.5">
                    Proposed Site Location & Jurisdiction
                  </label>
                  <input
                    type="text"
                    value={siteLocation}
                    onChange={(e) => setSiteLocation(e.target.value)}
                    placeholder="City, Territory, or Country (e.g. Zurich lakeside / Riyadh North)"
                    className="w-full bg-white border border-[#E5E3DD] focus:border-[#C5A880] rounded-xl px-4 py-3 text-sm text-[#141413] placeholder:text-stone-400 outline-none transition-colors"
                  />
                </div>

                {/* Section 4: Project Sector Selector */}
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-[#141413] mb-2">
                    Architectural Praxis Sector
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {SECTORS.map((sector) => {
                      const isSelected = selectedSector === sector;
                      return (
                        <button
                          type="button"
                          key={sector}
                          onClick={() => setSelectedSector(sector)}
                          className={`text-left p-3 rounded-xl border text-xs font-mono transition-all ${
                            isSelected
                              ? 'bg-[#111111] border-[#111111] text-white shadow-sm font-semibold'
                              : 'bg-white border-[#E5E3DD] text-[#6B6862] hover:border-[#C5A880] hover:text-[#141413]'
                          }`}
                        >
                          {sector}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 5: Estimated Scale / GFA Meter */}
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-[#141413] mb-2">
                    Estimated Gross Floor Area (GFA Scale)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SCALES.map((scale) => {
                      const isSelected = selectedScale === scale.label;
                      return (
                        <button
                          type="button"
                          key={scale.label}
                          onClick={() => setSelectedScale(scale.label)}
                          className={`text-left p-4 rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-white border-[#C5A880] shadow-md ring-1 ring-[#C5A880]'
                              : 'bg-white/60 border-[#E5E3DD] hover:border-[#C5A880]/60'
                          }`}
                        >
                          <div className="text-xs font-mono font-semibold text-[#141413]">
                            {scale.label}
                          </div>
                          <div className="text-[11px] text-[#6B6862] mt-0.5 font-light">
                            {scale.detail}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 6: Target Timeline */}
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-[#141413] mb-2">
                    Anticipated Program Timeline
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {TIMELINES.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setSelectedTimeline(t)}
                        className={`text-left p-3 rounded-xl border text-xs font-mono transition-colors ${
                          selectedTimeline === t
                            ? 'bg-[#111111] text-white border-[#111111]'
                            : 'bg-white border-[#E5E3DD] text-[#6B6862] hover:text-[#141413]'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 7: Detailed Scope Narrative */}
                <div>
                  <label className="block text-xs font-mono tracking-wider uppercase text-[#141413] mb-1.5">
                    Programmatic Brief & Municipal Ambitions
                  </label>
                  <textarea
                    rows={4}
                    value={briefMessage}
                    onChange={(e) => setBriefMessage(e.target.value)}
                    placeholder="Outline the spatial ambitions, site topography, required structural capacities (e.g. vibration dampening, mass timber envelope), or ecological certifications sought..."
                    className="w-full bg-white border border-[#E5E3DD] focus:border-[#C5A880] rounded-xl p-4 text-sm text-[#141413] placeholder:text-stone-400 outline-none transition-colors resize-none"
                  />
                </div>

                {/* Security and ISO Guarantee */}
                <div className="flex items-center gap-2.5 text-xs text-[#6B6862]">
                  <ShieldCheck className="w-4 h-4 text-[#A67C52] shrink-0" />
                  <span>
                    Your inquiry is protected by encrypted transmission and strict architectural non-disclosure protocols.
                  </span>
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-[#111111] hover:bg-[#A67C52] text-white font-mono text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Formulating Dossier & Reference Code...</span>
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT COMMISSION BRIEF</span>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. Global Studios Directory with Live Local Clocks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
            <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#6B6862]">
              DIRECT REGIONAL ACCESS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#141413]">
            Global Studios Directory
          </h2>
          <p className="text-sm sm:text-base text-[#6B6862] font-light mt-2 leading-relaxed">
            Our principal studios operate synchronously across three continents. Direct telephone and dispatch points for institutional partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDIOS.map((studio) => (
            <div
              key={studio.city}
              className="bg-[#F5F4F0] border border-[#E5E3DD] hover:border-[#C5A880]/60 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E3DD]">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#A67C52] block">
                      {studio.country}
                    </span>
                    <h3 className="text-xl font-serif font-light text-[#141413] mt-0.5">
                      {studio.city} Atelier
                    </h3>
                  </div>

                  <div className="text-[10px] font-mono px-2.5 py-1 bg-white border border-[#E5E3DD] rounded-full text-[#6B6862] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#A67C52]" />
                    <span>{studioTimes[studio.city] || '--:--'}</span>
                  </div>
                </div>

                <div className="text-xs text-[#6B6862] font-mono mb-4">
                  <span>Region: </span>
                  <span className="text-[#141413]">{studio.region}</span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-start gap-2.5 text-[#6B6862]">
                    <MapPin className="w-4 h-4 text-[#A67C52] shrink-0 mt-0.5" />
                    <span>{studio.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-[#6B6862]">
                    <Compass className="w-4 h-4 text-[#A67C52] shrink-0" />
                    <span>{studio.coordinates}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-[#6B6862]">
                    <Building2 className="w-4 h-4 text-[#A67C52] shrink-0" />
                    <span>Lead: {studio.lead}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-6 border-t border-[#E5E3DD] space-y-2 font-mono text-xs">
                <a
                  href={`tel:${studio.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 text-[#141413] hover:text-[#A67C52] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#A67C52]" />
                  <span>{studio.phone}</span>
                </a>
                <a
                  href={`mailto:${studio.email}`}
                  className="flex items-center gap-2 text-[#6B6862] hover:text-[#A67C52] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#A67C52]" />
                  <span>{studio.email}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Media & Press Inquiries Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] text-[#FAFAF8] rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                  MEDIA, CRITICS & ARCHITECTURAL PRESS
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-light text-white">
                Press Inquiries & Photographic Archives
              </h2>

              <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-xl">
                High-resolution 300 DPI architectural photography, line drawings, CAD elevations, and monograph interview requests for architectural publications.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 font-mono text-xs text-stone-300">
                <div>
                  <span className="text-stone-500 uppercase block text-[10px]">EDITORIAL CONTACT:</span>
                  <a
                    href="mailto:press@archion.architects"
                    className="text-[#C5A880] hover:underline mt-0.5 block"
                  >
                    press@archion.architects
                  </a>
                </div>
                <div>
                  <span className="text-stone-500 uppercase block text-[10px]">CURATORIAL PERMISSIONS:</span>
                  <a
                    href="mailto:curatorial@archion.architects"
                    className="text-stone-300 hover:text-[#C5A880] mt-0.5 block"
                  >
                    curatorial@archion.architects
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-stone-900/80 border border-stone-800 p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-4">
              <div className="flex items-start gap-3">
                <Camera className="w-6 h-6 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <h4 className="text-base font-serif text-white">
                    2026 ARCHIØN Comprehensive Press Kit
                  </h4>
                  <p className="text-xs text-stone-400 mt-1">
                    ZIP archive containing 24 curated master project photographs, executive partner biographies, and monograph abstracts.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={downloadingPressKit}
                  onClick={handleDownloadPressKit}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-xs tracking-wider uppercase font-semibold transition-all ${
                    pressKitDownloaded
                      ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
                      : 'bg-[#C5A880] hover:bg-[#dfc49e] text-[#111111]'
                  }`}
                >
                  {downloadingPressKit ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Packaging Assets (182 MB)...</span>
                    </>
                  ) : pressKitDownloaded ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Press Kit Downloaded</span>
                    </>
                  ) : (
                    <>
                      <FileDown className="w-4 h-4" />
                      <span>Download Press Kit (182 MB)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animations';
import {
  ArrowRight,
  Check,
  Building2,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import { PROJECT_TYPES, SCALE_OPTIONS } from '@/components/ConsultationModal';

export default function ConsultationSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0]);
  const [scale, setScale] = useState(SCALE_OPTIONS[1]);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dossierRef, setDossierRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useGSAP(
    () => {
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName) {
      setErrorMessage('Please provide your full name and official email address.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate luxury architect brief encryption and transmission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const code = `ARC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setDossierRef(code);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
    setFirstName('');
    setLastName('');
    setOrganization('');
    setMessage('');
    setSelectedType(PROJECT_TYPES[0]);
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative py-24 sm:py-36 bg-[#0E0D0C] text-[#dedede] overflow-hidden font-sans"
    >
      {/* Dramatic Curved Golden Bronze Facade Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=85"
          alt="Curved Golden Bronze Facade"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.25] contrast-[1.15]"
        />
        {/* Obsidian & Gold Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0D0C]/90 via-[#0E0D0C]/80 to-[#0E0D0C]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C5A880]/10 via-transparent to-transparent" />
      </div>

      {/* CAD Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-stone-900/80 border border-stone-800 text-[11px] font-mono tracking-[0.28em] text-[#C5A880] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
            COMMISSION INQUIRY & FEASIBILITY
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white font-serif">
            Let&apos;s Build Together.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-stone-400 font-light max-w-2xl mx-auto leading-relaxed">
            Initiate a strategic architectural dialogue for civic masterplans, corporate headquarters, or research facilities across North America, Europe, and the Middle East.
          </p>
        </div>

        {/* Embedded Luxury Consultation Card */}
        <div
          ref={cardRef}
          className="relative bg-[#141414]/95 backdrop-blur-2xl border border-stone-800/90 rounded-3xl p-6 sm:p-12 shadow-2xl shadow-black/80 overflow-hidden"
        >
          {/* Subtle Champagne Top Hairline */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A67C52] via-[#C5A880] to-[#A67C52]" />

          {isSubmitted ? (
            /* Instant Confirmation View */
            <div className="py-12 text-center max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-[#C5A880]" />
              </div>
              <span className="text-xs font-mono tracking-[0.25em] text-[#C5A880] uppercase block mb-2">
                COMMISSION DOSSIER REGISTERED
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white mb-3">
                Inquiry Successfully Logged
              </h3>
              <p className="text-stone-300 text-sm font-light leading-relaxed mb-8">
                Thank you, {firstName} {lastName}. Your commission dossier has been routed directly to our Managing Principal in London, New York, or Riyadh. We will conduct preliminary zoning and environmental feasibility review and reply within 24 business hours.
              </p>

              {/* Dossier Code Readout */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 text-left font-mono text-xs mb-8 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                  <span className="text-stone-400">DOSSIER IDENTIFIER:</span>
                  <span className="text-[#C5A880] font-bold text-sm">{dossierRef}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-stone-300">
                  <div><span className="text-stone-500">PROGRAM:</span> {selectedType}</div>
                  <div><span className="text-stone-500">SCALE:</span> {scale}</div>
                  <div><span className="text-stone-500">ENTITY:</span> {organization || 'Private Office'}</div>
                  <div><span className="text-stone-500">CONTACT:</span> {email}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3.5 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white font-mono tracking-[0.2em] text-xs uppercase rounded-xl transition-colors"
              >
                SUBMIT ANOTHER BRIEF
              </button>
            </div>
          ) : (
            /* Interactive Consultation Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl text-xs font-mono text-red-300">
                  {errorMessage}
                </div>
              )}

              {/* Row 1: Name Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-400 mb-2">
                    First Name <span className="text-[#C5A880]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Henrik"
                    className="w-full bg-[#1A1A1A] border border-stone-800 focus:border-[#C5A880] text-stone-100 placeholder:text-stone-600 text-sm rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-400 mb-2">
                    Last Name <span className="text-[#C5A880]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Vance"
                    className="w-full bg-[#1A1A1A] border border-stone-800 focus:border-[#C5A880] text-stone-100 placeholder:text-stone-600 text-sm rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-400 mb-2">
                    Official Email <span className="text-[#C5A880]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="h.vance@institution.edu"
                    className="w-full bg-[#1A1A1A] border border-stone-800 focus:border-[#C5A880] text-stone-100 placeholder:text-stone-600 text-sm rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-400 mb-2">
                    Organization / Ministry / Fund
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Greater London Authority"
                    className="w-full bg-[#1A1A1A] border border-stone-800 focus:border-[#C5A880] text-stone-100 placeholder:text-stone-600 text-sm rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Select Project Type */}
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-400 mb-2.5">
                  Select Programmatic Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {PROJECT_TYPES.map((type) => {
                    const isSelected = selectedType === type;
                    return (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`text-left text-xs px-3.5 py-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C5A880]/15 border-[#C5A880] text-[#EAD7BB] font-medium'
                            : 'bg-[#1A1A1A] border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Scale Options */}
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-400 mb-2.5">
                  Gross Floor Area Scope
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {SCALE_OPTIONS.map((opt) => {
                    const isSelected = scale === opt;
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setScale(opt)}
                        className={`text-center text-[11px] px-3 py-2.5 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#C5A880]/15 border-[#C5A880] text-[#EAD7BB] font-medium'
                            : 'bg-[#1A1A1A] border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Message */}
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-400 mb-2">
                  Project Brief & Municipal Requirements
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline geographic site context, environmental targets, target occupancy dates, or structural constraints..."
                  className="w-full bg-[#1A1A1A] border border-stone-800 focus:border-[#C5A880] text-stone-100 placeholder:text-stone-600 text-sm rounded-xl px-4 py-3 outline-none transition-colors resize-none"
                />
              </div>

              {/* Security & ISO notice */}
              <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Encrypted briefing dossier. Protected under international ISO 19650 architectural NDAs.</span>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#C5A880] hover:from-[#EAD7BB] hover:to-[#C5A880] text-stone-950 font-semibold text-xs tracking-[0.24em] uppercase rounded-xl transition-all shadow-xl shadow-amber-500/15 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                      <span>Calibrating Architectural Dossier...</span>
                    </>
                  ) : (
                    <>
                      <span>REQUEST A CONSULTATION</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Card Footer: Direct Studio Telephones */}
          <div className="mt-8 pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-stone-400">
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Direct Studio Desks:</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-stone-300">
              <a href="tel:+442079460192" className="hover:text-[#C5A880] transition-colors">
                LON: +44 20 7946 0192
              </a>
              <span>•</span>
              <a href="tel:+12125550184" className="hover:text-[#C5A880] transition-colors">
                NYC: +1 212 555 0184
              </a>
              <span>•</span>
              <a href="tel:+966114829900" className="hover:text-[#C5A880] transition-colors">
                RUH: +966 11 482 9900
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, Check, ArrowRight, Building2, Sparkles, ShieldCheck, Loader2 } from 'lucide-react';

export interface ConsultationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultProjectType?: string;
}

export const PROJECT_TYPES = [
  'Education',
  'Civic & Urban Infrastructure',
  'Corporate Campuses',
  'Healthcare & Research',
  'Private Residential',
  'Masterplanning & Strategy',
];

export const SCALE_OPTIONS = [
  'Under 10,000 sqm',
  '10,000 – 50,000 sqm',
  '50,000 – 150,000 sqm',
  '150,000+ sqm (Masterplan)',
];

// Custom dispatch helper for opening consultation modal from any component
export function openConsultationModal(projectType?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('archi-open-consultation', {
        detail: { projectType },
      })
    );
  }
}

export default function ConsultationModal({
  isOpen: controlledIsOpen,
  onClose: controlledOnClose,
  defaultProjectType,
}: ConsultationModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(defaultProjectType || PROJECT_TYPES[0]);
  const [scale, setScale] = useState(SCALE_OPTIONS[1]);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [organization, setOrganization] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [consultationRef, setConsultationRef] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Handle controlled vs uncontrolled modal state
  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleClose = useCallback(() => {
    if (controlledOnClose) {
      controlledOnClose();
    } else {
      setInternalIsOpen(false);
    }
  }, [controlledOnClose]);

  // Listen for global custom event
  useEffect(() => {
    const handleGlobalOpen = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectType?: string }>;
      if (customEvent.detail?.projectType) {
        setSelectedType(customEvent.detail.projectType);
      }
      if (controlledIsOpen === undefined) {
        setInternalIsOpen(true);
      }
    };

    window.addEventListener('archi-open-consultation', handleGlobalOpen);
    return () => window.removeEventListener('archi-open-consultation', handleGlobalOpen);
  }, [controlledIsOpen]);

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, handleClose]);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName) {
      setToastMessage('Please enter your email and full name to continue.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury architect client portal brief dispatch
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const refCode = `ARC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setConsultationRef(refCode);
    setIsSubmitting(false);
    setIsSubmitted(true);
    setToastMessage(`Inquiry confirmed: Reference ${refCode}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
    setFirstName('');
    setLastName('');
    setOrganization('');
    setMessage('');
    setSelectedType(PROJECT_TYPES[0]);
    setScale(SCALE_OPTIONS[1]);
  };

  if (!isModalOpen) {
    return showToast ? (
      <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-stone-900 border border-amber-400/40 px-5 py-3 rounded-lg shadow-2xl text-xs tracking-wider uppercase text-amber-300 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    ) : null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dark backdrop blur */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
        onClick={handleClose}
      />

      {/* Modal Dialog Card - Conceptzilla 'Let's Build Together' style */}
      <div className="relative w-full max-w-2xl bg-[#111111] text-[#ededed] border border-stone-800/90 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-auto z-10 transition-all transform animate-in zoom-in-95 duration-200">
        {/* Architectural grid overlay lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Subtle bronze top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-400 to-stone-600" />

        {/* Modal Header */}
        <div className="relative p-6 sm:p-8 pb-4 flex items-start justify-between border-b border-stone-800/60">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] tracking-[0.28em] uppercase font-mono text-amber-400/90">
                Institutional & Private Commission
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white font-serif">
              Let&apos;s Build Together
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 font-light max-w-lg">
              Engage ARCHIØN for architectural masterplanning, high-performance facade engineering, or institutional commissions.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-2 -mr-2 text-stone-400 hover:text-white hover:bg-stone-800/70 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 pt-6 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
                <Check className="w-8 h-8 text-amber-400" />
              </div>
              <span className="text-xs font-mono tracking-[0.25em] text-amber-400 uppercase mb-2">
                Programmatic Brief Received
              </span>
              <h3 className="text-2xl font-light text-white mb-3 font-serif">
                Consultation Request Confirmed
              </h3>
              <p className="text-sm text-stone-400 max-w-md mb-6 leading-relaxed">
                Thank you, {firstName}. Our senior architectural partner in London, New York, or Riyadh will review your brief against our regional masterplanning bandwidth and contact you within 24 business hours.
              </p>

              {/* Reference token display */}
              <div className="w-full max-w-md bg-stone-900/80 border border-stone-800 rounded-xl p-4 mb-8 text-left font-mono">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-stone-800 text-stone-400">
                  <span>COMMISSION DOSSIER:</span>
                  <span className="text-amber-400 font-semibold">{consultationRef}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-3 text-stone-300">
                  <div><span className="text-stone-500">TYPE:</span> {selectedType}</div>
                  <div><span className="text-stone-500">SCALE:</span> {scale}</div>
                  <div><span className="text-stone-500">CONTACT:</span> {email}</div>
                  <div><span className="text-stone-500">ENTITY:</span> {organization || 'Private Office'}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-medium text-xs tracking-[0.2em] uppercase rounded-lg transition-colors"
                >
                  Return to Atelier
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-white text-xs tracking-[0.2em] uppercase rounded-lg transition-colors"
                >
                  Submit Another Brief
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-300 mb-1.5">
                    First Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Julian"
                    className="w-full bg-[#181818] border border-stone-700 focus:border-amber-400 text-stone-100 placeholder:text-stone-600 text-sm rounded-lg px-3.5 py-2.5 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-300 mb-1.5">
                    Last Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Sterling"
                    className="w-full bg-[#181818] border border-stone-700 focus:border-amber-400 text-stone-100 placeholder:text-stone-600 text-sm rounded-lg px-3.5 py-2.5 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-300 mb-1.5">
                    Official Email <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="j.sterling@institution.org"
                    className="w-full bg-[#181818] border border-stone-700 focus:border-amber-400 text-stone-100 placeholder:text-stone-600 text-sm rounded-lg px-3.5 py-2.5 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-300 mb-1.5">
                    Organization / Entity
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Royal Commission / Harvard Capital"
                    className="w-full bg-[#181818] border border-stone-700 focus:border-amber-400 text-stone-100 placeholder:text-stone-600 text-sm rounded-lg px-3.5 py-2.5 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Project Type Selection */}
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-300 mb-2">
                  Select Project Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PROJECT_TYPES.map((type) => {
                    const isSelected = selectedType === type;
                    return (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`text-left text-xs px-3 py-2.5 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-amber-400/10 border-amber-400 text-amber-300 font-medium'
                            : 'bg-[#181818] border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 4: Scale / Square Footage */}
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-300 mb-2">
                  Anticipated Scale / Gross Floor Area
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {SCALE_OPTIONS.map((opt) => {
                    const isSelected = scale === opt;
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setScale(opt)}
                        className={`text-center text-[11px] px-2.5 py-2 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-amber-400/15 border-amber-400 text-amber-300 font-medium'
                            : 'bg-[#181818] border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 5: Message / Project Brief */}
              <div>
                <label className="block text-[11px] font-mono tracking-wider uppercase text-stone-300 mb-1.5">
                  Project Brief & Municipal Context
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline the site topography, intended civic programmatic function, target completion timeline, or sustainability ambitions..."
                  className="w-full bg-[#181818] border border-stone-700 focus:border-amber-400 text-stone-100 placeholder:text-stone-600 text-sm rounded-lg px-3.5 py-2.5 outline-none transition-colors resize-none"
                />
              </div>

              {/* Privacy & ISO Certification Note */}
              <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-stone-400 shrink-0" />
                <span>Encrypted transmission. Non-disclosure protected under ISO 19650 architectural standard.</span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-semibold text-xs tracking-[0.22em] uppercase rounded-xl transition-all shadow-lg shadow-amber-500/15 hover:shadow-amber-500/25 disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                      <span>Calibrating Brief Dossier...</span>
                    </>
                  ) : (
                    <>
                      <span>REQUEST A CONSULTATION</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-stone-950" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer Trust Elements */}
        <div className="px-6 sm:px-8 py-3.5 bg-black/50 border-t border-stone-800/80 flex flex-wrap items-center justify-between text-[11px] text-stone-400">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-amber-400/80" />
            <span>London • New York • Riyadh</span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Direct partner dispatch:</span>
            <a href="mailto:praxis@archion.architects" className="text-amber-400 hover:underline">
              praxis@archion.architects
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Clock, ArrowUpRight, Globe } from 'lucide-react';
import { openConsultationModal } from './ConsultationModal';

interface HeaderProps {
  onOpenConsultation?: () => void;
}

interface WorldTime {
  london: string;
  newYork: string;
  riyadh: string;
}

export default function Header({ onOpenConsultation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [worldTimes, setWorldTimes] = useState<WorldTime>({
    london: '--:--',
    newYork: '--:--',
    riyadh: '--:--',
  });

  // Handle scroll state for dynamic glass blur depth
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update live world clocks for London, New York, and Riyadh
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();

      const formatTime = (timeZone: string) => {
        try {
          return new Intl.DateTimeFormat('en-GB', {
            timeZone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).format(now);
        } catch {
          return '--:--';
        }
      };

      setWorldTimes({
        london: formatTime('Europe/London'),
        newYork: formatTime('America/New_York'),
        riyadh: formatTime('Asia/Riyadh'),
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenConsultation = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      openConsultationModal();
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Projects', href: '/projects' },
    { label: 'Studio', href: '/studio' },
    { label: 'Monograph', href: '/monograph' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0c0c0c]/95 backdrop-blur-xl border-b border-stone-800/80 shadow-2xl py-3.5'
            : 'bg-[#FAFAF8]/85 backdrop-blur-md border-b border-[#E5E3DD]/80 shadow-sm py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left Column: Brand Logo & Tagline */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="group flex items-baseline gap-2.5 text-decoration-none select-none"
              >
                {/* ARCHIØN Architectural Wordmark */}
                <div
                  className={`flex items-center tracking-[0.28em] font-light text-xl sm:text-2xl transition-colors duration-300 font-sans ${
                    isScrolled
                      ? 'text-white group-hover:text-amber-300'
                      : 'text-[#141413] group-hover:text-[#A67C52]'
                  }`}
                >
                  <span>ARCHI</span>
                  <span
                    className={`relative inline-flex items-center justify-center font-serif italic mx-[0.5px] ${
                      isScrolled ? 'text-amber-400' : 'text-[#C5A880]'
                    }`}
                  >
                    Ø
                    <span
                      className={`absolute -top-1 right-0 text-[9px] font-mono not-italic ${
                        isScrolled ? 'text-amber-500/70' : 'text-[#A67C52]'
                      }`}
                    >
                      °
                    </span>
                  </span>
                  <span>N</span>
                </div>

                <span
                  className={`hidden xl:inline-block text-[9px] font-mono tracking-[0.25em] uppercase border-l pl-3 transition-colors ${
                    isScrolled
                      ? 'text-stone-400 border-stone-800'
                      : 'text-[#8C8983] border-[#E5E3DD]'
                  }`}
                >
                  PRAXIS
                </span>
              </Link>
            </div>

            {/* Middle Column: Refined Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative px-3 py-1.5 text-xs font-mono tracking-[0.2em] uppercase transition-colors group ${
                    isScrolled
                      ? 'text-stone-300 hover:text-amber-300'
                      : 'text-[#6B6862] hover:text-[#141413]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                      isScrolled ? 'bg-amber-400' : 'bg-[#C5A880]'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Right Column: World Clocks & Consultation CTA */}
            <div className="flex items-center gap-3 lg:gap-5">
              
              {/* Live World Clocks (London, New York, Riyadh) */}
              <div
                className={`hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-colors ${
                  isScrolled
                    ? 'bg-stone-900/80 border border-stone-800/80 text-stone-300 shadow-inner'
                    : 'bg-[#F5F4F0] border border-[#E5E3DD] text-[#141413] shadow-sm'
                }`}
                title="Live Regional Architectural Studio Times"
              >
                <div
                  className={`flex items-center gap-1.5 ${
                    isScrolled ? 'text-stone-400' : 'text-[#8C8983]'
                  }`}
                >
                  <Clock
                    className={`w-3 h-3 animate-pulse ${
                      isScrolled ? 'text-amber-400/90' : 'text-[#C5A880]'
                    }`}
                  />
                  <span className="text-[10px] font-medium">STUDIOS:</span>
                </div>

                <div
                  className={`flex items-center gap-2.5 divide-x ${
                    isScrolled ? 'divide-stone-800 text-stone-300' : 'divide-[#E5E3DD] text-[#141413]'
                  }`}
                >
                  <div className="flex items-center gap-1 pl-0">
                    <span className={isScrolled ? 'text-stone-400 text-[10px]' : 'text-[#8C8983] text-[10px]'}>
                      LON
                    </span>
                    <span className="font-semibold">{worldTimes.london}</span>
                  </div>
                  <div className="flex items-center gap-1 pl-2.5">
                    <span className={isScrolled ? 'text-stone-400 text-[10px]' : 'text-[#8C8983] text-[10px]'}>
                      NYC
                    </span>
                    <span className="font-semibold">{worldTimes.newYork}</span>
                  </div>
                  <div className="flex items-center gap-1 pl-2.5">
                    <span
                      className={`text-[10px] ${
                        isScrolled ? 'text-amber-400/90' : 'text-[#C5A880]'
                      }`}
                    >
                      RUH
                    </span>
                    <span className="font-semibold">{worldTimes.riyadh}</span>
                  </div>
                </div>
              </div>

              {/* Consultation Trigger Button */}
              <button
                type="button"
                onClick={handleOpenConsultation}
                className={`relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-[11px] font-mono tracking-[0.2em] uppercase font-semibold transition-all duration-300 shadow-md cursor-pointer ${
                  isScrolled
                    ? 'text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 shadow-amber-500/20 hover:shadow-amber-400/30 hover:scale-[1.02] active:scale-[0.98]'
                    : 'text-white bg-[#141413] hover:bg-[#2A2825] border border-[#141413] shadow-stone-900/10 hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                <span className="relative z-10">Get in touch</span>
                <ArrowUpRight
                  className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    isScrolled ? 'text-stone-950' : 'text-[#C5A880]'
                  }`}
                />
              </button>

              {/* Mobile Hamburger Drawer Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg border transition-colors ${
                  isScrolled
                    ? 'bg-stone-900 border-stone-800 text-stone-200 hover:text-white'
                    : 'bg-[#F5F4F0] border-[#E5E3DD] text-[#141413] hover:border-[#C5A880]'
                }`}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-amber-400" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden animate-in fade-in duration-300">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Menu Content */}
          <div className="relative z-40 flex flex-col justify-between h-full max-w-sm w-full bg-[#111111] border-r border-stone-800 p-6 pt-24 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div className="text-xs font-mono tracking-[0.25em] text-amber-400 uppercase">
                  NAVIGATION INDEX
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-stone-400">
                  <Globe className="w-3 h-3 text-amber-400" />
                  <span>GLOBAL PRAXIS</span>
                </div>
              </div>

              {/* Staggered gold navigation links */}
              <nav className="flex flex-col space-y-4">
                {navLinks.map((item, idx) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-lg font-light tracking-[0.18em] uppercase text-stone-200 hover:text-amber-300 py-2 border-b border-stone-800/50 transition-colors"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono text-stone-400">0{idx + 1}</span>
                  </Link>
                ))}
              </nav>

              {/* Mobile World Clocks */}
              <div className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 space-y-3 font-mono">
                <div className="flex items-center gap-2 text-[11px] tracking-widest text-amber-400 uppercase pb-2 border-b border-stone-800">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Studio Timezones</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-black/40 p-2 rounded border border-stone-800/70">
                    <div className="text-stone-400 text-[10px]">LONDON</div>
                    <div className="text-stone-200 font-bold mt-0.5">{worldTimes.london}</div>
                  </div>
                  <div className="bg-black/40 p-2 rounded border border-stone-800/70">
                    <div className="text-stone-400 text-[10px]">NEW YORK</div>
                    <div className="text-stone-200 font-bold mt-0.5">{worldTimes.newYork}</div>
                  </div>
                  <div className="bg-black/40 p-2 rounded border border-stone-800/70">
                    <div className="text-amber-400 text-[10px]">RIYADH</div>
                    <div className="text-amber-300 font-bold mt-0.5">{worldTimes.riyadh}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Footer CTA */}
            <div className="pt-6 border-t border-stone-800 space-y-3">
              <button
                type="button"
                onClick={handleOpenConsultation}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-mono tracking-[0.2em] uppercase text-xs font-bold rounded-xl transition-colors shadow-lg shadow-amber-500/10"
              >
                <span>REQUEST CONSULTATION</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[10px] font-mono text-stone-400">
                ARCHIØN PRAXIS AG • ZURICH / RIYADH
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

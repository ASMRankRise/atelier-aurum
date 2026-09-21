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
            ? 'bg-[#0c0c0c]/90 backdrop-blur-xl border-b border-stone-800/80 shadow-2xl py-3.5'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-sm border-b border-white/5 py-5'
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
                <div className="flex items-center tracking-[0.28em] font-light text-xl sm:text-2xl text-white group-hover:text-amber-300 transition-colors duration-300 font-sans">
                  <span>ARCHI</span>
                  <span className="relative inline-flex items-center justify-center font-serif italic text-amber-400 mx-[0.5px]">
                    Ø
                    <span className="absolute -top-1 right-0 text-[9px] text-amber-500/70 font-mono not-italic">
                      °
                    </span>
                  </span>
                  <span>N</span>
                </div>

                <span className="hidden xl:inline-block text-[9px] font-mono tracking-[0.25em] text-stone-400 uppercase border-l border-stone-800 pl-3">
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
                  className="relative px-3 py-1.5 text-xs font-mono tracking-[0.2em] uppercase text-stone-300 hover:text-amber-300 transition-colors group"
                >
                  <span>{item.label}</span>
                  <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </nav>

            {/* Right Column: World Clocks & Consultation CTA */}
            <div className="flex items-center gap-3 lg:gap-5">
              
              {/* Live World Clocks (London, New York, Riyadh) */}
              <div
                className="hidden lg:flex items-center gap-3 bg-stone-900/80 border border-stone-800/80 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider shadow-inner"
                title="Live Regional Architectural Studio Times"
              >
                <div className="flex items-center gap-1.5 text-stone-400">
                  <Clock className="w-3 h-3 text-amber-400/90 animate-pulse" />
                  <span className="text-[10px] text-stone-400 font-medium">STUDIOS:</span>
                </div>

                <div className="flex items-center gap-2.5 divide-x divide-stone-800 text-stone-300">
                  <div className="flex items-center gap-1 pl-0">
                    <span className="text-stone-400 text-[10px]">LON</span>
                    <span className="text-stone-100 font-semibold">{worldTimes.london}</span>
                  </div>
                  <div className="flex items-center gap-1 pl-2.5">
                    <span className="text-stone-400 text-[10px]">NYC</span>
                    <span className="text-stone-100 font-semibold">{worldTimes.newYork}</span>
                  </div>
                  <div className="flex items-center gap-1 pl-2.5">
                    <span className="text-amber-400/90 text-[10px]">RUH</span>
                    <span className="text-stone-100 font-semibold">{worldTimes.riyadh}</span>
                  </div>
                </div>
              </div>

              {/* "Get in touch" Pill Button */}
              <button
                type="button"
                onClick={handleOpenConsultation}
                className="relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-[11px] font-mono tracking-[0.2em] uppercase font-semibold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 transition-all duration-300 shadow-md shadow-amber-500/20 hover:shadow-amber-400/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10">Get in touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-950 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* Mobile Hamburger Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-stone-400 hover:text-white hover:bg-stone-900 rounded-lg transition-colors"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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

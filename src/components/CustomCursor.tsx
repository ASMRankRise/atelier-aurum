'use client';

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { gsap } from '@/lib/animations';

function subscribeFinePointer(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getFinePointerSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function getFinePointerServerSnapshot(): boolean {
  return false;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const enabled = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);

  // Setup cursor positioning & quickTo tweens
  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    // Center offsets
    const dotOffset = 3; // 6px / 2
    const ringOffset = 18; // 36px / 2

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });

    const xRing = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);

      xDot(e.clientX - dotOffset);
      yDot(e.clientY - dotOffset);

      xRing(e.clientX - ringOffset);
      yRing(e.clientY - ringOffset);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, [role="button"], input, select, textarea, label, [data-cursor]'
      ) as HTMLElement | null;

      if (interactive) {
        setIsHovered(true);
        const customText = interactive.getAttribute('data-cursor-text');
        setHoverText(customText || null);
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    const handleMouseDown = () => {
      gsap.to(ring, {
        scale: 0.8,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseUp = () => {
      gsap.to(ring, {
        scale: isHovered ? 1.75 : 1,
        duration: 0.25,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [enabled, isHovered]);

  // Handle visual changes on hover state transitions
  useEffect(() => {
    if (!ringRef.current || !dotRef.current) return;

    if (isHovered) {
      gsap.to(ringRef.current, {
        scale: hoverText ? 2.3 : 1.75,
        borderColor: '#C5A880',
        backgroundColor: 'rgba(197, 168, 128, 0.08)',
        duration: 0.28,
        ease: 'power2.out',
      });
      gsap.to(dotRef.current, {
        scale: hoverText ? 0 : 0.5,
        backgroundColor: '#C5A880',
        duration: 0.2,
      });
    } else {
      gsap.to(ringRef.current, {
        scale: 1,
        borderColor: 'rgba(197, 168, 128, 0.45)',
        backgroundColor: 'transparent',
        duration: 0.28,
        ease: 'power2.out',
      });
      gsap.to(dotRef.current, {
        scale: 1,
        backgroundColor: '#111111',
        duration: 0.2,
      });
    }
  }, [isHovered, hoverText]);

  if (!enabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-[#111111] pointer-events-none will-change-transform"
      />

      {/* Trailing architectural gold ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[36px] h-[36px] rounded-full border border-[rgba(197,168,128,0.45)] pointer-events-none flex items-center justify-center will-change-transform"
      >
        {hoverText && (
          <span className="text-[8px] tracking-widest uppercase font-medium text-[#111111] select-none">
            {hoverText}
          </span>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/animations';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize Lenis with optimal parameters for buttery architectural smooth scroll
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      anchors: true,
    });

    lenisRef.current = lenis;
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Synchronize Lenis scroll event with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Pipe GSAP's internal ticker into Lenis requestAnimationFrame
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh function to recalibrate ScrollTrigger offsets
    const refreshScrollTriggers = () => {
      ScrollTrigger.refresh();
    };

    // Trigger refreshes at key rendering milestones to ensure zero layout overlap
    if (document.fonts) {
      document.fonts.ready.then(refreshScrollTriggers);
    }

    window.addEventListener('load', refreshScrollTriggers);
    window.addEventListener('resize', refreshScrollTriggers);

    // Staggered timers to catch asynchronous Next.js image loading and hydration
    const timer1 = setTimeout(refreshScrollTriggers, 200);
    const timer2 = setTimeout(refreshScrollTriggers, 600);
    const timer3 = setTimeout(refreshScrollTriggers, 1500);

    return () => {
      gsap.ticker.remove(updateTicker);
      window.removeEventListener('load', refreshScrollTriggers);
      window.removeEventListener('resize', refreshScrollTriggers);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return <>{children}</>;
}

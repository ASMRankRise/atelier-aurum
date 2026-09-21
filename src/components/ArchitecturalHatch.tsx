'use client';

import React, { useId, useRef, useEffect } from 'react';
import { gsap } from '@/lib/animations';

export type HatchPattern = 'vertical' | 'diagonal' | 'crosshatch' | 'dots';
export type HatchDensity = 'dense' | 'normal' | 'loose';

export interface ArchitecturalHatchProps extends React.HTMLAttributes<HTMLDivElement> {
  pattern?: HatchPattern;
  density?: HatchDensity;
  strokeColor?: string;
  strokeWidth?: number;
  patternOpacity?: number;
  animateOnScroll?: boolean;
  interactiveHover?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function ArchitecturalHatch({
  pattern = 'diagonal',
  density = 'normal',
  strokeColor = '#E5E3DD',
  strokeWidth = 1,
  patternOpacity = 0.8,
  animateOnScroll = false,
  interactiveHover = true,
  children,
  className = '',
  ...restProps
}: ArchitecturalHatchProps) {
  const reactId = useId();
  const patternId = `hatch-pattern-${reactId.replace(/[^a-zA-Z0-9-_]/g, '')}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<SVGRectElement>(null);

  // Determine spacing based on density
  const getSpacing = (): number => {
    switch (density) {
      case 'dense':
        return 6;
      case 'loose':
        return 18;
      case 'normal':
      default:
        return 10;
    }
  };

  const spacing = getSpacing();

  // GSAP scroll-triggered animation if requested
  useEffect(() => {
    if (!animateOnScroll || !containerRef.current || !rectRef.current) return;
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rectRef.current,
        {
          opacity: 0,
          scale: 0.96,
          transformOrigin: 'center center',
        },
        {
          opacity: patternOpacity,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 88%',
            once: true,
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [animateOnScroll, patternOpacity]);

  // Subtle interactive hover state
  const handleMouseEnter = () => {
    if (!interactiveHover || !rectRef.current) return;
    gsap.to(rectRef.current, {
      opacity: Math.min(1, patternOpacity * 1.35),
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!interactiveHover || !rectRef.current) return;
    gsap.to(rectRef.current, {
      opacity: patternOpacity,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  // Render SVG pattern defs based on type
  const renderPatternContent = () => {
    switch (pattern) {
      case 'vertical':
        return (
          <pattern
            id={patternId}
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <line
              x1={spacing / 2}
              y1="0"
              x2={spacing / 2}
              y2={spacing}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </pattern>
        );

      case 'crosshatch':
        return (
          <pattern
            id={patternId}
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2={spacing}
              y2={spacing}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <line
              x1={spacing}
              y1="0"
              x2="0"
              y2={spacing}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </pattern>
        );

      case 'dots':
        return (
          <pattern
            id={patternId}
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={spacing / 2}
              cy={spacing / 2}
              r={strokeWidth}
              fill={strokeColor}
            />
          </pattern>
        );

      case 'diagonal':
      default:
        // 45-degree angled architectural hatching
        return (
          <pattern
            id={patternId}
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2={spacing}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </pattern>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...restProps}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>{renderPatternContent()}</defs>
        <rect
          ref={rectRef}
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
          opacity={patternOpacity}
          className="will-change-[opacity,transform]"
        />
      </svg>

      {/* Optional Content placed over the hatch pattern */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

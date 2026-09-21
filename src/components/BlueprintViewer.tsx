'use client';

import React, { useState } from 'react';
import { Layers, Sun, Shield, Grid, Activity } from 'lucide-react';
import { Project } from '@/data/projects';

export type BlueprintLayer = 'structural' | 'wireframe' | 'lighting';

interface BlueprintViewerProps {
  project: Project;
}

export default function BlueprintViewer({ project }: BlueprintViewerProps) {
  const [activeLayer, setActiveLayer] = useState<BlueprintLayer>('structural');

  return (
    <div className="relative bg-[#0F1115] border border-stone-800 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs">
      {/* CAD Drafting Viewport Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-stone-800 bg-[#16181D]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#C5A880]">
            <Layers className="w-4 h-4" />
            <span className="tracking-[0.2em] font-semibold uppercase text-[11px]">
              CAD ELEVATION MATRIX
            </span>
          </div>
          <span className="hidden sm:inline-block text-stone-600">|</span>
          <span className="hidden sm:inline-block text-[10px] text-stone-400">
            SCALE 1:100 • ISO 19650-2 VERIFIED
          </span>
        </div>

        {/* Interactive Layer Switcher */}
        <div className="flex items-center gap-1 bg-[#0F1115] border border-stone-800 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveLayer('structural')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] transition-all ${
              activeLayer === 'structural'
                ? 'bg-[#C5A880] text-[#111111] font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Structural</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLayer('wireframe')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] transition-all ${
              activeLayer === 'wireframe'
                ? 'bg-[#C5A880] text-[#111111] font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Wireframe</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLayer('lighting')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] transition-all ${
              activeLayer === 'lighting'
                ? 'bg-[#C5A880] text-[#111111] font-semibold shadow-sm'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span>Solar / Lighting</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas Drawing Area */}
      <div className="relative w-full aspect-[16/9] min-h-[380px] sm:min-h-[460px] bg-[#0A0C10] flex items-center justify-center p-4 sm:p-8 overflow-hidden select-none">
        {/* Background CAD Coordinate Grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #38BDF8 1px, transparent 1px), linear-gradient(to bottom, #38BDF8 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)',
            backgroundSize: '8px 8px',
          }}
        />

        {/* Dynamic Architectural Vector Blueprint */}
        <svg
          viewBox="0 0 900 500"
          className="w-full h-full max-h-[440px] drop-shadow-[0_0_25px_rgba(197,168,128,0.15)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Elevation Datum Levels (Always visible baseline) */}
          <g className="text-[10px] font-mono fill-stone-600 stroke-stone-700/60">
            <line x1="60" y1="440" x2="840" y2="440" strokeWidth="1" strokeDasharray="4 4" />
            <text x="65" y="435">LVL 00 • DATUM ±0.000m (FINISHED GRADE)</text>

            <line x1="60" y1="340" x2="840" y2="340" strokeWidth="1" strokeDasharray="4 4" />
            <text x="65" y="335">LVL 01 • +4.500m (MEZZANINE CONCOURSE)</text>

            <line x1="60" y1="240" x2="840" y2="240" strokeWidth="1" strokeDasharray="4 4" />
            <text x="65" y="235">LVL 02 • +9.000m (RESEARCH GALLERY)</text>

            <line x1="60" y1="140" x2="840" y2="140" strokeWidth="1" strokeDasharray="4 4" />
            <text x="65" y="135">LVL 03 • +13.500m (CANOPY PARAPET)</text>
          </g>

          {/* LAYER 1: STRUCTURAL ELEMENTS (Heavy load-bearing columns, trusses, shear walls) */}
          {activeLayer === 'structural' && (
            <g className="animate-in fade-in duration-400">
              {/* Ground Anchor Blocks */}
              <rect x="180" y="440" width="80" height="30" fill="#1E232F" stroke="#C5A880" strokeWidth="1.5" />
              <rect x="360" y="440" width="80" height="30" fill="#1E232F" stroke="#C5A880" strokeWidth="1.5" />
              <rect x="540" y="440" width="80" height="30" fill="#1E232F" stroke="#C5A880" strokeWidth="1.5" />
              <rect x="720" y="440" width="80" height="30" fill="#1E232F" stroke="#C5A880" strokeWidth="1.5" />

              {/* Vertical Structural Pylons */}
              <rect x="200" y="140" width="40" height="300" fill="#1A202C" stroke="#E2E8F0" strokeWidth="2" />
              <rect x="380" y="140" width="40" height="300" fill="#1A202C" stroke="#E2E8F0" strokeWidth="2" />
              <rect x="560" y="140" width="40" height="300" fill="#1A202C" stroke="#E2E8F0" strokeWidth="2" />

              {/* Cantilever Outrigger Truss (Stretching toward right) */}
              <polygon
                points="560,140 760,190 760,250 560,250"
                fill="rgba(197, 168, 128, 0.1)"
                stroke="#C5A880"
                strokeWidth="2.5"
              />
              <line x1="560" y1="140" x2="760" y2="250" stroke="#C5A880" strokeWidth="1.5" strokeDasharray="6 3" />
              <line x1="560" y1="250" x2="760" y2="190" stroke="#C5A880" strokeWidth="1.5" strokeDasharray="6 3" />

              {/* Floor Slabs */}
              <rect x="160" y="430" width="620" height="10" fill="#38BDF8" opacity="0.8" />
              <rect x="180" y="335" width="440" height="10" fill="#38BDF8" opacity="0.8" />
              <rect x="180" y="235" width="600" height="12" fill="#38BDF8" opacity="0.8" />
              <rect x="140" y="135" width="640" height="15" fill="#C5A880" opacity="0.9" />

              {/* Load Vectors & Stress Callouts */}
              <g className="fill-[#C5A880] stroke-[#C5A880]">
                {/* Arrow down onto cantilever */}
                <line x1="720" y1="110" x2="720" y2="180" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="730" y="150" className="text-[9px] font-mono fill-[#C5A880]">
                  LIVE LOAD: 4.8 kN/m²
                </text>

                {/* Shear Wall core */}
                <line x1="220" y1="270" x2="220" y2="310" strokeWidth="2" />
                <text x="230" y="295" className="text-[9px] font-mono fill-stone-300">
                  PT CONCRETE CORE (C50/60)
                </text>
              </g>
            </g>
          )}

          {/* LAYER 2: WIREFRAME & GEOMETRIC CAD (Dimension lines, parametric subdivision, axes) */}
          {activeLayer === 'wireframe' && (
            <g className="animate-in fade-in duration-400">
              {/* Outer Envelope Wireframe Envelope */}
              <rect
                x="150"
                y="120"
                width="630"
                height="320"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.2"
                strokeDasharray="8 4"
              />

              {/* Internal Atrium Aperture Curves */}
              <path
                d="M 280 440 Q 370 200 480 200 T 660 440"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="2"
              />

              {/* Parametric Louver Ribbon Lines */}
              {[...Array(14)].map((_, i) => (
                <line
                  key={i}
                  x1={180 + i * 42}
                  y1={140}
                  x2={200 + i * 42}
                  y2={440}
                  stroke="#A5B4FC"
                  strokeWidth="0.8"
                  opacity={0.6}
                />
              ))}

              {/* Vertical CAD Dimension Strings */}
              <g className="stroke-[#F59E0B] fill-[#F59E0B] text-[9px] font-mono">
                <line x1="120" y1="120" x2="120" y2="440" strokeWidth="1" />
                <line x1="110" y1="120" x2="130" y2="120" strokeWidth="1" />
                <line x1="110" y1="440" x2="130" y2="440" strokeWidth="1" />
                <text
                  x="-290"
                  y="105"
                  transform="rotate(-90)"
                  className="fill-[#F59E0B] text-[10px]"
                >
                  OVERALL HEIGHT: 16,800 mm
                </text>

                {/* Horizontal Span */}
                <line x1="150" y1="475" x2="780" y2="475" strokeWidth="1" />
                <line x1="150" y1="465" x2="150" y2="485" strokeWidth="1" />
                <line x1="780" y1="465" x2="780" y2="485" strokeWidth="1" />
                <text x="420" y="490" textAnchor="middle" className="fill-[#F59E0B] text-[10px]">
                  SPAN L = 38,400 mm
                </text>
              </g>

              {/* Centerline Crosshairs */}
              <circle cx="465" cy="280" r="14" fill="none" stroke="#EF4444" strokeWidth="1" />
              <line x1="445" y1="280" x2="485" y2="280" stroke="#EF4444" strokeWidth="1" />
              <line x1="465" y1="260" x2="465" y2="300" stroke="#EF4444" strokeWidth="1" />
              <text x="485" y="275" className="fill-[#EF4444] text-[8px]">
                GEOMETRIC CENTROID
              </text>
            </g>
          )}

          {/* LAYER 3: LIGHTING & SOLAR PATH (Daylighting cones, solstice vectors, louvers) */}
          {activeLayer === 'lighting' && (
            <g className="animate-in fade-in duration-400">
              {/* Sun Position Node */}
              <circle cx="780" cy="70" r="16" fill="#FBBF24" opacity="0.9" />
              <circle cx="780" cy="70" r="32" fill="none" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 3" />
              <text x="740" y="45" className="fill-[#FBBF24] text-[9px] font-mono">
                SOLAR NOON • 62° ELEVATION
              </text>

              {/* Solar Radiation Cone filtering through Atrium Skylight */}
              <polygon
                points="780,70 350,140 550,140"
                fill="url(#solarBeamGrad)"
                opacity="0.35"
              />
              <polygon
                points="450,140 380,440 600,440"
                fill="url(#solarBeamGrad)"
                opacity="0.25"
              />

              {/* Solar Rays striking Bronze Louvers */}
              <line x1="760" y1="90" x2="620" y2="220" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="4 2" />
              <line x1="750" y1="95" x2="520" y2="280" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="4 2" />

              {/* Louver Refraction Vectors */}
              <line x1="620" y1="220" x2="680" y2="210" stroke="#38BDF8" strokeWidth="1" />
              <text x="635" y="200" className="fill-[#38BDF8] text-[8px]">
                41% SPECULAR SHADING
              </text>

              {/* Daylighting Lux Heatmap Zone */}
              <ellipse cx="490" cy="400" rx="140" ry="30" fill="#FBBF24" opacity="0.15" />
              <text x="490" y="405" textAnchor="middle" className="fill-[#FBBF24] text-[9px]">
                DIFFUSE LUX: 850 lx (GLARE-FREE AMBIENCE)
              </text>
            </g>
          )}

          {/* Shared SVG Defs */}
          <defs>
            <linearGradient id="solarBeamGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
            </linearGradient>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#C5A880" />
            </marker>
          </defs>
        </svg>

        {/* Floating Layer Context Badge */}
        <div className="absolute bottom-4 left-4 bg-[#16181D]/90 border border-stone-800 backdrop-blur-md px-3.5 py-2 rounded-lg text-stone-300 flex items-center gap-2 text-[11px]">
          <Activity className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
          <span>
            {activeLayer === 'structural' && 'ACTIVE: Load Paths, Foundation Anchors & Post-Tensioned Slabs'}
            {activeLayer === 'wireframe' && 'ACTIVE: CAD Parametric Meshing, Millimeter Offsets & Grid Extents'}
            {activeLayer === 'lighting' && 'ACTIVE: Dynamic Solar Ray Angles & Glare Mitigation Analysis'}
          </span>
        </div>
      </div>

      {/* Blueprint Legend Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 py-4 bg-[#14161B] border-t border-stone-800 text-[11px] text-stone-400">
        <div>
          <span className="text-stone-500 uppercase block text-[9px]">STRUCTURAL ENGINE:</span>
          <span className="text-stone-200 mt-0.5 block truncate">{project.structuralEngineers}</span>
        </div>
        <div>
          <span className="text-stone-500 uppercase block text-[9px]">BIM ACCURACY:</span>
          <span className="text-[#C5A880] font-semibold mt-0.5 block">{project.stats.bimPrecision}</span>
        </div>
        <div>
          <span className="text-stone-500 uppercase block text-[9px]">SOLAR OFFSET:</span>
          <span className="text-stone-200 mt-0.5 block">{project.stats.energyReduction}</span>
        </div>
        <div>
          <span className="text-stone-500 uppercase block text-[9px]">AUTONOMY FACTOR:</span>
          <span className="text-stone-200 mt-0.5 block">{project.stats.daylighting}</span>
        </div>
      </div>
    </div>
  );
}

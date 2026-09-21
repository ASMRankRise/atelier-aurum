import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Award,
} from 'lucide-react';
import { PROJECTS, getProjectBySlug } from '@/data/projects';
import BlueprintViewer from '@/components/BlueprintViewer';

// Mandatory for Next.js static export (output: 'export')
export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found — ARCHIØN',
    };
  }

  return {
    title: `${project.title} — ARCHIØN Praxis Case Study`,
    description: project.subtitle,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Calculate Next Project in rotation
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <article className="min-h-screen bg-[#FAFAF8] text-[#141413]">
      {/* 1. Full-Bleed Cinematic Hero Section */}
      <section className="relative min-h-[90vh] sm:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-black text-white pt-28 pb-16">
        {/* Background Full-Bleed Photography */}
        <div className="absolute inset-0 z-0">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-65 scale-105"
          />
          {/* Multi-tier architectural gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>

        {/* Top Back Navigation Bar */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-stone-300 hover:text-[#C5A880] transition-colors py-2 px-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Archive</span>
          </Link>
        </div>

        {/* Hero Architectural Metadata Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#C5A880] text-[#111111] text-[11px] font-mono tracking-[0.25em] font-semibold uppercase rounded-full">
                {project.categoryLabel}
              </span>
              <span className="text-xs font-mono tracking-widest text-stone-300 uppercase">
                {project.year} • {project.status}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight font-serif text-white leading-[1.05]">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-stone-300 font-light mt-4 leading-relaxed max-w-2xl">
              {project.subtitle}
            </p>
          </div>

          {/* Technical Specs Summary Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/15 backdrop-blur-sm bg-black/20 p-6 rounded-2xl">
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-stone-400 uppercase block">
                COMMISSION CLIENT
              </span>
              <span className="text-sm sm:text-base font-light font-mono text-white mt-1 block">
                {project.client}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-stone-400 uppercase block">
                SITE LOCATION
              </span>
              <span className="text-sm sm:text-base font-light font-mono text-white mt-1 block flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                <span className="truncate">{project.location}</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-stone-400 uppercase block">
                GROSS FLOOR AREA
              </span>
              <span className="text-sm sm:text-base font-light font-mono text-[#C5A880] mt-1 block">
                {project.area}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-[0.2em] text-stone-400 uppercase block">
                STRUCTURAL ENGINEERS
              </span>
              <span className="text-sm sm:text-base font-light font-mono text-white mt-1 block truncate">
                {project.structuralEngineers}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Architectural Narrative & Intent Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-[#E5E3DD]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Architectural Intent & Curator Pull-Quote */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#6B6862]">
                ARCHITECTURAL INTENT & ESSAY
              </span>
            </div>

            <blockquote className="text-2xl sm:text-3xl font-serif font-light text-[#141413] leading-snug border-l-2 border-[#C5A880] pl-6 italic">
              &ldquo;{project.architecturalNarrative}&rdquo;
            </blockquote>

            <div className="pt-2 text-xs font-mono text-[#6B6862]">
              <span className="text-[#141413] font-semibold">Lead Architect: </span>
              <span>{project.leadArchitect || 'Henrik Sörensen, FAIA / ARCHIØN Praxis'}</span>
            </div>

            {project.awards && project.awards.length > 0 && (
              <div className="bg-[#F5F4F0] border border-[#E5E3DD] rounded-xl p-5 mt-6">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#A67C52] uppercase mb-3">
                  <Award className="w-4 h-4 text-[#A67C52]" />
                  <span>Conferred Honors</span>
                </div>
                <ul className="space-y-2 text-xs text-[#6B6862]">
                  {project.awards.map((award) => (
                    <li key={award} className="flex items-start gap-2">
                      <span className="text-[#A67C52] mt-0.5">•</span>
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: In-Depth Architectural Exploration */}
          <div className="lg:col-span-7 space-y-6 text-[#6B6862] font-light text-base sm:text-lg leading-relaxed">
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#141413] leading-tight">
              Spatial Dialectic: Translating Climate Thermodynamics into Permanent Tectonic Weight
            </h2>

            <p>
              {project.description}
            </p>

            <p>
              Rather than imposing a preconceived formal vocabulary, the design is born of its microclimatic exposure. Computational solar vectors informed the rotational pitch of every façade mullion, allowing the envelope to act as a self-shading thermal organ. Internally, public flow converges within a monumental multi-story atrium where natural convection currents exhaust warm air without reliance on high-tonnage mechanical fans.
            </p>

            <p>
              By fusing raw geological aggregates with parametric bronze and glulam systems, the project establishes a dialectic between enduring stone gravity and weightless optical illumination.
            </p>

            {/* Quick Spec Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#E5E3DD] text-xs font-mono">
              <div className="p-3 bg-[#F5F4F0] rounded-lg border border-[#E5E3DD]">
                <span className="text-stone-500 uppercase block text-[10px]">ENERGY SAVING</span>
                <span className="text-lg font-light text-[#141413] mt-1 block">
                  {project.stats.energyReduction}
                </span>
              </div>
              <div className="p-3 bg-[#F5F4F0] rounded-lg border border-[#E5E3DD]">
                <span className="text-stone-500 uppercase block text-[10px]">DAYLIGHT AUTONOMY</span>
                <span className="text-lg font-light text-[#141413] mt-1 block">
                  {project.stats.daylighting}
                </span>
              </div>
              <div className="p-3 bg-[#F5F4F0] rounded-lg border border-[#E5E3DD]">
                <span className="text-stone-500 uppercase block text-[10px]">EMBODIED CARBON</span>
                <span className="text-lg font-light text-[#A67C52] mt-1 block">
                  {project.stats.embodiedCarbon || '-38%'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive CAD Elevation / Blueprint Viewer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 border-b border-[#E5E3DD]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#6B6862]">
                CAD SYSTEM ARCHITECTURE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#141413]">
              Dynamic Elevation & Layer Switcher
            </h2>
            <p className="text-sm text-[#6B6862] font-light mt-1 max-w-xl">
              Toggle between structural load paths, isometric wireframe geometry, and daylighting/solar radiation simulation vectors.
            </p>
          </div>
        </div>

        {/* Client Interactive Blueprint Viewer */}
        <BlueprintViewer project={project} />
      </section>

      {/* 4. Technical Specifications & Material Tactility Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 border-b border-[#E5E3DD]">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
            <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#6B6862]">
              MATERIAL PROVENANCE & BIM 4.0
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#141413]">
            Technical Specifications & Material Tactility
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Tactile Materials */}
          <div className="bg-[#F5F4F0] border border-[#E5E3DD] p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#A67C52] uppercase block mb-3">
                01 / Tactile Palette
              </span>
              <h3 className="text-xl font-serif text-[#141413] mb-4">
                Raw Elemental Substances
              </h3>
              <p className="text-xs text-[#6B6862] leading-relaxed mb-6 font-light">
                Every surface is selected for natural patination, self-healing qualities, and zero-VOC health compliance.
              </p>
              <ul className="space-y-3 font-mono text-xs">
                {project.materials.map((mat) => (
                  <li
                    key={mat}
                    className="flex items-center justify-between p-3 bg-white/70 border border-[#E5E3DD] rounded-lg text-[#141413]"
                  >
                    <span>{mat}</span>
                    <span className="text-[10px] text-[#A67C52]">AUTHENTIC</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Environmental Engineering */}
          <div className="bg-[#F5F4F0] border border-[#E5E3DD] p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#A67C52] uppercase block mb-3">
                02 / Environmental Envelope
              </span>
              <h3 className="text-xl font-serif text-[#141413] mb-4">
                Thermodynamic Performance
              </h3>
              <p className="text-xs text-[#6B6862] leading-relaxed mb-6 font-light">
                Continuous digital sensor telemetry ensures optimum seasonal equilibrium between thermal insulation and interior daylight.
              </p>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-white/70 border border-[#E5E3DD] rounded-lg flex justify-between items-center">
                  <span className="text-[#6B6862]">Operational Energy Cut:</span>
                  <span className="text-[#141413] font-semibold">{project.stats.energyReduction}</span>
                </div>
                <div className="p-3 bg-white/70 border border-[#E5E3DD] rounded-lg flex justify-between items-center">
                  <span className="text-[#6B6862]">Daylighting Spatial Autonomy:</span>
                  <span className="text-[#141413] font-semibold">{project.stats.daylighting}</span>
                </div>
                <div className="p-3 bg-white/70 border border-[#E5E3DD] rounded-lg flex justify-between items-center">
                  <span className="text-[#6B6862]">Embodied Carbon Sequestration:</span>
                  <span className="text-[#A67C52] font-semibold">{project.stats.embodiedCarbon || '-40%'}</span>
                </div>
                <div className="p-3 bg-white/70 border border-[#E5E3DD] rounded-lg flex justify-between items-center">
                  <span className="text-[#6B6862]">Structural Efficiency Metric:</span>
                  <span className="text-[#141413] font-semibold">{project.stats.structuralEfficiency || '+28%'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: BIM 4.0 Direct-to-Fabrication */}
          <div className="bg-[#F5F4F0] border border-[#E5E3DD] p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#A67C52] uppercase block mb-3">
                03 / Computational Exactitude
              </span>
              <h3 className="text-xl font-serif text-[#141413] mb-4">
                BIM 4.0 Digital Twin
              </h3>
              <p className="text-xs text-[#6B6862] leading-relaxed mb-6 font-light">
                Pre-fabrication clash detection and robotic CNC milling achieve sub-millimeter tolerances across all structural junctions.
              </p>
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 bg-white/70 border border-[#E5E3DD] rounded-lg flex justify-between items-center">
                  <span className="text-[#6B6862]">BIM Coordinate Precision:</span>
                  <span className="text-[#A67C52] font-semibold">{project.stats.bimPrecision}</span>
                </div>
                <div className="p-3 bg-white/70 border border-[#E5E3DD] rounded-lg flex justify-between items-center">
                  <span className="text-[#6B6862]">Standard Compliance:</span>
                  <span className="text-[#141413] font-semibold">ISO 19650 Level 3</span>
                </div>
                <div className="p-3 bg-white/70 border border-[#E5E3DD] rounded-lg flex justify-between items-center">
                  <span className="text-[#6B6862]">Structural Analysis:</span>
                  <span className="text-[#141413] font-semibold">400 FEA Load Cases</span>
                </div>
                <div className="p-3 bg-white/70 border border-[#E5E3DD] rounded-lg flex justify-between items-center">
                  <span className="text-[#6B6862]">Tolerance Envelope:</span>
                  <span className="text-[#141413] font-semibold">± 1.2 mm on site</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Editorial Photo Gallery (Masonry / Staggered Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 border-b border-[#E5E3DD]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#6B6862]">
                EDITORIAL MONOGRAPH PHOTOGRAPHY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#141413]">
              Photographic Monograph
            </h2>
          </div>
          <div className="text-xs font-mono text-[#6B6862]">
            ARCHITECTURAL DOCUMENTATION • 4 PERSPECTIVES
          </div>
        </div>

        {/* 4 Staggered High-Resolution Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {project.galleryImages.map((imgUrl, idx) => (
            <div
              key={idx}
              className={`group relative overflow-hidden rounded-2xl bg-stone-900 border border-[#E5E3DD] ${
                idx === 0
                  ? 'aspect-[4/5]'
                  : idx === 1
                  ? 'aspect-[16/11] md:mt-12'
                  : idx === 2
                  ? 'aspect-[16/11]'
                  : 'aspect-[4/5] md:-mt-12'
              }`}
            >
              <Image
                src={imgUrl}
                alt={`${project.title} photographic frame 0${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end">
                <span>PLATE 0{idx + 1} • {project.title}</span>
                <span className="text-[#C5A880]">35mm Architectural Prime</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. "Next Project" Teaser Link */}
      <section className="relative bg-[#111111] text-white py-20 sm:py-28 overflow-hidden">
        {/* Subtle background image peek of the next project */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <Image
            src={nextProject.heroImage}
            alt={nextProject.title}
            fill
            sizes="100vw"
            className="object-cover scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#111111]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                <span className="text-[10px] font-mono tracking-[0.28em] text-[#C5A880] uppercase">
                  SUBSEQUENT PRAXIS CASE STUDY
                </span>
              </div>
              <span className="text-xs font-mono text-stone-400 uppercase">
                {nextProject.categoryLabel} • {nextProject.year}
              </span>
              <h3 className="text-3xl sm:text-5xl font-serif font-light text-white mt-1 max-w-xl leading-tight">
                {nextProject.title}
              </h3>
              <p className="text-sm text-stone-400 font-light mt-2 max-w-lg line-clamp-2">
                {nextProject.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={`/projects/${nextProject.slug}`}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#C5A880] to-[#dfc49e] hover:from-[#dfc49e] hover:to-[#edd6b3] text-[#111111] font-mono text-xs font-bold tracking-widest uppercase rounded-xl transition-all shadow-xl hover:scale-105"
              >
                <span>EXPLORE CASE STUDY</span>
                <ArrowRight className="w-4 h-4 text-[#111111]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  LayoutGrid,
  List,
  ArrowUpRight,
  X,
  Compass,
  Layers,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import {
  PROJECTS,
  CATEGORY_TABS,
  Project,
  ProjectCategory,
} from '@/data/projects';
import ArchitecturalHatch from '@/components/ArchitecturalHatch';

function ProjectsArchiveContent() {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get('category') as ProjectCategory) || 'all';

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(
    CATEGORY_TABS.some((c) => c.key === initialCategory) ? initialCategory : 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [quickViewProject, setQuickViewProject] = useState<Project | null>(null);

  // Filter projects by category and search terms
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const matchesCategory =
        selectedCategory === 'all' || proj.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const inTitle = proj.title.toLowerCase().includes(q);
      const inSubtitle = proj.subtitle.toLowerCase().includes(q);
      const inLocation = proj.location.toLowerCase().includes(q);
      const inClient = proj.client.toLowerCase().includes(q);
      const inMaterials = proj.materials.some((m) => m.toLowerCase().includes(q));
      const inLead = proj.leadArchitect?.toLowerCase().includes(q);

      return inTitle || inSubtitle || inLocation || inClient || inMaterials || inLead;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#141413] pt-28 sm:pt-36 pb-24">
      {/* Page Hero & Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#E5E3DD]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#6B6862]">
                ARCHITECTURAL PRAXIS ARCHIVE • 2023–2026
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#141413] font-serif leading-[1.08]">
              Monuments of Thought & Matter
            </h1>
            <p className="text-base sm:text-lg text-[#6B6862] font-light mt-4 leading-relaxed max-w-2xl">
              An index of ten completed and commissioned civic, academic, and scientific infrastructures. Each structure negotiates site thermodynamics, mass-timber kinetics, and monumental stone assemblies.
            </p>
          </div>

          {/* Key Metrics Counter Badge */}
          <div className="flex items-center gap-6 lg:border-l lg:border-[#E5E3DD] lg:pl-8">
            <div>
              <div className="text-3xl sm:text-4xl font-light font-mono text-[#141413]">
                {filteredProjects.length}
                <span className="text-sm font-sans text-[#6B6862] ml-1">/ {PROJECTS.length}</span>
              </div>
              <div className="text-[10px] font-mono tracking-[0.2em] text-[#6B6862] uppercase mt-1">
                Active Commissions
              </div>
            </div>
            <div className="h-10 w-[1px] bg-[#E5E3DD]" />
            <div>
              <div className="text-3xl sm:text-4xl font-light font-mono text-[#A67C52]">
                99.7%
              </div>
              <div className="text-[10px] font-mono tracking-[0.2em] text-[#6B6862] uppercase mt-1">
                BIM 4.0 Exactitude
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Stats Bar */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="relative bg-[#F5F4F0] border border-[#E5E3DD] p-5 sm:p-6 overflow-hidden group hover:border-[#C5A880]/50 transition-colors">
            <ArchitecturalHatch
              pattern="diagonal"
              density="dense"
              patternOpacity={0.12}
              className="absolute inset-0"
            />
            <div className="relative z-10">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#6B6862] uppercase block">
                Total GFA Delivered
              </span>
              <div className="text-2xl sm:text-3xl font-light font-mono text-[#141413] mt-1.5">
                560,550 <span className="text-xs font-sans text-[#A67C52]">sqm</span>
              </div>
              <span className="text-[11px] text-[#6B6862] block mt-1">
                Across 8 global jurisdictions
              </span>
            </div>
          </div>

          <div className="relative bg-[#F5F4F0] border border-[#E5E3DD] p-5 sm:p-6 overflow-hidden group hover:border-[#C5A880]/50 transition-colors">
            <ArchitecturalHatch
              pattern="vertical"
              density="dense"
              patternOpacity={0.12}
              className="absolute inset-0"
            />
            <div className="relative z-10">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#6B6862] uppercase block">
                Carbon Offset Mean
              </span>
              <div className="text-2xl sm:text-3xl font-light font-mono text-[#141413] mt-1.5">
                -42.3%
              </div>
              <span className="text-[11px] text-[#6B6862] block mt-1">
                Lifecycle embodied carbon
              </span>
            </div>
          </div>

          <div className="relative bg-[#F5F4F0] border border-[#E5E3DD] p-5 sm:p-6 overflow-hidden group hover:border-[#C5A880]/50 transition-colors">
            <ArchitecturalHatch
              pattern="crosshatch"
              density="dense"
              patternOpacity={0.08}
              className="absolute inset-0"
            />
            <div className="relative z-10">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#6B6862] uppercase block">
                Daylight Autonomy
              </span>
              <div className="text-2xl sm:text-3xl font-light font-mono text-[#141413] mt-1.5">
                92.8%
              </div>
              <span className="text-[11px] text-[#6B6862] block mt-1">
                Mean sDA 300/50% threshold
              </span>
            </div>
          </div>

          <div className="relative bg-[#F5F4F0] border border-[#E5E3DD] p-5 sm:p-6 overflow-hidden group hover:border-[#C5A880]/50 transition-colors">
            <ArchitecturalHatch
              pattern="diagonal"
              density="loose"
              patternOpacity={0.12}
              className="absolute inset-0"
            />
            <div className="relative z-10">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#6B6862] uppercase block">
                International Honors
              </span>
              <div className="text-2xl sm:text-3xl font-light font-mono text-[#141413] mt-1.5">
                18 <span className="text-xs font-sans text-[#A67C52]">Medals</span>
              </div>
              <span className="text-[11px] text-[#6B6862] block mt-1">
                AIA, RIBA, Mies & Holcim Gold
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Filter Bar & Control Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sticky top-[72px] sm:top-[80px] z-30 bg-[#FAFAF8]/95 backdrop-blur-md py-4 border-y border-[#E5E3DD]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
            {CATEGORY_TABS.map((tab) => {
              const isActive = selectedCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#111111] text-white shadow-sm'
                      : 'bg-[#F5F4F0] text-[#6B6862] hover:text-[#141413] hover:bg-[#EAE8E2]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-[#C5A880] text-[#111111]' : 'text-[#8C8983]'
                    }`}
                  >
                    {tab.key === 'all'
                      ? PROJECTS.length
                      : PROJECTS.filter((p) => p.category === tab.key).length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input & View Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64 md:w-72">
              <Search className="w-3.5 h-3.5 text-[#8C8983] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, materials, cities..."
                className="w-full bg-[#F5F4F0] border border-[#E5E3DD] focus:border-[#C5A880] text-xs font-mono tracking-wide text-[#141413] placeholder:text-[#8C8983] rounded-lg pl-8 pr-8 py-2 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8C8983] hover:text-[#141413]"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Grid vs List View Toggle */}
            <div className="flex items-center bg-[#F5F4F0] border border-[#E5E3DD] p-0.5 rounded-lg shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#141413] shadow-xs'
                    : 'text-[#8C8983] hover:text-[#141413]'
                }`}
                title="Grid View"
                aria-label="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-[#141413] shadow-xs'
                    : 'text-[#8C8983] hover:text-[#141413]'
                }`}
                title="Technical Data Sheet List View"
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Project Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-24 bg-[#F5F4F0] border border-[#E5E3DD] rounded-2xl p-8">
            <Compass className="w-12 h-12 mx-auto text-[#8C8983] mb-4 stroke-1 animate-pulse" />
            <h3 className="text-xl font-serif text-[#141413] mb-2">No Commissions Found</h3>
            <p className="text-sm text-[#6B6862] max-w-md mx-auto mb-6">
              No architectural project matches your current filter criteria &quot;{searchQuery}&quot;. Clear search to inspect all portfolio records.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-[#111111] text-white text-xs font-mono tracking-widest uppercase rounded-lg hover:bg-[#A67C52] transition-colors"
            >
              Reset Archive Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.id}
                className="group relative bg-[#F5F4F0] border border-[#E5E3DD] hover:border-[#C5A880]/70 rounded-2xl overflow-hidden transition-all duration-400 hover:shadow-2xl flex flex-col justify-between"
              >
                {/* Visual Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Tags Bar */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono tracking-[0.2em] text-white uppercase">
                      {project.categoryLabel}
                    </span>
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-mono font-semibold text-[#111111]">
                      {project.year}
                    </span>
                  </div>

                  {/* Bottom Quick Metric Pills on Image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-stone-300 font-light">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{project.location}</span>
                      </div>
                      <div className="text-xs font-mono text-[#C5A880] mt-0.5">
                        GFA: {project.area}
                      </div>
                    </div>

                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 border border-white/20 rounded bg-black/40 text-stone-300">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#A67C52] uppercase mb-1.5">
                      <span>PROJECT 0{idx + 1}</span>
                      <span>•</span>
                      <span>{project.client}</span>
                    </div>

                    <h2 className="text-2xl font-light font-serif tracking-tight text-[#141413] group-hover:text-[#A67C52] transition-colors leading-snug">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-[#6B6862] font-light mt-2 line-clamp-2 leading-relaxed">
                      {project.subtitle}
                    </p>

                    {/* Materials preview tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.materials.slice(0, 3).map((mat) => (
                        <span
                          key={mat}
                          className="text-[10px] font-mono px-2.5 py-1 bg-[#EFECE6] border border-[#E5E3DD] rounded-md text-[#6B6862]"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions: Quick View Drawer + Direct Case Study Link */}
                  <div className="pt-6 mt-6 border-t border-[#E5E3DD] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setQuickViewProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-[#6B6862] hover:text-[#141413] transition-colors py-1 px-2 -ml-2 rounded"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#A67C52]" />
                      <span>Quick View Specs</span>
                    </button>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.18em] uppercase font-semibold text-[#141413] hover:text-[#A67C52] transition-colors group/link"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-4 h-4 text-[#A67C52] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* LIST VIEW / TECHNICAL ARCHITECTURAL LEDGER */
          <div className="bg-[#F5F4F0] border border-[#E5E3DD] rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-sans text-xs">
                <thead>
                  <tr className="border-b border-[#E5E3DD] bg-[#ECE9E2] text-[#6B6862] font-mono text-[10px] tracking-[0.2em] uppercase">
                    <th className="py-4 px-4 font-normal">REF / TITLE</th>
                    <th className="py-4 px-4 font-normal">SECTOR</th>
                    <th className="py-4 px-4 font-normal">LOCATION</th>
                    <th className="py-4 px-4 font-normal">AREA (GFA)</th>
                    <th className="py-4 px-4 font-normal">YEAR</th>
                    <th className="py-4 px-4 font-normal">BIM TOLERANCE</th>
                    <th className="py-4 px-4 font-normal">STATUS</th>
                    <th className="py-4 px-4 font-normal text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E3DD]">
                  {filteredProjects.map((proj, idx) => (
                    <tr
                      key={proj.id}
                      className="hover:bg-[#EAE7E0] transition-colors group"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#E5E3DD]">
                            <Image
                              src={proj.heroImage}
                              alt={proj.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-[10px] font-mono text-[#A67C52]">
                              ARC-0{idx + 1}
                            </div>
                            <Link
                              href={`/projects/${proj.slug}`}
                              className="font-medium text-sm text-[#141413] hover:text-[#A67C52] transition-colors"
                            >
                              {proj.title}
                            </Link>
                            <div className="text-[11px] text-[#6B6862] truncate max-w-xs">
                              {proj.client}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono text-[11px] text-[#6B6862]">
                        {proj.categoryLabel}
                      </td>

                      <td className="py-4 px-4 text-[#6B6862]">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-[#C5A880] shrink-0" />
                          <span className="truncate max-w-[150px]">{proj.location}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono text-[#141413]">
                        {proj.area}
                      </td>

                      <td className="py-4 px-4 font-mono text-[#6B6862]">
                        {proj.year}
                      </td>

                      <td className="py-4 px-4 font-mono text-[#A67C52]">
                        {proj.stats.bimPrecision}
                      </td>

                      <td className="py-4 px-4">
                        <span className="inline-block px-2.5 py-1 text-[10px] font-mono uppercase rounded-full bg-[#E5E3DD] text-[#141413]">
                          {proj.status}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQuickViewProject(proj)}
                            className="p-1.5 text-[#6B6862] hover:text-[#141413] rounded transition-colors"
                            title="Quick View"
                          >
                            <Layers className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/projects/${proj.slug}`}
                            className="p-1.5 text-[#141413] hover:text-[#A67C52] transition-colors"
                            title="Case Study Dossier"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Interactive Quick-View Drawer */}
      {quickViewProject && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => setQuickViewProject(null)}
          />

          {/* Drawer Sheet */}
          <div className="relative z-10 w-full max-w-xl bg-[#111111] text-[#FAFAF8] h-full overflow-y-auto border-l border-stone-800 shadow-2xl p-6 sm:p-8 flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase">
                    ARCHITECTURAL DOSSIER QUICK-VIEW
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setQuickViewProject(null)}
                  className="p-2 text-stone-400 hover:text-white rounded-full transition-colors"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* High-res Image Preview */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mt-6 border border-stone-800">
                <Image
                  src={quickViewProject.heroImage}
                  alt={quickViewProject.title}
                  fill
                  sizes="600px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-mono text-[#C5A880]">
                  {quickViewProject.area} • {quickViewProject.location}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mt-6">
                <div className="text-xs font-mono tracking-widest text-stone-400 uppercase">
                  {quickViewProject.categoryLabel} • {quickViewProject.year}
                </div>
                <h3 className="text-2xl sm:text-3xl font-light font-serif text-white mt-1">
                  {quickViewProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 font-light mt-2 leading-relaxed">
                  {quickViewProject.subtitle}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 mt-6 p-4 bg-stone-900/80 border border-stone-800 rounded-xl font-mono text-xs">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block">Client</span>
                  <span className="text-stone-200 mt-0.5 block">{quickViewProject.client}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block">Structural Engineers</span>
                  <span className="text-stone-200 mt-0.5 block truncate">
                    {quickViewProject.structuralEngineers}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block">Lead Architect</span>
                  <span className="text-stone-200 mt-0.5 block">
                    {quickViewProject.leadArchitect || 'ARCHIØN Core Partner'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block">BIM Exactitude</span>
                  <span className="text-[#C5A880] font-semibold mt-0.5 block">
                    {quickViewProject.stats.bimPrecision}
                  </span>
                </div>
              </div>

              {/* Environmental Metrics */}
              <div className="mt-6">
                <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase block mb-2">
                  Performance Metrics
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-stone-900 border border-stone-800 p-2.5 rounded-lg">
                    <span className="text-[10px] font-mono text-stone-500 block">ENERGY CUT</span>
                    <span className="text-base font-mono text-white font-light">
                      {quickViewProject.stats.energyReduction}
                    </span>
                  </div>
                  <div className="bg-stone-900 border border-stone-800 p-2.5 rounded-lg">
                    <span className="text-[10px] font-mono text-stone-500 block">DAYLIGHT</span>
                    <span className="text-base font-mono text-white font-light">
                      {quickViewProject.stats.daylighting}
                    </span>
                  </div>
                  <div className="bg-stone-900 border border-stone-800 p-2.5 rounded-lg">
                    <span className="text-[10px] font-mono text-stone-500 block">CARBON</span>
                    <span className="text-base font-mono text-[#C5A880] font-light">
                      {quickViewProject.stats.embodiedCarbon || '-35%'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Materials Tactile List */}
              <div className="mt-6">
                <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase block mb-2">
                  Tactile Material Palette
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProject.materials.map((m) => (
                    <span
                      key={m}
                      className="text-xs font-mono px-3 py-1 bg-stone-900 border border-stone-800 rounded-md text-stone-300"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Excerpt of Architectural Narrative */}
              <div className="mt-6 p-4 border-l-2 border-[#C5A880] bg-stone-900/40 text-xs text-stone-400 italic leading-relaxed">
                &ldquo;{quickViewProject.architecturalNarrative}&rdquo;
              </div>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-6 mt-8 border-t border-stone-800 flex items-center gap-3">
              <Link
                href={`/projects/${quickViewProject.slug}`}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#C5A880] hover:bg-[#d5ba94] text-[#111111] font-mono text-xs font-semibold tracking-widest uppercase rounded-xl transition-colors"
                onClick={() => setQuickViewProject(null)}
              >
                <span>OPEN FULL CASE STUDY</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsArchivePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
          <div className="text-xs font-mono tracking-widest text-[#6B6862] uppercase animate-pulse">
            Loading Architectural Archive...
          </div>
        </div>
      }
    >
      <ProjectsArchiveContent />
    </Suspense>
  );
}

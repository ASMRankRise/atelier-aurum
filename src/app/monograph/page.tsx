'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  BookOpen,
  Download,
  Clock,
  X,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Quote,
  Loader2,
} from 'lucide-react';
import {
  MONOGRAPH_ARTICLES,
  CLIENT_TESTIMONIALS,
  INSTITUTIONAL_PARTNERS,
  MonographArticle,
} from '@/data/monographs';
import ArchitecturalHatch from '@/components/ArchitecturalHatch';

interface ResearchPaper {
  id: string;
  title: string;
  subtitle: string;
  authors: string;
  fileSize: string;
  isoCode: string;
  date: string;
  category: string;
  abstract: string;
}

const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: 'paper-bim-4',
    title: 'BIM 4.0: Algorithmic Stress Tensor Optimization in Parametric Envelopes',
    subtitle: 'Direct-to-fabrication digital twins for eliminating 28.4% structural redundancy in post-tensioned cores.',
    authors: 'Dr. Lukas von Berg, BDA & Henrik Sörensen, FAIA',
    fileSize: '14.2 MB',
    isoCode: 'ISO/TR 19650-ARCH-2026',
    date: 'January 2026',
    category: 'Computational BIM',
    abstract: 'Traditional structural safety margins compound exponentially across design disciplines. By integrating 400 finite-element load cases directly into architectural parametric coordinates, non-critical material is strategically voided.',
  },
  {
    id: 'paper-bronze-louvers',
    title: 'Thermal Dynamics of Bronze Louvers in High-Latitude Microclimates',
    subtitle: 'Solar azimuth geometry, atmospheric sulfur passivation, and 41% HVAC chiller peak reductions.',
    authors: 'Henrik Sörensen, FAIA & ETH Façade Group',
    fileSize: '8.6 MB',
    isoCode: 'ISO 52000-THERM-849',
    date: 'November 2025',
    category: 'Façade Physics',
    abstract: 'A comprehensive thermodynamic treatise demonstrating how varying the rotational pitch of architectural bronze baffles from 14° to 42° deflects destructive summer radiation while welcoming winter warmth.',
  },
  {
    id: 'paper-monolithic-stone',
    title: 'Monolithic Stone: Pozzolanic Concrete & Low-Carbon Alpine Geologies',
    subtitle: 'Comparative lifecycle carbon sequestration of Valser quartzite vs. Portland cement envelopes.',
    authors: 'Astrid Lindholm, ETH SIA',
    fileSize: '19.4 MB',
    isoCode: 'CEN/TC 350-MAT-104',
    date: 'August 2025',
    category: 'Material Science',
    abstract: 'Empirical data on quarried Valser quartzite retaining walls acting as natural diurnal thermal batteries in high alpine environments, reducing active heating requirements by 68%.',
  },
  {
    id: 'paper-acoustic-cantilevers',
    title: 'Acoustic Fluidity in Long-Span Cantilevers & Public Auditoriums',
    subtitle: 'Geometric sound diffusion through non-uniform parabolic vaults and micro-perforated Akoya pine.',
    authors: 'Marcus Vance, FAIA & MIT Media Lab',
    fileSize: '11.8 MB',
    isoCode: 'ISO 3382-ACOUSTIC-72',
    date: 'May 2025',
    category: 'Acoustic Engineering',
    abstract: 'Calibration metrics for public chambers accommodating over 1,400 listeners with zero electronic loudspeaker amplification, using natural geometric reflection geometry.',
  },
];

const CATEGORIES = [
  'All',
  'Façade Physics',
  'Urban Theory',
  'Computational BIM',
  'Acoustic Engineering',
];

export default function MonographPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeEssay, setActiveEssay] = useState<MonographArticle | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedSet, setDownloadedSet] = useState<Set<string>>(new Set());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredArticles = MONOGRAPH_ARTICLES.filter((article) => {
    if (selectedCategory === 'All') return true;
    return article.category === selectedCategory;
  });

  const featuredArticle = MONOGRAPH_ARTICLES.find((a) => a.featured) || MONOGRAPH_ARTICLES[0];

  const handleSimulatedDownload = (paper: ResearchPaper) => {
    setDownloadingId(paper.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedSet((prev) => new Set(prev).add(paper.id));
      setToastMessage(`Whitepaper Dossier ${paper.isoCode} successfully retrieved (${paper.fileSize}).`);
      setTimeout(() => setToastMessage(null), 4000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#141413] pt-28 sm:pt-36 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111111] border border-[#C5A880]/60 px-5 py-3.5 rounded-xl shadow-2xl text-xs font-mono text-white animate-in fade-in slide-in-from-bottom-3 duration-300">
          <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Page Header & Introduction */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#6B6862]">
            ARCHIØN MONOGRAPH & PRAXIS RESEARCH GROUP
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#E5E3DD]">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-serif font-light text-[#141413] tracking-tight leading-[1.08]">
              The Tectonic Journal & Research Papers
            </h1>
            <p className="text-base sm:text-lg text-[#6B6862] font-light mt-4 leading-relaxed max-w-2xl">
              Rigorous architectural investigations at the nexus of building thermodynamics, structural generative algorithms, and the phenomenology of unpolished materials.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#6B6862]">
            <div className="p-4 bg-[#F5F4F0] border border-[#E5E3DD] rounded-xl text-center">
              <span className="text-2xl font-mono text-[#141413] font-light block">04</span>
              <span className="text-[10px] uppercase text-[#6B6862]">Whitepapers</span>
            </div>
            <div className="p-4 bg-[#F5F4F0] border border-[#E5E3DD] rounded-xl text-center">
              <span className="text-2xl font-mono text-[#A67C52] font-light block">ISO</span>
              <span className="text-[10px] uppercase text-[#6B6862]">Peer-Reviewed</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Essay Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="bg-[#111111] text-[#FAFAF8] rounded-3xl overflow-hidden border border-stone-800 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column: Image */}
            <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[440px] bg-stone-900">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-[#111111] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent lg:hidden" />

              <div className="absolute top-6 left-6">
                <span className="px-3 py-1 bg-[#C5A880] text-[#111111] text-[10px] font-mono tracking-widest font-semibold uppercase rounded-full">
                  FEATURED MONOGRAPH
                </span>
              </div>
            </div>

            {/* Right Column: Article Abstract & Reading Modal Action */}
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-stone-400 mb-3">
                  <span>{featuredArticle.category}</span>
                  <span>•</span>
                  <span>{featuredArticle.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#C5A880]">
                    <Clock className="w-3.5 h-3.5" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-serif font-light text-white leading-tight">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm text-stone-300 font-light mt-3 leading-relaxed">
                  {featuredArticle.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-stone-400 font-light mt-4 line-clamp-3 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-6 mt-6 border-t border-stone-800 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-stone-500 uppercase text-[10px] block">AUTHOR</span>
                    <span className="text-white mt-0.5 block">{featuredArticle.author.name}</span>
                    <span className="text-stone-400 text-[10px]">{featuredArticle.author.role}</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 mt-6">
                <button
                  type="button"
                  onClick={() => setActiveEssay(featuredArticle)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C5A880] hover:bg-[#dfc49e] text-[#111111] font-mono text-xs font-bold tracking-widest uppercase rounded-xl transition-all shadow-lg hover:scale-[1.02]"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>READ FULL TREATISE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Thought Leadership Essays Archive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E5E3DD]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#6B6862]">
                CURATED DISPATCHES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#141413]">
              Architectural Inquiries & Theory
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#111111] text-white'
                    : 'bg-[#F5F4F0] text-[#6B6862] hover:text-[#141413]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-[#F5F4F0] border border-[#E5E3DD] hover:border-[#C5A880]/70 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group"
            >
              <div>
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-stone-900 border border-[#E5E3DD]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] font-mono tracking-wider text-white uppercase">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-[#6B6862] mb-2">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-light text-[#141413] group-hover:text-[#A67C52] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#6B6862] font-light mt-2 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {article.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2.5 py-0.5 bg-[#EAE7E0] rounded text-[#6B6862]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5E3DD] flex items-center justify-between">
                <div className="text-xs font-mono text-[#6B6862]">
                  By <span className="text-[#141413] font-medium">{article.author.name}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveEssay(article)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider font-semibold text-[#141413] hover:text-[#A67C52] transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Research Papers & Whitepapers Download Simulation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div className="bg-[#111111] text-[#FAFAF8] rounded-3xl p-8 sm:p-14 border border-stone-800 shadow-2xl relative overflow-hidden">
          <ArchitecturalHatch
            pattern="diagonal"
            density="dense"
            patternOpacity={0.06}
            strokeColor="#C5A880"
            className="absolute inset-0 pointer-events-none"
          />

          <div className="relative z-10 max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              <span className="text-[10px] font-mono tracking-[0.28em] text-[#C5A880] uppercase">
                PEER-REVIEWED SCIENTIFIC RESEARCH PAPERS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-white">
              Whitepapers & Technical Dossiers
            </h2>
            <p className="text-sm sm:text-base text-stone-400 font-light mt-3 leading-relaxed">
              Download our open-access engineering publications covering BIM 4.0 topology optimization, solar louver thermal kinetics, and alpine stone pozzolanic behavior.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESEARCH_PAPERS.map((paper) => {
              const isDownloaded = downloadedSet.has(paper.id);
              const isDownloading = downloadingId === paper.id;

              return (
                <div
                  key={paper.id}
                  className="bg-stone-900/80 border border-stone-800 hover:border-[#C5A880]/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 pb-3 border-b border-stone-800">
                      <span className="text-[#C5A880] font-semibold">{paper.isoCode}</span>
                      <span>{paper.date}</span>
                    </div>

                    <h3 className="text-xl font-serif font-light text-white mt-4 leading-snug">
                      {paper.title}
                    </h3>

                    <p className="text-xs text-stone-400 mt-2 font-light leading-relaxed">
                      {paper.abstract}
                    </p>

                    <div className="mt-4 text-xs font-mono text-stone-400">
                      <span className="text-stone-300">Investigators: </span>
                      <span>{paper.authors}</span>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-stone-800 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-stone-400">
                      FORMAT: PDF • {paper.fileSize}
                    </span>

                    <button
                      type="button"
                      disabled={isDownloading}
                      onClick={() => handleSimulatedDownload(paper)}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono tracking-wider transition-all ${
                        isDownloaded
                          ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
                          : 'bg-[#C5A880] hover:bg-[#dfc49e] text-[#111111] font-semibold'
                      }`}
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Streaming...</span>
                        </>
                      ) : isDownloaded ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Downloaded</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Whitepaper</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Institutional Partners & Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 sm:mb-32">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
            <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#6B6862]">
              GLOBAL ACCREDITATION & VOICES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#141413]">
            Institutional Partners & Endorsements
          </h2>
          <p className="text-sm text-[#6B6862] font-light mt-1">
            Perspectives from university trustees, pharmaceutical infrastructure executives, and municipal planners.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {CLIENT_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#F5F4F0] border border-[#E5E3DD] p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-[#C5A880] mb-4 opacity-80" />
                <p className="text-sm sm:text-base font-serif font-light text-[#141413] leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5E3DD] flex items-center justify-between text-xs font-mono">
                <div>
                  <div className="text-sm font-serif text-[#141413] font-medium">{t.author}</div>
                  <div className="text-[11px] text-[#6B6862]">{t.role} • {t.organization}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5">Project: {t.projectRef}</div>
                </div>

                <span className="text-[10px] font-mono uppercase px-2.5 py-1 bg-[#EAE7E0] text-[#A67C52] rounded-md shrink-0">
                  {t.highlightMetric}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Partners Badges */}
        <div className="pt-8 border-t border-[#E5E3DD]">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#6B6862] uppercase block mb-6 text-center">
            RESEARCH COLLABORATORS & INSTITUTIONAL PARTNERS
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center font-mono text-xs">
            {INSTITUTIONAL_PARTNERS.map((partner) => (
              <div
                key={partner.id}
                className="p-4 bg-[#F5F4F0] border border-[#E5E3DD] rounded-xl hover:border-[#C5A880]/50 transition-colors flex flex-col items-center justify-center"
              >
                <span className="font-semibold tracking-wider text-[#141413]">{partner.name}</span>
                <span className="text-[10px] text-[#6B6862] mt-0.5">{partner.location}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Full Reading View Modal */}
      {activeEssay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
            onClick={() => setActiveEssay(null)}
          />

          {/* Reading Dialog Card */}
          <div className="relative w-full max-w-3xl bg-[#FAFAF8] text-[#141413] rounded-2xl shadow-2xl border border-[#E5E3DD] overflow-hidden my-auto z-10 max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#E5E3DD] flex items-center justify-between bg-[#F5F4F0] shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-[#C5A880] text-[#111111] text-[10px] font-mono font-semibold uppercase rounded">
                  {activeEssay.category}
                </span>
                <span className="text-xs font-mono text-[#6B6862]">{activeEssay.readTime}</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveEssay(null)}
                className="p-2 text-[#6B6862] hover:text-[#141413] rounded-full transition-colors"
                aria-label="Close reading view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Treatise Content */}
            <div className="p-8 sm:p-12 overflow-y-auto font-sans leading-relaxed space-y-6">
              <div>
                <span className="text-xs font-mono text-[#A67C52] uppercase block mb-1">
                  PUBLISHED {activeEssay.date}
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#141413]">
                  {activeEssay.title}
                </h2>
                <div className="text-sm font-mono text-[#6B6862] mt-2">
                  By {activeEssay.author.name} — {activeEssay.author.role}
                </div>
              </div>

              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#E5E3DD] my-6">
                <Image
                  src={activeEssay.image}
                  alt={activeEssay.title}
                  fill
                  sizes="800px"
                  className="object-cover"
                />
              </div>

              <div className="text-base text-[#6B6862] font-light leading-relaxed whitespace-pre-line space-y-4">
                {activeEssay.content}
              </div>

              <div className="p-6 bg-[#F5F4F0] border-l-2 border-[#C5A880] rounded-r-xl text-xs font-mono text-[#6B6862] my-6">
                ARCHIØN Academic Monograph Accession ID: ARC-MONO-{activeEssay.slug.toUpperCase()} • All Rights Reserved.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E5E3DD] bg-[#F5F4F0] flex justify-between items-center text-xs font-mono shrink-0">
              <span className="text-[#6B6862]">ARCHIØN Monograph Reader</span>
              <button
                type="button"
                onClick={() => setActiveEssay(null)}
                className="px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-[#A67C52] transition-colors"
              >
                Close Treatise
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/animations';
import {
  Compass,
  Sliders,
  Box,
} from 'lucide-react';
import { openConsultationModal } from '@/components/ConsultationModal';

interface MaterialSwatch {
  id: string;
  name: string;
  subname: string;
  origin: string;
  image: string;
  colorTone: string;
  textureType: string;
  specs: {
    density: string;
    thermalConductivity: string;
    solarReflectance: string;
    acousticAbsorption: string;
    embodiedCarbon: string;
    weatheringProfile: string;
  };
  narrative: string;
  recommendedUse: string;
  testedCommissions: string[];
}

const MATERIALS: MaterialSwatch[] = [
  {
    id: 'roman-travertine',
    name: 'Roman Travertine',
    subname: 'Classico Navona Honed',
    origin: 'Tivoli, Lazio, Italy',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    colorTone: '#DCD4C4',
    textureType: 'Porous cellular limestone with open vacuous veining',
    specs: {
      density: '2,480 kg/m³',
      thermalConductivity: '1.85 W/m·K',
      solarReflectance: 'SRI 78 (High Heat Rejection)',
      acousticAbsorption: 'NRC 0.35 (Perforated Cavity)',
      embodiedCarbon: '0.08 kg CO₂e/kg (Quarry Sawn)',
      weatheringProfile: 'Gradual mineral calcite crystallization over 80+ years',
    },
    narrative:
      'Quarried from geothermal springs in Tivoli, this classical stone offers monumental thermal inertia. Its open microscopic air pockets naturally insulate building mass against desert solar radiation and continental temperature spikes.',
    recommendedUse: 'Exterior Curtainwall Shading Fins & Monumental Plinths',
    testedCommissions: ['Merck Discovery Centre, Darmstadt', 'Al-Faisaliah Center, Riyadh'],
  },
  {
    id: 'champagne-brass',
    name: 'Brushed Champagne Brass',
    subname: 'Custom CuZn37 Passivated Alloy',
    origin: 'Solothurn, Switzerland',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
    colorTone: '#C5A880',
    textureType: 'Directional 240-grit satin with organic passivated micro-wax',
    specs: {
      density: '8,440 kg/m³',
      thermalConductivity: '115 W/m·K',
      solarReflectance: 'SRI 64 (Diffuse Specular Buff)',
      acousticAbsorption: 'STC 48 (Multi-Skin Assembly)',
      embodiedCarbon: '1.45 kg CO₂e/kg (92% Recycled Feedstock)',
      weatheringProfile: 'Matures into a warm velvet antique bronze luster',
    },
    narrative:
      'Engineered specifically for ARCHIØN’s dynamic solar louvers, this custom copper-zinc alloy passivates spontaneously in urban atmosphere, creating a microscopic protective oxide film that never chips, chalks, or rusts.',
    recommendedUse: 'Dynamic Brise-Soleil, Louver Facades & Structural Cladding',
    testedCommissions: ['Summit University Campus, Toronto', 'Geneva Diplomatic Atrium'],
  },
  {
    id: 'fluted-cast-glass',
    name: 'Fluted Cast Glass',
    subname: 'Low-Iron Annealed Linear Reeded',
    origin: 'Düsseldorf, Germany',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    colorTone: '#E3E9E8',
    textureType: '12mm pitch scalloped prismatic flutes with optical diffusion',
    specs: {
      density: '2,500 kg/m³',
      thermalConductivity: '0.98 W/m·K (Ug 0.6 Triple Unit)',
      solarReflectance: 'SRI 84 (Ceramic Frit Substrate)',
      acousticAbsorption: 'STC 44 (Acoustic Interlayer)',
      embodiedCarbon: '0.85 kg CO₂e/kg (Electric Kiln Fired)',
      weatheringProfile: 'Impervious to acid precipitation and UV radiation',
    },
    narrative:
      'Fluted cast glass refracts direct harsh sunlight into soft ambient luminescence. By scattering specular sunbeams across vertical interior floorplates, it eliminates glare on computer screens while bathing occupants in natural light.',
    recommendedUse: 'Laboratory Double Envelopes & Acoustic Civic Partitions',
    testedCommissions: ['Aurum Life Science Hub, Boston', 'Kyoto Monolith Archive'],
  },
  {
    id: 'charred-yakisugi-cedar',
    name: 'Charred Yakisugi Cedar',
    subname: 'Sugi Cryptomeria Flame-Pyrolyzed',
    origin: 'Nagano Prefecture, Japan',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=85',
    colorTone: '#2A2927',
    textureType: 'Alligator-scale carbonized surface with matte soot matrix',
    specs: {
      density: '380 kg/m³ (Lightweight Cladding)',
      thermalConductivity: '0.11 W/m·K (Extreme Thermal Insulator)',
      solarReflectance: 'SRI 12 (Deep Ambient Solar Absorber)',
      acousticAbsorption: 'NRC 0.55 (Acoustic Diffuser)',
      embodiedCarbon: '-1.20 kg CO₂e/kg (Net Carbon Sequestering)',
      weatheringProfile: 'Fire-resistant carbon crust endures for 100+ years maintenance-free',
    },
    narrative:
      'An ancient Japanese thermal preservation craft: flame pyrolysis carbonizes the wood outer cells, neutralizing sugars to create total immunity against rot, pests, and fire. Every cubic meter locks away atmospheric carbon.',
    recommendedUse: 'Alpine Envelopes, Maritime Waterfronts & Exterior Rain-Screens',
    testedCommissions: ['Oslo Marine Research Institute', 'Engadin Alpine Sanctuary'],
  },
  {
    id: 'nero-marquina-marble',
    name: 'Nero Marquina Marble',
    subname: 'Deep Bituminous Basque Calcarenite',
    origin: 'Markina, Basque Country, Spain',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=85',
    colorTone: '#1A1A1A',
    textureType: 'Fine-grained black limestone with erratic calcite quartz lightning veins',
    specs: {
      density: '2,690 kg/m³',
      thermalConductivity: '2.80 W/m·K (High Geothermal Sink)',
      solarReflectance: 'SRI 18 (Low Glare Monolithic Basin)',
      acousticAbsorption: 'NRC 0.05 (Specular Acoustic Baffle)',
      embodiedCarbon: '0.12 kg CO₂e/kg (Diamond Wire Sawn)',
      weatheringProfile: 'Honed matte tactile sheen with perpetual calcite depth',
    },
    narrative:
      'Characterized by deep obsidian tonality struck with spontaneous brilliant white quartz veins, Nero Marquina provides tactile spatial gravitas for ceremonial atriums, water reflecting basins, and solemn civic vaults.',
    recommendedUse: 'Civic Assembly Floors, Water Features & Monolithic Portals',
    testedCommissions: ['Geneva International Assembly', 'The Monolith Archive, Kyoto'],
  },
];

export default function MaterialLaboratory() {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialSwatch>(MATERIALS[0]);
  const [activeTab, setActiveTab] = useState<'thermal' | 'carbon' | 'patina'>('thermal');
  const [lightReflectionAngle, setLightReflectionAngle] = useState(45);
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const labCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      }).from(
        labCardRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.6'
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-[#FAFAF8] text-[#141413] hairline-t hairline-b overflow-hidden"
    >
      {/* CAD Grid Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[radial-gradient(#141413_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div ref={titleRef} className="max-w-3xl mb-14 sm:mb-18">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
            <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#C5A880]">
              04 / ARCHITECTURAL MATERIAL LABORATORY
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-[#141413] leading-[1.1] font-sans">
            Tactile Materiality.{' '}
            <span className="font-serif italic font-normal text-[#141413]">
              Thermal Intelligence.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B6862] font-light leading-relaxed">
            Click any swatch to inspect surface texture, provenance, solar reflectance indices, and 100-year weathering behavior tested inside our materials laboratory.
          </p>
        </div>

        {/* Swatch Selector Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {MATERIALS.map((mat) => {
            const isSelected = selectedMaterial.id === mat.id;
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => setSelectedMaterial(mat)}
                className={`relative p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[130px] ${
                  isSelected
                    ? 'bg-[#141413] border-[#141413] text-white shadow-xl shadow-black/10 scale-[1.02]'
                    : 'bg-[#F5F4F0] border-[#E5E3DD] text-[#141413] hover:border-[#C5A880] hover:bg-white'
                }`}
                data-cursor-text="INSPECT"
              >
                {/* Color Dot & Origin */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: mat.colorTone }}
                  />
                  {isSelected && (
                    <span className="text-[10px] font-mono text-[#C5A880] tracking-wider uppercase font-semibold">
                      ACTIVE
                    </span>
                  )}
                </div>

                {/* Swatch Title */}
                <div className="mt-3">
                  <h4 className={`text-sm font-semibold tracking-tight ${isSelected ? 'text-white' : 'text-[#141413]'}`}>
                    {mat.name}
                  </h4>
                  <span className={`text-[11px] font-mono block mt-0.5 line-clamp-1 ${isSelected ? 'text-stone-400' : 'text-[#8C8983]'}`}>
                    {mat.subname}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Material Inspection Dashboard Card */}
        <div
          ref={labCardRef}
          className="bg-[#F5F4F0] border border-[#E5E3DD] rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Visual Material Preview & Interactive Light Angle Slider */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-[#E5E3DD] shadow-lg bg-stone-900 group">
                <Image
                  src={selectedMaterial.image}
                  alt={selectedMaterial.name}
                  fill
                  className="object-cover object-center filter brightness-[0.95] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dynamic Specular Light Reflectance Simulation Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(${lightReflectionAngle}deg, rgba(255,255,255,0.22) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)`,
                    opacity: 0.85,
                  }}
                />

                <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-white border border-white/10">
                  TEXTURE: {selectedMaterial.textureType.split(' ')[0]}
                </div>

                <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-[#C5A880] border border-white/10">
                  {selectedMaterial.origin}
                </div>
              </div>

              {/* Light Angle Reflection Slider */}
              <div className="bg-white p-4 rounded-xl border border-[#E5E3DD] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#6B6862]">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>SIMULATE SUN AZIMUTH REFLECTANCE</span>
                  </span>
                  <span className="font-semibold text-[#141413]">{lightReflectionAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={lightReflectionAngle}
                  onChange={(e) => setLightReflectionAngle(Number(e.target.value))}
                  className="w-full accent-[#C5A880] cursor-pointer h-1.5 bg-[#E5E3DD] rounded-lg"
                />
              </div>
            </div>

            {/* Right Column: In-Depth Specifications & Engineering Benchmarks */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-wider mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span>SPECIFICATION DOSSIER // {selectedMaterial.id.toUpperCase()}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-[#141413] tracking-tight">
                  {selectedMaterial.name}
                </h3>
                <p className="text-xs font-mono text-[#8C8983] mt-0.5">
                  Provenance: {selectedMaterial.origin}
                </p>

                <p className="text-sm sm:text-base text-[#6B6862] font-light mt-3 leading-relaxed">
                  {selectedMaterial.narrative}
                </p>
              </div>

              {/* Spec Tabs Switcher */}
              <div className="flex gap-2 border-b border-[#E5E3DD] pb-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab('thermal')}
                  className={`pb-1.5 tracking-wider uppercase transition-colors ${
                    activeTab === 'thermal'
                      ? 'text-[#141413] font-bold border-b-2 border-[#C5A880]'
                      : 'text-[#8C8983] hover:text-[#141413]'
                  }`}
                >
                  THERMAL & DENSITY
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('carbon')}
                  className={`pb-1.5 tracking-wider uppercase transition-colors ${
                    activeTab === 'carbon'
                      ? 'text-[#141413] font-bold border-b-2 border-[#C5A880]'
                      : 'text-[#8C8983] hover:text-[#141413]'
                  }`}
                >
                  CARBON & ACOUSTICS
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('patina')}
                  className={`pb-1.5 tracking-wider uppercase transition-colors ${
                    activeTab === 'patina'
                      ? 'text-[#141413] font-bold border-b-2 border-[#C5A880]'
                      : 'text-[#8C8983] hover:text-[#141413]'
                  }`}
                >
                  PATINA TIMELINE
                </button>
              </div>

              {/* Tab Contents */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                {activeTab === 'thermal' && (
                  <>
                    <div className="bg-white p-3.5 rounded-xl border border-[#E5E3DD]">
                      <span className="text-[#8C8983] text-[10px] block">BULK DENSITY</span>
                      <span className="text-[#141413] text-base font-semibold mt-0.5 block">
                        {selectedMaterial.specs.density}
                      </span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-[#E5E3DD]">
                      <span className="text-[#8C8983] text-[10px] block">THERMAL CONDUCTIVITY</span>
                      <span className="text-[#C5A880] text-base font-semibold mt-0.5 block">
                        {selectedMaterial.specs.thermalConductivity}
                      </span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-[#E5E3DD]">
                      <span className="text-[#8C8983] text-[10px] block">SOLAR REFLECTANCE</span>
                      <span className="text-[#141413] text-base font-semibold mt-0.5 block">
                        {selectedMaterial.specs.solarReflectance.split(' ')[0]}{' '}
                        {selectedMaterial.specs.solarReflectance.split(' ')[1]}
                      </span>
                    </div>
                  </>
                )}

                {activeTab === 'carbon' && (
                  <>
                    <div className="bg-white p-3.5 rounded-xl border border-[#E5E3DD]">
                      <span className="text-[#8C8983] text-[10px] block">EMBODIED CARBON</span>
                      <span className="text-emerald-700 text-base font-semibold mt-0.5 block">
                        {selectedMaterial.specs.embodiedCarbon.split(' ')[0]} kg CO₂e
                      </span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-[#E5E3DD]">
                      <span className="text-[#8C8983] text-[10px] block">ACOUSTIC RATING</span>
                      <span className="text-[#141413] text-base font-semibold mt-0.5 block">
                        {selectedMaterial.specs.acousticAbsorption.split(' ')[0]}{' '}
                        {selectedMaterial.specs.acousticAbsorption.split(' ')[1]}
                      </span>
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-[#E5E3DD]">
                      <span className="text-[#8C8983] text-[10px] block">FEEDSTOCK CIRCULARITY</span>
                      <span className="text-[#C5A880] text-base font-semibold mt-0.5 block">
                        100% RECYCLABLE
                      </span>
                    </div>
                  </>
                )}

                {activeTab === 'patina' && (
                  <div className="col-span-2 sm:col-span-3 bg-white p-4 rounded-xl border border-[#E5E3DD]">
                    <span className="text-[#8C8983] text-[10px] block mb-1">
                      100-YEAR ATMOSPHERIC PROFILE
                    </span>
                    <p className="text-[#141413] text-xs font-sans leading-relaxed">
                      {selectedMaterial.specs.weatheringProfile}
                    </p>
                  </div>
                )}
              </div>

              {/* Tested Commissions Strip */}
              <div className="pt-2 text-xs font-mono text-[#6B6862]">
                <span className="text-[#8C8983]">TESTED COMMISSIONS: </span>
                <span className="text-[#141413] font-medium">
                  {selectedMaterial.testedCommissions.join(' • ')}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openConsultationModal('Material Specification')}
                  className="px-6 py-3.5 bg-[#141413] hover:bg-[#2A2825] text-white font-mono tracking-[0.2em] text-xs font-semibold uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Box className="w-4 h-4 text-[#C5A880]" />
                  <span>REQUEST MATERIAL SAMPLE KIT</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

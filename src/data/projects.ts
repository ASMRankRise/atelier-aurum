export type ProjectCategory =
  | 'all'
  | 'education'
  | 'civic'
  | 'corporate'
  | 'healthcare'
  | 'residential';

export interface ProjectStats {
  energyReduction: string;
  daylighting: string;
  bimPrecision: string;
  embodiedCarbon?: string;
  structuralEfficiency?: string;
  [key: string]: string | undefined;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  location: string;
  year: number | string;
  client: string;
  area: string; // e.g. "64,000 sqm"
  status: 'Completed' | 'In Construction' | 'Commissioned' | 'Design Phase';
  heroImage: string;
  galleryImages: string[];
  description: string;
  architecturalNarrative: string;
  structuralEngineers: string;
  materials: string[];
  stats: ProjectStats;
  blueprintSvgType: 'cantilever' | 'louver-facade' | 'atrium-core' | 'pavilion-dome' | 'radial-grid';
  awards?: string[];
  leadArchitect?: string;
}

export const CATEGORY_TABS: { key: ProjectCategory; label: string; count: number }[] = [
  { key: 'all', label: 'ALL PRAXIS', count: 10 },
  { key: 'education', label: 'EDUCATION', count: 2 },
  { key: 'civic', label: 'CIVIC & URBAN INFRASTRUCTURE', count: 4 },
  { key: 'corporate', label: 'CORPORATE CAMPUSES', count: 2 },
  { key: 'healthcare', label: 'HEALTHCARE', count: 1 },
  { key: 'residential', label: 'RESIDENTIAL', count: 1 },
];

export const PROJECTS: Project[] = [
  {
    id: 'summit-university-campus',
    slug: 'summit-university-campus',
    title: 'Summit University Campus, Toronto',
    subtitle: 'Vertical academic quadrangle with dynamic cedar & bronze shading louvers',
    category: 'education',
    categoryLabel: 'EDUCATION',
    location: 'Toronto, Ontario, Canada',
    year: 2025,
    client: 'University of Toronto Higher Education Trust',
    area: '64,000 sqm',
    status: 'Completed',
    heroImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    ],
    description:
      'A pioneering collegiate structure uniting graduate research labs, amphitheaters, and faculty commons within a 12-story mass timber and bronze-veiled envelope.',
    architecturalNarrative:
      'Summit University reinterprets the traditional collegiate gothic courtyard into a continuous three-dimensional vertical atrium. Intersecting glulam trusses support staggered cantilevered lecture halls, while computerized bronze brise-soleil micro-adjust according to sun azimuths across Toronto’s harsh seasonal fluctuations.',
    structuralEngineers: 'Arup Façade Engineering & Blackwell Structural Group',
    materials: [
      'Brushed Bronze Louvers',
      'Structural Glulam Timber Ribs',
      'Low-Iron Triple Glazing',
      'Precast Basalt Concrete',
    ],
    stats: {
      energyReduction: '42%',
      daylighting: '94%',
      bimPrecision: '99.7%',
      embodiedCarbon: '-38%',
      structuralEfficiency: '+24%',
    },
    blueprintSvgType: 'atrium-core',
    awards: ['RAIC Governor General’s Medal in Architecture 2025', 'Holcim Gold Award for Sustainable Construction'],
    leadArchitect: 'Henrik Sörensen, FAIA',
  },
  {
    id: 'solarium-pavilion',
    slug: 'solarium-pavilion',
    title: 'Solarium Civic Pavilion, Zurich',
    subtitle: 'Parabolic public forum hovering over Lake Zurich with solar-reactive titanium zinc shingles',
    category: 'civic',
    categoryLabel: 'CIVIC & URBAN INFRASTRUCTURE',
    location: 'Zurich, Switzerland',
    year: 2024,
    client: 'Kanton Zürich Urban Development Directorate',
    area: '18,200 sqm',
    status: 'Completed',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80',
    ],
    description:
      'Floating gracefully along the limnological edge of Lake Zurich, the Solarium Civic Pavilion serves as an open democratic chamber, civic exhibition forum, and municipal concert shell.',
    architecturalNarrative:
      'The pavilion is conceived as an acoustic lens. A post-tensioned shell of radiant white pozzolanic concrete vaults upward, terminated by an aperture oriented precisely to winter solstice sun angles. Underneath, acoustically tuned Akoya pine ribs bounce orchestral frequencies toward the tiered waterside promenade.',
    structuralEngineers: 'Bollinger+Grohmann Swiss Engineering',
    materials: [
      'Pre-weathered Zinc Shingles',
      'Post-tensioned White Concrete',
      'Thermal Akoya Pine',
      'Clear Structural Glass',
    ],
    stats: {
      energyReduction: '56%',
      daylighting: '96%',
      bimPrecision: '99.9%',
      embodiedCarbon: '-45%',
      structuralEfficiency: '+32%',
    },
    blueprintSvgType: 'pavilion-dome',
    awards: ['Swiss Architecture Prize 2024', 'Mies van der Rohe Award Nominee'],
    leadArchitect: 'Astrid Lindholm, ETH SIA',
  },
  {
    id: 'aurum-biomedical-tower',
    slug: 'aurum-biomedical-tower',
    title: 'Aurum Life Science Hub, Boston',
    subtitle: 'Next-generation translational research tower with kinetic micro-louvers and vibration-damped floorplates',
    category: 'healthcare',
    categoryLabel: 'HEALTHCARE',
    location: 'Boston, Massachusetts, USA',
    year: 2026,
    client: 'Mass General Brigham / Harvard Bioscience Consortium',
    area: '88,000 sqm',
    status: 'In Construction',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80',
    ],
    description:
      'A precision-calibrated research apparatus in Boston’s Longwood Medical Area, engineering daylight and isolating microscopic vibrational frequencies for cryo-EM electron imaging.',
    architecturalNarrative:
      'Biomedical architecture demands surgical exactitude. Aurum Life Science Hub isolates sensitive laser microscopy suites within a floating tuned-mass core, surrounded by an organic spiraling helix of collaborative meeting atriums. The skin uses ceramic-frit dynamic double skin facades to prevent thermal glare while preserving deep daylight penetration.',
    structuralEngineers: 'Thornton Tomasetti Structural Genomics Lab',
    materials: [
      'Anodized Champagne Aluminum',
      'Acoustically Laminated Ceramic Frit Glass',
      'Carbon Fiber Composite Columns',
      'Terrazzo Flooring',
    ],
    stats: {
      energyReduction: '38%',
      daylighting: '89%',
      bimPrecision: '99.8%',
      embodiedCarbon: '-31%',
      structuralEfficiency: '+29%',
    },
    blueprintSvgType: 'cantilever',
    awards: ['AIA New England Excellence in Innovation Award', 'LEED Platinum Pre-Certified'],
    leadArchitect: 'Marcus Vance, FAIA',
  },
  {
    id: 'merck-discovery-campus',
    slug: 'merck-discovery-campus',
    title: 'Merck Global Discovery Centre, Darmstadt',
    subtitle: 'Interconnected pharmaceutical research campus organized around biophilic circular courtyards',
    category: 'corporate',
    categoryLabel: 'CORPORATE CAMPUSES',
    location: 'Darmstadt, Germany',
    year: 2024,
    client: 'Merck KGaA Global Real Estate',
    area: '112,000 sqm',
    status: 'Completed',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
    ],
    description:
      'The global nexus for Merck oncology and genomics sciences, merging four discrete laboratory wings into a unified campus connected by sweeping bridges of curved glass and Roman travertine.',
    architecturalNarrative:
      'Eliminating institutional isolation was the foundational mandate. ARCHIØN organized the campus around an elliptical sunlit forum where chemists, biologists, and computational data scientists converge daily. Massive custom-quarried Roman travertine fins offer passive solar shading while establishing a timeless tactile presence.',
    structuralEngineers: 'Werner Sobek Engineering & Green Technology',
    materials: [
      'Roman Travertine Panels',
      'Curved Thermal Break Curtainwall',
      'Anodized Bronze Brise-Soleil',
      'Structural Cross-Laminated Timber',
    ],
    stats: {
      energyReduction: '46%',
      daylighting: '91%',
      bimPrecision: '99.5%',
      embodiedCarbon: '-40%',
      structuralEfficiency: '+35%',
    },
    blueprintSvgType: 'radial-grid',
    awards: ['German Architecture Design Prize 2024', 'DGNB Platinum Campus Certification'],
    leadArchitect: 'Dr. Lukas von Berg, BDA',
  },
  {
    id: 'the-monolith-library',
    slug: 'the-monolith-library',
    title: 'The Monolith Public Archive, Kyoto',
    subtitle: 'Subterranean cultural repository encased in tactile textured porphyry stone and ambient skylight wells',
    category: 'civic',
    categoryLabel: 'CIVIC & URBAN INFRASTRUCTURE',
    location: 'Kyoto, Kansai, Japan',
    year: 2023,
    client: 'Kyoto Prefectural Department of Cultural Affairs',
    area: '32,500 sqm',
    status: 'Completed',
    heroImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1600&q=80',
    ],
    description:
      'Sheltering three centuries of rare historic manuscripts, this civic archive combines climate-sealed underground vaults with open-air reflecting pools and contemplative reading cloisters.',
    architecturalNarrative:
      'Inspired by the disciplined geometry of Heian-kyo urban planning, the building appears as a silent monolithic stone volume partially sunken into the terrain. Narrow vertical light wells slit through the roof slabs, casting shifting linear sunbeams that mark the passage of hours across monolithic porphyry surfaces.',
    structuralEngineers: 'Kajima Technical Research Institute & Arup Tokyo',
    materials: [
      'Honed Porphyry Stone',
      'Japanese Hinoki Cypress Paneling',
      'Blackened Steel Trusses',
      'Acoustic Woven Bronze Mesh',
    ],
    stats: {
      energyReduction: '51%',
      daylighting: '84%',
      bimPrecision: '99.6%',
      embodiedCarbon: '-29%',
      structuralEfficiency: '+22%',
    },
    blueprintSvgType: 'louver-facade',
    awards: ['Japan Institute of Architects Grand Prix 2023', 'UNESCO Cultural Heritage Conservation Citation'],
    leadArchitect: 'Kenzo Tange Studio Fellowship / ARCHIØN Asia',
  },
  {
    id: 'oslo-harbor-institute',
    slug: 'oslo-harbor-institute',
    title: 'Oslo Marine Research Institute, Oslo',
    subtitle: 'Fjord-side oceanic research academy with cantilevered seawater testing flumes and marine-grade timber envelope',
    category: 'education',
    categoryLabel: 'EDUCATION',
    location: 'Oslo, Norway',
    year: 2025,
    client: 'Norwegian Directorate for Higher Education and Skills',
    area: '41,000 sqm',
    status: 'Completed',
    heroImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80',
    ],
    description:
      'Extending 48 meters over the cold waters of the Oslofjord, this marine educational institute provides direct water intake channels for oceanic salinity and temperature climate models.',
    architecturalNarrative:
      'The architecture embodies nautical structural logic: balanced steel tension cables anchor a bold cantilevered observation laboratory. The facade is clad in charred Kebony timber, an ancient Scandinavian technique updated with parametric moisture sensors, ensuring resistance against salt mist without chemical treatments.',
    structuralEngineers: 'Multiconsult Marine Engineering Group',
    materials: [
      'Charred Kebony Timber Cladding',
      'Marine-Grade 316L Stainless Steel',
      'Triple-Glazed Low-E Argon Assemblies',
      'Recycled Aggregate Concrete',
    ],
    stats: {
      energyReduction: '62%',
      daylighting: '95%',
      bimPrecision: '99.8%',
      embodiedCarbon: '-52%',
      structuralEfficiency: '+41%',
    },
    blueprintSvgType: 'cantilever',
    awards: ['Nordic Green Architecture Prize 2025', 'BREEAM Outstanding (Score 94.2%)'],
    leadArchitect: 'Elinor Dahl, MNAL',
  },
  {
    id: 'riad-al-andalus',
    slug: 'riad-al-andalus',
    title: 'The Al-Faisaliah Cultural Center, Riyadh',
    subtitle: 'Contemporary mashrabiya-inspired civic pavilion navigating extreme desert thermal solar loads',
    category: 'civic',
    categoryLabel: 'CIVIC & URBAN INFRASTRUCTURE',
    location: 'Riyadh, Kingdom of Saudi Arabia',
    year: 2026,
    client: 'Royal Commission for Riyadh City',
    area: '74,000 sqm',
    status: 'In Construction',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80',
    ],
    description:
      'A majestic civic cultural destination bridging Saudi heritage with computational environmental design, featuring shaded sunken palm courtyards and geothermal air distribution.',
    architecturalNarrative:
      'Rooted in the indigenous Najdi architectural vernacular, the building’s monumental outer perimeter acts as a solar shield crafted from carved desert gold sandstone. Deep fractal apertures allow tempered breezes to enter the microclimatic inner oasis, which stays 14°C cooler than the ambient desert temperature without active refrigeration.',
    structuralEngineers: 'Buro Happold Middle East & Dar Al-Handasah',
    materials: [
      'Perforated Desert Gold Sandstone',
      'Engineered Bronze Mashrabiya Screens',
      'Post-Tensioned Ultra-High Performance Concrete',
      'Reflective Oasis Glass',
    ],
    stats: {
      energyReduction: '48%',
      daylighting: '88%',
      bimPrecision: '99.4%',
      embodiedCarbon: '-35%',
      structuralEfficiency: '+28%',
    },
    blueprintSvgType: 'louver-facade',
    awards: ['Middle East Architecture Award 2025 - Civic Project of the Year'],
    leadArchitect: 'Mansoor Al-Rashid & Julian Sterling',
  },
  {
    id: 'engadin-alpine-residence',
    slug: 'engadin-alpine-residence',
    title: 'Engadin Valley Sanctuary, St. Moritz',
    subtitle: 'Monolithic granite and charred larch private residence integrated into the Swiss Alpine topography',
    category: 'residential',
    categoryLabel: 'RESIDENTIAL',
    location: 'St. Moritz, Graubünden, Switzerland',
    year: 2024,
    client: 'Private Family Office',
    area: '2,850 sqm',
    status: 'Completed',
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    ],
    description:
      'An alpine estate embedded 1,800 meters above sea level, sculpted directly out of the mountain granite to withstand heavy snow loads while opening panoramic vistas toward Piz Bernina.',
    architecturalNarrative:
      'The architecture behaves as geological strata. Hewn Valser quartzite forms massive retaining spine walls that store diurnal solar heat. A cantilevered timber and glass pavilion extends over the snowfield, creating an ethereal sensation of floating amid the Engadin peaks.',
    structuralEngineers: 'Conzett Bronzini Partner AG',
    materials: [
      'Quarried Valser Quartzite',
      'Hand-Crafted Charred Alpine Larch',
      'Triple-Layered Structural Thermal Glass',
      'Brushed Raw Brass Details',
    ],
    stats: {
      energyReduction: '68%',
      daylighting: '97%',
      bimPrecision: '99.9%',
      embodiedCarbon: '-48%',
      structuralEfficiency: '+38%',
    },
    blueprintSvgType: 'cantilever',
    awards: ['Swiss Design Excellence Award 2024', 'Wallpaper* Best Private Residence Award'],
    leadArchitect: 'Astrid Lindholm, ETH SIA',
  },
  {
    id: 'geneva-diplomatic-atrium',
    slug: 'geneva-diplomatic-atrium',
    title: 'Geneva International Assembly, Geneva',
    subtitle: 'High-security parliamentary chamber enveloped by daylight-refracting acoustic glass ribbons',
    category: 'civic',
    categoryLabel: 'CIVIC & URBAN INFRASTRUCTURE',
    location: 'Geneva, Switzerland',
    year: 2025,
    client: 'United Nations Foundation / Federal Department of Foreign Affairs',
    area: '52,000 sqm',
    status: 'Completed',
    heroImage: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    ],
    description:
      'A sovereign diplomatic council chamber designed to accommodate 1,200 delegates under a grand helical skylight that filters daylight into diffuse, non-glare illumination.',
    architecturalNarrative:
      'The design reconciles blast-resistant security parameters with radiant transparency. A double-skin envelope of high-impact acoustic laminated glass acts as a thermal buffer facing Lake Geneva, while an internal ring of fluted Carrara marble diffuses speech frequencies naturally.',
    structuralEngineers: 'Buro Happold Switzerland & Schlaich Bergermann Partner',
    materials: [
      'Acoustic Laminated Glass',
      'Brushed Champagne Titanium',
      'White Carrara Marble',
      'Acoustic Oak Slats',
    ],
    stats: {
      energyReduction: '44%',
      daylighting: '93%',
      bimPrecision: '99.6%',
      embodiedCarbon: '-36%',
      structuralEfficiency: '+30%',
    },
    blueprintSvgType: 'atrium-core',
    awards: ['European Civic Architecture Gold Medal 2025'],
    leadArchitect: 'Henrik Sörensen & Marcus Vance',
  },
  {
    id: 'helsinki-biotech-campus',
    slug: 'helsinki-biotech-campus',
    title: 'Aalto CleanTech Innovation Center, Espoo',
    subtitle: 'Carbon-negative laboratory and incubator constructed entirely with modular timber massing',
    category: 'corporate',
    categoryLabel: 'CORPORATE CAMPUSES',
    location: 'Espoo / Helsinki, Finland',
    year: 2025,
    client: 'Aalto University Innovation Foundation',
    area: '58,000 sqm',
    status: 'Completed',
    heroImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=80',
    ],
    description:
      'A modular carbon-sequestering corporate headquarters and wet lab campus engineered with Finnish cross-laminated timber, setting new circularity benchmarks in Nordic life sciences.',
    architecturalNarrative:
      'Every cubic meter of timber was harvested from certified regenerative boreal forests within 120 kilometers. The interlocking post-and-beam system allows interior laboratory partitions to be reconfigured without structural interventions, extending the operational lifespan by an estimated 75 years.',
    structuralEngineers: 'Sweco Structural Systems & Ramboll Finland',
    materials: [
      'Finnish Spruce Glulam',
      'Cross-Laminated Timber (CLT)',
      'Bio-based Polyurethane Coatings',
      'Triple Photovoltaic Glass',
    ],
    stats: {
      energyReduction: '58%',
      daylighting: '91%',
      bimPrecision: '99.5%',
      embodiedCarbon: '-64%',
      structuralEfficiency: '+34%',
    },
    blueprintSvgType: 'radial-grid',
    awards: ['Nordic Council Environment Prize 2025', 'Wood Architecture Global Citation'],
    leadArchitect: 'Astrid Lindholm & Dr. Lukas von Berg',
  },
];

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  if (category === 'all') return PROJECTS;
  return PROJECTS.filter((p) => p.category === category);
}

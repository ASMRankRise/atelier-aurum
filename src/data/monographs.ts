export interface MonographArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  category: 'Façade Physics' | 'Urban Theory' | 'Computational BIM' | 'Mass Timber' | 'Acoustic Engineering';
  image: string;
  tags: string[];
  pdfDownloadUrl?: string;
  featured?: boolean;
}

export interface ClientTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  organizationDivision?: string;
  projectRef: string;
  projectLocation: string;
  avatar?: string;
  year: number;
  highlightMetric: string;
}

export interface InstitutionalPartner {
  id: string;
  name: string;
  category: 'Academia' | 'Life Sciences' | 'Global Technology' | 'Civic Governance' | 'Engineering';
  location: string;
  description: string;
  symbol: string; // Architectural SVG icon or moniker
}

export const MONOGRAPH_ARTICLES: MonographArticle[] = [
  {
    id: 'sculpting-shadow-bronze-louvers',
    slug: 'sculpting-shadow-bronze-louvers',
    title: 'Sculpting Shadow: The Thermal Dynamics of Bronze Louvers',
    subtitle: 'Parametric micro-shading arrays reduce peak solar gain by 41% across high-latitude glass envelopes.',
    excerpt:
      'How custom-alloyed architectural bronze louvers act as dynamic thermal baffles while enriching civic façades with living, self-healing patinas.',
    content: `Façade performance is fundamentally a study of thermodynamics expressed through materiality. While twentieth-century curtain walls relied upon energy-intensive tinted glass and high-wattage HVAC chillers to counteract seasonal solar heat gain, ARCHIØN’s façade physics research group has pioneered computational bronze brise-soleil configurations.

By utilizing solar azimuth algorithms derived from multi-decade meteorological datasets, each bronze louver is twisted at varying angles—from 14 degrees along the eastern elevation to 42 degrees along the southern exposure. 

The resulting facade creates an undulating moiré effect across the building’s exterior while eliminating over 41% of peak mechanical cooling loads. Unlike aluminum extrusions, the bronze alloy contains trace zinc and copper percentages that self-passivate against urban atmospheric sulfur, creating a velvet burnished luster that deepens gracefully over generations.`,
    date: 'February 18, 2026',
    readTime: '6 min read',
    author: {
      name: 'Henrik Sörensen, FAIA',
      role: 'Director of Façade Systems & Building Physics',
    },
    category: 'Façade Physics',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    tags: ['Solar Geometry', 'Bronze Metallurgy', 'Passive Shading', 'Facade Engineering'],
    featured: true,
  },
  {
    id: 'monolithic-shift-urban-educational-spaces',
    slug: 'monolithic-shift-urban-educational-spaces',
    title: 'The Monolithic Shift in Urban Educational Spaces',
    subtitle: 'Deconstructing the segregated academic tower into porous, vertical urban quadrangles.',
    excerpt:
      'An analysis of how vertical mass timber volumes and interconnected sky gardens foster cross-disciplinary synergy in dense metropolitan universities.',
    content: `Higher education campuses in global capitals face an existential spatial dilemma: historical university quads require horizontal sprawl that modern urban density cannot accommodate.

At Summit University in Toronto and the Oslo Marine Research Institute, ARCHIØN developed the concept of the 'Vertical Quadrangle.' By carving a contiguous twelve-story daylight atrium through the structural mass timber core, students and researchers experience continuous line-of-sight across biochemistry laboratories, humanities amphitheaters, and faculty common rooms.

Post-occupancy infrared tracking demonstrated a 310% increase in serendipitous inter-departmental encounters compared to standard double-loaded corridor layouts. When architecture eliminates physical departmental silos, collaborative intellectual output expands exponentially.`,
    date: 'January 24, 2026',
    readTime: '8 min read',
    author: {
      name: 'Astrid Lindholm, ETH SIA',
      role: 'Lead Partner, Civic & Institutional Praxis',
    },
    category: 'Urban Theory',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=85',
    tags: ['Campus Masterplanning', 'Mass Timber', 'Spatial Sociology', 'Higher Education'],
    featured: true,
  },
  {
    id: 'bim-4-eliminating-material-redundancy',
    slug: 'bim-4-eliminating-material-redundancy',
    title: 'BIM 4.0: Eliminating 28% Material Redundancy',
    subtitle: 'Generative structural optimization and direct-to-fabrication digital twins for zero-waste construction.',
    excerpt:
      'Deploying algorithmic stress tensors directly into 5D BIM models enables sub-millimeter precision and unprecedented steel and concrete reductions.',
    content: `Over-engineering in commercial architecture is a symptom of fragmented communication between structural engineers, fabricators, and architects. Traditional safety factors compound geometrically, resulting in up to 35% excess embodied carbon poured into foundational footings and structural cores.

ARCHIØN’s proprietary BIM 4.0 pipeline integrates finite element analysis (FEA) directly into our parametric architectural geometry. By running topology optimization algorithms across 400 load conditions simultaneously, material is strategically removed from neutral-axis zones where stress is negligible.

On the Merck Global Discovery Centre in Darmstadt, this computational precision allowed us to shave 2,400 metric tons of concrete and reduce structural steel tonnage by 28.4%, while accelerating steel erection by four months on site.`,
    date: 'November 12, 2025',
    readTime: '5 min read',
    author: {
      name: 'Dr. Lukas von Berg, BDA',
      role: 'Computational Design & Digital Fabrication Lead',
    },
    category: 'Computational BIM',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    tags: ['Generative Structural Design', 'Carbon Reduction', 'Digital Twin', 'ISO 19650'],
    featured: false,
  },
  {
    id: 'acoustic-fluidity-civic-cantilevers',
    slug: 'acoustic-fluidity-civic-cantilevers',
    title: 'Acoustic Fluidity in Civic Cantilevers',
    subtitle: 'Engineering resonant sound chambers within long-span post-tensioned public forums.',
    excerpt:
      'Examining how parabolic ceiling geometries and micro-perforated timber panels turn structural cantilevers into unamplified acoustic auditoriums.',
    content: `When civic architecture opens itself to the city, acoustic clarity is often compromised by urban traffic rumble and reverberant glassy surfaces. In the Solarium Civic Pavilion in Zurich, our acoustic team calibrated a non-uniform parabolic vault that reflects human vocal frequencies back to the seated assembly while directing low-frequency water vibrations out through tuned damping baffles.

The result is a public forum where a speaker at the podium requires zero electronic amplification to be clearly understood by 1,400 citizens.`,
    date: 'October 3, 2025',
    readTime: '7 min read',
    author: {
      name: 'Marcus Vance, FAIA',
      role: 'Partner, Acoustic & Civic Systems',
    },
    category: 'Acoustic Engineering',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=85',
    tags: ['Acoustic Tuning', 'Civic Forum', 'Post-Tensioned Shells', 'Public Space'],
    featured: false,
  },
];

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'merck-kraus',
    quote:
      'ARCHIØN re-engineered our global research headquarters into an intellectual powerhouse. The seamless interplay between travertine mass and curved glass bridges created an environment where breakthrough discovery happens organically every day.',
    author: 'Dr. Michael Kraus',
    role: 'Head of Global Infrastructure & Real Estate',
    organization: 'MERCK KGaA',
    organizationDivision: 'Executive Board',
    projectRef: 'Merck Global Discovery Centre',
    projectLocation: 'Darmstadt, Germany',
    year: 2024,
    highlightMetric: '28% Structural Efficiency Gain',
  },
  {
    id: 'harvard-rostova',
    quote:
      'Working with the ARCHIØN praxis set a new standard for collegiate architecture. Their ability to respect academic heritage while pushing mass-timber engineering delivered the lowest carbon footprint of any building in our institutional history.',
    author: 'Elena Rostova',
    role: 'Director of Facilities & Campus Planning',
    organization: 'Harvard University',
    organizationDivision: 'Biosciences Capital Project Group',
    projectRef: 'Aurum Life Science Hub Consortium',
    projectLocation: 'Boston, Massachusetts',
    year: 2025,
    highlightMetric: 'LEED Platinum Certified',
  },
  {
    id: 'riyadh-alghamdi',
    quote:
      'In extreme desert environments, architecture cannot rely on aesthetic imitation. ARCHIØN translated historical Najdi solar wisdom into contemporary computational sandstone envelopes that keep our public courtyards remarkably temperate without active chillers.',
    author: 'Tariq Al-Ghamdi',
    role: 'Vice President of Capital Projects',
    organization: 'Riyadh Development Authority',
    organizationDivision: 'Royal Commission for Riyadh City',
    projectRef: 'The Al-Faisaliah Cultural Center',
    projectLocation: 'Riyadh, Saudi Arabia',
    year: 2026,
    highlightMetric: '14°C Passive Microclimate Cooling',
  },
  {
    id: 'london-vane',
    quote:
      'ARCHIØN represents the rare intersection of rigorous BIM precision and poetic spatial gravitas. Their projects do not simply occupy cities—they elevate the civic consciousness of everyone who moves through them.',
    author: 'Jonathan Vane',
    role: 'Principal Urbanist & Advisor',
    organization: 'Greater London Authority',
    organizationDivision: 'Civic Architecture Review Board',
    projectRef: 'Institutional Advisory',
    projectLocation: 'London, United Kingdom',
    year: 2025,
    highlightMetric: 'Zero Urban Runoff Index',
  },
];

export const INSTITUTIONAL_PARTNERS: InstitutionalPartner[] = [
  {
    id: 'harvard',
    name: 'Harvard University',
    category: 'Academia',
    location: 'Cambridge, MA, USA',
    description: 'Collaborative development of advanced biomedical research facilities and campus housing.',
    symbol: 'HARVARD',
  },
  {
    id: 'mit',
    name: 'MIT Media Lab / SA+P',
    category: 'Academia',
    location: 'Cambridge, MA, USA',
    description: 'Ongoing research partnership in computational material kinetics and solar-responsive façades.',
    symbol: 'MIT',
  },
  {
    id: 'siemens',
    name: 'Siemens Smart Infrastructure',
    category: 'Global Technology',
    location: 'Zug / Munich',
    description: 'Integration of automated digital-twin building management sensors into ARCHIØN designs.',
    symbol: 'SIEMENS',
  },
  {
    id: 'pfizer',
    name: 'Pfizer Global R&D',
    category: 'Life Sciences',
    location: 'New York, NY, USA',
    description: 'Design consultant for clean-room biosafety envelope specifications across Europe.',
    symbol: 'PFIZER',
  },
  {
    id: 'merck',
    name: 'Merck KGaA',
    category: 'Life Sciences',
    location: 'Darmstadt, Germany',
    description: 'Client for the 112,000 sqm Global Discovery Centre and European life science headquarters.',
    symbol: 'MERCK',
  },
  {
    id: 'ibm',
    name: 'IBM Quantum Systems',
    category: 'Global Technology',
    location: 'Armonk, NY / Zurich',
    description: 'Vibration isolation envelope engineering for cryogenic quantum computing facilities.',
    symbol: 'IBM',
  },
  {
    id: 'oslo',
    name: 'City of Oslo',
    category: 'Civic Governance',
    location: 'Oslo, Norway',
    description: 'Municipal partner for waterfront regeneration and marine research educational masterplans.',
    symbol: 'OSLO',
  },
  {
    id: 'eth',
    name: 'ETH Zürich',
    category: 'Academia',
    location: 'Zurich, Switzerland',
    description: 'Testing grounds for post-tensioned concrete shells and low-carbon alpine aggregate matrices.',
    symbol: 'ETH ZÜRICH',
  },
  {
    id: 'arup',
    name: 'Arup Engineering',
    category: 'Engineering',
    location: 'Global',
    description: 'Structural and environmental envelope co-engineers across 18 international commissions.',
    symbol: 'ARUP',
  },
  {
    id: 'turner',
    name: 'Turner Construction',
    category: 'Engineering',
    location: 'New York, NY, USA',
    description: 'Construction delivery partner for high-precision institutional and healthcare envelopes.',
    symbol: 'TURNER',
  },
];

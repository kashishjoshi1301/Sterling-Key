export const PROPERTIES_DATA = [
  {
    id: "prop-1",
    title: "The Bel-Air Promontory Estate",
    tagline: "Panoramic City-to-Ocean Vistas & Architectural Triumph",
    price: 38500000,
    priceFormatted: "$38,500,000",
    rentalPrice: null,
    address: "10771 Bellagio Road",
    neighborhood: "Bel-Air",
    city: "Los Angeles",
    state: "CA",
    zip: "90077",
    category: "Architectural",
    listingType: "buy",
    status: "Exclusive",
    beds: 7,
    baths: 11,
    sqft: 16800,
    sqm: 1560,
    lotSize: "1.45 Acres",
    yearBuilt: 2024,
    hoa: "$1,250 / mo",
    taxesAnnual: "$345,000",
    capRate: "5.8%",
    featured: true,
    mapCoords: { x: 22, y: 55 }, // Relative % on interactive map
    coordinates: { lat: 34.0837, lng: -118.4487 },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80"
    ],
    floorPlan: {
      levels: 3,
      ceilingHeight: "14 – 22 FT",
      outdoorDeck: "4,500 SF",
      galleryCars: 8,
      planImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    },
    amenities: [
      "Zero-Edge Infinity Pool",
      "12-Seat Dolby Atmos Screening Room",
      "1,800-Bottle Temperature Wine Cellar",
      "Sub-Terranean 8-Car Gallery",
      "Full Wellness Spa & Cold Plunge",
      "Biometric Security System",
      "Private Guard House"
    ],
    agent: {
      name: "Julian Vance",
      title: "Senior Vice President | Luxury Estates",
      phone: "+1 (310) 849-2910",
      email: "julian.vance@sterlingkey.com",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    },
    description: "Perched atop one of Bel-Air's most coveted private promontories, this masterwork represents the apex of modern California architecture. Designed with museum-quality board-formed concrete, hand-selected Travertine stone, and motorized Fleetwood glass walls that dissolve boundaries between interior grandeur and sweeping Pacific vistas."
  },
  {
    id: "prop-2",
    title: "The Sky Penthouse at 111 West 57th",
    tagline: "Duplex Residence Floating Above Central Park",
    price: 49000000,
    priceFormatted: "$49,000,000",
    rentalPrice: null,
    address: "111 West 57th Street, Penthouse 72",
    neighborhood: "Billionaires' Row",
    city: "New York",
    state: "NY",
    zip: "10019",
    category: "Penthouses",
    listingType: "buy",
    status: "Just Listed",
    beds: 5,
    baths: 6.5,
    sqft: 7130,
    sqm: 662,
    lotSize: "Full Floor Duplex",
    yearBuilt: 2023,
    hoa: "$14,800 / mo",
    taxesAnnual: "$210,000",
    capRate: "4.9%",
    featured: true,
    mapCoords: { x: 74, y: 38 },
    coordinates: { lat: 40.7648, lng: -73.9772 },
    images: [
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80"
    ],
    floorPlan: {
      levels: 2,
      ceilingHeight: "14 FT",
      outdoorDeck: "Private Loggia",
      galleryCars: 2,
      planImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    },
    amenities: [
      "360-Degree Central Park & Skyline Views",
      "Private Keyed Elevator Foyer",
      "14-Foot Ceiling Heights",
      "Custom Molteni&C Dada Kitchen",
      "Calacatta Gold Marble Bathrooms",
      "24/7 White-Glove Doorman & Concierge",
      "82-Foot Indoor Saltwater Pool"
    ],
    agent: {
      name: "Eleanor Sterling-Hayes",
      title: "Managing Partner | New York Flagship",
      phone: "+1 (212) 791-8840",
      email: "eleanor.sterling@sterlingkey.com",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    description: "Suspended 1,000 feet above the Manhattan grid, Penthouse 72 delivers unparalleled geometric perfection and uninterrupted Central Park views. Adorned with bronze filigree detailing, solid quarter-sawn oak flooring, and double-height entertaining salons."
  },
  {
    id: "prop-3",
    title: "Villa Solaria at Star Island",
    tagline: "Ultra-Private Modern Waterfront Sanctuary with Mega-Yacht Slip",
    price: 62000000,
    priceFormatted: "$62,000,000",
    rentalPrice: "$180,000 / mo",
    address: "44 Star Island Drive",
    neighborhood: "Star Island",
    city: "Miami Beach",
    state: "FL",
    zip: "33139",
    category: "Waterfront",
    listingType: "buy",
    status: "Exclusive",
    beds: 8,
    baths: 12,
    sqft: 14200,
    sqm: 1319,
    lotSize: "0.95 Acres Waterfront",
    yearBuilt: 2024,
    hoa: "$2,400 / mo",
    taxesAnnual: "$480,000",
    capRate: "6.4%",
    featured: true,
    mapCoords: { x: 72, y: 78 },
    coordinates: { lat: 25.7781, lng: -80.1534 },
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80"
    ],
    floorPlan: {
      levels: 2,
      ceilingHeight: "16 FT",
      outdoorDeck: "6,200 SF",
      galleryCars: 6,
      planImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
    },
    amenities: [
      "150-Foot Deepwater Mega-Yacht Dock",
      "Private Tennis & Pickleball Court",
      "Catering Commercial Grade Kitchen",
      "Rooftop Observatory & Tequila Lounge",
      "Guest Residence with Private Entry",
      "Gated Island with 24/7 Police Patrol"
    ],
    agent: {
      name: "Mateo Rodriguez",
      title: "Director of Coastal Acquisitions",
      phone: "+1 (305) 912-4411",
      email: "mateo.rodriguez@sterlingkey.com",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    },
    description: "An unmatched waterfront enclave positioned in Miami's most secure gated sanctuary. Star Island Villa Solaria seamlessly merges tropical modernist design with fortress-grade security and immediate ocean access for yachts up to 130 feet."
  },
  {
    id: "prop-4",
    title: "The Grand Grosvenor Residence",
    tagline: "Grade II Listed Heritage Townhouse in Heart of Mayfair",
    price: 34500000,
    priceFormatted: "$34,500,000 (£27.5M)",
    rentalPrice: "£45,000 / mo",
    address: "18 Upper Grosvenor Street",
    neighborhood: "Mayfair",
    city: "London",
    state: "UK",
    zip: "W1K 7PE",
    category: "Historic",
    listingType: "buy",
    status: "Managed",
    beds: 6,
    baths: 8,
    sqft: 9850,
    sqm: 915,
    lotSize: "6-Storey Townhouse",
    yearBuilt: 1892,
    hoa: "£850 / mo",
    taxesAnnual: "£145,000",
    capRate: "4.8%",
    featured: false,
    mapCoords: { x: 50, y: 25 },
    coordinates: { lat: 51.5113, lng: -0.1534 },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80"
    ],
    floorPlan: {
      levels: 6,
      ceilingHeight: "12 – 15 FT",
      outdoorDeck: "Private Mews & Courtyard",
      galleryCars: 2,
      planImage: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80"
    },
    amenities: [
      "Direct Private Lift to All 6 Floors",
      "Restored Regency Cornicing & Parquet",
      "Basement Swimming Pool & Hammam",
      "Mews House with Separate Chauffeur Flat",
      "Secure Underground Parking for 2 Cars",
      "Private Garden Courtyard"
    ],
    agent: {
      name: "Alistair Montgomery",
      title: "Managing Director | EMEA Luxury",
      phone: "+44 20 7946 0912",
      email: "alistair.m@sterlingkey.co.uk",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    },
    description: "Originally commissioned in the late 19th century and fully restored under the oversight of English Heritage, this magnificent Mayfair residence is an unmatched balance of historic pedigree and ultra-modern bespoke comfort."
  },
  {
    id: "prop-5",
    title: "Red Mountain Alpine Chalet",
    tagline: "Direct Ski-In / Ski-Out Modern Alpine Masterpiece",
    price: 28900000,
    priceFormatted: "$28,900,000",
    rentalPrice: "$85,000 / mo",
    address: "710 Willoughby Way",
    neighborhood: "Red Mountain",
    city: "Aspen",
    state: "CO",
    zip: "81611",
    category: "Architectural",
    listingType: "buy",
    status: "Exclusive",
    beds: 6,
    baths: 7.5,
    sqft: 8900,
    sqm: 826,
    lotSize: "2.10 Acres",
    yearBuilt: 2022,
    hoa: "$900 / mo",
    taxesAnnual: "$195,000",
    capRate: "7.1%",
    featured: true,
    mapCoords: { x: 38, y: 46 },
    coordinates: { lat: 39.1911, lng: -106.8175 },
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80"
    ],
    floorPlan: {
      levels: 3,
      ceilingHeight: "18 FT Vaulted",
      outdoorDeck: "Heated Terrace & Ajax Spa",
      galleryCars: 3,
      planImage: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80"
    },
    amenities: [
      "Direct Heated Ski Locker & Boot Warmers",
      "Outdoor Heated Infinity Spa with Ajax Views",
      "Floor-to-Ceiling Steel Fireplaces",
      "Wine Tasting Room with Reclaimed Timber",
      "Oxygen-Enriched Primary Suite",
      "Heated Motor Court & Driveway"
    ],
    agent: {
      name: "Julian Vance",
      title: "Senior Vice President | Luxury Estates",
      phone: "+1 (310) 849-2910",
      email: "julian.vance@sterlingkey.com",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    },
    description: "Known affectionately on Red Mountain as 'The Aspen Crown', this ski sanctuary captures majestic panoramic sights of Aspen Mountain, Highlands, and Independence Pass while providing total seclusion and warm modern timber architecture."
  },
  {
    id: "prop-6",
    title: "The Sterling Collection at Brickell",
    tagline: "Managed Luxury Tower Residences by Sterling Key",
    price: 3200000,
    priceFormatted: "From $3,200,000",
    rentalPrice: "$12,500 / mo",
    address: "1421 Brickell Avenue",
    neighborhood: "Brickell Financial District",
    city: "Miami",
    state: "FL",
    zip: "33131",
    category: "New Developments",
    listingType: "rent",
    status: "Managed",
    beds: 3,
    baths: 3.5,
    sqft: 2850,
    sqm: 264,
    lotSize: "Tower Suite",
    yearBuilt: 2025,
    hoa: "$2,100 / mo",
    taxesAnnual: "$38,000",
    capRate: "7.8%",
    featured: false,
    mapCoords: { x: 70, y: 82 },
    coordinates: { lat: 25.7617, lng: -80.1918 },
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80"
    ],
    floorPlan: {
      levels: 1,
      ceilingHeight: "11 FT",
      outdoorDeck: "Wrap-Around Balcony",
      galleryCars: 2,
      planImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    },
    amenities: [
      "Full On-Site Sterling Key Asset Management",
      "Private Resident Yacht Charter Privileges",
      "Equinox-Caliber Athletic Club & Pilates Studio",
      "Co-Working Executive Boardrooms",
      "Tesla Chauffeur House Car",
      "Keyless Mobile Entry & Automated Package Lockers"
    ],
    agent: {
      name: "Mateo Rodriguez",
      title: "Director of Coastal Acquisitions",
      phone: "+1 (305) 912-4411",
      email: "mateo.rodriguez@sterlingkey.com",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    },
    description: "Managed exclusively under the Sterling Key Signature Asset program, this high-yield luxury tower in the heart of Brickell represents premier turnkey investor living with institutional-grade tenant servicing."
  },
  {
    id: "prop-7",
    title: "Tribeca Cast-Iron Glasshouse",
    tagline: "Soaring 16-Foot Ceilings & Private Landscaped Roof Terrace",
    price: 18750000,
    priceFormatted: "$18,750,000",
    rentalPrice: "$48,000 / mo",
    address: "68 Franklin Street, PH",
    neighborhood: "Tribeca",
    city: "New York",
    state: "NY",
    zip: "10013",
    category: "Penthouses",
    listingType: "rent",
    status: "Exclusive",
    beds: 4,
    baths: 4.5,
    sqft: 5200,
    sqm: 483,
    lotSize: "Loft + 1,400 SF Terrace",
    yearBuilt: 1910,
    hoa: "$6,900 / mo",
    taxesAnnual: "$112,000",
    capRate: "5.4%",
    featured: false,
    mapCoords: { x: 75, y: 40 },
    coordinates: { lat: 40.7188, lng: -74.0089 },
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
    ],
    floorPlan: {
      levels: 2,
      ceilingHeight: "16 FT",
      outdoorDeck: "1,400 SF Rooftop Garden",
      galleryCars: 1,
      planImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80"
    },
    amenities: [
      "Direct Keyed Elevator Access",
      "Original Corinthian Cast Iron Columns",
      "Lutron Homeworks Smart Lighting",
      "Custom Teak Wood Outdoor Kitchen",
      "Temperature Controlled Wine Wall"
    ],
    agent: {
      name: "Eleanor Sterling-Hayes",
      title: "Managing Partner | New York Flagship",
      phone: "+1 (212) 791-8840",
      email: "eleanor.sterling@sterlingkey.com",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    },
    description: "An authentic architectural trophy in the core of historic Tribeca. Featuring restored pine beams, radiant floor heating, open skylit dining gallery, and a lush private rooftop oasis overlooking downtown Manhattan."
  },
  {
    id: "prop-8",
    title: "Malibu Pacific Bluffs Compound",
    tagline: "Private Funicular Access to Secluded Sandy Cove",
    price: 44000000,
    priceFormatted: "$44,000,000",
    rentalPrice: null,
    address: "33100 Pacific Coast Highway",
    neighborhood: "Western Malibu",
    city: "Malibu",
    state: "CA",
    zip: "90265",
    category: "Waterfront",
    listingType: "buy",
    status: "Pending",
    beds: 6,
    baths: 9,
    sqft: 11200,
    sqm: 1040,
    lotSize: "3.2 Oceanfront Acres",
    yearBuilt: 2021,
    hoa: "None",
    taxesAnnual: "$390,000",
    capRate: "6.1%",
    featured: false,
    mapCoords: { x: 18, y: 58 },
    coordinates: { lat: 34.0259, lng: -118.7798 },
    images: [
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"
    ],
    floorPlan: {
      levels: 2,
      ceilingHeight: "15 FT Glass Walls",
      outdoorDeck: "Cantilevered Ocean Pavilion",
      galleryCars: 4,
      planImage: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1200&q=80"
    },
    amenities: [
      "Private Oceanfront Funicular & Beach Cabana",
      "Commercial Helipad Clearance",
      "Organic Citrus & Olive Orchards",
      "Cantilevered Glass Dining Pavilion",
      "Separate Two-Bedroom Guest Villa"
    ],
    agent: {
      name: "Julian Vance",
      title: "Senior Vice President | Luxury Estates",
      phone: "+1 (310) 849-2910",
      email: "julian.vance@sterlingkey.com",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    },
    description: "Commanding 300 feet of pristine blufftop ocean frontage, this private compound offers world-class seclusion, organic architectural purity, and private beach frontage inaccessible to the public."
  }
];

export const MANAGEMENT_TIERS = [
  {
    id: "tier-advisory",
    name: "Sterling Placement & Advisory",
    badge: "Leasing & Vetting",
    fee: "1 Month Gross Rent",
    tagline: "Ideal for hands-on owners requiring elite tenant sourcing and ironclad lease legalities.",
    features: [
      "Cinematic HDR Video & Drone Marketing",
      "Bespoke Placement across Global Private Networks",
      "Comprehensive Biometric, Asset & Credit Audits",
      "Sterling Signature High-Net-Worth Lease Agreements",
      "Move-in Condition Condition Scans & Digital Inventory",
      "Escrow & Security Deposit Compliance Handling"
    ],
    idealFor: "Single trophy condominiums and vacation properties."
  },
  {
    id: "tier-signature",
    name: "Sterling Signature Management",
    badge: "Most Popular",
    fee: "6.5% Monthly Gross Collections",
    tagline: "Turnkey luxury asset care combining Greystar-level operations with private concierge dispatch.",
    features: [
      "Everything in Placement & Advisory included",
      "24/7 Dedicated White-Glove Concierge & Dispatch",
      "Direct ACH Monthly Owner Distributions by the 5th",
      "Quarterly High-Definition Drone & Engineering Audits",
      "Zero Maintenance Markups (Direct Trade-Rate Invoicing)",
      "Real-Time Mobile Portal: Statements, Leases & Work Orders",
      "Guaranteed Eviction & Default Protection Policy"
    ],
    idealFor: "Luxury single-family estates and high-value rental portfolios."
  },
  {
    id: "tier-sovereign",
    name: "Sterling Sovereign Institutional",
    badge: "Multi-Family & Portfolios",
    fee: "Custom Institutional (from 4.5%)",
    tagline: "Institutional capital asset oversight, repositioning, and dynamic yield maximization.",
    features: [
      "Dedicated On-Site or District Asset Director",
      "Algorithmic Dynamic Rent Pricing Engine (Maximizes NOI)",
      "Comprehensive GAAP Audited Accounting & Tax Ledgers",
      "Capital Expenditure (CapEx) Planning & Execution",
      "Resident Amenity Programming & Retention Initiatives",
      "Enterprise Multi-Family Bulk Procurement Savings"
    ],
    idealFor: "Ultra-luxury residential developments & multi-unit portfolios."
  }
];

export const NEIGHBORHOODS_DATA = [
  {
    id: "manhattan",
    name: "Manhattan, New York",
    tag: "Global Capital of Culture & Finance",
    medianPrice: "$4,850,000",
    avgYield: "4.8%",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1000&q=80",
    districts: ["Billionaires' Row", "Tribeca", "West Village", "SoHo", "Upper East Side"],
    description: "Unrivaled urban prestige, world-renowned architecture, and enduring capital preservation."
  },
  {
    id: "los-angeles",
    name: "Los Angeles, California",
    tag: "Hollywood Glamour & Coastal Mastery",
    medianPrice: "$6,900,000",
    avgYield: "5.6%",
    image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=1000&q=80",
    districts: ["Bel-Air", "Beverly Hills", "Malibu Bluffs", "Hollywood Hills", "Brentwood"],
    description: "Sprawling gated estates, iconic mid-century masterpieces, and panoramic Pacific sunsets."
  },
  {
    id: "miami",
    name: "Miami & Coastal Islands, Florida",
    tag: "Waterfront Capital & Tax-Advantaged Living",
    medianPrice: "$5,200,000",
    avgYield: "7.2%",
    image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=1000&q=80",
    districts: ["Star Island", "Brickell Avenue", "Coconut Grove", "Fisher Island", "Venetian Islands"],
    description: "Year-round deepwater yachting, vibrant culinary scene, and zero state income tax magnetism."
  },
  {
    id: "london",
    name: "Central London, United Kingdom",
    tag: "Timeless Aristocratic Heritage & Prime Global Real Estate",
    medianPrice: "£4,250,000",
    avgYield: "4.5%",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80",
    districts: ["Mayfair", "Belgravia", "Knightsbridge", "Chelsea", "Kensington"],
    description: "Centuries of royal prestige, Grade II listed garden squares, and unparalleled sovereign security."
  },
  {
    id: "aspen",
    name: "Aspen & Snowmass, Colorado",
    tag: "Ultra-High-Net-Worth Mountain Enclave",
    medianPrice: "$12,400,000",
    avgYield: "6.9%",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
    districts: ["Red Mountain", "Downtown Historic Core", "Starwood", "West End"],
    description: "The world's premier winter alpine playground with strictly bounded land development."
  },
  {
    id: "dubai",
    name: "Dubai, United Arab Emirates",
    tag: "Tax-Free Sovereign Sanctuary & Futuristic Architecture",
    medianPrice: "AED 18,500,000",
    avgYield: "7.8%",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    districts: ["Palm Jumeirah", "Emirates Hills", "DIFC", "Downtown Dubai", "Jumeirah Bay"],
    description: "Zero income tax, world-leading infrastructure, and exponential luxury capital appreciation."
  }
];

export const AGENTS_DATA = [
  {
    id: "agent-1",
    name: "Julian Vance",
    role: "Senior Vice President | Luxury Estates",
    region: "Los Angeles & Aspen",
    careerSales: "$1.45 Billion",
    phone: "+1 (310) 849-2910",
    email: "julian.vance@sterlingkey.com",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    bio: "Ranked among the top 10 luxury brokers nationwide, Julian brings two decades of expertise representing celebrity estates and architectural landmarks in Bel-Air, Beverly Hills, and Aspen."
  },
  {
    id: "agent-2",
    name: "Eleanor Sterling-Hayes",
    role: "Managing Partner & Co-Founder",
    region: "New York City",
    careerSales: "$2.10 Billion",
    phone: "+1 (212) 791-8840",
    email: "eleanor.sterling@sterlingkey.com",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    bio: "A trusted advisor to family offices and institutional funds, Eleanor oversees Sterling Key's premier East Coast penthouse advisory and marquee residential developments."
  },
  {
    id: "agent-3",
    name: "Mateo Rodriguez",
    role: "Director of Coastal Acquisitions",
    region: "Miami & The Caribbean",
    careerSales: "$940 Million",
    phone: "+1 (305) 912-4411",
    email: "mateo.rodriguez@sterlingkey.com",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    bio: "Specializing in mega-yacht waterfront parcels, private islands, and tax-advantaged Florida luxury holdings with unmatched discretion."
  },
  {
    id: "agent-4",
    name: "Alistair Montgomery",
    role: "Managing Director | EMEA Luxury",
    region: "London & Europe",
    careerSales: "$1.20 Billion",
    phone: "+44 20 7946 0912",
    email: "alistair.m@sterlingkey.co.uk",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    bio: "Educated at Oxford and seasoned in Mayfair real estate for 22 years, Alistair handles sovereign client representations across the UK and Continental Europe."
  }
];

export const TESTIMONIALS_DATA = [
  {
    quote: "Sterling Key Properties completely redefined our expectations of property management. When managing a 36-unit luxury portfolio in Miami, their institutional precision combined with bespoke tenant curation delivered a 17% increase in our Net Operating Income within our first 9 months.",
    author: "Harrison Sterling Vance",
    title: "Managing Principal, Vance Capital Partners",
    location: "Miami & New York"
  },
  {
    quote: "Selling an off-market $42M estate in Bel-Air requires extraordinary discretion. The Agency-level marketing, cinematic storytelling, and private sovereign buyer network at Sterling Key resulted in a seamless 30-day closing without a single public leak.",
    author: "Lady Caroline Cavendish",
    title: "Private Family Office Trustee",
    location: "London & Los Angeles"
  },
  {
    quote: "The owner portal is truly on par with enterprise software. Live statements, direct distribution notifications, and zero maintenance headaches. There is simply no other firm operating at this standard.",
    author: "Dr. Marcus Wei",
    title: "Real Estate Investor & Surgeon",
    location: "Tribeca, New York"
  }
];

export const PRESS_ACCOLADES = [
  { outlet: "Architectural Digest", quote: "The gold standard of curated ultra-prime real estate." },
  { outlet: "The Wall Street Journal", quote: "Pioneering the hybrid of boutique brokerage and institutional asset management." },
  { outlet: "Financial Times", quote: "The chosen firm for sovereign wealth and discreet trophy acquisitions." },
  { outlet: "Robb Report", quote: "Redefining white-glove resident hospitality for private estates." }
];

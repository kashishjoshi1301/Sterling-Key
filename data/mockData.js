// data/mockData.js
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
    beds: 7, baths: 11, sqft: 16800, sqm: 1560,
    lotSize: "1.45 Acres", yearBuilt: 2024, hoa: "$1,250 / mo", taxesAnnual: "$345,000", capRate: "5.8%",
    featured: true,
    mapCoords: {"x":22,"y":55}, coordinates: {"lat":34.0837,"lng":-118.4487},
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":3,"ceilingHeight":"14 – 22 FT","outdoorDeck":"4,500 SF","galleryCars":8,"planImage":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Zero-Edge Infinity Pool","12-Seat Dolby Atmos Screening Room","1,800-Bottle Temperature Wine Cellar","Sub-Terranean 8-Car Gallery","Full Wellness Spa & Cold Plunge","Biometric Security System","Private Guard House"],
    agent: {"name":"Julian Vance","title":"Senior Vice President | Luxury Estates","phone":"+1 (310) 849-2910","email":"julian.vance@sterlingkey.com","image":"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"},
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
    beds: 5, baths: 6.5, sqft: 7130, sqm: 662,
    lotSize: "Full Floor Duplex", yearBuilt: 2023, hoa: "$14,800 / mo", taxesAnnual: "$210,000", capRate: "4.9%",
    featured: true,
    mapCoords: {"x":74,"y":38}, coordinates: {"lat":40.7648,"lng":-73.9772},
    images: [
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":2,"ceilingHeight":"14 FT","outdoorDeck":"Private Loggia","galleryCars":2,"planImage":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["360-Degree Central Park & Skyline Views","Private Keyed Elevator Foyer","14-Foot Ceiling Heights","Custom Molteni&C Dada Kitchen","Calacatta Gold Marble Bathrooms","24/7 White-Glove Doorman & Concierge","82-Foot Indoor Saltwater Pool"],
    agent: {"name":"Eleanor Sterling-Hayes","title":"Managing Partner | New York Flagship","phone":"+1 (212) 791-8840","email":"eleanor.sterling@sterlingkey.com","image":"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"},
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
    beds: 8, baths: 12, sqft: 14200, sqm: 1319,
    lotSize: "0.95 Acres Waterfront", yearBuilt: 2024, hoa: "$2,400 / mo", taxesAnnual: "$480,000", capRate: "6.4%",
    featured: true,
    mapCoords: {"x":79,"y":78}, coordinates: {"lat":25.7781,"lng":-80.1506},
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":2,"ceilingHeight":"16 FT","outdoorDeck":"6,200 SF","galleryCars":6,"planImage":"https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["220-Foot Deepwater Mega-Yacht Dockage","Resort-Style Saltwater Lagoon Pool","Rooftop Stargazing Sky-Lounge","Separate Two-Story Guest House","Commercial Grade Summer Kitchen","Full Smart Home Automation by Savant","Gated Island Police Patrol 24/7"],
    agent: {"name":"Mateo Rodriguez","title":"Director of Coastal Acquisitions","phone":"+1 (305) 912-4411","email":"mateo.rodriguez@sterlingkey.com","image":"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"},
    description: "Occupying prime southern frontage on world-renowned Star Island, Villa Solaria pairs tropical modern brutalism with opulent Italian finishes. Floor-to-ceiling glass expanses offer cinematic views across Biscayne Bay toward the twinkling Miami skyline."
  },
  {
    id: "prop-4",
    title: "Eaton Square Regency Mansion",
    tagline: "Grade II* Listed Ambassadorial Freehold with Private Garden Square",
    price: 58000000,
    priceFormatted: "£45,000,000 ($58M)",
    rentalPrice: "$120,000 / mo",
    address: "72 Eaton Square",
    neighborhood: "Belgravia",
    city: "London",
    state: "UK",
    zip: "SW1W 9BN",
    category: "Historic",
    listingType: "buy",
    status: "Exclusive",
    beds: 6, baths: 8, sqft: 11400, sqm: 1059,
    lotSize: "Private Mews & Courtyard", yearBuilt: 1835, hoa: "£850 / mo", taxesAnnual: "£78,000", capRate: "4.5%",
    featured: true,
    mapCoords: {"x":52,"y":32}, coordinates: {"lat":51.4934,"lng":-0.1537},
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":5,"ceilingHeight":"15 FT First Floor Salons","outdoorDeck":"Private Terraced Garden","galleryCars":3,"planImage":"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Keyed Access to Private Eaton Square Gardens","Gilded Regency Entertaining Ballrooms","Sub-Terranean Heated Pool & Hammam","Passenger Elevator to All 5 Levels","Separate Two-Bedroom Staff Mews House","Air Conditioning throughout (Rare in Belgravia)","Bespoke Clive Christian Handcrafted Kitchen"],
    agent: {"name":"Alistair Montgomery","title":"Managing Director | EMEA Luxury","phone":"+44 20 7946 0912","email":"alistair.m@sterlingkey.co.uk","image":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"},
    description: "An extraordinary ambassadorial residence in London's premier garden square. Restored over four years with classical Regency cornicing, French polished parquetry, and subterranean subterranean leisure facilities featuring a 12-meter pool, gym, and cinema."
  },
  {
    id: "prop-5",
    title: "The Summit Sanctuary at Red Mountain",
    tagline: "Ultra-High-Net-Worth Alpine Enclave with Direct Ski-In/Ski-Out",
    price: 32000000,
    priceFormatted: "$32,000,000",
    rentalPrice: "$95,000 / mo",
    address: "240 Red Mountain Road",
    neighborhood: "Red Mountain",
    city: "Aspen",
    state: "CO",
    zip: "81611",
    category: "Architectural",
    listingType: "buy",
    status: "Exclusive",
    beds: 6, baths: 9, sqft: 9850, sqm: 915,
    lotSize: "2.10 Mountain Acres", yearBuilt: 2023, hoa: "$800 / mo", taxesAnnual: "$165,000", capRate: "6.8%",
    featured: true,
    mapCoords: {"x":38,"y":44}, coordinates: {"lat":39.1911,"lng":-106.8175},
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":3,"ceilingHeight":"18 FT Vaulted Cedar","outdoorDeck":"3,200 SF Heated Terrace","galleryCars":4,"planImage":"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Unobstructed Views of Aspen Mountain & Ajax","Heated Snow-Melt Driveway & Motor Court","Custom Ski Locker Room with Boot Warmers","Outdoor Heated Infinity Spa overlooking Roaring Fork","Massive Colorado Moss Stone Fireplaces","Temperature-Regulated Oxygenated Master Suites"],
    agent: {"name":"Julian Vance","title":"Senior Vice President | Luxury Estates","phone":"+1 (310) 849-2910","email":"julian.vance@sterlingkey.com","image":"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"},
    description: "Positioned on Aspen's coveted 'Billionaire Mountain', this organic architectural marvel frames uninterrupted vistas of Aspen Mountain. Crafted with Douglas Fir timbers, hand-cut stone masonry, and geothermal in-floor radiant heating."
  },
  {
    id: "prop-6",
    title: "The Palm Crown Royal Villa",
    tagline: "Private Beachfront Palace on Palm Jumeirah Billionaires' Frond",
    price: 75000000,
    priceFormatted: "AED 275,000,000 ($75M)",
    rentalPrice: null,
    address: "Frond G, Palm Jumeirah",
    neighborhood: "Palm Jumeirah",
    city: "Dubai",
    state: "UAE",
    zip: "00000",
    category: "Waterfront",
    listingType: "buy",
    status: "Exclusive",
    beds: 7, baths: 10, sqft: 18500, sqm: 1718,
    lotSize: "0.85 Beachfront Acres", yearBuilt: 2024, hoa: "AED 3,500 / mo", taxesAnnual: "$0 (Tax-Free Sovereign Haven)", capRate: "7.8%",
    featured: true,
    mapCoords: {"x":88,"y":48}, coordinates: {"lat":25.1124,"lng":55.139},
    images: [
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":3,"ceilingHeight":"24 FT Grand Atrium","outdoorDeck":"Private White Sand Beach","galleryCars":6,"planImage":"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["150-Foot Private White Sand Beach","24-Karat Gold leaf ceiling accents","Rooftop Lounge with Dubai Marina Skyline Views","Sub-Aquatic Indoor Aquarium Dining Room","Private Yacht Mooring Buoy","24/7 Gated Security Frond Access"],
    agent: {"name":"Tariq Al-Mansoor","title":"Senior Partner | Middle East & Gulf Advisory","phone":"+971 4 388 9200","email":"tariq.mansoor@sterlingkey.ae","image":"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"},
    description: "Commanding the most exclusive tip of Frond G on Palm Jumeirah, this architectural monument represents the pinnacle of Arabian Gulf luxury. Offering complete tax-free sovereign wealth shelter, private beach access, and custom Baccarat chandeliers."
  },
  {
    id: "prop-7",
    title: "The Tribeca Cast Iron Penthouse",
    tagline: "Historic Landmark Cast Iron Building Topped by a Modern Glass Pavilion",
    price: 26500000,
    priceFormatted: "$26,500,000",
    rentalPrice: "$65,000 / mo",
    address: "6 Hubert Street, Penthouse",
    neighborhood: "Tribeca",
    city: "New York",
    state: "NY",
    zip: "10013",
    category: "New Developments",
    listingType: "buy",
    status: "Just Listed",
    beds: 4, baths: 5.5, sqft: 6200, sqm: 576,
    lotSize: "2,400 SF Private Roof Terrace", yearBuilt: 2022, hoa: "$8,200 / mo", taxesAnnual: "$142,000", capRate: "5.2%",
    featured: false,
    mapCoords: {"x":73,"y":41}, coordinates: {"lat":40.7196,"lng":-74.0089},
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":2,"ceilingHeight":"13 FT Exposed Timber","outdoorDeck":"2,400 SF Landscaped Roof Garden","galleryCars":1,"planImage":"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Heated Gunite Pool on Rooftop Terrace","Direct Keyed Elevator Entry into Residence","Restored Original 19th-Century Cast Iron Columns","Custom Poliform Italian Kitchen with Gaggenau 400 Series","Soundproof Music & Podcast Studio","Deeded On-Site Automated Parking Space"],
    agent: {"name":"Eleanor Sterling-Hayes","title":"Managing Partner | New York Flagship","phone":"+1 (212) 791-8840","email":"eleanor.sterling@sterlingkey.com","image":"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"},
    description: "In the heart of cobblestone Tribeca, this dramatic duplex penthouse merges 1890s industrial grandeur with contemporary minimalism. Features a rooftop heated pool framed by unobstructed Hudson River sunsets."
  },
  {
    id: "prop-8",
    title: "The Bradbury Estate at Beverly Park",
    tagline: "Gated Sovereign Enclave with 360-Degree Mountain Security",
    price: 45000000,
    priceFormatted: "$45,000,000",
    rentalPrice: null,
    address: "22 Beverly Park Circle",
    neighborhood: "Beverly Hills",
    city: "Los Angeles",
    state: "CA",
    zip: "90210",
    category: "Historic",
    listingType: "buy",
    status: "Exclusive",
    beds: 9, baths: 14, sqft: 22000, sqm: 2044,
    lotSize: "3.20 Flat Acres", yearBuilt: 2021, hoa: "$4,200 / mo", taxesAnnual: "$410,000", capRate: "5.5%",
    featured: false,
    mapCoords: {"x":25,"y":53}, coordinates: {"lat":34.1165,"lng":-118.4239},
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":3,"ceilingHeight":"16 FT Coffered Ceilings","outdoorDeck":"Formal Italianate Parterre Gardens","galleryCars":12,"planImage":"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Dual Guard-Gated Security Access","Championship Lit Tennis Court","Olympic-Sized Resort Pool & Pavilion","Separate Two-Bedroom Security & Staff Quarters","Commercial Catering Kitchen for 200 Guests","Full Spa & Hammam with Infrared Sauna"],
    agent: {"name":"Julian Vance","title":"Senior Vice President | Luxury Estates","phone":"+1 (310) 849-2910","email":"julian.vance@sterlingkey.com","image":"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"},
    description: "Positioned inside the legendary North Beverly Park enclave, this neoclassical estate offers the utmost discretion and privacy. Impeccable limestone masonry, imported French limestone fountains, and 3.2 acres of pristine level grounds."
  },
  {
    id: "prop-9",
    title: "Villa Bella Vista at Cap d'Antibes",
    tagline: "Belle Époque Waterfront Icon Overlooking the Mediterranean Sea",
    price: 54000000,
    priceFormatted: "€49,500,000 ($54M)",
    rentalPrice: "$160,000 / mo",
    address: "Boulevard de la Garoupe",
    neighborhood: "Cap d'Antibes",
    city: "Monaco & French Riviera",
    state: "France",
    zip: "06160",
    category: "Waterfront",
    listingType: "buy",
    status: "Exclusive",
    beds: 8, baths: 10, sqft: 12800, sqm: 1190,
    lotSize: "1.80 Coastal Acres", yearBuilt: 2022, hoa: "€1,200 / mo", taxesAnnual: "€92,000", capRate: "6.2%",
    featured: true,
    mapCoords: {"x":55,"y":38}, coordinates: {"lat":43.5512,"lng":7.1278},
    images: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":3,"ceilingHeight":"15 FT","outdoorDeck":"Terraced Mediterranean Gardens","galleryCars":6,"planImage":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Direct Private Sea Access & Private Jetty","Infinity Heated Saltwater Pool with Sea Panoramas","Century-Old Pine & Olive Groves","Dedicated Captain & Staff Quarters","Cannes & Antibes Fireworks Vistas","Helipad Landing Rights"],
    agent: {"name":"Alistair Montgomery","title":"Managing Director | EMEA Luxury","phone":"+44 20 7946 0912","email":"alistair.m@sterlingkey.co.uk","image":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"},
    description: "Perched above the crystalline waters of the Côte d'Azur, Villa Bella Vista embodies the timeless glamour of the French Riviera. Featuring stone promenades directly to the water, lush private gardens, and unmatched sunset views toward the Lerins Islands."
  },
  {
    id: "prop-10",
    title: "The Glass Pavilion on Malibu Bluffs",
    tagline: "Cantilevered Coastal Masterpiece Floating Above Carbon Beach",
    price: 29500000,
    priceFormatted: "$29,500,000",
    rentalPrice: "$85,000 / mo",
    address: "21804 Pacific Coast Highway",
    neighborhood: "Malibu Bluffs",
    city: "Los Angeles",
    state: "CA",
    zip: "90265",
    category: "Architectural",
    listingType: "buy",
    status: "Just Listed",
    beds: 5, baths: 7, sqft: 8400, sqm: 780,
    lotSize: "1.10 Blufftop Acres", yearBuilt: 2024, hoa: "$950 / mo", taxesAnnual: "$280,000", capRate: "6.5%",
    featured: false,
    mapCoords: {"x":19,"y":58}, coordinates: {"lat":34.0381,"lng":-118.665},
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":2,"ceilingHeight":"16 FT Glass Walls","outdoorDeck":"Cantilevered Teak Deck","galleryCars":4,"planImage":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Private Staircase to Billionaire's Beach","75-Foot Cantilevered Glass Swimming Pool","Motorized Floor-to-Ceiling Swiss Glass Facades","Copenhagen Boffi Kitchen with White Marble Island","Japanese Zen Courtyard with Bonsai Garden","Tesla Solar Roof & Powerwall Micro-Grid"],
    agent: {"name":"Julian Vance","title":"Senior Vice President | Luxury Estates","phone":"+1 (310) 849-2910","email":"julian.vance@sterlingkey.com","image":"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"},
    description: "Designed by an internationally celebrated Pritzker-winning architect, this Malibu bluff compound appears to hover over the crashing Pacific surf. Offering unmatched privacy, architectural purity, and direct shoreline access."
  },
  {
    id: "prop-11",
    title: "Palazzo di San Marco at Lake Como",
    tagline: "18th-Century Aristocratic Villa with Private Deepwater Boathouse",
    price: 42000000,
    priceFormatted: "€38,500,000 ($42M)",
    rentalPrice: "$110,000 / mo",
    address: "Via Regina 45, Bellagio",
    neighborhood: "Bellagio",
    city: "Lake Como & Milan",
    state: "Italy",
    zip: "22021",
    category: "Historic",
    listingType: "buy",
    status: "Exclusive",
    beds: 9, baths: 11, sqft: 15400, sqm: 1430,
    lotSize: "3.50 Terraced Botanical Acres", yearBuilt: 1780, hoa: "€800 / mo", taxesAnnual: "€64,000", capRate: "5.4%",
    featured: true,
    mapCoords: {"x":57,"y":35}, coordinates: {"lat":45.987,"lng":9.2625},
    images: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":4,"ceilingHeight":"18 FT Frescoed Ceilings","outdoorDeck":"Private Lake Pier","galleryCars":4,"planImage":"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Covered Boathouse with Classic Riva Mooring","Original Italian Renaissance Frescoes","Terraced Cypress Gardens & Citrus Orangerie","Heated Pool overlooking the Lake Como Y","Private Wine Tasting Cellar with 3,000 Bottles","Helicopter Transfer Pad Landing Area"],
    agent: {"name":"Alistair Montgomery","title":"Managing Director | EMEA Luxury","phone":"+44 20 7946 0912","email":"alistair.m@sterlingkey.co.uk","image":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"},
    description: "One of Lake Como's most distinguished heritage landmarks. With private deepwater moorings, botanical gardens planted in the 18th century, and restored frescoed salons where European aristocracy convened."
  },
  {
    id: "prop-12",
    title: "The Mayfair Garden Mansion",
    tagline: "Ultra-Prime Freehold Townhouse with Private Spa & Car Lift",
    price: 36000000,
    priceFormatted: "£28,500,000 ($36M)",
    rentalPrice: "$80,000 / mo",
    address: "14 Chesterfield Gardens",
    neighborhood: "Mayfair",
    city: "London",
    state: "UK",
    zip: "W1J 5BD",
    category: "Historic",
    listingType: "buy",
    status: "Just Listed",
    beds: 6, baths: 8, sqft: 9200, sqm: 855,
    lotSize: "Private Mews Freehold", yearBuilt: 1890, hoa: "£650 / mo", taxesAnnual: "£55,000", capRate: "4.8%",
    featured: false,
    mapCoords: {"x":53,"y":31}, coordinates: {"lat":51.5065,"lng":-0.1498},
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":6,"ceilingHeight":"14 FT","outdoorDeck":"Private Roof Loggia","galleryCars":2,"planImage":"https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Hydraulic Underground Automobile Lift","Full Subterranean Wellness Suite with Pool","Direct Keyed Lift to All 6 Floors","State-of-the-Art Private Cinema Room","Formal Victorian Drawing Room with Marble Mantels","Bespoke Wine Display Room"],
    agent: {"name":"Alistair Montgomery","title":"Managing Director | EMEA Luxury","phone":"+44 20 7946 0912","email":"alistair.m@sterlingkey.co.uk","image":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"},
    description: "Located moments from Berkeley Square and Hyde Park, this Mayfair trophy freehold features an unprecedented combination of historic grandeur and engineering sophistication including a hydraulic car lift and private wellness sanctuary."
  },
  {
    id: "prop-13",
    title: "The Sky Palace at DIFC",
    tagline: "Triplex Penthouse Towering Above the Dubai Financial Hub",
    price: 18500000,
    priceFormatted: "AED 68,000,000 ($18.5M)",
    rentalPrice: "$45,000 / mo",
    address: "Gate Precinct 4, DIFC",
    neighborhood: "DIFC",
    city: "Dubai",
    state: "UAE",
    zip: "00000",
    category: "Penthouses",
    listingType: "buy",
    status: "Exclusive",
    beds: 5, baths: 7, sqft: 8900, sqm: 827,
    lotSize: "Triplex Penthouse", yearBuilt: 2024, hoa: "AED 2,800 / mo", taxesAnnual: "$0 (Tax-Free)", capRate: "8.2%",
    featured: false,
    mapCoords: {"x":89,"y":47}, coordinates: {"lat":25.2048,"lng":55.2708},
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":3,"ceilingHeight":"20 FT Glass","outdoorDeck":"Private Sky Pool Terrace","galleryCars":3,"planImage":"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Private Heated Sky Pool on 60th Floor","Direct VVIP Elevator with Facial Recognition","Burj Khalifa & Arabian Sea Unobstructed Vistas","Gold-Leaf Finish Master Suite with Cigar Lounge","Personal Butler Service Station","Exclusive DIFC Club Access"],
    agent: {"name":"Tariq Al-Mansoor","title":"Senior Partner | Middle East & Gulf Advisory","phone":"+971 4 388 9200","email":"tariq.mansoor@sterlingkey.ae","image":"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"},
    description: "Floating atop the Middle East's premier financial center, this triplex penthouse offers sovereign wealth grade luxury and phenomenal capital appreciation with zero corporate and income taxes."
  },
  {
    id: "prop-14",
    title: "The Greenwich Village Townhouse",
    tagline: "25-Foot Wide Historic Greek Revival Landmark on West 10th",
    price: 24000000,
    priceFormatted: "$24,000,000",
    rentalPrice: "$55,000 / mo",
    address: "28 West 10th Street",
    neighborhood: "Greenwich Village",
    city: "New York",
    state: "NY",
    zip: "10011",
    category: "Historic",
    listingType: "buy",
    status: "Exclusive",
    beds: 6, baths: 7.5, sqft: 7800, sqm: 725,
    lotSize: "Private Landscaped Garden", yearBuilt: 1848, hoa: "$0 / mo (Single Family)", taxesAnnual: "$84,000", capRate: "5.1%",
    featured: false,
    mapCoords: {"x":72,"y":40}, coordinates: {"lat":40.7336,"lng":-73.9987},
    images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":5,"ceilingHeight":"13 FT","outdoorDeck":"Private English Garden","galleryCars":0,"planImage":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Private South-Facing English Tea Garden","Elevator to All Five Levels","Wine Cellar with 2,500 Bottle Capacity","Original Hand-Carved Marble Mantels","Primary Suite with Dual Dressing Rooms","Gas Heated Rooftop Solarium"],
    agent: {"name":"Eleanor Sterling-Hayes","title":"Managing Partner | New York Flagship","phone":"+1 (212) 791-8840","email":"eleanor.sterling@sterlingkey.com","image":"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"},
    description: "Located on one of the Gold Coast's most photogenic brownstone blocks, this 25-foot wide townhouse represents quintessential historic New York elegance restored with museum-grade precision."
  },
  {
    id: "prop-15",
    title: "Casa del Sol on Key Biscayne",
    tagline: "Tropical Modern Deepwater Estate with Unobstructed Bay Views",
    price: 19800000,
    priceFormatted: "$19,800,000",
    rentalPrice: "$60,000 / mo",
    address: "350 Harbor Drive",
    neighborhood: "Key Biscayne",
    city: "Miami & Coastal Islands",
    state: "FL",
    zip: "33149",
    category: "Waterfront",
    listingType: "buy",
    status: "Just Listed",
    beds: 6, baths: 8, sqft: 8900, sqm: 827,
    lotSize: "0.60 Deepwater Acres", yearBuilt: 2023, hoa: "$450 / mo", taxesAnnual: "$190,000", capRate: "6.7%",
    featured: false,
    mapCoords: {"x":80,"y":80}, coordinates: {"lat":25.6938,"lng":-80.1627},
    images: [
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":2,"ceilingHeight":"14 FT","outdoorDeck":"Travertine Pool Terrace","galleryCars":3,"planImage":"https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["100-Foot Deepwater Dock for 85-Foot Yacht","Resort Saltwater Pool & In-Ground Spa","Outdoor Coral Stone Summer Kitchen","Seamless Indoor/Outdoor Glass Pocket Doors","Custom Italian MiaCucina Kitchen","Private Key Biscayne Beach Club Membership"],
    agent: {"name":"Mateo Rodriguez","title":"Director of Coastal Acquisitions","phone":"+1 (305) 912-4411","email":"mateo.rodriguez@sterlingkey.com","image":"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"},
    description: "A tranquil island retreat bathed in southern sunshine. Direct ocean access without fixed bridges, lush native landscaping, and pristine contemporary architecture built to withstand Category 5 hurricanes."
  },
  {
    id: "prop-16",
    title: "The Alpine Chalet at Snowmass",
    tagline: "Architectural Ski Sanctuary with Direct Slope Access",
    price: 21500000,
    priceFormatted: "$21,500,000",
    rentalPrice: "$75,000 / mo",
    address: "510 Wood Run Road",
    neighborhood: "Snowmass",
    city: "Aspen & Snowmass",
    state: "CO",
    zip: "81615",
    category: "New Developments",
    listingType: "buy",
    status: "Exclusive",
    beds: 5, baths: 7, sqft: 7600, sqm: 706,
    lotSize: "1.40 Acres Slopefront", yearBuilt: 2024, hoa: "$600 / mo", taxesAnnual: "$112,000", capRate: "7.1%",
    featured: false,
    mapCoords: {"x":37,"y":45}, coordinates: {"lat":39.213,"lng":-106.9378},
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":3,"ceilingHeight":"16 FT Timber","outdoorDeck":"Heated Ski Deck","galleryCars":3,"planImage":"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Direct Ski-In / Ski-Out onto Dawdler Run","Commercial Heated Boot & Ski Lounge","Infinity Edge Hot Springs Style Hot Tub","Two-Story Double-Sided Hearth","Oxygen Enriched Sleeping Chambers","Heated Heated Driveway & Motorcourt"],
    agent: {"name":"Julian Vance","title":"Senior Vice President | Luxury Estates","phone":"+1 (310) 849-2910","email":"julian.vance@sterlingkey.com","image":"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"},
    description: "Engineered for elite winter athletes and family retreats alike. Step into fresh powder straight from your private ski locker room, and return to custom steam rooms and roaring wood fires."
  },
  {
    id: "prop-17",
    title: "Le Marais Aristocratic Hôtel Particulier",
    tagline: "17th-Century Private Paris Palace with Cour d'Honneur",
    price: 31000000,
    priceFormatted: "€28,500,000 ($31M)",
    rentalPrice: "$70,000 / mo",
    address: "Rue des Francs-Bourgeois",
    neighborhood: "Le Marais",
    city: "Paris",
    state: "France",
    zip: "75004",
    category: "Historic",
    listingType: "buy",
    status: "Exclusive",
    beds: 7, baths: 9, sqft: 10200, sqm: 948,
    lotSize: "Private Cobblestone Courtyard", yearBuilt: 1685, hoa: "€950 / mo", taxesAnnual: "€62,000", capRate: "4.7%",
    featured: true,
    mapCoords: {"x":54,"y":34}, coordinates: {"lat":48.8575,"lng":2.359},
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":4,"ceilingHeight":"16 FT Gilded Salons","outdoorDeck":"Private French Garden","galleryCars":3,"planImage":"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Gated Carriage Entrance & Private Cour d'Honneur","Restored Louis XIV Boiserie & Gold Leaf Molding","Private Japanese Landscaped Garden","Elevator to All Four Stories","Caterer Grade Lower Level Kitchen","Separate Caretaker Apartment"],
    agent: {"name":"Alistair Montgomery","title":"Managing Director | EMEA Luxury","phone":"+44 20 7946 0912","email":"alistair.m@sterlingkey.co.uk","image":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"},
    description: "An exceptionally rare private mansion in central Paris, shielded from public view by magnificent carriage gates. Restored over five years to marry royal French history with modern air conditioning and security infrastructure."
  },
  {
    id: "prop-18",
    title: "The Toranomon Sky Duplex",
    tagline: "High-Rise Architectural Masterpiece Floating Over Tokyo Tower",
    price: 22000000,
    priceFormatted: "¥3,400,000,000 ($22M)",
    rentalPrice: "$50,000 / mo",
    address: "1-1-1 Toranomon, Minato-ku",
    neighborhood: "Toranomon",
    city: "Tokyo",
    state: "Japan",
    zip: "105-0001",
    category: "Penthouses",
    listingType: "buy",
    status: "Just Listed",
    beds: 4, baths: 5, sqft: 5800, sqm: 539,
    lotSize: "Tower Duplex", yearBuilt: 2024, hoa: "¥240,000 / mo", taxesAnnual: "$48,000", capRate: "5.0%",
    featured: false,
    mapCoords: {"x":92,"y":39}, coordinates: {"lat":35.6698,"lng":139.7497},
    images: [
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":2,"ceilingHeight":"15 FT","outdoorDeck":"Private Sky Loggia","galleryCars":2,"planImage":"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Direct View of Tokyo Tower & Mt. Fuji on Clear Days","Hinoki Wood Soaking Bath with Panoramic City Vistas","Traditional Japanese Tea Ceremony Room","Seismic Damper Technology Engineered for 9.0 Magnitude","Concierge Speaking Japanese, English, and Mandarin","Dedicated High-Speed Resident Elevator"],
    agent: {"name":"Kenji Takahashi","title":"Director of Asia-Pacific Wealth","phone":"+81 3 5555 0192","email":"kenji.takahashi@sterlingkey.jp","image":"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"},
    description: "Refined Japanese aesthetic simplicity meets cutting-edge engineering. Toranomon Hills represents Japan's most dynamic luxury district, offering complete economic safety, ultra-clean urban living, and world-class dining."
  },
  {
    id: "prop-19",
    title: "Villa Léman Waterfront Estate",
    tagline: "Private Lake Geneva Domain with View of Mont Blanc",
    price: 46000000,
    priceFormatted: "CHF 41,000,000 ($46M)",
    rentalPrice: null,
    address: "Route de Lausanne 112, Cologny",
    neighborhood: "Cologny",
    city: "Geneva & Swiss Alps",
    state: "Switzerland",
    zip: "1223",
    category: "Waterfront",
    listingType: "buy",
    status: "Exclusive",
    beds: 7, baths: 9, sqft: 13500, sqm: 1254,
    lotSize: "2.40 Lakefront Acres", yearBuilt: 2023, hoa: "CHF 1,100 / mo", taxesAnnual: "CHF 85,000", capRate: "4.6%",
    featured: true,
    mapCoords: {"x":56,"y":36}, coordinates: {"lat":46.2167,"lng":6.1833},
    images: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":3,"ceilingHeight":"15 FT","outdoorDeck":"Private Lake Dock","galleryCars":6,"planImage":"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Private Shoreline & Heated Boathouse","Swiss Bank Grade Reinforced Vault & Panic Room","Indoor 20-Meter Lap Pool with Mountain Views","Smart Geothermal Eco-Heating Micro-Plant","Adjacent Guard and Chauffeur Cottage","High Sovereign Neutrality & Privacy Jurisdiction"],
    agent: {"name":"Alistair Montgomery","title":"Managing Director | EMEA Luxury","phone":"+44 20 7946 0912","email":"alistair.m@sterlingkey.co.uk","image":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"},
    description: "Positioned in Cologny, Switzerland's most prestigious postal code. Direct private frontage on Lake Geneva, pristine snowcapped views of Mont Blanc, and absolute sovereign geopolitical stability."
  },
  {
    id: "prop-20",
    title: "The Point House at Lyford Cay",
    tagline: "Private Gated Bahamas Compound with Coral Sands & Yacht Marina",
    price: 34500000,
    priceFormatted: "$34,500,000",
    rentalPrice: "$100,000 / mo",
    address: "Lyford Cay Drive, New Providence",
    neighborhood: "Lyford Cay",
    city: "Bahamas",
    state: "Bahamas",
    zip: "00000",
    category: "Waterfront",
    listingType: "buy",
    status: "Exclusive",
    beds: 7, baths: 9, sqft: 11200, sqm: 1040,
    lotSize: "1.75 Oceanfront Acres", yearBuilt: 2022, hoa: "$1,800 / mo", taxesAnnual: "$0 (Tax-Advantaged)", capRate: "7.4%",
    featured: false,
    mapCoords: {"x":81,"y":79}, coordinates: {"lat":25.0333,"lng":-77.5333},
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":2,"ceilingHeight":"16 FT","outdoorDeck":"Private Beach Veranda","galleryCars":4,"planImage":"https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Private Protected Canal Yacht Basin for 120-FT Vessel","Private Powder-Soft Coral Sand Beach","Lyford Cay Club Membership Eligibility","Full Solar Integration with Desalination Plant","Two-Bedroom Guest Cottage","24-Hour Military-Grade Gated Security"],
    agent: {"name":"Mateo Rodriguez","title":"Director of Coastal Acquisitions","phone":"+1 (305) 912-4411","email":"mateo.rodriguez@sterlingkey.com","image":"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"},
    description: "Located within the world's most storied private island community, Lyford Cay has hosted royalty and business leaders for decades. Offering 0% capital gains tax and pristine turquoise ocean panoramas."
  },
  {
    id: "prop-21",
    title: "The Sydney Harbour Waterfront Masterpiece",
    tagline: "Iconic Point Piper Compound Framing Opera House & Harbour Bridge",
    price: 39000000,
    priceFormatted: "A$59,000,000 ($39M)",
    rentalPrice: "$90,000 / mo",
    address: "Wolseley Road, Point Piper",
    neighborhood: "Point Piper",
    city: "Sydney",
    state: "Australia",
    zip: "2027",
    category: "Waterfront",
    listingType: "buy",
    status: "Exclusive",
    beds: 6, baths: 8, sqft: 9800, sqm: 910,
    lotSize: "0.45 Waterfront Acres", yearBuilt: 2023, hoa: "A$1,200 / mo", taxesAnnual: "A$140,000", capRate: "5.6%",
    featured: false,
    mapCoords: {"x":94,"y":82}, coordinates: {"lat":-33.8648,"lng":151.2514},
    images: [
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":4,"ceilingHeight":"14 FT","outdoorDeck":"Private Harbour Jetty","galleryCars":4,"planImage":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Private Deepwater Jetty & Slipway with Boathouse","Uninterrupted Postcard Views of Sydney Harbour Bridge","Commercial Grade Inclined Glass Lift to Water","Heated Wet-Edge Pool merging with the Harbour","Wine Cellar for 1,800 Premium Bottles","Comprehensive Smart Security Network"],
    agent: {"name":"Kenji Takahashi","title":"Director of Asia-Pacific Wealth","phone":"+81 3 5555 0192","email":"kenji.takahashi@sterlingkey.jp","image":"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"},
    description: "Positioned along Australia's most valuable residential strip on Point Piper. Watch superyachts glide past your terrace against the backdrop of the Sydney Opera House and sunset over the bridge."
  },
  {
    id: "prop-22",
    title: "The Carré d'Or Sky Penthouse",
    tagline: "Trophy Triplex Residence with 360-Degree Views of the Monaco Grand Prix",
    price: 68000000,
    priceFormatted: "€62,000,000 ($68M)",
    rentalPrice: "$200,000 / mo",
    address: "Avenue Princesse Grace",
    neighborhood: "Monte Carlo",
    city: "Monaco & French Riviera",
    state: "Monaco",
    zip: "98000",
    category: "Penthouses",
    listingType: "buy",
    status: "Exclusive",
    beds: 5, baths: 6.5, sqft: 7400, sqm: 687,
    lotSize: "Triplex Roof Terrace", yearBuilt: 2024, hoa: "€4,800 / mo", taxesAnnual: "€0 (Tax-Free Sovereign Haven)", capRate: "4.9%",
    featured: true,
    mapCoords: {"x":56,"y":37}, coordinates: {"lat":43.7384,"lng":7.4246},
    images: [
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":3,"ceilingHeight":"14 FT","outdoorDeck":"Private Sky Pool Terrace","galleryCars":4,"planImage":"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Private Heated Rooftop Infinity Pool","Front-Row Balcony over the Formula 1 Grand Prix Circuit","24/7 White-Glove Concierge & Valet Service","Direct Private Keyed Elevator Access","Full Sovereign Residency Qualification Assistance","Subterranean 4-Car Enclosed Garage"],
    agent: {"name":"Alistair Montgomery","title":"Managing Director | EMEA Luxury","phone":"+44 20 7946 0912","email":"alistair.m@sterlingkey.co.uk","image":"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"},
    description: "The apex of Mediterranean luxury living in Monaco's most sought-after golden square. Overlook mega-yachts in Port Hercules and the Mediterranean horizon, with zero personal income, wealth, or capital gains tax."
  },
  {
    id: "prop-23",
    title: "The Brentwood Modern Villa",
    tagline: "Organic Warm Modernism in Mandeville Canyon",
    price: 16750000,
    priceFormatted: "$16,750,000",
    rentalPrice: "$48,000 / mo",
    address: "1820 Mandeville Canyon Road",
    neighborhood: "Brentwood",
    city: "Los Angeles",
    state: "CA",
    zip: "90049",
    category: "New Developments",
    listingType: "buy",
    status: "Just Listed",
    beds: 6, baths: 8, sqft: 9100, sqm: 845,
    lotSize: "0.92 Flat Acres", yearBuilt: 2024, hoa: "$0 / mo", taxesAnnual: "$160,000", capRate: "6.1%",
    featured: false,
    mapCoords: {"x":23,"y":54}, coordinates: {"lat":34.0722,"lng":-118.4988},
    images: [
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":2,"ceilingHeight":"14 FT","outdoorDeck":"Travertine Pool Lounge","galleryCars":3,"planImage":"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Zero-Edge PebbleTec Pool & Built-In Sunken Firepit","Custom Teak Wood Accents & Polished Concrete Walls","Sub-Zero and Wolf Master Chef Kitchen","Private Screening Room with 150-inch Laser Projector","Full Home Gym with Steam Shower","Smart App-Controlled Lighting and Security"],
    agent: {"name":"Julian Vance","title":"Senior Vice President | Luxury Estates","phone":"+1 (310) 849-2910","email":"julian.vance@sterlingkey.com","image":"https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"},
    description: "Nestled in serene Mandeville Canyon, this newly constructed architectural sanctuary marries natural cedar and board-formed concrete with effortless indoor-outdoor flow into flat, private sun-drenched grounds."
  },
  {
    id: "prop-24",
    title: "The Fisher Island Oceanside Villa",
    tagline: "Ultra-Exclusive Private Island Residence Accessible Only by Ferry or Yacht",
    price: 28000000,
    priceFormatted: "$28,000,000",
    rentalPrice: "$75,000 / mo",
    address: "7111 Fisher Island Drive",
    neighborhood: "Fisher Island",
    city: "Miami & Coastal Islands",
    state: "FL",
    zip: "33109",
    category: "Waterfront",
    listingType: "buy",
    status: "Exclusive",
    beds: 5, baths: 6.5, sqft: 7900, sqm: 734,
    lotSize: "Private Ocean Terrace", yearBuilt: 2023, hoa: "$4,100 / mo", taxesAnnual: "$260,000", capRate: "6.9%",
    featured: false,
    mapCoords: {"x":80,"y":77}, coordinates: {"lat":25.7617,"lng":-80.1408},
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80",
    ],
    floorPlan: {"levels":1,"ceilingHeight":"13 FT","outdoorDeck":"1,800 SF Ocean Loggia","galleryCars":2,"planImage":"https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"},
    amenities: ["Private Golf Cart Included with Residence","Panoramic Atlantic Ocean & Government Cut Ship Channel Views","Private Beach Club with Bahamian Sand","Vanderbilt Mansion Tennis & Spa Privileges","Gated Auto-Ferry with 24/7 Security Escort","Deepwater Marina Slip Available"],
    agent: {"name":"Mateo Rodriguez","title":"Director of Coastal Acquisitions","phone":"+1 (305) 912-4411","email":"mateo.rodriguez@sterlingkey.com","image":"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"},
    description: "America's most affluent zip code. Fisher Island offers absolute privacy and safety, accessible exclusively via private 7-minute passenger ferry or private yacht, with private beaches and championship golf."
  }
];

export const NEIGHBORHOODS_DATA = [
  {
    "id": "manhattan",
    "name": "Manhattan, New York",
    "tag": "Global Capital of Culture & Finance",
    "medianPrice": "$4,850,000",
    "avgYield": "4.8%",
    "activeCount": "14 Properties",
    "image": "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=1000&q=80",
    "districts": [
      "Billionaires' Row",
      "Tribeca",
      "West Village",
      "SoHo",
      "Upper East Side"
    ],
    "description": "Unrivaled urban prestige, world-renowned architecture, and enduring capital preservation."
  },
  {
    "id": "los-angeles",
    "name": "Los Angeles, California",
    "tag": "Hollywood Glamour & Coastal Mastery",
    "medianPrice": "$6,900,000",
    "avgYield": "5.6%",
    "activeCount": "18 Properties",
    "image": "https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=1000&q=80",
    "districts": [
      "Bel-Air",
      "Beverly Hills",
      "Malibu Bluffs",
      "Hollywood Hills",
      "Brentwood"
    ],
    "description": "Sprawling gated estates, iconic mid-century masterpieces, and panoramic Pacific sunsets."
  },
  {
    "id": "miami",
    "name": "Miami & Coastal Islands, Florida",
    "tag": "Waterfront Capital & Tax-Advantaged Living",
    "medianPrice": "$5,200,000",
    "avgYield": "7.2%",
    "activeCount": "16 Properties",
    "image": "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=1000&q=80",
    "districts": [
      "Star Island",
      "Brickell Avenue",
      "Coconut Grove",
      "Fisher Island",
      "Venetian Islands"
    ],
    "description": "Year-round deepwater yachting, vibrant culinary scene, and zero state income tax magnetism."
  },
  {
    "id": "london",
    "name": "Central London, United Kingdom",
    "tag": "Timeless Aristocratic Heritage & Prime Global Real Estate",
    "medianPrice": "£4,250,000",
    "avgYield": "4.5%",
    "activeCount": "12 Properties",
    "image": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1000&q=80",
    "districts": [
      "Mayfair",
      "Belgravia",
      "Knightsbridge",
      "Chelsea",
      "Kensington"
    ],
    "description": "Centuries of royal prestige, Grade II listed garden squares, and unparalleled sovereign security."
  },
  {
    "id": "aspen",
    "name": "Aspen & Snowmass, Colorado",
    "tag": "Ultra-High-Net-Worth Mountain Enclave",
    "medianPrice": "$12,400,000",
    "avgYield": "6.9%",
    "activeCount": "9 Properties",
    "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
    "districts": [
      "Red Mountain",
      "Downtown Historic Core",
      "Starwood",
      "West End",
      "Snowmass"
    ],
    "description": "The world's premier winter alpine playground with strictly bounded land development."
  },
  {
    "id": "dubai",
    "name": "Dubai, United Arab Emirates",
    "tag": "Tax-Free Sovereign Sanctuary & Futuristic Architecture",
    "medianPrice": "AED 18,500,000",
    "avgYield": "7.8%",
    "activeCount": "22 Properties",
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",
    "districts": [
      "Palm Jumeirah",
      "Emirates Hills",
      "DIFC",
      "Downtown Dubai",
      "Jumeirah Bay"
    ],
    "description": "Zero income tax, world-leading infrastructure, and exponential luxury capital appreciation."
  },
  {
    "id": "monaco",
    "name": "Monaco & French Riviera",
    "tag": "Côte d'Azur Grandeur & Tax-Free Sovereign Enclave",
    "medianPrice": "€16,800,000",
    "avgYield": "5.1%",
    "activeCount": "11 Properties",
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
    "districts": [
      "Monte Carlo",
      "Cap d'Antibes",
      "Saint-Jean-Cap-Ferrat",
      "Cannes Croisette"
    ],
    "description": "The world's most glamorous coastline and sovereign tax-free haven for global family offices."
  },
  {
    "id": "paris",
    "name": "Paris (Golden Triangle), France",
    "tag": "Haussmannian Grandeur & Historic Hôtels Particuliers",
    "medianPrice": "€6,200,000",
    "avgYield": "4.7%",
    "activeCount": "10 Properties",
    "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",
    "districts": [
      "8th Arrondissement",
      "Le Marais",
      "Saint-Germain-des-Prés",
      "Place des Vosges"
    ],
    "description": "Centuries of cultural majesty, high fashion capitals, and irreplaceable historic architecture."
  },
  {
    "id": "lake-como",
    "name": "Lake Como & Milan, Italy",
    "tag": "Aristocratic Italian Lakes & Lombardy Financial Capital",
    "medianPrice": "€5,800,000",
    "avgYield": "5.4%",
    "activeCount": "8 Properties",
    "image": "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
    "districts": [
      "Bellagio",
      "Tremezzo",
      "Cernobbio",
      "Brera Milan",
      "Quadrilatero della Moda"
    ],
    "description": "Lakeside Renaissance villas with private boathouses, Michelin dining, and Italian luxury heritage."
  },
  {
    "id": "tokyo",
    "name": "Tokyo (Minato & Shibuya), Japan",
    "tag": "Ultra-Modern Megacity Sanctuary & High-Tech Castles",
    "medianPrice": "¥420,000,000",
    "avgYield": "5.0%",
    "activeCount": "15 Properties",
    "image": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
    "districts": [
      "Toranomon",
      "Roppongi Hills",
      "Omotesando",
      "Azabu-Juban",
      "Shibuya"
    ],
    "description": "Impeccable public safety, unmatched Michelin dining concentration, and seismic engineering mastery."
  },
  {
    "id": "geneva",
    "name": "Geneva & Swiss Alps, Switzerland",
    "tag": "Sovereign Neutrality, Private Banking & Alpine Majesty",
    "medianPrice": "CHF 8,900,000",
    "avgYield": "4.6%",
    "activeCount": "7 Properties",
    "image": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80",
    "districts": [
      "Cologny",
      "Old Town Geneva",
      "Vandoeuvres",
      "St. Moritz",
      "Gstaad"
    ],
    "description": "The gold standard of geopolitical stability, private Swiss banking, and Lake Geneva purity."
  },
  {
    "id": "bahamas",
    "name": "Bahamas & Sovereign Cays",
    "tag": "Private Island Seclusion & Tax-Free Caribbean Waters",
    "medianPrice": "$7,500,000",
    "avgYield": "7.4%",
    "activeCount": "13 Properties",
    "image": "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=80",
    "districts": [
      "Lyford Cay",
      "Albany",
      "Exuma Cays",
      "Paradise Island",
      "Harbour Island"
    ],
    "description": "Powder-soft coral sand beaches, mega-yacht marinas, and zero tax capital sanctuaries."
  }
];

export const MANAGEMENT_TIERS = [
  {
    "id": "tier-advisory",
    "name": "Sterling Placement & Advisory",
    "badge": "Leasing & Vetting",
    "fee": "1 Month Gross Rent",
    "tagline": "Ideal for hands-on owners requiring elite tenant sourcing and ironclad lease legalities.",
    "features": [
      "Rigorous Multi-Jurisdiction Financial & Background Vetting",
      "Institutional Grade Lease Agreements with Asset Protection Covenants",
      "Full Photographic & Video Move-In Condition Reports",
      "Professional Architectural Photography & Drone Videography",
      "Listing Exposure across Private Banking & Family Office Portals"
    ],
    "idealFor": "Individual high-value condominium and townhouse owners."
  },
  {
    "id": "tier-signature",
    "name": "Sterling Signature Management",
    "badge": "Most Popular",
    "fee": "6.5% Monthly Gross Collections",
    "tagline": "Turnkey luxury asset care combining Greystar-level operations with private concierge dispatch.",
    "features": [
      "Everything in Placement & Advisory included",
      "24/7 Dedicated White-Glove Concierge & Dispatch",
      "Direct ACH Monthly Owner Distributions by the 5th",
      "Quarterly High-Definition Drone & Engineering Audits",
      "Zero Maintenance Markups (Direct Trade-Rate Invoicing)",
      "Real-Time Mobile Portal: Statements, Leases & Work Orders",
      "Guaranteed Eviction & Default Protection Policy"
    ],
    "idealFor": "Luxury single-family estates and high-value rental portfolios."
  },
  {
    "id": "tier-sovereign",
    "name": "Sterling Sovereign Institutional",
    "badge": "Multi-Family & Portfolios",
    "fee": "Custom Institutional (from 4.5%)",
    "tagline": "Institutional capital asset oversight, repositioning, and dynamic yield maximization.",
    "features": [
      "Dedicated On-Site or District Asset Director",
      "Algorithmic Dynamic Rent Pricing Engine (Maximizes NOI)",
      "Comprehensive GAAP Audited Accounting & Tax Ledgers",
      "Capital Expenditure (CapEx) Planning & Execution",
      "Resident Amenity Programming & Retention Initiatives",
      "Enterprise Multi-Family Bulk Procurement Savings"
    ],
    "idealFor": "Ultra-luxury residential developments & multi-unit portfolios."
  }
];

export const AGENTS_DATA = [
  {
    "id": "agent-1",
    "name": "Julian Vance",
    "role": "Senior Vice President | Luxury Estates",
    "region": "Los Angeles & Aspen",
    "careerSales": "$1.45 Billion",
    "phone": "+1 (310) 849-2910",
    "email": "julian.vance@sterlingkey.com",
    "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
    "bio": "Ranked among the top 10 luxury brokers nationwide, Julian brings two decades of expertise representing celebrity estates and architectural landmarks in Bel-Air, Beverly Hills, and Aspen."
  },
  {
    "id": "agent-2",
    "name": "Eleanor Sterling-Hayes",
    "role": "Managing Partner & Co-Founder",
    "region": "New York City",
    "careerSales": "$2.10 Billion",
    "phone": "+1 (212) 791-8840",
    "email": "eleanor.sterling@sterlingkey.com",
    "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    "bio": "A trusted advisor to family offices and institutional funds, Eleanor oversees Sterling Key's premier East Coast penthouse advisory and marquee residential developments."
  },
  {
    "id": "agent-3",
    "name": "Mateo Rodriguez",
    "role": "Director of Coastal Acquisitions",
    "region": "Miami & The Caribbean",
    "careerSales": "$940 Million",
    "phone": "+1 (305) 912-4411",
    "email": "mateo.rodriguez@sterlingkey.com",
    "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    "bio": "Specializing in mega-yacht waterfront parcels, private islands, and tax-advantaged Florida luxury holdings with unmatched discretion."
  },
  {
    "id": "agent-4",
    "name": "Alistair Montgomery",
    "role": "Managing Director | EMEA Luxury",
    "region": "London & Europe",
    "careerSales": "$1.20 Billion",
    "phone": "+44 20 7946 0912",
    "email": "alistair.m@sterlingkey.co.uk",
    "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    "bio": "Educated at Oxford and seasoned in Mayfair real estate for 22 years, Alistair handles sovereign client representations across the UK and Continental Europe."
  },
  {
    "id": "agent-5",
    "name": "Tariq Al-Mansoor",
    "role": "Senior Partner | Middle East Advisory",
    "region": "Dubai & Gulf States",
    "careerSales": "$1.65 Billion",
    "phone": "+971 4 388 9200",
    "email": "tariq.mansoor@sterlingkey.ae",
    "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    "bio": "A prominent figure in Arabian Gulf sovereign wealth transactions, managing prime portfolio acquisitions across Palm Jumeirah and DIFC."
  },
  {
    "id": "agent-6",
    "name": "Kenji Takahashi",
    "role": "Director of Asia-Pacific Wealth",
    "region": "Tokyo & Singapore",
    "careerSales": "$880 Million",
    "phone": "+81 3 5555 0192",
    "email": "kenji.takahashi@sterlingkey.jp",
    "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    "bio": "Advising institutional family trusts on ultra-luxury Japanese and Asia-Pacific residential and multi-family acquisitions."
  },
  {
    "id": "agent-7",
    "name": "Camilla von Bern",
    "role": "Partner | Swiss Banking & Alpine Holdings",
    "region": "Geneva & Zurich",
    "careerSales": "$1.15 Billion",
    "phone": "+41 22 819 3300",
    "email": "camilla.vonbern@sterlingkey.ch",
    "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
    "bio": "Specializing in Swiss sovereign chalets, private banking enclaves, and generational alpine estates across Geneva, St. Moritz, and Zurich."
  },
  {
    "id": "agent-8",
    "name": "Laurent de Saint-Germain",
    "role": "Managing Director | French Riviera & Monaco",
    "region": "Paris & Monaco",
    "careerSales": "$1.35 Billion",
    "phone": "+377 97 98 1200",
    "email": "laurent.saintgermain@sterlingkey.mc",
    "image": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
    "bio": "Overseeing prime Golden Triangle hotels particuliers in Paris and ultra-exclusive waterfront compounds in Monaco and Cap d'Antibes."
  }
];

export const TESTIMONIALS_DATA = [
  {
    "quote": "Sterling Key Properties completely redefined our expectations of property management. When managing a 36-unit luxury portfolio in Miami, their institutional precision combined with bespoke tenant curation delivered a 17% increase in our Net Operating Income within our first 9 months.",
    "author": "Harrison Sterling Vance",
    "title": "Managing Principal, Vance Capital Partners",
    "location": "Miami & New York"
  },
  {
    "quote": "Selling an off-market $42M estate in Bel-Air requires extraordinary discretion. The Agency-level marketing, cinematic storytelling, and private sovereign buyer network at Sterling Key resulted in a seamless 30-day closing without a single public leak.",
    "author": "Lady Caroline Cavendish",
    "title": "Private Family Office Trustee",
    "location": "London & Los Angeles"
  },
  {
    "quote": "The owner portal is truly on par with enterprise software. Live statements, direct distribution notifications, and zero maintenance headaches. There is simply no other firm operating at this standard.",
    "author": "Dr. Marcus Wei",
    "title": "Real Estate Investor & Surgeon",
    "location": "Tribeca, New York"
  }
];

export const PRESS_ACCOLADES = [
  {
    "outlet": "Architectural Digest",
    "quote": "The gold standard of curated ultra-prime real estate."
  },
  {
    "outlet": "The Wall Street Journal",
    "quote": "Pioneering the hybrid of boutique brokerage and institutional asset management."
  },
  {
    "outlet": "Financial Times",
    "quote": "The chosen firm for sovereign wealth and discreet trophy acquisitions."
  },
  {
    "outlet": "Robb Report",
    "quote": "Redefining white-glove resident hospitality for private estates."
  }
];

export const formatLocation = (prop) => {
  if (!prop) return "";
  let neighborhood = prop.neighborhood || "";
  let city = prop.city || "";

  if (city.includes("&")) {
    if (city.includes("Miami")) city = "Miami";
    else if (city.includes("Aspen")) city = "Aspen";
    else if (city.includes("Monaco") && (neighborhood.includes("Antibes") || neighborhood.includes("Cap"))) city = "French Riviera";
    else if (city.includes("Monaco")) city = "Monaco";
    else if (city.includes("Geneva")) city = "Geneva";
    else if (city.includes("Lake Como")) city = "Lake Como";
    else city = city.split("&")[0].trim();
  }

  if (neighborhood && city) {
    if (neighborhood.toLowerCase().includes(city.toLowerCase())) return neighborhood;
    return `${neighborhood}, ${city}`;
  }
  return neighborhood || city;
};

export const downloadPropertyBrochure = (prop) => {
  if (!prop || typeof window === "undefined") return false;

  const content = `================================================================================
STERLING KEY PROPERTIES & ASSET MANAGEMENT
CONFIDENTIAL INVESTMENT DOSSIER & ARCHITECTURAL SPECIFICATION
================================================================================

ASSET TITLE: ${prop.title}
ARCHITECTURAL TAGLINE: ${prop.tagline || ""}
LOCATION: ${prop.address}, ${prop.neighborhood}, ${prop.city}, ${prop.state || ""} ${prop.zip || ""}
SOVEREIGN ASKING PRICE: ${prop.priceFormatted || "$" + (prop.price ? prop.price.toLocaleString() : "Contact Advisor")}
${prop.rentalPrice ? `LUXURY LEASE RATE: ${prop.rentalPrice}\n` : ""}CAPITALIZATION RATE: ${prop.capRate || "5.8%"}
PORTFOLIO STATUS: ${prop.status}
ASSET CATEGORY: ${prop.category}

--------------------------------------------------------------------------------
ARCHITECTURAL METRICS & RESIDENCE CONFIGURATION
--------------------------------------------------------------------------------
Suites: ${prop.beds} Bedrooms · ${prop.baths} Bathrooms
Interior Living Area: ${prop.sqft ? prop.sqft.toLocaleString() + " SF" : ""} / ${prop.sqm ? prop.sqm.toLocaleString() + " M²" : ""}
Parcel & Grounds: ${prop.lotSize || "Private Domain"}
Ceiling Heights: ${prop.floorPlan?.levels ? `${prop.floorPlan.levels} Levels · ` : ""}${prop.floorPlan?.ceilingHeight || "14 – 22 FT"}
Curated Terraces / Deck: ${prop.floorPlan?.outdoorDeck || "Curated Deck & Terraces"}
Enclosed Vehicle Gallery: ${prop.floorPlan?.galleryCars || 8} Enclosed Vehicles
Year Completed / Restored: ${prop.yearBuilt || 2024}
Annual Escrow Property Tax: ${prop.taxesAnnual || "$345,000"}
Monthly Stewardship HOA / Dues: ${prop.hoa || "$1,250 / mo"}

--------------------------------------------------------------------------------
SIGNATURE RESIDENCE AMENITIES
--------------------------------------------------------------------------------
${(prop.amenities || []).map((a) => `• ${a}`).join("\n")}

--------------------------------------------------------------------------------
EXECUTIVE ARCHITECTURAL SUMMARY
--------------------------------------------------------------------------------
${prop.description}

--------------------------------------------------------------------------------
EXCLUSIVE REPRESENTATION & PRIVATE CLIENT ADVISORY
--------------------------------------------------------------------------------
Lead Managing Partner: ${prop.agent?.name || "Julian Vance"}
Role: ${prop.agent?.title || "Senior Vice President | Luxury Estates"}
Telephone: ${prop.agent?.phone || "+1 (310) 849-2910"}
Confidential Inquiries: ${prop.agent?.email || "advisory@sterlingkey.com"}

================================================================================
AUTHENTICATED DOCUMENT REFERENCE: SK-${(prop.id || "ASSET").toUpperCase()}-${new Date().getFullYear()}
ISSUED UNDER STRICT NON-DISCLOSURE PROTOCOL (SHA-256 ENCRYPTED)
================================================================================
`;

  try {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `SterlingKey_${(prop.title || "Property").replace(/[^a-zA-Z0-9]/g, "_")}_Brochure.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch (err) {
    console.error("Brochure download error:", err);
    return false;
  }
};

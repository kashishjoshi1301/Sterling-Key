import fs from 'fs';
import { PROPERTIES_DATA, NEIGHBORHOODS_DATA, MANAGEMENT_TIERS, AGENTS_DATA, TESTIMONIALS_DATA, PRESS_ACCOLADES } from '../data/mockData.js';

// 1. Curated 24 Unique, Vibrant Primary Photos for all 24 Luxury Properties
const PRIMARY_PROPERTY_IMAGES = {
  'prop-1': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80', // Bel-Air Modernist Hillside Villa & Pool
  'prop-2': 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=80', // NYC Billionaires' Row Sky Penthouse
  'prop-3': 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80', // Miami Star Island Tropical Modern Waterfront
  'prop-4': 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80', // London Belgravia Eaton Square Classical Mansion
  'prop-5': 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80', // Aspen Red Mountain Luxury Alpine Lodge
  'prop-6': 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=80', // Dubai Palm Jumeirah Royal Beachfront Villa
  'prop-7': 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80', // NYC Tribeca Sunlit Cast-Iron Penthouse
  'prop-8': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80', // LA Beverly Park Palatial Mediterranean Estate
  'prop-9': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80', // Cap d'Antibes French Riviera Azure Cliffside Villa
  'prop-10': 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80', // Malibu Bluffs Minimalist Glass Pavilion Over Ocean
  'prop-11': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80', // Lake Como Renaissance Waterfront Palazzo
  'prop-12': 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80', // London Mayfair Aristocratic Townhouse & Garden
  'prop-13': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80', // Dubai DIFC Glowing Sky Duplex Penthouse
  'prop-14': 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80', // NYC Greenwich Village Historic Ivy Brownstone
  'prop-15': 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80', // Key Biscayne Tropical Modern Coastal Haven
  'prop-16': 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80', // Snowmass Ski-In Ski-Out Timber Chalet in Snow
  'prop-17': 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80', // Paris Le Marais Limestone Hôtel Particulier
  'prop-18': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=80', // Tokyo Toranomon Tokyo Tower View Sky Penthouse
  'prop-19': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80', // Geneva Lakefront Estate with Alpine Backdrop
  'prop-20': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80', // Bahamas Lyford Cay Private Island Turquoise Pavilion
  'prop-21': 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=80', // Sydney Harbour Modernist Cantilevered Waterfront
  'prop-22': 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=80', // Monaco Carré d'Or Sky Penthouse Terrace & Yachts
  'prop-23': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80', // LA Brentwood Warm Organic Modern Villa & Pool
  'prop-24': 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80'  // Miami Fisher Island Oceanfront Mediterranean Villa
};

// Curated high-end secondary gallery photos (living rooms, bedrooms, kitchens, terraces)
const GALLERY_INTERIORS = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80', // Great Room & Hearth
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80', // Gourmet Chef Kitchen
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80', // Primary Master Suite
  'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=80', // Marble Spa Bathroom
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80', // Open Concept Salon
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80', // Contemporary Bedroom Suite
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80', // Minimalist Master Retreat
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80', // Island Kitchen Bar
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80', // Deep Soaking Tub
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80'  // Architectural Glass Staircase
];

// 2. Curated 6 Unique, Vibrant, Professional Advisor Portraits (All Color, No Duplicates)
const AGENT_PORTRAITS = {
  'agent-1': {
    name: 'Julian Vance',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80' // Sharp navy suit executive
  },
  'agent-2': {
    name: 'Eleanor Sterling-Hayes',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' // Confident luxury managing partner
  },
  'agent-3': {
    name: 'Mateo Rodriguez',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80' // Coastal wealth director
  },
  'agent-4': {
    name: 'Alistair Montgomery',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80' // British EMEA managing director
  },
  'agent-5': {
    name: 'Tariq Al-Mansoor',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80' // Middle East senior partner
  },
  'agent-6': {
    name: 'Kenji Takahashi',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80' // Asia-Pacific wealth director
  }
};

// 3. Update AGENTS_DATA
const updatedAgents = AGENTS_DATA.map(agent => {
  const p = AGENT_PORTRAITS[agent.id];
  return {
    ...agent,
    image: p ? p.image : agent.image
  };
});

// Map agent names to their portrait for property objects
const agentImageByName = {};
updatedAgents.forEach(a => {
  agentImageByName[a.name] = a.image;
});

// 4. Update PROPERTIES_DATA
const updatedProperties = PROPERTIES_DATA.map((prop, idx) => {
  const primaryImg = PRIMARY_PROPERTY_IMAGES[prop.id] || prop.images[0];
  
  // Pick 3 varied secondary gallery images cyclically
  const sec1 = GALLERY_INTERIORS[(idx * 3) % GALLERY_INTERIORS.length];
  const sec2 = GALLERY_INTERIORS[(idx * 3 + 1) % GALLERY_INTERIORS.length];
  const sec3 = GALLERY_INTERIORS[(idx * 3 + 2) % GALLERY_INTERIORS.length];

  const agentImg = agentImageByName[prop.agent?.name] || updatedAgents[0].image;

  return {
    ...prop,
    images: [primaryImg, sec1, sec2, sec3],
    agent: {
      ...prop.agent,
      image: agentImg
    }
  };
});

// 5. Update NEIGHBORHOODS_DATA (replacing Bahamas towel with stunning turquoise water)
const updatedNeighborhoods = NEIGHBORHOODS_DATA.map(dest => {
  if (dest.id === 'bahamas') {
    return {
      ...dest,
      image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=80'
    };
  }
  return dest;
});

// 6. Write to data/mockData.js
const fileContent = `export const PROPERTIES_DATA = ${JSON.stringify(updatedProperties, null, 2)};\n\n` +
  `export const NEIGHBORHOODS_DATA = ${JSON.stringify(updatedNeighborhoods, null, 2)};\n\n` +
  `export const MANAGEMENT_TIERS = ${JSON.stringify(MANAGEMENT_TIERS, null, 2)};\n\n` +
  `export const AGENTS_DATA = ${JSON.stringify(updatedAgents, null, 2)};\n\n` +
  `export const TESTIMONIALS_DATA = ${JSON.stringify(TESTIMONIALS_DATA, null, 2)};\n\n` +
  `export const PRESS_ACCOLADES = ${JSON.stringify(PRESS_ACCOLADES, null, 2)};\n`;

fs.writeFileSync('/Users/kashish/.gemini/antigravity/scratch/sterling-key-properties/data/mockData.js', fileContent);
console.log('Successfully updated mockData.js with 100% unique, vibrant images!');

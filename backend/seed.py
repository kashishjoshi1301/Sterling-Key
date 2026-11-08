from .database import engine, Base, SessionLocal
from .models import PropertyModel

SEED_PROPERTIES = [
    {
        "id": "prop-1",
        "title": "The Bel-Air Promontory Estate",
        "tagline": "Panoramic City-to-Ocean Vistas & Architectural Triumph",
        "price": 38500000,
        "rental_price": None,
        "address": "10771 Bellagio Road",
        "neighborhood": "Bel-Air",
        "city": "Los Angeles",
        "state": "CA",
        "zip": "90077",
        "category": "Architectural",
        "listing_type": "buy",
        "status": "Exclusive",
        "beds": 7,
        "baths": 11,
        "sqft": 16800,
        "sqm": 1560,
        "lot_size": "1.45 Acres",
        "year_built": 2024,
        "hoa": "$1,250 / mo",
        "taxes_annual": "$345,000",
        "cap_rate": "5.8%",
        "featured": True,
        "images": [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
        ],
        "floor_plan": {
            "levels": 3,
            "ceilingHeight": "14 – 22 FT",
            "outdoorDeck": "4,500 SF",
            "galleryCars": 8,
            "planImage": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
        },
        "amenities": [
            "Zero-Edge Infinity Pool",
            "12-Seat Dolby Atmos Screening Room",
            "1,800-Bottle Temperature Wine Cellar",
            "Sub-Terranean 8-Car Gallery",
            "Full Wellness Spa & Cold Plunge",
            "Biometric Security System"
        ],
        "agent_name": "Julian Vance",
        "agent_title": "Senior Vice President | Luxury Estates",
        "agent_phone": "+1 (310) 849-2910",
        "agent_email": "julian.vance@sterlingkey.com",
        "agent_image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        "description": "Perched atop one of Bel-Air's most coveted private promontories, this masterwork represents the apex of modern California architecture with museum-quality board-formed concrete and sweeping Pacific Ocean vistas."
    },
    {
        "id": "prop-2",
        "title": "The Central Park Tower Sky Penthouse",
        "tagline": "Private Full-Floor Sanctuary Overlooking Central Park",
        "price": 49000000,
        "rental_price": "$125,000 / mo",
        "address": "217 West 57th Street, Penthouse 112",
        "neighborhood": "Billionaires' Row",
        "city": "Manhattan",
        "state": "NY",
        "zip": "10019",
        "category": "Penthouses",
        "listing_type": "buy",
        "status": "Available",
        "beds": 5,
        "baths": 7,
        "sqft": 9250,
        "sqm": 859,
        "lot_size": "Condominium",
        "year_built": 2022,
        "hoa": "$14,800 / mo",
        "taxes_annual": "$180,000",
        "cap_rate": "4.8%",
        "featured": True,
        "images": [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80"
        ],
        "floor_plan": {
            "levels": 2,
            "ceilingHeight": "15 FT",
            "outdoorDeck": "980 SF",
            "galleryCars": 2,
            "planImage": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
        },
        "amenities": [
            "360-Degree Manhattan & Park Panorama",
            "Private Express High-Speed Elevators",
            "Custom Boffi Kitchen in Calacatta Marble",
            "Primary Suite with Dual Dressing Chambers",
            "White-Glove 24/7 Concierge"
        ],
        "agent_name": "Eleanor Sterling-Roth",
        "agent_title": "Managing Director | Manhattan Flagship",
        "agent_phone": "+1 (212) 791-8840",
        "agent_email": "eleanor.sterling@sterlingkey.com",
        "agent_image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        "description": "Hovering over 1,200 feet above the world's financial and cultural capital, this palatial duplex penthouse delivers unprecedented quad-exposure vistas of Central Park and the Atlantic shoreline."
    },
    {
        "id": "prop-3",
        "title": "Villa Solaria on Star Island",
        "tagline": "Gated Deepwater Neo-Classical Mediterranean Waterfront",
        "price": 62000000,
        "rental_price": None,
        "address": "27 Star Island Drive",
        "neighborhood": "Star Island",
        "city": "Miami Beach",
        "state": "FL",
        "zip": "33139",
        "category": "Waterfront",
        "listing_type": "buy",
        "status": "Private Treaty",
        "beds": 8,
        "baths": 12,
        "sqft": 19400,
        "sqm": 1802,
        "lot_size": "1.80 Acres Deepwater",
        "year_built": 2023,
        "hoa": "None (Private Gated Island)",
        "taxes_annual": "$410,000",
        "cap_rate": "7.2%",
        "featured": True,
        "images": [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80"
        ],
        "floor_plan": {
            "levels": 2,
            "ceilingHeight": "16 FT",
            "outdoorDeck": "6,200 SF",
            "galleryCars": 10,
            "planImage": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
        },
        "amenities": [
            "200 FT Deepwater Mega-Yacht Slip",
            "Private Guard-Gated Island Police Security",
            "Resort Lagoon with Swim-Up Cabana Bar",
            "Two-Story Detached Guest Palazzo",
            "Full Generator & Sovereign Redundancy"
        ],
        "agent_name": "Mateo Rossi",
        "agent_title": "Executive Director | Coastal & Islands",
        "agent_phone": "+1 (305) 912-4411",
        "agent_email": "mateo.rossi@sterlingkey.com",
        "agent_image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        "description": "The quintessential crown jewel of Biscayne Bay. Offering 200 linear feet of ultra-deepwater frontage able to berth a 130-foot superyacht, Villa Solaria combines Venetian symmetry with advanced hurricane-resilient engineering."
    },
    {
        "id": "prop-4",
        "title": "Chester Square Regency Residence",
        "tagline": "Grade II* Listed Ambassadorial Garden Square Mansion",
        "price": 31500000,
        "rental_price": "£85,000 / mo",
        "address": "42 Chester Square",
        "neighborhood": "Belgravia",
        "city": "London",
        "state": "SW1W",
        "zip": "SW1W 9EA",
        "category": "Historic",
        "listing_type": "buy",
        "status": "Available",
        "beds": 6,
        "baths": 7,
        "sqft": 8400,
        "sqm": 780,
        "lot_size": "Freehold Townhouse",
        "year_built": 1835,
        "hoa": "£4,200 / yr (Grosvenor Garden Dues)",
        "taxes_annual": "£72,000 (Council Tax Band H)",
        "cap_rate": "4.5%",
        "featured": False,
        "images": [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80"
        ],
        "floor_plan": {
            "levels": 5,
            "ceilingHeight": "13.5 FT",
            "outdoorDeck": "1,100 SF Roof Garden",
            "galleryCars": 2,
            "planImage": "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
        },
        "amenities": [
            "Private Passenger Lift to All 5 Levels",
            "Sub-Basement Swimming Pool & Hammam",
            "Direct Key Access to Chester Square Private Gardens",
            "Restored Regency Stucco & Cornicing",
            "Separate Staff Mews Accommodation"
        ],
        "agent_name": "Alistair Montrose",
        "agent_title": "Partner | Prime Central London",
        "agent_phone": "+44 20 7946 0912",
        "agent_email": "alistair.montrose@sterlingkey.co.uk",
        "agent_image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        "description": "Constructed by master builder Thomas Cubitt in the 1830s under the Grosvenor Estate patronage, this grand white-stucco residence has undergone a museum-grade five-year restoration."
    }
]

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        count = db.query(PropertyModel).count()
        if count == 0:
            print("[SEED] Seeding properties into database...")
            for p in SEED_PROPERTIES:
                db_prop = PropertyModel(**p)
                db.add(db_prop)
            db.commit()
            print(f"[SEED] Successfully seeded {len(SEED_PROPERTIES)} properties into database.")
        else:
            print(f"[SEED] Database already has {count} properties.")
    except Exception as e:
        print(f"[SEED] Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()

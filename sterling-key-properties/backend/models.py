from datetime import datetime
from sqlalchemy import Column, String, BigInteger, Integer, Boolean, Text, JSON, DateTime
from .database import Base

class PropertyModel(Base):
    __tablename__ = "properties"

    id = Column(String(64), primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    tagline = Column(String(255), nullable=True)
    price = Column(BigInteger, nullable=False, index=True)
    rental_price = Column(String(64), nullable=True)
    address = Column(String(255), nullable=False)
    neighborhood = Column(String(128), nullable=False, index=True)
    city = Column(String(128), nullable=False, index=True)
    state = Column(String(64), nullable=True)
    zip = Column(String(32), nullable=True)
    category = Column(String(64), nullable=False, index=True)  # Architectural, Penthouses, Waterfront, Historic
    listing_type = Column(String(32), default="buy", index=True)  # buy, rent, development
    status = Column(String(64), default="Exclusive")
    beds = Column(Integer, nullable=False, index=True)
    baths = Column(Integer, nullable=False)
    sqft = Column(Integer, nullable=False)
    sqm = Column(Integer, nullable=False)
    lot_size = Column(String(64), nullable=True)
    year_built = Column(Integer, nullable=True)
    hoa = Column(String(64), nullable=True)
    taxes_annual = Column(String(64), nullable=True)
    cap_rate = Column(String(32), nullable=True)
    featured = Column(Boolean, default=False)
    images = Column(JSON, default=list)
    floor_plan = Column(JSON, default=dict)
    amenities = Column(JSON, default=list)
    agent_name = Column(String(128), nullable=True)
    agent_title = Column(String(128), nullable=True)
    agent_phone = Column(String(64), nullable=True)
    agent_email = Column(String(128), nullable=True)
    agent_image = Column(String(255), nullable=True)
    description = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

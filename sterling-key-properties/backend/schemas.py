from typing import List, Optional, Dict, Any
from pydantic import BaseModel

class AgentSchema(BaseModel):
    name: str
    title: str
    phone: str
    email: str
    image: str

class PropertyBase(BaseModel):
    id: str
    title: str
    tagline: Optional[str] = None
    price: int
    rental_price: Optional[str] = None
    address: str
    neighborhood: str
    city: str
    state: Optional[str] = None
    zip: Optional[str] = None
    category: str
    listing_type: str = "buy"
    status: str = "Exclusive"
    beds: int
    baths: int
    sqft: int
    sqm: int
    lot_size: Optional[str] = None
    year_built: Optional[int] = None
    hoa: Optional[str] = None
    taxes_annual: Optional[str] = None
    cap_rate: Optional[str] = None
    featured: bool = False
    images: List[str] = []
    floor_plan: Optional[Dict[str, Any]] = None
    amenities: List[str] = []
    agent_name: Optional[str] = None
    agent_title: Optional[str] = None
    agent_phone: Optional[str] = None
    agent_email: Optional[str] = None
    agent_image: Optional[str] = None
    description: str

class PropertyCreate(PropertyBase):
    pass

class PropertyUpdate(BaseModel):
    title: Optional[str] = None
    tagline: Optional[str] = None
    price: Optional[int] = None
    rental_price: Optional[str] = None
    address: Optional[str] = None
    neighborhood: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip: Optional[str] = None
    category: Optional[str] = None
    listing_type: Optional[str] = None
    status: Optional[str] = None
    beds: Optional[int] = None
    baths: Optional[int] = None
    sqft: Optional[int] = None
    sqm: Optional[int] = None
    lot_size: Optional[str] = None
    year_built: Optional[int] = None
    hoa: Optional[str] = None
    taxes_annual: Optional[str] = None
    cap_rate: Optional[str] = None
    featured: Optional[bool] = None
    images: Optional[List[str]] = None
    floor_plan: Optional[Dict[str, Any]] = None
    amenities: Optional[List[str]] = None
    agent_name: Optional[str] = None
    agent_title: Optional[str] = None
    agent_phone: Optional[str] = None
    agent_email: Optional[str] = None
    agent_image: Optional[str] = None
    description: Optional[str] = None

class PropertyResponse(PropertyBase):
    class Config:
        from_attributes = True

class ChatMessage(BaseModel):
    role: str  # "user" | "assistant" | "system"
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    api_key: Optional[str] = None
    provider: Optional[str] = "free"

class ChatResponse(BaseModel):
    response: str
    provider_used: str

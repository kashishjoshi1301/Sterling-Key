from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from .models import PropertyModel
from .schemas import PropertyCreate, PropertyUpdate

def get_properties(
    db: Session,
    destination: Optional[str] = None,
    style: Optional[str] = None,
    min_price: Optional[int] = None,
    max_price: Optional[int] = None,
    beds: Optional[int] = None,
    query: Optional[str] = None,
    skip: int = 0,
    limit: int = 100
) -> List[PropertyModel]:
    q = db.query(PropertyModel)

    if destination and destination != "all":
        d_lower = f"%{destination.lower()}%"
        q = q.filter(
            or_(
                PropertyModel.city.ilike(d_lower),
                PropertyModel.neighborhood.ilike(d_lower),
                PropertyModel.state.ilike(d_lower),
                PropertyModel.address.ilike(d_lower)
            )
        )

    if style and style != "all":
        s_lower = f"%{style.lower()}%"
        q = q.filter(
            or_(
                PropertyModel.category.ilike(s_lower),
                PropertyModel.title.ilike(s_lower)
            )
        )

    if min_price is not None:
        q = q.filter(PropertyModel.price >= min_price)

    if max_price is not None:
        q = q.filter(PropertyModel.price <= max_price)

    if beds is not None:
        q = q.filter(PropertyModel.beds >= beds)

    if query and query.strip():
        search_term = f"%{query.strip().lower()}%"
        q = q.filter(
            or_(
                PropertyModel.title.ilike(search_term),
                PropertyModel.description.ilike(search_term),
                PropertyModel.neighborhood.ilike(search_term),
                PropertyModel.city.ilike(search_term)
            )
        )

    return q.offset(skip).limit(limit).all()

def get_property(db: Session, property_id: str) -> Optional[PropertyModel]:
    return db.query(PropertyModel).filter(PropertyModel.id == property_id).first()

def create_property(db: Session, prop_data: PropertyCreate) -> PropertyModel:
    db_prop = PropertyModel(**prop_data.dict())
    db.add(db_prop)
    db.commit()
    db.refresh(db_prop)
    return db_prop

def update_property(db: Session, property_id: str, prop_data: PropertyUpdate) -> Optional[PropertyModel]:
    db_prop = get_property(db, property_id)
    if not db_prop:
        return None
    
    update_data = prop_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_prop, key, value)
    
    db.commit()
    db.refresh(db_prop)
    return db_prop

def delete_property(db: Session, property_id: str) -> bool:
    db_prop = get_property(db, property_id)
    if not db_prop:
        return False
    db.delete(db_prop)
    db.commit()
    return True

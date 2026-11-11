import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Configurable PostgreSQL database URL with seamless fallback to SQLite
# If POSTGRESQL is running, set DATABASE_URL=postgresql://user:password@localhost:5432/sterling_properties
DEFAULT_POSTGRES_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://postgres:postgres@localhost:5432/sterling_properties"
)

# Attempt PostgreSQL connection; if unavailable, fallback safely to local SQLite
try:
    # Test if PostgreSQL driver is available and connection URL is valid
    if "postgresql" in DEFAULT_POSTGRES_URL:
        # Check connection or fallback
        try:
            engine = create_engine(DEFAULT_POSTGRES_URL, pool_pre_ping=True)
            # Try a quick connection test
            with engine.connect() as conn:
                pass
            print(f"[DB] Connected successfully to PostgreSQL: {DEFAULT_POSTGRES_URL}")
        except Exception as pg_err:
            print(f"[DB] PostgreSQL not actively listening ({pg_err}). Falling back to SQLite.")
            engine = create_engine("sqlite:///./sterling_properties.db", connect_args={"check_same_thread": False})
    else:
        engine = create_engine(DEFAULT_POSTGRES_URL)
except Exception:
    engine = create_engine("sqlite:///./sterling_properties.db", connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

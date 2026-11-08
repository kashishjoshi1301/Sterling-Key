# Sterling Key Properties — FastAPI & PostgreSQL Backend

This directory contains the production-grade **FastAPI CRUD Backend** connected to a **PostgreSQL Database** for high-net-worth real estate operations, search filtering, and free LLM AI Concierge chat.

## Features

- **PostgreSQL Database**: Persistent storage for luxury properties, floor plans, financial models, and inquiry records.
- **Automatic SQLite Fallback**: If a local PostgreSQL instance is not running, the application gracefully initializes a local `sterling_properties.db` file so development never blocks.
- **FastAPI CRUD Endpoints**:
  - `GET /api/properties`: Full-text search and multi-field filtering (destination, style, price bracket, bedrooms).
  - `GET /api/properties/{id}`: Detailed single property dossier.
  - `POST /api/properties`: Add a new property to the portfolio.
  - `PUT /api/properties/{id}`: Edit/update property parameters.
  - `DELETE /api/properties/{id}`: Remove property dossier.
  - `POST /api/chat`: AI Concierge endpoint connected to Free LLM tiers (OpenRouter free models / Hugging Face) with domain-specific fallback.
  - `GET /api/health`: Database connection status report.
- **Interactive Swagger Documentation**: Available at `http://localhost:8000/docs`.

---

## Quick Start Options

### Option 1: Docker Compose (PostgreSQL + FastAPI in 1 Command)
```bash
docker compose up -d
```
FastAPI will run on `http://localhost:8000` with PostgreSQL on port `5432`.

### Option 2: Local Python Execution
1. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
2. (Optional) Set your PostgreSQL connection URL:
   ```bash
   export DATABASE_URL="postgresql://postgres:password@localhost:5432/sterling_properties"
   ```
   *(If not set, it will automatically use SQLite with identical schema and functions).*
3. Start the FastAPI server:
   ```bash
   uvicorn backend.main:app --reload --port 8000
   ```
4. Visit interactive Swagger UI: `http://localhost:8000/docs`.

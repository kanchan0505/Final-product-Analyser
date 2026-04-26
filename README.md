# Final Product Analyser (ML-powered)

ML-based **product review sentiment analysis** app.

It provides:
- A **FastAPI** backend that loads a trained sentiment model + vectorizer and exposes REST endpoints.
- A **Next.js** frontend (React) UI to search/select products and visualize sentiment.
- A **PostgreSQL** database (via `psycopg2`) holding product reviews.

Repo: https://github.com/kanchan0505/Final-product-Analyser

---

## Architecture

- **Frontend**: `frontend/` (Next.js)
- **Backend API**: `backend/` (FastAPI)
- **ML artifacts** (loaded by backend):
  - `sentiment_model.pkl`
  - `vectorizer.pkl`

---

## Backend (FastAPI)

### Endpoints

- `GET /` → health check  
  Response: `{ "message": "Product Sentiment API is running" }`

- `GET /products` → list distinct products (cached for ~5 minutes)  
  Response: `{ "products": [{ "product_id": ..., "product_name": ... }, ...] }`

- `GET /analyze/{product_name}` → analyze sentiment for a product’s reviews  
  Response includes:
  - `positive`, `negative`
  - `sentiment_score` (percentage)
  - `recommendation` (`Good Product` / `Average Product` / `Not Recommended`)

### Requirements

- Python 3.10+ recommended
- PostgreSQL database with a `reviews` table containing at least:
  - `product_id`
  - `product_name`
  - `review`

### Environment variables

Create `backend/.env` (or export in your shell) with:

```bash
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME
```

### Install & run backend

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt

uvicorn api:app --reload --host 0.0.0.0 --port 8000
```

Backend URL: `http://localhost:8000`

---

## Frontend (Next.js)

### Install & run frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:3000`

### Configure API base URL

If your UI expects the backend URL via an environment variable (common in Next.js), create:

- `frontend/.env.local`

Example:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> If your current frontend code uses a hardcoded backend URL, you can keep it as-is.

---

## Training / Updating the ML model

Scripts:
- `backend/train_model.py`

After training, ensure these artifacts exist at the repo root:
- `sentiment_model.pkl`
- `vectorizer.pkl`

---

## Troubleshooting

- **`DATABASE_URL is not set`**: create `backend/.env` or export `DATABASE_URL`.
- **CORS errors**: backend currently allows all origins. If you restrict it later, add your frontend URL.
- **Model files not found**: confirm `sentiment_model.pkl` and `vectorizer.pkl` exist at the repository root.

---

## License

Add a license if you plan to share/distribute this project.

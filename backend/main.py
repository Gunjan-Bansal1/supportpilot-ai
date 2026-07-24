from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import router


app = FastAPI(
    title="SupportPilot-AI API",
    description="AI-Powered Customer Support Assistant",
    version="1.0.0",
)

# ==========================
# CORS Configuration
# ==========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Register API Routes
# ==========================

app.include_router(router)

# ==========================
# Health Check
# ==========================

@app.get("/")
def home():
    return {
        "message": "Welcome to SupportPilot-AI API 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
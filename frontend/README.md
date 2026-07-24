# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# 🚀 SupportPilot AI – AI-Powered Customer Support Platform using Machine Learning & Retrieval-Augmented Generation (RAG)

> End-to-end AI customer support platform built with React, FastAPI, Machine Learning, FAISS-based RAG, and Groq LLM.

## Overview
SupportPilot AI automates customer support by combining:
- Intent Classification
- Sentiment Analysis
- Priority Prediction
- Retrieval-Augmented Generation (RAG)
- Groq LLM
- SQLite logging
- Admin analytics dashboard

## Problem Statement
Traditional chatbots provide generic responses and cannot understand organization-specific knowledge or prioritize customer requests. SupportPilot AI solves this using ML + RAG.

## Key Features
### Customer
- AI Chat
- Context-aware responses
- Responsive UI

### Admin
- Upload PDF/TXT knowledge base
- Dashboard analytics
- Ticket inspection
- Logs

### AI
- Intent Classification
- Sentiment Analysis
- Priority Prediction
- Confidence Scores

## Technology Stack
Frontend: React, Vite, Tailwind CSS, Axios, React Router, Recharts

Backend: FastAPI, Python, Uvicorn

ML: Scikit-learn, TF-IDF, Linear SVM

RAG: Sentence Transformers, FAISS, PyPDF

LLM: Groq

Database: SQLite

## Architecture
Customer -> React -> FastAPI -> ML Models -> RAG -> Groq -> SQLite -> Admin Dashboard

## Folder Structure
backend/
frontend/
uploads/
vector_store/
logs/
README.md
requirements.txt

## Installation

```bash
git clone <repo>
cd SupportPilot-AI
python -m venv venv
```

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

```env
GROQ_API_KEY=
DATABASE_URL=
EMBEDDING_MODEL=all-MiniLM-L6-v2
UPLOAD_FOLDER=uploads
VECTOR_DB_PATH=vector_store
```

## APIs

|Method|Endpoint|
|---|---|
|POST|/predict|
|POST|/upload-documents|
|GET|/health|
|GET|/admin/logs|
|GET|/admin/stats|

## ML Pipeline
Query -> TF-IDF -> Linear SVM -> Intent/Sentiment/Priority -> Confidence

## RAG Pipeline
Upload -> Parse -> Chunk -> Embed -> FAISS -> Retrieve -> Groq -> Answer

## Admin Dashboard
- Total Queries
- Intent Distribution
- Sentiment Distribution
- Priority Distribution
- Recent Tickets
- Confidence Scores

## Database
SQLite stores:
- Query
- Intent
- Sentiment
- Priority
- Confidence
- Response
- Timestamp

## Workflow
Customer -> Predict -> ML -> RAG -> Groq -> Log -> Dashboard

## Testing
- Customer chat
- PDF upload
- Admin dashboard
- API endpoints
- Health endpoint

## Screenshots
Add:
- Home
- Chat
- Upload
- Dashboard
- Charts
- Ticket Drawer

## Limitations
- SQLite
- UI role switching
- Dataset-dependent ML accuracy

## Future Improvements
- JWT
- PostgreSQL
- Docker
- Redis
- Kubernetes
- Feedback learning

## License
MIT

## Author
Gunjan Bansal
IIIT Lucknow

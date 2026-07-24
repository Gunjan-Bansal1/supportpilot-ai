# 🚀 SupportPilot AI

> An AI-powered customer support platform that combines Machine Learning, Retrieval-Augmented Generation (RAG), and Large Language Models (LLMs) to deliver intelligent, context-aware customer support with real-time admin analytics.

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![Tailwind](https://img.shields.io/badge/TailwindCSS-UI-38BDF8)
![FAISS](https://img.shields.io/badge/FAISS-VectorDB-orange)
![Groq](https://img.shields.io/badge/Groq-LLM-purple)

---

# 📑 Table of Contents
- Project Overview
- Features
- System Architecture
- Tech Stack
- Project Structure
- AI Workflow
- Machine Learning Pipeline
- RAG Pipeline
- Admin Dashboard
- API Endpoints
- Installation
- Environment Variables
- Future Improvements
- Author
- License

---

# 📌 Project Overview

SupportPilot AI is an end-to-end AI-powered customer support system that automatically understands customer queries, predicts their intent, sentiment, and priority, retrieves relevant knowledge from uploaded documents using RAG, and generates intelligent responses using Groq LLM.

## Features

### Customer
- AI Chat
- Context-aware responses
- Markdown support

### Admin
- Upload PDF/TXT documents
- Analytics Dashboard
- AI Predictions
- Searchable Logs
- Role-based Access

# 🏗 System Architecture

```text
Customer
   │
React Frontend
   │
FastAPI Backend
   │
Intent → Sentiment → Priority
   │
FAISS Retrieval
   │
Groq LLM
   │
Response
   │
SQLite Logs
   │
Admin Dashboard
```

# 🛠 Tech Stack

Frontend: React, Vite, Tailwind CSS, Axios, React Router, Recharts

Backend: FastAPI, Python, Uvicorn

ML: Scikit-learn, TF-IDF, Linear SVM, Logistic Regression

RAG: LangChain, FAISS, Sentence Transformers, Groq

Database: SQLite

# 📂 Project Structure

```text
SupportPilot-AI/
├── backend/
├── frontend/
├── uploads/
├── vector_store/
├── knowledge_base/
├── saved_models/
├── requirements.txt
└── README.md
```

# 🤖 AI Workflow

Customer Query
→ Intent Classification
→ Sentiment Analysis
→ Priority Prediction
→ FAISS Retrieval
→ Groq LLM
→ Response Generation
→ Prediction Logging
→ Admin Dashboard

# 📚 RAG Pipeline

1. Upload Documents
2. Text Extraction
3. Chunking
4. Embedding Generation
5. Store in FAISS
6. Semantic Retrieval
7. Context to LLM
8. Response Generation

# 📊 Admin Dashboard

- Total Tickets
- Intent Distribution
- Sentiment Distribution
- Priority Distribution
- Ticket Logs

# 🌐 API Endpoints

- POST /predict
- POST /upload-documents
- GET /health
- GET /admin/logs
- GET /admin/stats

# 🚀 Installation

```bash
git clone https://github.com/Gunjan-Bansal1/supportpilot-ai.git
cd supportpilot-ai
pip install -r requirements.txt
cd backend
uvicorn main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

# 🔑 Environment Variables

```env
GROQ_API_KEY=your_api_key
MODEL_NAME=llama-3.3-70b-versatile
```

# 📸 Screenshots

Add screenshots for:
- Home
- Customer Chat
- Upload Page
- Admin Dashboard

# 🚀 Future Improvements

- Authentication
- Docker
- Kubernetes
- Multi-language Support
- Live Agent Handover

# 👨‍💻 Author

**Gunjan Bansal**

M.Sc. Data Science

Indian Institute of Information Technology, Lucknow

GitHub: https://github.com/Gunjan-Bansal1

# 📄 License

MIT License

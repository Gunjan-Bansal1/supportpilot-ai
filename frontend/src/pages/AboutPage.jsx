import React from "react";
import {
    FiCpu,
    FiDatabase,
    FiLayers,
    FiShield,
    FiZap,
    FiCheckCircle,
    FiCode,
    FiServer,
    FiLayout,
    FiLock,
} from "react-icons/fi";
import { BsRobot } from "react-icons/bs";

function AboutPage() {
    const backendTech = [
        { name: "FastAPI Framework", role: "Asynchronous Python web server for high-concurrency ticket prediction endpoints" },
        { name: "Groq LLM Engine", role: "Ultra-low latency Llama-3 model execution for dynamic RAG response generation" },
        { name: "FAISS Vector Store", role: "Facebook AI Similarity Search engine for document chunk embedding index" },
        { name: "Sentence Transformers", role: "all-MiniLM-L6-v2 dense vector embedding pipeline for semantic similarity search" },
        { name: "Intent & Sentiment AI", role: "Multi-class classification pipelines for ticket category and priority detection" },
    ];

    const frontendTech = [
        { name: "React 19 + Vite 8", role: "Modern component library paired with high-performance HMR build tooling" },
        { name: "Tailwind CSS v4", role: "Utility-first design tokens with sleek micro-animations and slate color system" },
        { name: "React Router DOM v7", role: "Client-side routing layout with ProtectedRoute RBAC guards" },
        { name: "Axios API Layer", role: "Centralized service layer for structured HTTP calls and background error toasts" },
        { name: "RoleContext RBAC", role: "Frontend role simulation isolating customer chat from administrative tooling" },
    ];

    const pipelineSteps = [
        {
            title: "Customer Query Ingestion",
            desc: "Receives raw customer ticket input via HTTP POST /predict payload.",
            badge: "API Gateway",
        },
        {
            title: "Intent & Sentiment Classification",
            desc: "Evaluates ticket query category (Refund, Order, Password, General) and customer sentiment score.",
            badge: "ML Pipeline",
        },
        {
            title: "FAISS Vector RAG Lookup",
            desc: "Retrieves top K semantic document matches from persistent FAISS index.",
            badge: "Vector Store",
        },
        {
            title: "Groq Contextual Generation",
            desc: "Generates tailored support response grounded in knowledge base context.",
            badge: "LLM Inference",
        },
    ];

    return (
        <div className="mx-auto max-w-5xl space-y-8 p-2 sm:p-4">
            {/* Header Admin Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-8 sm:p-12 text-white shadow-md">
                <div className="relative z-10 max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-3.5 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-sm border border-indigo-400/30">
                        <FiLock size={13} /> Administrator Console Only
                    </div>
                    <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                        AI Administration & Architecture
                    </h1>
                    <p className="mt-3 text-sm text-slate-300 sm:text-base leading-relaxed">
                        Technical system overview detailing SupportPilot's RAG retrieval pipeline, ML classification models, vector storage, and end-to-end execution workflow.
                    </p>
                </div>

                <div className="absolute -right-12 -bottom-12 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl" />
            </div>

            {/* AI Execution Pipeline */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                <h2 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
                    <FiLayers className="text-blue-600" size={20} />
                    Backend AI & RAG Execution Pipeline
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                    Step-by-step processing of customer support queries through classification and vector search models.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-4">
                    {pipelineSteps.map((step, idx) => (
                        <div key={idx} className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <div>
                                <span className="inline-block rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                                    {step.badge}
                                </span>
                                <h4 className="mt-2 text-xs font-bold text-slate-800">
                                    {idx + 1}. {step.title}
                                </h4>
                                <p className="mt-1.5 text-[11px] text-slate-500 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Technical Stack Breakdown Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
                {/* Backend Stack */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-800 text-base mb-4 border-b border-slate-100 pb-3">
                        <FiServer className="text-blue-600" size={20} />
                        Backend AI Architecture
                    </div>
                    <ul className="space-y-3">
                        {backendTech.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs">
                                <FiCheckCircle className="mt-0.5 text-emerald-500 shrink-0" size={14} />
                                <div>
                                    <strong className="text-slate-800">{item.name}:</strong>{" "}
                                    <span className="text-slate-500">{item.role}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Frontend Stack */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-800 text-base mb-4 border-b border-slate-100 pb-3">
                        <FiLayout className="text-indigo-600" size={20} />
                        Frontend Architecture
                    </div>
                    <ul className="space-y-3">
                        {frontendTech.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs">
                                <FiCheckCircle className="mt-0.5 text-emerald-500 shrink-0" size={14} />
                                <div>
                                    <strong className="text-slate-800">{item.name}:</strong>{" "}
                                    <span className="text-slate-500">{item.role}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Admin Console Disclaimer Footer */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center text-xs text-slate-500">
                <p className="font-semibold text-slate-700">SupportPilot AI Administration Console</p>
                <p className="mt-1">Internal technical documentation for system architecture auditing and engineering review.</p>
            </div>
        </div>
    );
}

export default AboutPage;
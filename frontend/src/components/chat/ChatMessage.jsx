import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { BsRobot, BsPerson, BsCheck2, BsCopy, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FiTag, FiSmile, FiAlertCircle, FiCode } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRole } from "../../context/RoleContext";

function ChatMessage({ message, devMode = false }) {
    const { isAdmin } = useRole();
    const [copied, setCopied] = useState(false);
    const [showDevDetails, setShowDevDetails] = useState(devMode);
    const isUser = message.sender === "user";

    const handleCopy = () => {
        const textToCopy = message.text || message.response || "";
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    const getPriorityBadgeClass = (priority) => {
        const lower = (priority || "").toLowerCase();
        if (lower === "high" || lower === "urgent") {
            return "bg-rose-50 text-rose-700 border-rose-200";
        }
        if (lower === "medium") {
            return "bg-amber-50 text-amber-700 border-amber-200";
        }
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    };

    const getSentimentBadgeClass = (sentiment) => {
        const lower = (sentiment || "").toLowerCase();
        if (lower.includes("negative") || lower.includes("angry")) {
            return "bg-rose-50 text-rose-700 border-rose-200";
        }
        if (lower.includes("positive") || lower.includes("happy")) {
            return "bg-emerald-50 text-emerald-700 border-emerald-200";
        }
        return "bg-slate-100 text-slate-700 border-slate-200";
    };

    const hasAiMetadata = !isUser && (message.intent || message.sentiment || message.priority);

    return (
        <div
            className={`group flex items-start gap-4 p-4 transition-colors ${
                isUser ? "flex-row-reverse" : ""
            }`}
        >
            {/* Avatar */}
            <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-white shadow-xs ${
                    isUser
                        ? "bg-slate-800"
                        : "bg-blue-600"
                }`}
            >
                {isUser ? <BsPerson size={18} /> : <BsRobot size={20} />}
            </div>

            {/* Message Content Container */}
            <div
                className={`flex max-w-[85%] flex-col gap-2 ${
                    isUser ? "items-end" : "items-start"
                }`}
            >
                {/* Header info */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold text-slate-600">
                        {isUser ? "You" : "SupportPilot AI"}
                    </span>
                    <span>•</span>
                    <span>{message.timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {/* Message Bubble */}
                <div
                    className={`relative rounded-2xl p-4 transition-all shadow-xs ${
                        isUser
                            ? "rounded-tr-xs bg-blue-600 text-white"
                            : "rounded-tl-xs border border-slate-200 bg-white text-slate-800"
                    }`}
                >
                    {isUser ? (
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
                    ) : (
                        <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed dark:prose-invert">
                            <ReactMarkdown>{message.response || message.text}</ReactMarkdown>
                        </div>
                    )}

                    {/* Developer Mode: Expandable AI Analysis Section (ADMIN ONLY) */}
                    {isAdmin && hasAiMetadata && showDevDetails && (
                        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2 animate-fadeIn">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                    <FiCode size={12} /> Internal AI System Analysis
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs">
                                {message.intent && (
                                    <div className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600">
                                        <FiTag className="text-blue-500" />
                                        <span>Intent: <strong className="text-slate-800">{message.intent}</strong></span>
                                        {message.intent_confidence !== undefined && (
                                            <span className="text-slate-400">({(message.intent_confidence * 100).toFixed(0)}%)</span>
                                        )}
                                    </div>
                                )}

                                {message.sentiment && (
                                    <div className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium ${getSentimentBadgeClass(message.sentiment)}`}>
                                        <FiSmile />
                                        <span>Sentiment: <strong>{message.sentiment}</strong></span>
                                        {message.sentiment_confidence !== undefined && (
                                            <span className="opacity-75">({(message.sentiment_confidence * 100).toFixed(0)}%)</span>
                                        )}
                                    </div>
                                )}

                                {message.priority && (
                                    <div className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-semibold ${getPriorityBadgeClass(message.priority)}`}>
                                        <FiAlertCircle />
                                        <span>Priority: {message.priority.toUpperCase()}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions (Copy & Developer Mode toggle) */}
                <div className={`flex items-center gap-3 px-1 ${isUser ? "justify-end" : "justify-start"}`}>
                    <button
                        onClick={handleCopy}
                        title="Copy message"
                        className="flex items-center gap-1 rounded px-1.5 py-1 text-xs text-slate-400 opacity-0 transition-opacity hover:bg-slate-200 hover:text-slate-600 group-hover:opacity-100 cursor-pointer"
                    >
                        {copied ? (
                            <>
                                <BsCheck2 className="text-green-600" size={14} />
                                <span className="text-green-600 font-medium">Copied</span>
                            </>
                        ) : (
                            <>
                                <BsCopy size={12} />
                                <span>Copy</span>
                            </>
                        )}
                    </button>

                    {/* Collapsible Developer Mode AI Analysis Toggle (ADMIN ONLY) */}
                    {isAdmin && hasAiMetadata && (
                        <button
                            onClick={() => setShowDevDetails((prev) => !prev)}
                            className="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                            title="Toggle Developer AI Analysis"
                        >
                            <FiCode size={12} />
                            <span>{showDevDetails ? "Hide AI Analysis" : "AI Analysis"}</span>
                            {showDevDetails ? <BsChevronUp size={10} /> : <BsChevronDown size={10} />}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatMessage;

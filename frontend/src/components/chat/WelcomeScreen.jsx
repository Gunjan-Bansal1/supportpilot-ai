import React from "react";
import { BsRobot } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";

function WelcomeScreen({ onSelectPrompt }) {
    const suggestedPrompts = [
        {
            title: "Refund Request",
            desc: "How do I request a full refund for an order placed 3 days ago?",
            category: "Payments & Refunds",
        },
        {
            title: "Shipping Status",
            desc: "My order #48291 has not arrived yet. What is the delivery status?",
            category: "Order Tracking",
        },
        {
            title: "Account Password Reset",
            desc: "I am locked out of my account and unable to reset my password.",
            category: "Account Access",
        },
        {
            title: "Technical Support",
            desc: "The app crashes whenever I try to upload a document file.",
            category: "Troubleshooting",
        },
    ];

    return (
        <div className="flex h-full flex-col items-center justify-center px-4 py-8 text-center">
            {/* Header Icon */}
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/20">
                <BsRobot size={40} />
            </div>

            {/* Title & Tagline */}
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                SupportPilot <span className="text-blue-600">AI</span>
            </h1>
            <p className="mt-3 max-w-lg text-sm text-slate-600 sm:text-base leading-relaxed">
                Ask me anything about your orders, refunds, shipping, payments, or account.
            </p>

            {/* Suggested Prompts */}
            <div className="mt-10 w-full max-w-3xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Suggested Support Questions
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                    {suggestedPrompts.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => onSelectPrompt(item.desc)}
                            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 text-left shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5 cursor-pointer"
                        >
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                                    {item.category}
                                </span>
                                <h3 className="mt-1 text-sm font-semibold text-slate-800 group-hover:text-blue-600">
                                    {item.title}
                                </h3>
                                <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">
                                    "{item.desc}"
                                </p>
                            </div>
                            <div className="mt-3 flex items-center justify-end text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                Ask query <FiArrowRight className="ml-1" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WelcomeScreen;

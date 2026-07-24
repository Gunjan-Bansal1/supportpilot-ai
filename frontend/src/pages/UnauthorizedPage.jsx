import React from "react";
import { Link } from "react-router-dom";
import { FiShieldOff, FiArrowLeft } from "react-icons/fi";
import { useRole } from "../context/RoleContext";

function UnauthorizedPage() {
    const { setRole } = useRole();

    return (
        <div className="flex h-full min-h-[70vh] flex-col items-center justify-center p-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 shadow-xs mb-6">
                <FiShieldOff size={40} />
            </div>

            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                Access Restricted
            </h1>

            <p className="mt-2 max-w-md text-sm text-slate-500 leading-relaxed">
                This page is restricted to <strong className="text-slate-700">Administrator</strong> users. You are currently browsing as a Customer.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-xs transition-all hover:bg-blue-700"
                >
                    <FiArrowLeft size={16} />
                    <span>Return to AI Chat</span>
                </Link>

                <button
                    onClick={() => setRole("admin")}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                    Switch to Admin Role
                </button>
            </div>
        </div>
    );
}

export default UnauthorizedPage;

import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FiMenu, FiRefreshCw, FiCheck, FiShield, FiUserCheck, FiChevronDown } from "react-icons/fi";
import { checkHealth } from "../../services/api";
import { useRole } from "../../context/RoleContext";
import toast from "react-hot-toast";

function Navbar({ onToggleSidebar }) {
    const location = useLocation();
    const { role, setRole, isAdmin } = useRole();
    const [backendStatus, setBackendStatus] = useState("checking");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const pageTitles = {
        "/": "AI Customer Support",
        "/upload": "Knowledge Base Ingestion",
        "/admin": "Admin Analytics Dashboard",
        "/about": "AI Administration",
    };

    const currentTitle = pageTitles[location.pathname] || "SupportPilot AI";

    const verifyBackendHealth = async () => {
        setBackendStatus("checking");
        try {
            const data = await checkHealth();
            if (data && data.status === "healthy") {
                setBackendStatus("connected");
            } else {
                setBackendStatus("offline");
            }
        } catch (err) {
            setBackendStatus("offline");
        }
    };

    useEffect(() => {
        if (isAdmin) {
            verifyBackendHealth();
            const interval = setInterval(verifyBackendHealth, 30000);
            return () => clearInterval(interval);
        }
    }, [isAdmin]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleRoleSelect = (newRole) => {
        setRole(newRole);
        setIsMenuOpen(false);
        toast.success(`Switched to ${newRole === "admin" ? "Admin" : "Customer"} mode`);
    };

    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 shadow-2xs z-20">
            {/* Left: Mobile Menu Toggle & Title */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleSidebar}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 md:hidden cursor-pointer"
                    aria-label="Toggle navigation menu"
                >
                    <FiMenu size={20} />
                </button>

                <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight line-clamp-1">
                    {currentTitle}
                </h2>
            </div>

            {/* Right: Backend Status (Admin Only) & Role Switcher Dropdown */}
            <div className="flex items-center gap-3">
                {/* Backend Status Badge (VISIBLE TO ADMIN ONLY) */}
                {isAdmin && (
                    <div
                        className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                            backendStatus === "connected"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : backendStatus === "offline"
                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                    >
                        <span className="relative flex h-2 w-2">
                            {backendStatus === "connected" && (
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                            )}
                            <span
                                className={`relative inline-flex h-2 w-2 rounded-full ${
                                    backendStatus === "connected"
                                        ? "bg-emerald-500"
                                        : backendStatus === "offline"
                                        ? "bg-rose-500"
                                        : "bg-slate-400 animate-pulse"
                                }`}
                            ></span>
                        </span>

                        <span className="hidden sm:inline">
                            {backendStatus === "connected" && "Backend Connected"}
                            {backendStatus === "offline" && "Backend Offline"}
                            {backendStatus === "checking" && "Connecting..."}
                        </span>

                        {backendStatus === "offline" && (
                            <button
                                onClick={verifyBackendHealth}
                                className="ml-1 hover:text-rose-900 cursor-pointer"
                                title="Retry health check"
                            >
                                <FiRefreshCw size={12} />
                            </button>
                        )}
                    </div>
                )}

                {/* Profile / Role Selector */}
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        aria-expanded={isMenuOpen}
                        aria-label="Role selector menu"
                    >
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-[10px]">
                            {isAdmin ? "AD" : "CU"}
                        </div>
                        <span className="font-semibold capitalize text-slate-800">
                            {role} Mode
                        </span>
                        <FiChevronDown size={14} className="text-slate-400" />
                    </button>

                    {/* Role Selector Dropdown */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg z-50 animate-fadeIn">
                            <div className="px-3 py-2 border-b border-slate-100">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                    Role Simulation
                                </p>
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                    Toggle frontend view mode:
                                </p>
                            </div>

                            <div className="py-1">
                                <button
                                    onClick={() => handleRoleSelect("customer")}
                                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                                        role === "customer"
                                            ? "bg-blue-50 text-blue-700 font-semibold"
                                            : "text-slate-700 hover:bg-slate-50"
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <FiUserCheck size={14} /> Customer View
                                    </span>
                                    {role === "customer" && <FiCheck size={14} className="text-blue-600" />}
                                </button>

                                <button
                                    onClick={() => handleRoleSelect("admin")}
                                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                                        role === "admin"
                                            ? "bg-blue-50 text-blue-700 font-semibold"
                                            : "text-slate-700 hover:bg-slate-50"
                                    }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <FiShield size={14} /> Admin View
                                    </span>
                                    {role === "admin" && <FiCheck size={14} className="text-blue-600" />}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
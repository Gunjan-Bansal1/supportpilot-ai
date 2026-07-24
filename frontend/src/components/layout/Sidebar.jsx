import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    FiMessageSquare,
    FiUploadCloud,
    FiInfo,
    FiPlus,
    FiX,
    FiShield,
    FiBarChart2,
} from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import { useRole } from "../../context/RoleContext";

function Sidebar({ isOpen, onClose }) {
    const navigate = useNavigate();
    const { isAdmin, role } = useRole();

    // Dynamically filter navigation options according to active role
    const allNavItems = [
        {
            name: "AI Support Chat",
            path: "/",
            icon: <FiMessageSquare size={20} />,
            adminOnly: false,
        },
        {
            name: "Upload Documents",
            path: "/upload",
            icon: <FiUploadCloud size={20} />,
            adminOnly: true,
        },
        {
            name: "Admin Dashboard",
            path: "/admin",
            icon: <FiBarChart2 size={20} />,
            adminOnly: true,
        },
        {
            name: "AI Administration",
            path: "/about",
            icon: <FiInfo size={20} />,
            adminOnly: true,
        },
    ];

    const visibleNavItems = allNavItems.filter(
        (item) => !item.adminOnly || isAdmin
    );

    const handleNewChat = () => {
        navigate("/");
        window.dispatchEvent(new CustomEvent("supportpilot:new-chat"));
        if (onClose) onClose();
    };

    const handleNavClick = () => {
        if (onClose) onClose();
    };

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Drawer */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col border-r border-slate-200 bg-white shadow-lg transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                }`}
                aria-label="Sidebar Navigation"
            >
                {/* Logo & Mobile Close Button */}
                <div className="flex items-center justify-between border-b border-slate-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                            <BsRobot size={22} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                                SupportPilot <span className="text-blue-600">AI</span>
                            </h1>
                            <p className="text-[11px] font-medium text-slate-500">
                                Support Assistant
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 md:hidden cursor-pointer"
                        aria-label="Close sidebar"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* New Chat Button */}
                <div className="p-4">
                    <button
                        onClick={handleNewChat}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 active:scale-[0.98] cursor-pointer"
                    >
                        <FiPlus size={18} />
                        <span>New Chat</span>
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4">
                    <div className="space-y-1.5">
                        {visibleNavItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={handleNavClick}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? "bg-blue-600 text-white shadow-sm"
                                            : "text-slate-700 hover:bg-slate-100"
                                    }`
                                }
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </NavLink>
                        ))}
                    </div>
                </nav>

                {/* Active Mode Badge & Footer */}
                <div className="border-t border-slate-200 p-4">
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-2.5 text-xs">
                        <span className="flex items-center gap-1.5 font-medium text-slate-600">
                            {isAdmin ? <FiShield className="text-blue-600" /> : <BsRobot className="text-slate-500" />}
                            Role: <strong className="capitalize text-slate-800">{role}</strong>
                        </span>
                    </div>

                    <div className="mt-3 text-center">
                        <p className="text-xs font-semibold text-slate-600">
                            SupportPilot AI v1.0
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-400">
                            Customer Support SaaS
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
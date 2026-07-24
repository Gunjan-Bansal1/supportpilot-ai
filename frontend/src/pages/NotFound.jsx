import React from "react";
import { Link } from "react-router-dom";
import { BsRobot } from "react-icons/bs";
import { FiHome } from "react-icons/fi";

function NotFound() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-slate-100 px-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm mb-6">
                <BsRobot size={40} />
            </div>

            <h1 className="text-6xl font-extrabold text-slate-800 tracking-tight">404</h1>

            <h2 className="mt-2 text-xl font-bold text-slate-700">Page Not Found</h2>

            <p className="mt-2 max-w-md text-sm text-slate-500">
                The requested page does not exist or has been moved.
            </p>

            <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98]"
            >
                <FiHome size={16} />
                <span>Return to AI Chat</span>
            </Link>
        </div>
    );
}

export default NotFound;
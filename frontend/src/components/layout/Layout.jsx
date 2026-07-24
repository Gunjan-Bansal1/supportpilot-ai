import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-100 font-sans text-slate-800">
            {/* Sidebar Navigation */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Navbar */}
                <Navbar
                    onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
                />

                {/* Dynamic Page Content */}
                <main className="flex-1 overflow-y-auto bg-slate-100 p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;
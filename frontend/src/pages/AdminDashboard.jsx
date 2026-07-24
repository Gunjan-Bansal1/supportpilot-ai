import React, { useState, useEffect, useMemo } from "react";
import {
    FiBarChart2,
    FiMessageSquare,
    FiSmile,
    FiFrown,
    FiAlertCircle,
    FiActivity,
    FiSearch,
    FiChevronLeft,
    FiChevronRight,
    FiRefreshCw,
    FiX,
    FiFileText,
    FiCalendar,
    FiCpu,
    FiClock,
} from "react-icons/fi";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { getAdminLogs, getAdminStats } from "../services/api";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Table state
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState("timestamp");
    const [sortOrder, setSortOrder] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;

    // Drawer state
    const [selectedTicket, setSelectedTicket] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [statsRes, logsRes] = await Promise.all([
                getAdminStats(),
                getAdminLogs(200),
            ]);
            setStats(statsRes);
            setLogs(logsRes);
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            setError(
                err.response?.data?.detail ||
                err.message ||
                "Failed to fetch administrative analytics. Please ensure backend is running."
            );
            toast.error("Failed to load admin analytics");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter logs based on search query
    const filteredLogs = useMemo(() => {
        if (!searchQuery.trim()) return logs;
        const q = searchQuery.toLowerCase();
        return logs.filter(
            (item) =>
                (item.customer_query && item.customer_query.toLowerCase().includes(q)) ||
                (item.intent && item.intent.toLowerCase().includes(q)) ||
                (item.sentiment && item.sentiment.toLowerCase().includes(q)) ||
                (item.priority && item.priority.toLowerCase().includes(q)) ||
                (item.llm_response && item.llm_response.toLowerCase().includes(q))
        );
    }, [logs, searchQuery]);

    // Sort logs
    const sortedLogs = useMemo(() => {
        return [...filteredLogs].sort((a, b) => {
            let valA = a[sortField];
            let valB = b[sortField];

            if (typeof valA === "string") valA = valA.toLowerCase();
            if (typeof valB === "string") valB = valB.toLowerCase();

            if (valA < valB) return sortOrder === "asc" ? -1 : 1;
            if (valA > valB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredLogs, sortField, sortOrder]);

    // Pagination
    const totalPages = Math.ceil(sortedLogs.length / rowsPerPage) || 1;
    const paginatedLogs = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return sortedLogs.slice(start, start + rowsPerPage);
    }, [sortedLogs, currentPage]);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortOrder("desc");
        }
    };

    // Chart Data Preparation
    const sentimentChartData = useMemo(() => {
        if (!stats) return [];
        return [
            { name: "Positive", value: stats.positive || 0, color: "#10b981" },
            { name: "Neutral", value: stats.neutral || 0, color: "#64748b" },
            { name: "Negative", value: stats.negative || 0, color: "#f43f5e" },
        ].filter((d) => d.value > 0 || stats.total_queries === 0);
    }, [stats]);

    const priorityChartData = useMemo(() => {
        if (!stats) return [];
        return [
            { name: "Low", count: stats.low || 0, fill: "#10b981" },
            { name: "Medium", count: stats.medium || 0, fill: "#f59e0b" },
            { name: "High", count: stats.high || 0, fill: "#f97316" },
            { name: "Critical", count: stats.critical || 0, fill: "#e11d48" },
        ];
    }, [stats]);

    const intentChartData = useMemo(() => {
        if (!stats || !stats.top_intents) return [];
        const COLORS = ["#2563eb", "#6366f1", "#8b5cf6", "#ec4899", "#14b8a6"];
        return stats.top_intents.map((item, index) => ({
            name: item.intent || "General",
            value: item.count,
            color: COLORS[index % COLORS.length],
        }));
    }, [stats]);

    const getPriorityBadge = (priority) => {
        const p = (priority || "").toLowerCase();
        if (p === "critical" || p === "urgent") {
            return "bg-rose-50 text-rose-700 border-rose-200";
        }
        if (p === "high") {
            return "bg-orange-50 text-orange-700 border-orange-200";
        }
        if (p === "medium") {
            return "bg-amber-50 text-amber-700 border-amber-200";
        }
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    };

    const getSentimentBadge = (sentiment) => {
        const s = (sentiment || "").toLowerCase();
        if (s.includes("negative")) {
            return "bg-rose-50 text-rose-700 border-rose-200";
        }
        if (s.includes("positive")) {
            return "bg-emerald-50 text-emerald-700 border-emerald-200";
        }
        return "bg-slate-100 text-slate-700 border-slate-200";
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-6xl space-y-6 p-4">
                <div className="flex items-center justify-between">
                    <div className="h-8 w-64 animate-pulse rounded-lg bg-slate-200" />
                    <div className="h-8 w-24 animate-pulse rounded-lg bg-slate-200" />
                </div>
                {/* Stats Cards Skeleton */}
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-28 animate-pulse rounded-2xl bg-white border border-slate-200 p-4" />
                    ))}
                </div>
                {/* Charts Skeleton */}
                <div className="grid gap-4 sm:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-72 animate-pulse rounded-2xl bg-white border border-slate-200 p-4" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto flex max-w-xl flex-col items-center justify-center p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 mb-4">
                    <FiAlertCircle size={32} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Failed to Load Dashboard</h2>
                <p className="mt-2 text-sm text-slate-500">{error}</p>
                <button
                    onClick={fetchData}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-xs hover:bg-blue-700 cursor-pointer"
                >
                    <FiRefreshCw size={16} /> Retry Refresh
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl space-y-6 p-2 sm:p-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                        <FiBarChart2 className="text-blue-600" /> Administrative AI Analytics
                    </h1>
                    <p className="mt-1 text-xs text-slate-500">
                        Real-time AI metrics, sentiment distribution, priority tracking, and customer ticket logs.
                    </p>
                </div>

                <button
                    onClick={fetchData}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                    <FiRefreshCw size={14} /> Refresh Metrics
                </button>
            </div>

            {/* SECTION 1: Statistics Cards */}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {/* Total Queries */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Tickets</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <FiMessageSquare size={16} />
                        </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-slate-800">{stats?.total_queries || 0}</p>
                    <p className="mt-1 text-[11px] text-slate-400">Processed by AI</p>
                </div>

                {/* Positive Customers */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Positive Sentiment</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                            <FiSmile size={16} />
                        </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-emerald-600">{stats?.positive || 0}</p>
                    <p className="mt-1 text-[11px] text-slate-400">Happy customers</p>
                </div>

                {/* Negative Customers */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Negative Sentiment</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                            <FiFrown size={16} />
                        </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-rose-600">{stats?.negative || 0}</p>
                    <p className="mt-1 text-[11px] text-slate-400">Needs escalation</p>
                </div>

                {/* High Priority Tickets */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">High Priority</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                            <FiAlertCircle size={16} />
                        </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-orange-600">{stats?.high || 0}</p>
                    <p className="mt-1 text-[11px] text-slate-400">Urgent attention</p>
                </div>

                {/* Critical Tickets */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical Tickets</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-700">
                            <FiAlertCircle size={16} />
                        </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-rose-700">{stats?.critical || 0}</p>
                    <p className="mt-1 text-[11px] text-slate-400">Action required</p>
                </div>

                {/* Average AI Confidence */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Confidence</span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <FiActivity size={16} />
                        </div>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-indigo-600">
                        {stats?.avg_confidence !== undefined ? `${stats.avg_confidence}%` : "N/A"}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">Model certainty</p>
                </div>
            </div>

            {/* SECTION 2: Analytics Charts */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Intent Distribution Pie */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <h3 className="text-sm font-bold text-slate-800 mb-1">Intent Distribution</h3>
                    <p className="text-[11px] text-slate-400 mb-4">Breakdown of support query categories</p>
                    {intentChartData.length > 0 ? (
                        <div className="h-60 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={intentChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={70}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >
                                        {intentChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value} tickets`, "Count"]} />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex h-60 items-center justify-center text-xs text-slate-400">
                            No query intent data recorded yet.
                        </div>
                    )}
                </div>

                {/* Sentiment Distribution Pie */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <h3 className="text-sm font-bold text-slate-800 mb-1">Sentiment Breakdown</h3>
                    <p className="text-[11px] text-slate-400 mb-4">Customer emotional tone metrics</p>
                    {sentimentChartData.length > 0 ? (
                        <div className="h-60 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sentimentChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={70}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >
                                        {sentimentChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value} tickets`, "Count"]} />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex h-60 items-center justify-center text-xs text-slate-400">
                            No sentiment data recorded yet.
                        </div>
                    )}
                </div>

                {/* Priority Breakdown Bar */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                    <h3 className="text-sm font-bold text-slate-800 mb-1">Priority Levels</h3>
                    <p className="text-[11px] text-slate-400 mb-4">Ticket severity distribution</p>
                    {priorityChartData.some((d) => d.count > 0) ? (
                        <div className="h-60 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={priorityChartData}>
                                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                                    <Tooltip formatter={(value) => [`${value} tickets`, "Priority"]} />
                                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                        {priorityChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex h-60 items-center justify-center text-xs text-slate-400">
                            No priority data recorded yet.
                        </div>
                    )}
                </div>
            </div>

            {/* SECTION 3: Recent AI Customer Queries Table */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                    <div>
                        <h3 className="text-base font-bold text-slate-800">Recent Customer AI Queries</h3>
                        <p className="text-xs text-slate-500">Click any row to inspect full ticket AI decision drawer.</p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full sm:w-72">
                        <FiSearch className="absolute left-3 top-3 text-slate-400" size={16} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            placeholder="Search queries, intent, priority..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 uppercase tracking-wider text-[10px]">
                                <th
                                    onClick={() => handleSort("timestamp")}
                                    className="px-4 py-3 font-semibold cursor-pointer hover:text-slate-900"
                                >
                                    Timestamp {sortField === "timestamp" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th
                                    onClick={() => handleSort("customer_query")}
                                    className="px-4 py-3 font-semibold cursor-pointer hover:text-slate-900"
                                >
                                    Customer Query {sortField === "customer_query" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th
                                    onClick={() => handleSort("intent")}
                                    className="px-4 py-3 font-semibold cursor-pointer hover:text-slate-900"
                                >
                                    Intent {sortField === "intent" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th
                                    onClick={() => handleSort("sentiment")}
                                    className="px-4 py-3 font-semibold cursor-pointer hover:text-slate-900"
                                >
                                    Sentiment {sortField === "sentiment" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th
                                    onClick={() => handleSort("priority")}
                                    className="px-4 py-3 font-semibold cursor-pointer hover:text-slate-900"
                                >
                                    Priority {sortField === "priority" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                                </th>
                                <th className="px-4 py-3 font-semibold">Response Preview</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                            {paginatedLogs.length > 0 ? (
                                paginatedLogs.map((log) => (
                                    <tr
                                        key={log.id}
                                        onClick={() => setSelectedTicket(log)}
                                        className="group transition-colors hover:bg-blue-50/50 cursor-pointer"
                                    >
                                        <td className="whitespace-nowrap px-4 py-3 font-mono text-[11px] text-slate-500">
                                            {log.timestamp || "N/A"}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-800 max-w-xs truncate">
                                            {log.customer_query}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-600">
                                            {log.intent || "General"}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3">
                                            <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium ${getSentimentBadge(log.sentiment)}`}>
                                                {log.sentiment}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3">
                                            <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold ${getPriorityBadge(log.priority)}`}>
                                                {(log.priority || "LOW").toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-500 max-w-xs truncate">
                                            {log.llm_response || "—"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-xs text-slate-400">
                                        No customer queries recorded yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {sortedLogs.length > 0 && (
                    <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4 text-xs text-slate-500">
                        <span>
                            Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, sortedLogs.length)} of {sortedLogs.length} entries
                        </span>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                            >
                                <FiChevronLeft size={16} />
                            </button>
                            <span className="font-semibold text-slate-700">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                            >
                                <FiChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* SECTION 4: Ticket Details Drawer */}
            {selectedTicket && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity"
                        onClick={() => setSelectedTicket(null)}
                    />

                    {/* Drawer Slide */}
                    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-white shadow-2xl transition-transform duration-300 animate-slideLeft">
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between border-b border-slate-200 p-5">
                            <div>
                                <h3 className="text-base font-bold text-slate-800">Ticket Inspection Drawer</h3>
                                <p className="text-xs text-slate-500">Log ID #{selectedTicket.id}</p>
                            </div>
                            <button
                                onClick={() => setSelectedTicket(null)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Drawer Body */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Customer Query */}
                            <div>
                                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Customer Query</label>
                                <div className="mt-1.5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-800">
                                    "{selectedTicket.customer_query}"
                                </div>
                            </div>

                            {/* Metadata Badges */}
                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Intent</span>
                                    <p className="mt-1 text-xs font-bold text-slate-800">{selectedTicket.intent || "Unknown"}</p>
                                    <p className="text-[10px] text-slate-500">Confidence: {selectedTicket.intent_confidence}%</p>
                                </div>

                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sentiment</span>
                                    <p className="mt-1 text-xs font-bold text-slate-800">{selectedTicket.sentiment}</p>
                                    <p className="text-[10px] text-slate-500">Confidence: {selectedTicket.sentiment_confidence}%</p>
                                </div>

                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Priority</span>
                                    <p className="mt-1 text-xs font-bold uppercase text-slate-800">{selectedTicket.priority}</p>
                                    <p className="text-[10px] text-slate-500">Assigned Severity</p>
                                </div>
                            </div>

                            {/* Context & Retrieval Info */}
                            <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-blue-50/50 p-3 text-xs text-slate-600">
                                <span className="flex items-center gap-1 font-medium text-blue-700">
                                    <FiFileText size={14} /> Retrieved Context: {selectedTicket.retrieved_document_count || 1} Chunks
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1 text-slate-500">
                                    <FiClock size={14} /> {selectedTicket.timestamp}
                                </span>
                            </div>

                            {/* LLM Response */}
                            <div>
                                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Groq LLM Response</label>
                                <div className="mt-1.5 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-700 leading-relaxed shadow-2xs prose prose-sm max-w-none">
                                    <ReactMarkdown>{selectedTicket.llm_response}</ReactMarkdown>
                                </div>
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="border-t border-slate-200 p-4 text-right">
                            <button
                                onClick={() => setSelectedTicket(null)}
                                className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-medium text-white hover:bg-slate-900 cursor-pointer"
                            >
                                Close Inspection
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default AdminDashboard;

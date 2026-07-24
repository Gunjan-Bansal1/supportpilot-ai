import React from "react";

function Loader({ size = "md", text = "" }) {
    const sizeClasses = {
        sm: "h-4 w-4 border-2",
        md: "h-8 w-8 border-3",
        lg: "h-12 w-12 border-4",
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3 p-4">
            <div
                className={`animate-spin rounded-full border-blue-600 border-t-transparent ${sizeClasses[size] || sizeClasses.md}`}
                role="status"
                aria-label="Loading"
            />
            {text && (
                <p className="text-xs font-medium text-slate-500 animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );
}

export default Loader;

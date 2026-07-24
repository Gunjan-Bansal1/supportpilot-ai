import React from "react";

function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    className = "",
    icon: Icon,
    ...props
}) {
    const baseStyles =
        "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]";

    const variants = {
        primary:
            "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        secondary:
            "bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        outline:
            "border border-slate-300 hover:bg-slate-50 text-slate-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        ghost:
            "hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus:ring-2 focus:ring-slate-400",
        danger:
            "bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-2 focus:ring-rose-500 focus:ring-offset-2",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
        md: "px-4 py-2.5 text-sm rounded-xl gap-2",
        lg: "px-6 py-3 text-base rounded-xl gap-2.5",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
            {...props}
        >
            {loading ? (
                <svg
                    className="h-4 w-4 animate-spin text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            ) : Icon ? (
                <Icon className="text-current" />
            ) : null}
            <span>{children}</span>
        </button>
    );
}

export default Button;

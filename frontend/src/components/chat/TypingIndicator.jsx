import React from "react";
import { BsRobot } from "react-icons/bs";

function TypingIndicator() {
    return (
        <div className="flex items-start gap-4 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                <BsRobot size={20} />
            </div>

            <div className="flex flex-col gap-1.5 rounded-2xl rounded-tl-xs bg-slate-100 px-4 py-3 text-slate-600">
                <div className="flex items-center gap-1.5 py-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-blue-600"></span>
                </div>
                <span className="text-[11px] font-medium text-slate-400">
                    Finding the best answer for you...
                </span>
            </div>
        </div>
    );
}

export default TypingIndicator;

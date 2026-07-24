import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";

function ChatInput({ onSendMessage, disabled = false }) {
    const [input, setInput] = useState("");
    const textareaRef = useRef(null);

    // Auto-resize textarea height up to a max
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
        }
    }, [input]);

    const handleSend = () => {
        if (!input.trim() || disabled) return;
        onSendMessage(input.trim());
        setInput("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t border-slate-200 bg-white p-4">
            <div className="mx-auto flex max-w-4xl items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20">
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                    rows={1}
                    className="flex-1 resize-none bg-transparent px-3 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:opacity-50"
                />

                <button
                    onClick={handleSend}
                    disabled={disabled || !input.trim()}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:hover:bg-blue-600 disabled:active:scale-100 cursor-pointer"
                    title="Send message"
                >
                    <FiSend size={18} />
                </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-400">
                SupportPilot Assistant is here to help you resolve your support inquiries quickly.
            </p>
        </div>
    );
}

export default ChatInput;

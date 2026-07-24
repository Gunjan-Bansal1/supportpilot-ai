import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import WelcomeScreen from "./WelcomeScreen";
import TypingIndicator from "./TypingIndicator";

function ChatWindow({ messages, loading, onSendMessage, onSelectPrompt }) {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    return (
        <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {messages.length === 0 ? (
                    <WelcomeScreen onSelectPrompt={onSelectPrompt} />
                ) : (
                    <div className="mx-auto flex max-w-4xl flex-col gap-4">
                        {messages.map((msg, idx) => (
                            <ChatMessage key={msg.id || idx} message={msg} />
                        ))}
                        {loading && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Chat Input */}
            <ChatInput onSendMessage={onSendMessage} disabled={loading} />
        </div>
    );
}

export default ChatWindow;
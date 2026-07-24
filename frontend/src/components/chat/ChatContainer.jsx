import React, { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import { predictMessage } from "../../services/api";
import toast from "react-hot-toast";

function ChatContainer() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Listen for New Chat trigger from custom event
    useEffect(() => {
        const handleNewChat = () => {
            setMessages([]);
            toast.success("Started a new conversation");
        };

        window.addEventListener("supportpilot:new-chat", handleNewChat);
        return () => {
            window.removeEventListener("supportpilot:new-chat", handleNewChat);
        };
    }, []);

    const handleSendMessage = async (queryText) => {
        if (!queryText.trim()) return;

        const userMsg = {
            id: `user-${Date.now()}`,
            sender: "user",
            text: queryText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, userMsg]);
        setLoading(true);

        try {
            const data = await predictMessage(queryText);

            const aiMsg = {
                id: `ai-${Date.now()}`,
                sender: "ai",
                response: data.response,
                query: data.query,
                intent: data.intent,
                intent_confidence: data.intent_confidence,
                sentiment: data.sentiment,
                sentiment_confidence: data.sentiment_confidence,
                priority: data.priority,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            setMessages((prev) => [...prev, aiMsg]);
        } catch (err) {
            console.error("Failed to get prediction:", err);
            const errorMessage =
                err.response?.data?.detail ||
                err.message ||
                "Failed to communicate with SupportPilot backend. Please check backend server connection.";
            
            toast.error(errorMessage);

            const errorMsgObj = {
                id: `err-${Date.now()}`,
                sender: "ai",
                response: `⚠️ **Connection Error**: ${errorMessage}\n\nPlease verify that the FastAPI backend server is running on \`http://localhost:8000\`.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            setMessages((prev) => [...prev, errorMsgObj]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-full w-full">
            <ChatWindow
                messages={messages}
                loading={loading}
                onSendMessage={handleSendMessage}
                onSelectPrompt={handleSendMessage}
            />
        </div>
    );
}

export default ChatContainer;

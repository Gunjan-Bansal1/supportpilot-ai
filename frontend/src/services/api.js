import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});

/**
 * Check backend health status
 * @returns {Promise<{status: string}>}
 */
export const checkHealth = async () => {
    try {
        const response = await api.get("/health");
        return response.data;
    } catch (error) {
        console.error("Health check service error:", error);
        throw error;
    }
};

/**
 * Send customer query to AI model for intent, sentiment, priority prediction & RAG response
 * @param {string} query 
 * @returns {Promise<{query: string, intent: string, intent_confidence: number, sentiment: string, sentiment_confidence: number, priority: string, response: string}>}
 */
export const predictMessage = async (query) => {
    try {
        const response = await api.post("/predict", { query });
        return response.data;
    } catch (error) {
        console.error("Predict message service error:", error);
        throw error;
    }
};

/**
 * Upload PDF or TXT document to train vector database
 * @param {File} file 
 * @returns {Promise<{message: string, status: string}>}
 */
export const uploadDocument = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post("/upload-documents", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Upload document service error:", error);
        throw error;
    }
};

/**
 * Get prediction logs for admin dashboard
 * @param {number} limit 
 * @returns {Promise<Array>}
 */
export const getAdminLogs = async (limit = 100) => {
    try {
        const response = await api.get("/admin/logs", { params: { limit } });
        return response.data;
    } catch (error) {
        console.error("Get admin logs service error:", error);
        throw error;
    }
};

/**
 * Get aggregate prediction statistics for admin dashboard
 * @returns {Promise<Object>}
 */
export const getAdminStats = async () => {
    try {
        const response = await api.get("/admin/stats");
        return response.data;
    } catch (error) {
        console.error("Get admin stats service error:", error);
        throw error;
    }
};

export default api;

"""
Log Service
-----------
Lightweight SQLite persistence for ticket predictions and analytics reporting.
"""

import sqlite3
import os
from datetime import datetime
from typing import List, Dict, Any

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "prediction_logs.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS prediction_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                customer_query TEXT NOT NULL,
                intent TEXT NOT NULL,
                intent_confidence REAL NOT NULL,
                sentiment TEXT NOT NULL,
                sentiment_confidence REAL NOT NULL,
                priority TEXT NOT NULL,
                llm_response TEXT NOT NULL,
                retrieved_document_count INTEGER DEFAULT 0
            )
        """)
        conn.commit()

# Initialize DB table on module load
init_db()

def save_prediction_log(data: Dict[str, Any]) -> None:
    """
    Save a prediction record into the SQLite database.
    """
    try:
        timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO prediction_logs (
                    timestamp,
                    customer_query,
                    intent,
                    intent_confidence,
                    sentiment,
                    sentiment_confidence,
                    priority,
                    llm_response,
                    retrieved_document_count
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                timestamp,
                data.get("query", ""),
                data.get("intent", "Unknown"),
                float(data.get("intent_confidence", 0.0)),
                data.get("sentiment", "Neutral"),
                float(data.get("sentiment_confidence", 0.0)),
                data.get("priority", "low"),
                data.get("response", ""),
                int(data.get("retrieved_document_count", 1))
            ))
            conn.commit()
    except Exception as e:
        print(f"Error saving prediction log: {e}")

def get_prediction_logs(limit: int = 100) -> List[Dict[str, Any]]:
    """
    Retrieve latest prediction logs sorted by timestamp descending.
    """
    try:
        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, timestamp, customer_query, intent, intent_confidence,
                       sentiment, sentiment_confidence, priority, llm_response,
                       retrieved_document_count
                FROM prediction_logs
                ORDER BY id DESC
                LIMIT ?
            """, (limit,))
            rows = cursor.fetchall()
            return [dict(row) for row in rows]
    except Exception as e:
        print(f"Error retrieving prediction logs: {e}")
        return []

def get_prediction_stats() -> Dict[str, Any]:
    """
    Compute aggregate analytics statistics from prediction logs.
    """
    try:
        with get_connection() as conn:
            cursor = conn.cursor()
            
            # Total queries
            cursor.execute("SELECT COUNT(*) FROM prediction_logs")
            total_queries = cursor.fetchone()[0] or 0

            if total_queries == 0:
                return {
                    "total_queries": 0,
                    "positive": 0,
                    "neutral": 0,
                    "negative": 0,
                    "low": 0,
                    "medium": 0,
                    "high": 0,
                    "critical": 0,
                    "avg_confidence": 0.0,
                    "top_intents": []
                }

            # Sentiment counts
            cursor.execute("SELECT LOWER(sentiment), COUNT(*) FROM prediction_logs GROUP BY LOWER(sentiment)")
            sentiment_counts = dict(cursor.fetchall())

            # Priority counts
            cursor.execute("SELECT LOWER(priority), COUNT(*) FROM prediction_logs GROUP BY LOWER(priority)")
            priority_counts = dict(cursor.fetchall())

            # Average confidence
            cursor.execute("SELECT AVG(intent_confidence) FROM prediction_logs")
            avg_conf = cursor.fetchone()[0] or 0.0

            # Top intents
            cursor.execute("""
                SELECT intent, COUNT(*) as count 
                FROM prediction_logs 
                GROUP BY intent 
                ORDER BY count DESC 
                LIMIT 5
            """)
            top_intents = [{"intent": row[0], "count": row[1]} for row in cursor.fetchall()]

            return {
                "total_queries": total_queries,
                "positive": sentiment_counts.get("positive", 0),
                "neutral": sentiment_counts.get("neutral", 0),
                "negative": sentiment_counts.get("negative", 0),
                "low": priority_counts.get("low", 0),
                "medium": priority_counts.get("medium", 0),
                "high": priority_counts.get("high", 0),
                "critical": priority_counts.get("critical", 0) + priority_counts.get("urgent", 0),
                "avg_confidence": round(float(avg_conf), 2),
                "top_intents": top_intents
            }
    except Exception as e:
        print(f"Error computing prediction stats: {e}")
        return {
            "total_queries": 0,
            "positive": 0,
            "neutral": 0,
            "negative": 0,
            "low": 0,
            "medium": 0,
            "high": 0,
            "critical": 0,
            "avg_confidence": 0.0,
            "top_intents": []
        }

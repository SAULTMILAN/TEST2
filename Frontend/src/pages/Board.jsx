import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function Board() {
  const { token, logout } = useAuth();
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const API = "http://localhost:8080/api/threads"; // ✅ Spring Boot backend

  // ✅ Fetch all threads
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await fetch(API, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch threads");
        const data = await res.json();
        setThreads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchThreads();
  }, [token]);

  // ✅ Create new thread
  const handleCreateThread = async () => {
    if (!newThread.trim()) return;
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newThread }),
      });

      if (!res.ok) throw new Error("Failed to create thread");

      const created = await res.json();
      setThreads([created, ...threads]);
      setNewThread("");
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Like / Dislike
  const handleReaction = async (id, type) => {
    try {
      const res = await fetch(`${API}/${id}/${type}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`Failed to ${type}`);
      const updated = await res.json();

      setThreads(threads.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Delete thread
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to delete");
      }
      setThreads(threads.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading threads...</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Discussion Board</h2>
        <button onClick={logout} className="btn btn-outline-danger">
          🚪 Logout
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* New Thread */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Start a new discussion..."
          value={newThread}
          onChange={(e) => setNewThread(e.target.value)}
        />
        <button onClick={handleCreateThread} className="btn btn-primary">
          ➕ Create
        </button>
      </div>

      {/* Threads */}
      {threads.map((thread) => (
        <div key={thread.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">
              {thread.author?.username || "Anonymous"}
            </h5>
            <p className="card-text">{thread.title}</p>

            <button
              className="btn btn-success btn-sm me-2"
              onClick={() => handleReaction(thread.id, "like")}
            >
              👍 {thread.likes?.length || 0}
            </button>

            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => handleReaction(thread.id, "dislike")}
            >
              👎 {thread.dislikes?.length || 0}
            </button>

            <button
              className="btn btn-danger btn-sm me-2"
              onClick={() => handleDelete(thread.id)}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

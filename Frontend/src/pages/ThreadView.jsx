import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ThreadView() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const res = await fetch("http://localhost:8080/api/posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPosts(data.filter((p) => p.thread.id === parseInt(id)));
  };

  useEffect(() => {
    fetchPosts();
  }, [id]);

  const handlePost = async () => {
    if (!content.trim()) return;
    await fetch("http://localhost:8080/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, thread: { id: parseInt(id) } }),
    });
    setContent("");
    fetchPosts();
  };

  return (
    <div className="container mt-4">
      <h3>Thread #{id}</h3>
      <div className="mb-3 d-flex">
        <input
          className="form-control me-2"
          placeholder="Write a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button className="btn btn-success" onClick={handlePost}>
          Post
        </button>
      </div>
      <ul className="list-group">
        {posts.map((p) => (
          <li key={p.id} className="list-group-item">
            {p.author?.username}: {p.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

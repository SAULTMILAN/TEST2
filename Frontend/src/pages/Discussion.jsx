import React, { useState, useEffect } from "react";

function Discussion({ user, onLogout }) {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  // 🔹 Load discussions from localStorage safely
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("discussions"));
      if (Array.isArray(saved)) {
        setPosts(saved);
      } else {
        setPosts([]); // fallback if corrupted
      }
    } catch (error) {
      console.error("Error loading posts:", error);
      setPosts([]); // fallback
    }
  }, []);

  // 🔹 Save discussions
  const savePosts = (updated) => {
    localStorage.setItem("discussions", JSON.stringify(updated));
    setPosts(updated);
  };

  const handlePost = () => {
    if (!postText.trim()) return;

    const newPost = {
      id: Date.now(),
      text: postText,
      author: user,
      likes: [],
      dislikes: []
    };

    const updated = [...posts, newPost];
    savePosts(updated);
    setPostText("");
  };

  const handleLike = (postId) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        if (!post.likes.includes(user)) {
          post.likes.push(user);
          post.dislikes = post.dislikes.filter((id) => id !== user);
        }
      }
      return post;
    });
    savePosts(updated);
  };

  const handleDislike = (postId) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        if (!post.dislikes.includes(user)) {
          post.dislikes.push(user);
          post.likes = post.likes.filter((id) => id !== user);
        }
      }
      return post;
    });
    savePosts(updated);
  };

  const handleDelete = (postId) => {
    const updated = posts.filter((post) => post.id !== postId);
    savePosts(updated);
  };

  return (
    <div className="container mt-4">
      <h2>💬 Discussion Board</h2>
      <p>
        Welcome <b>{user}</b>!{" "}
        <button onClick={onLogout} className="btn btn-danger btn-sm">
          Logout
        </button>
      </p>

      {/* New Post */}
      <textarea
        className="form-control mb-2"
        placeholder="Write your discussion..."
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      />
      <button onClick={handlePost} className="btn btn-primary">
        Post
      </button>

      {/* Posts */}
      <div className="mt-4">
        {posts.length === 0 && <p>No discussions yet. Start one!</p>}
        {posts.map((post) => (
          <div key={post.id} className="card mb-2 p-2">
            <p><b>{post.author}:</b> {post.text}</p>
            <button
              className="btn btn-sm btn-outline-success me-2"
              onClick={() => handleLike(post.id)}
            >
              👍 {post.likes.length}
            </button>
            <button
              className="btn btn-sm btn-outline-warning me-2"
              onClick={() => handleDislike(post.id)}
            >
              👎 {post.dislikes.length}
            </button>
            {post.author === user && (
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(post.id)}
              >
                🗑 Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Discussion;

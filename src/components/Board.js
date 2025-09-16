import React, { useState } from "react";

function Board() {
  const [posts, setPosts] = useState([
    { id: 1, text: "This is the first post!", liked: false, disliked: false },
    { id: 2, text: "React makes front-end development fun!", liked: false, disliked: false },
  ]);

  const [newPost, setNewPost] = useState(""); // input for new discussion

  // Handle adding a new discussion
  const handleAddPost = () => {
    if (newPost.trim() === "") return; // prevent empty posts
    const newDiscussion = {
      id: posts.length + 1,
      text: newPost,
      liked: false,
      disliked: false
    };
    setPosts([newDiscussion, ...posts]); // add at top
    setNewPost(""); // clear input
  };

  // Handle Like
  const handleLike = (id) => {
    setPosts(posts.map(post =>
      post.id === id
        ? { ...post, liked: !post.liked, disliked: false }
        : post
    ));
  };

  // Handle Dislike
  const handleDislike = (id) => {
    setPosts(posts.map(post =>
      post.id === id
        ? { ...post, disliked: !post.disliked, liked: false }
        : post
    ));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <h2>Discussion Board</h2>

      {/* Input for new discussions */}
      <div style={{ marginBottom: "20px" }}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Start a new discussion..."
          rows="3"
          style={{ width: "100%", padding: "10px", fontSize: "14px" }}
        />
        <button
          onClick={handleAddPost}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          ➕ Add Discussion
        </button>
      </div>

      {/* Display posts */}
      {posts.map(post => (
        <div key={post.id} style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9"
        }}>
          <p>{post.text}</p>
          <button
            onClick={() => handleLike(post.id)}
            style={{
              marginRight: "10px",
              backgroundColor: post.liked ? "#4CAF50" : "#f0f0f0",
              color: post.liked ? "white" : "black",
              padding: "5px 12px",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer"
            }}
          >
            👍 Like
          </button>
          <button
            onClick={() => handleDislike(post.id)}
            style={{
              backgroundColor: post.disliked ? "#f44336" : "#f0f0f0",
              color: post.disliked ? "white" : "black",
              padding: "5px 12px",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer"
            }}
          >
            👎 Dislike
          </button>
        </div>
      ))}
    </div>
  );
}

export default Board;

import React, { useState } from "react";

export default function PostForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Write a post..." value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Post</button>
    </form>
  );
}

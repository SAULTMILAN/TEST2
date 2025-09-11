import React, { useState } from "react";

export default function DiscussionForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, posts: [] });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="New discussion..." value={title} onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}

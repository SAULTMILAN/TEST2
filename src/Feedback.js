import React, { useState } from "react";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState(
    JSON.parse(localStorage.getItem("feedbacks") || "[]")
  );
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedbacks = [...feedbacks, text];
    setFeedbacks(newFeedbacks);
    localStorage.setItem("feedbacks", JSON.stringify(newFeedbacks));
    setText("");
  };

  return (
    <div className="auth-container">
      <h1>Feedback</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <textarea
          placeholder="Write your feedback..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />
        <button type="submit">Submit</button>
      </form>
      <h2>All Feedback</h2>
      <ul>
        {feedbacks.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
}

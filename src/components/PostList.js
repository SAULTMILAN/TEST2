import React from "react";

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  );
}

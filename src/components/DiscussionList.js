import React from "react";

export default function DiscussionList({ discussions, onSelect }) {
  return (
    <ul>
      {discussions.map((d, i) => (
        <li key={i} onClick={() => onSelect(i)}>
          {d.title}
        </li>
      ))}
    </ul>
  );
}

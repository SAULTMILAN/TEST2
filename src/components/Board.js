import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import DiscussionForm from "./DiscussionForm";
import DiscussionList from "./DiscussionList";
import PostList from "./PostList";
import PostForm from "./PostForm";

export default function Board() {
  const { user, logout } = useAuth();
  const [discussions, setDiscussions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("discussions");
    if (saved) setDiscussions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("discussions", JSON.stringify(discussions));
  }, [discussions]);

  const addDiscussion = (discussion) => setDiscussions([...discussions, discussion]);
  const addPost = (post) => {
    if (selectedIndex === null) return;
    const updated = [...discussions];
    updated[selectedIndex].posts.push(post);
    setDiscussions(updated);
  };

  return (
    <div className="App">
      <header className="topbar">
        <h1>Discussion Board</h1>
        <div>
          <span>Signed in as <b>{user?.username}</b></span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <DiscussionForm onAdd={addDiscussion} />
      <DiscussionList discussions={discussions} onSelect={setSelectedIndex} />
      {selectedIndex !== null && (
        <>
          <h2>{discussions[selectedIndex].title}</h2>
          <PostList posts={discussions[selectedIndex].posts} />
          <PostForm onAdd={addPost} />
        </>
      )}
    </div>
  );
}

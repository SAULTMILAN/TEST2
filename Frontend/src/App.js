// src/App.js
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Discussion from "./pages/Discussion";
import Board from "./pages/Board";
import Navbar from "./pages/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Handle login
  const handleLogin = (username) => {
    setUser(username);
    navigate("/discussion");
  };

  // ✅ Handle logout
  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/discussion" element={<Discussion user={user} />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";              // 🔹 Your new Navbar + Hero + Three-Column + Discussion Board
import Login from "./components/Login";   // 🔹 Make sure this file exists
import Signup from "./components/Signup"; // 🔹 Make sure this file exists
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Homepage → Your new App.jsx layout */}
        <Route path="/" element={<App />} />

        {/* Login & Signup Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h1>404 - Page Not Found</h1>
              <a href="/">Go Back Home</a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));
  }, []);

  const signup = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.username === username)) {
      throw new Error("User already exists");
    }
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    setUser({ username });
    localStorage.setItem("user", JSON.stringify({ username }));
  };

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const u = users.find(u => u.username === username && u.password === password);
    if (!u) {
      throw new Error("Invalid username or password");
    }
    setUser({ username });
    localStorage.setItem("user", JSON.stringify({ username }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthCtx.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}

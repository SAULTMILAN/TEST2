import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      {/* Left side - brand */}
      <Link className="navbar-brand" to="/">
        Discussion Board
      </Link>

      {/* Right side - nav items */}
      <div>
        {user ? (
          <>
            <span className="text-light me-2">Hello, {user}</span>
            <button className="btn btn-outline-light" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-light me-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline-light" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

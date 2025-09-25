import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* 🔹 Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
        <div className="container-fluid">
          <a className="navbar-brand" href="#home">
            Ankit Thakyal
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#hero">
                  Hero
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#columns">
                  Three-Column
                </a>
              </li>
              <li className="nav-item">
                <button
                  className="copyright-btn ms-2"
                  onClick={() => setShowModal(true)}
                >
                  Copyright
                </button>
              </li>
              {/* Uncomment below if you want a Logout button */}
              {/* <li className="nav-item">
                <button className="btn btn-danger ms-3">Logout</button>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>

      {/* 🔹 Hero Section */}
      <section
        id="hero"
        className="hero d-flex align-items-center justify-content-center text-center"
      >
        <div>
          <h1 className="display-4 text-white fw-bold">
            Welcome to My Discussion Board
          </h1>
          <p className="lead text-light">
            Connect, collaborate, and grow with the community.
          </p>
        </div>
      </section>

      {/* 🔹 Three Column Section */}
      <section id="columns" className="three-col py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src="https://picsum.photos/300/200?random=1"
                  className="card-img-top"
                  alt="Engage"
                />
                <div className="card-body">
                  <h5 className="card-title">Engage</h5>
                  <p className="card-text">
                    Join conversations and share your insights.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src="https://picsum.photos/300/200?random=2"
                  className="card-img-top"
                  alt="Collaborate"
                />
                <div className="card-body">
                  <h5 className="card-title">Collaborate</h5>
                  <p className="card-text">
                    Work together on topics and projects easily.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src="https://picsum.photos/300/200?random=3"
                  className="card-img-top"
                  alt="Grow"
                />
                <div className="card-body">
                  <h5 className="card-title">Grow</h5>
                  <p className="card-text">
                    Learn from the community and build your skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Discussion Board */}
      <div className="container py-5">
        <h2 className="text-center mb-4">Discussion Board</h2>
        <textarea
          className="form-control mb-3"
          placeholder="Write your post..."
        ></textarea>
        <button className="add-btn">Add Post</button>

        <div className="post mt-4">
          <strong>User123:</strong> This is a sample post.
          <div className="post-actions">
            <button className="like-btn">Like</button>
            <button className="dislike-btn">Dislike</button>
            <button className="delete-btn">Delete</button>
          </div>
        </div>
      </div>

      {/* 🔹 Footer */}
      <footer className="footer text-center py-3">
        <p>&copy; 2025 Ankit Thakyal. All Rights Reserved.</p>
      </footer>

      {/* 🔹 Copyright Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Copyright Info</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>&copy; 2025 Ankit Thakyal. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

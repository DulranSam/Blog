import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/addpost" className="nav-link">
              Add Post
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

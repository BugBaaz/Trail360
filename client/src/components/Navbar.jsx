import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src="./images.jpg/logo.jpg" alt="Education360 Logo" width="40" height="40" />
        </a>
        <a className="navbar-brand" href="#">Education360</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Books</a></li>
            <li className="nav-item"><a className="nav-link" href="#">About</a></li>
            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            <li className="nav-item ms-3">
              <i
                className={`fas ${darkMode ? "fa-sun" : "fa-moon"} theme-toggle`}
                onClick={toggleDarkMode}
              ></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

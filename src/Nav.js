import "./App.css";
import React from "react";
import { Link } from "react-router-dom";

//Navigation bar

function Nav() {
  const navStyle = {
    color: "white",
  };

  return (
    <div className="nav">
      <nav>
        <ul className="nav-links">
          <Link style={navStyle} to="/main">
            <li>Main</li>
          </Link>
          <Link style={navStyle} to="/info">
            <li>Info</li>
          </Link>
          <Link style={navStyle} to="/panel">
            <li>Panel</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;

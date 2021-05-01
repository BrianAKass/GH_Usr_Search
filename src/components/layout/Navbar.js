import React from "react";
import { Link } from "react-router-dom";
import Search from "../users/Search";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbarLogo">
        <div className="fab fa-github" /> <div>GitHub</div>
      </Link>
      <Search />
      <Link to="/about" className="btn about">
        About
      </Link>
    </nav>
  );
};

export default Navbar;

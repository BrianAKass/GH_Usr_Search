import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Search from "../users/Search";

const Navbar = ({ icon, title }) => {
  return (
    <nav className="navbar ">
      <Link to="/" className={icon} style={logo}>
        {" "}
        <a>GitHub</a>
      </Link>
      <Search />
      <Link to="/about" style={about}>
        About
      </Link>
    </nav>
  );
};

const logo = {
  color: "#f4f4f4",
  background: "#333",
  fontSize: "1.5em",
  margin: 0,
  padding: ".45rem 16px ",
  borderRadius: "15px 0 0 15px",
};
const about = {
  color: "#333",
};

Navbar.defaultProps = {
  icon: "fab fa-github",
};

Navbar.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Navbar;

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        <Link to="/" className="logo" onClick={closeMenu}>
          <span>Blog</span>Pro
        </Link>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link
            to="/"
            className={location.pathname === "/" ? "active-link" : ""}
            onClick={closeMenu}
          >
            Home
          </Link>

          <Link
            to="/create"
            className={
              location.pathname === "/create"
                ? "active-link"
                : ""
            }
            onClick={closeMenu}
          >
            Create Blog
          </Link>
        </div>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
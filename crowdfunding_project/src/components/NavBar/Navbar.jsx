import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axiosInstance from "../../apis/config";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    navigate("/login");
  }

  return (
    <nav className="custom-navbar">
      <div className="custom-navbar-container">
        <div className="custom-navbar-brand">
          <NavLink className="custom-navbar-brand" to="/">
            CrowdFunding
          </NavLink>
        </div>
        <form
          className="navbar-search-form"
          onSubmit={e => {
            e.preventDefault();
            if (searchQuery.trim()) {
              navigate(`/campaigns?search=${encodeURIComponent(searchQuery)}`);
            } else {
              navigate('/campaigns');
            }
            setMenuOpen(false);
          }}
        >
        {/* Burger Menu Button for mobile */}
        <button
          className={`burger-menu${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
        </button>
       
          <input
            className="navbar-search-input"
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{marginRight: 8}}
          />
          <button className="navbar-search-btn" type="submit">
            <span role="img" aria-label="search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </button>
        </form>
        <div className={`custom-navbar-center${menuOpen ? " show" : ""}`}>
          <ul className="custom-navbar-nav">
            <li>
              <NavLink className="custom-navbar-link" to="/" onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="custom-navbar-link" to="/campaigns" onClick={() => setMenuOpen(false)}>
                Campaigns
              </NavLink>
            </li>
            {userId !== null && (
              <>
                <li>
                  <NavLink className="custom-navbar-link" to="/create-campaign" onClick={() => setMenuOpen(false)}>
                    Create Campaign
                  </NavLink>
                </li>
                <li>
                  <NavLink className="custom-navbar-link" to="/mycampaigns" onClick={() => setMenuOpen(false)}>
                    My Campaigns
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className={`custom-navbar-right${menuOpen ? " show" : ""}`}>
          <ul className="custom-navbar-nav">
            {userId == null && (
              <>
                <li>
                  <NavLink className="custom-navbar-link" to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className="custom-navbar-link" to="/register" onClick={() => setMenuOpen(false)}>
                    Register
                  </NavLink>
                </li>
              </>
            )}
            {userId !== null && (
              <li>
                <NavLink
                  className="custom-navbar-link"
                  to="/login"
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                >
                  Logout
                </NavLink>
              </li>
            )}
            <div className="custom-navbar-social">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-twitter"></i>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

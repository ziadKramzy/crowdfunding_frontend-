import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFilter } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const handlesearch = (e) => {
    e.preventDefault();
    const query = searchInputRef.current.value.trim();
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <>
      {showFilter && (
        <div className="filter-modal-overlay">
          <div className="filter-modal">
            <h4>Filter by Date</h4>
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <div className="filter-buttons">
              <button className="cancel-btn" onClick={() => setShowFilter(false)}>Cancel</button>
              <button
                className="apply-btn"
                onClick={() => {
                  const params = new URLSearchParams();
                  if (searchQuery.trim()) params.append("search", searchQuery.trim());
                  if (startDate) params.append("start_date", startDate);
                  if (endDate) params.append("end_date", endDate);
                  navigate(`/campaigns?${params.toString()}`);
                  setShowFilter(false);
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="custom-navbar">
        <div className="custom-navbar-container">
          <div className="custom-navbar-brand">
            <NavLink className="custom-navbar-brand" to="/">CrowdFunding</NavLink>
          </div>

          {/* Burger Menu Button */}
          <button
            className={`burger-menu ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
            <span className="burger-bar"></span>
          </button>

          {/* Search Form */}
          <form
            className="navbar-search-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                navigate(`/campaigns?search=${encodeURIComponent(searchQuery)}`);
              } else {
                navigate("/campaigns");
              }
              setMenuOpen(false);
            }}
          >
            <input
              className="navbar-search-input"
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="navbar-search-btn" type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <button
              type="button"
              className="navbar-search-btn"
              onClick={() => setShowFilter(true)}
              title="Filter by date"
            >
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </form>

          {/* Unified Mobile Menu */}
          {menuOpen && (
            <div className="mobile-navbar-menu">
              <ul className="mobile-navbar-links">
                <li><NavLink className="custom-navbar-link" to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
                <li><NavLink className="custom-navbar-link" to="/campaigns" onClick={() => setMenuOpen(false)}>Campaigns</NavLink></li>
                {userId && (
                  <>
                    <li><NavLink className="custom-navbar-link" to="/create-campaign" onClick={() => setMenuOpen(false)}>Create Campaign</NavLink></li>
                    <li><NavLink className="custom-navbar-link" to="/mycampaigns" onClick={() => setMenuOpen(false)}>My Campaigns</NavLink></li>
                  </>
                )}
                {!userId ? (
                  <>
                    <li><NavLink className="custom-navbar-link" to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink></li>
                    <li><NavLink className="custom-navbar-link" to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink></li>
                  </>
                ) : (
                  <li><NavLink className="custom-navbar-link" to="/login" onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</NavLink></li>
                )}
              </ul>
            </div>
          )}

          {/* Center Links (desktop only) */}
          <div className={`custom-navbar-center ${menuOpen ? "show" : ""}`}>
            <ul className="custom-navbar-nav">
              <li><NavLink className="custom-navbar-link" to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
              <li><NavLink className="custom-navbar-link" to="/campaigns" onClick={() => setMenuOpen(false)}>Campaigns</NavLink></li>
              {userId && (
                <>
                  <li><NavLink className="custom-navbar-link" to="/create-campaign" onClick={() => setMenuOpen(false)}>Create Campaign</NavLink></li>
                  <li><NavLink className="custom-navbar-link" to="/mycampaigns" onClick={() => setMenuOpen(false)}>My Campaigns</NavLink></li>
                </>
              )}
            </ul>
          </div>

          {/* Right Side: Login/Register or Logout */}
          <div className={`custom-navbar-right ${menuOpen ? "show" : ""}`}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5em' }}>
    <ul className="custom-navbar-nav" style={{ marginBottom: 0 }}>
      {!userId ? (
        <>
          <li><NavLink className="custom-navbar-link" to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink></li>
          <li><NavLink className="custom-navbar-link" to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink></li>
        </>
      ) : (
        <li><NavLink className="custom-navbar-link" to="/login" onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</NavLink></li>
      )}
    </ul>
    <div className="custom-navbar-social">
      <i className="fab fa-facebook"></i>
      <i className="fab fa-instagram"></i>
      <i className="fab fa-twitter"></i>
    </div>
  </div>
</div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

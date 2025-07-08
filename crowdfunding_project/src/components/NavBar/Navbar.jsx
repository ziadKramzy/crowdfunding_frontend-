import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
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
        <NavLink className="custom-navbar-brand" to="/">
          CrowdFunding
        </NavLink>
        <div className="custom-navbar-center">
          <ul className="custom-navbar-nav">
            <li>
                  <NavLink className="custom-navbar-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="custom-navbar-link" to="/campaigns">
                    Campaigns
                  </NavLink>
                </li>
            {userId !== null && (
              <>
                
                <li>
                  <NavLink className="custom-navbar-link" to="/create-campaign">
                    Create Campaign
                  </NavLink>
                </li>
                <li>
                  <NavLink className="custom-navbar-link" to="/mycampaigns">
                    My Campaigns
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="custom-navbar-right">
          <ul className="custom-navbar-nav">
            {userId == null && (
              <>
                <li>
                  <NavLink className="custom-navbar-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className="custom-navbar-link" to="/register">
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
                  onClick={handleLogout}
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

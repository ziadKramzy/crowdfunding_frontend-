import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Navbar = () => {
  let {userLogin , setUserLogin } = useContext(UserContext)
  return (
    <nav className="navbar navbar-expand-lg bg-info position-fixed top-0 start-0 end-0 fw-bold text-white z-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand text-white" to="/">CrowdFunding </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar"
          aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {userLogin !== null ? <>      <li className="nav-item mx-2">
              <NavLink className="nav-link text-white" to="/">Home</NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link text-white" to="/campaigns">Campaigns</NavLink>
            </li>
             <li className="nav-item mx-2">
              <NavLink className="nav-link text-white" to="/create-campaign">Create Campaign</NavLink>
            </li></> : null}
          </ul>

          <ul className="navbar-nav ms-auto d-flex align-items-center">
              {userLogin == null ? <>   <li className="nav-item mx-2">
              <NavLink className="nav-link text-white" to="/login">Login</NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link text-white" to="/register">Register</NavLink>
            </li></>:<li className="nav-item mx-2">
              <NavLink className="nav-link text-white" to="/login" onClick={()=>setUserLogin(null)}>Logout</NavLink>
            </li>}
         
            <li className="nav-item d-flex gap-2 mx-2">
              <i className="fab fa-facebook text-white"></i>
              <i className="fab fa-instagram text-white"></i>
              <i className="fab fa-twitter text-white"></i>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

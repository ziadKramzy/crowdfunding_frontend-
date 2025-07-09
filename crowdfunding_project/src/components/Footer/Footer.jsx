import React from 'react'

export const Footer = () => {
  return (
    <>
    <footer className="bg-dark text-white mt-5 pt-4 pb-3">
  <div className="container">
    <div className="row text-center text-md-start">
      <div className="col-md-4 mb-4">
        <h5 className="text-info fw-bold">CrowdFunding</h5>
        <p>Empowering change through community-driven funding. Donate, support, and make a difference today.</p>
      </div>
      <div className="col-md-4 mb-4">
        <h6 className="fw-bold text-info">Quick Links</h6>
        <ul className="list-unstyled">
          <li><a className="text-white text-decoration-none" href="/">Home</a></li>
          <li><a className="text-white text-decoration-none" href="/campaigns">Campaigns</a></li>
          <li><a className="text-white text-decoration-none" href="/create">Create Campaign</a></li>
        </ul>
      </div>
      <div className="col-md-4 mb-4">
        <h6 className="fw-bold text-info">Follow Us</h6>
        <div>
          <a href="#" className="text-white me-3"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-white me-3"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
    <hr className="bg-secondary" />
    <p className="text-center m-0">&copy; {new Date().getFullYear()} CrowdFunding. Made With Love ♥. All rights reserved.</p>
  </div>
</footer>

    
    
    </>
  )
}

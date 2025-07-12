import React from 'react'
import './Footer.css'


export const Footer = () => {
  return (
    <>
    <footer className="footer-blue-theme mt-5 pt-4 pb-3">
  <div className="footer-container container">
    <div className="footer-row row text-center text-md-start">
      <div className="footer-cols-wrapper w-100 d-flex flex-wrap">
        <div className="footer-col col-md-3 mb-4">
          <h5 className="footer-heading fw-bold">CrowdFunding</h5>
          <p className="footer-desc">Empowering change through community-driven funding. Donate, support, and make a difference today.</p>
        </div>
        <div className="footer-col col-md-3 mb-4">
          <h6 className="footer-heading fw-bold">Quick Links</h6>
          <ul className="footer-links list-unstyled">
            <li><a className="footer-link" href="/">Home</a></li>
            <li><a className="footer-link" href="/campaigns">Campaigns</a></li>
            <li><a className="footer-link" href="/create">Create Campaign</a></li>
          </ul>
        </div>
        <div className="footer-col col-md-3 mb-4">
          <h6 className="footer-heading fw-bold">Follow Us</h6>
          <div className="footer-social">
            <a href="#" className="footer-link footer-icon me-3"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="footer-link footer-icon me-3"><i className="fab fa-twitter"></i></a>
            <a href="#" className="footer-link footer-icon"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-col col-md-3 mb-4">
          <h6 className="footer-heading fw-bold">Contact Us</h6>
          <ul className="footer-contact list-unstyled">
            <li className="footer-contact-item">Email: <a className="footer-link" href="mailto:support@crowdfunding.com">support@crowdfunding.com</a></li>
            <li className="footer-contact-item">Phone: <a className="footer-link" href="tel:+123456789">+1 234 567 89</a></li>
            <li className="footer-contact-item">Address: <span className="footer-contact-address">123 Blue Ave, Silicon Valley</span></li>
          </ul>
        </div>
      </div>
    </div>
    <hr className="footer-divider bg-secondary" />
    <p className="footer-copyright text-center m-0">&copy; {new Date().getFullYear()} CrowdFunding. Made With Love ♥. All rights reserved.</p>
  </div>
</footer>

    
    
    </>
  )
}

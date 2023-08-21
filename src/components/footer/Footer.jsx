import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './Footer.css';
export default function Footer() {
  

  
  return (
    <footer className="footer">
      <footer className="footer_date" style={{ paddingTop: '50px', borderTop: 'solid 1px #ccc', paddingBottom: '1rem' }}></footer>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="single-box">
              <NavLink className="Footer" to="/">
                <img className="img-fluid" src="../logo.png" alt="logo" style={{ height: '35px', marginBottom: '35px', marginTop: '5px' }} />
              </NavLink>
              <p>Shampy is your go-to destination for buying and selling cars online. Our user-friendly platform allows you to easily browse through a wide range of vehicles, connect with buyers and sellers, and make informed decisions. Whether you're looking for a new car or want to sell your current one, CarMarketplace makes the process simple and hassle-free</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-10">
          <div className="single-box mt-3">
          
   
          <h2>Quick Links</h2>
      <ul className="nav-list">
        <li>
          <NavLink
            to="/"
            className="nav-link"
            activeclassname="active-link"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className="nav-link"
            activeclassname="active-link"
          >
            Contact Us
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/car-repair"
            className="nav-link"
            activeclassname="active-link"
          >
            Car Repair
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/car-inspect"
            className="nav-link"
            activeclassname="active-link"
          >
            Car Inspection
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className="nav-link"
            activeclassname="active-link"
          >
            About Us
          </NavLink>
        </li>
        {/* Repeat the same pattern for other links */}
      </ul>
</div>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-10">
            <div className="single-box mt-3">
              <h2>Follow us on</h2>
              <p className="socials mt-2">
                <i className="fa fa-facebook m-1"></i>
                <i className="fa fa-dribbble m-1"></i>
                <i className="fa fa-pinterest m-1"></i>
                <i className="fa fa-twitter m-1"></i>
              </p>
            </div>
          </div>
          <p className='footer_date' style={{ textAlign: 'center', marginTop: '2rem' }}>&copy; {new Date().getFullYear()} Shampy. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

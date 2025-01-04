import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './entry.css';

const Entry = () => {
  return (
    <div>
      {/* Top Navigation Bar */}
      <div className="top-nav">
        <div className="logo">
          <img src="GO.png" alt="ChigariGo Logo" style={{ width: '120px', borderRadius: '50%' }} />
        </div>
        <div className="btn-container">
          {/* Use Link component for navigation */}
          <Link to="/login" className="btn">
            <img src="login.png" alt="Login Icon" className="icon" />
            <span>Login</span>
          </Link>
          <Link to="/register" className="btn">
            <img src="register.png" alt="Register Icon" className="icon" />
            <span>Register</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Notice Board */}
        <div className="notice-board">
          <h3>What's New</h3>
          <ul>
            <li><span>★</span> HDBRTS Chigari Bus operation timing extended up to 23:00 Hr (11:00 PM) w.e.f 28-10-2021.</li>
            <li><span>★</span> Call for Fellowship and Associateship - Hubballi-Dharwad Edition!!</li>
          </ul>
        </div>

        {/* Main Section */}
        <div className="main-section">
          <h2>Welcome to Hubballi-Dharwad BRTS</h2>
          <p>The Hubballi-Dharwad Bus Rapid Transit System (HDBRTS) is a unique project initiated by GoK. The project is jointly assisted by GoK, World Bank, and GoI. The HDBRTS Company was registered under the Companies Act on 07-05-2012 as a Special Purpose Vehicle to implement the BRT system in between the cities of Hubballi and Dharwad.</p>
          <p>This project, being one of its kind in Karnataka, is entrusted with the responsibility to provide fast, safe, reliable, comfortable, and affordable travel to commuters. The buses, christened as “CHIGARI,” can be called "Metro on Road" for facilitating sustainable transport. The trial operation of the esteemed project commenced in alliance with NWKRTC from 02-10-2018, and within a year of the trial period, the project has won many accolades, including the award for "Excellence in Urban Mass Transit Project" at the national level from the Ministry of Housing and Urban Affairs.</p>
        </div>

        {/* Offer Card */}
        <div className="offer-card">
          <img src="card.jpg" alt="Offer Card" />
          <h3>Chigari Smart Card</h3>
          <p>Use Chigari Smart Card for contactless travel and enjoy a 10% bonus on every recharge!</p>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">© 2024 ChigariGo. All rights reserved.</div>
    </div>
  );
};

export default Entry;

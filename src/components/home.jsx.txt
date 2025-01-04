import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Home.css';

const Home = () => {
  const [dateTime, setDateTime] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assuming user is logged in
  const navigate = useNavigate(); // Use navigate hook for navigation

  useEffect(() => {
    // Update DateTime every second
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const updateDateTime = () => {
    const now = new Date();
    const dateTimeString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    setDateTime(dateTimeString);
  };

  const toggleDropdown = () => {
    const dropdown = document.getElementById('profileDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  };

  const moveToSlide = (index) => {
    setCurrentSlide(index);
    const carousel = document.getElementById('carousel');
    carousel.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  };

  const updateDots = () => {
    const dots = document.getElementById('carouselDots').children;
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('active', i === currentSlide);
    }
  };

  useEffect(() => {
    // Initialize carousel dots
    const carousel = document.getElementById('carousel');
    const dotsContainer = document.getElementById('carouselDots');
    const totalSlides = carousel.children.length;

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => moveToSlide(i));
      dotsContainer.appendChild(dot);
    }
    moveToSlide(0); // Initialize first slide

    // Start auto carousel slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
      moveToSlide(currentSlide);
    }, 5000);
    
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentSlide]);

  const logout = () => {
    setIsLoggedIn(false);
    window.location.href = '/'; // Redirect to homepage after logout
  };

  return (
    <div className="home">
      <header>
        <div className="logo-banner">
          <img src="GO.png" alt="ChigariGo Logo" />
          <h1 style={{color: "#ada4d1",padding: '1px' }} >ChigariGo</h1>
        </div>
        <div className="date-time" id="dateTime">{dateTime}</div>

        <div className="profile-icon" onClick={toggleDropdown}>
          {/* Profile Image */}
          <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQWifBffXRM97EKYWSlB07IHlaag72syUd7p50nswq_fUnnk_85fOpOuBs0PzswP7Mr3EG8CURhIqjYZD8GebpHpw" alt="Profile" className="profile-image" />
          <div className="profile-dropdown" id="profileDropdown">
            <Link to="/profile" className="dropdown-link">View Profile</Link>
            <a href="#" onClick={logout}>Logout</a>
          </div>
        </div>
      </header>

      <nav>
        <ul>
          <li><Link to="/studentpass">Student Card</Link></li>
          <li><a href="recharge_history.html">Recharge History</a></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/routemap">Bus Route Map</Link></li>
          <li><Link to="/booking">Book Tickets</Link></li> {/* Use Link for navigation */}
        </ul>
      </nav>

      <div className="content">
        <div className="banner">
          <h2>Welcome to ChigariGo!</h2>
          <p>Experience queue-less, seamless ticket booking and advance reservations with ChigariGo. Travel smarter!</p>
        </div>

        <div className="banner-carousel">
          <div className="carousel" id="carousel">
            <img src="hubli_banner_01.png" alt="Banner 1" />
            <img src="hubli_banner_02.jpg" alt="Banner 2" />
            <img src="hubli_banner_03.jpg" alt="Banner 3" />
          </div>
          <div className="carousel-dots" id="carouselDots"></div>
        </div>

        <div className="notices">
          <h3>Recent Notices</h3>
          <ul>
            <li>New bus station added for Sanjeevini Park.</li>
            <li>Drivers required. Apply now!</li>
            <li>Employees required. Vacancies open for various roles.</li>
          </ul>
        </div>
      </div>

      <footer className="footer">
        <p>ChigariGo aims to reduce queues, simplify ticket bookings, and offer hassle-free travel solutions. Your convenience is our priority.</p>
        <p>© 2024 ChigariGo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

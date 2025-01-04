import React, { useState, useEffect } from 'react';
import './about.css';

const About = () => {
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    // Hide notification after 5 seconds
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="about-container">
      <div className={`notification ${showNotification ? 'slide-in' : 'slide-out'}`}>
        <p className="notification-content">Chigari Buses are committed to providing the best budget-friendly transport services for all!</p>
      </div>

      <div className="about-content">
        <h1 className="about-heading">About Chigari Buses</h1>
        <p className="about-description">
          Chigari Buses is a premium bus service designed specifically for students. We aim to offer affordable, safe, and efficient transportation options, ensuring that students can focus on their education while we take care of their travel needs.
        </p>

        {/* YouTube Video Frame */}
        <div className="video-frame-container">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/Hnjf8tEZ0s0?si=tgBPCU4W0v2eU2xs"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        <h2 className="about-subheading">Why Choose Chigari Buses?</h2>
        <ul className="about-list">
          <li>Affordable student passes for regular commuters</li>
          <li>Safe, reliable buses equipped with modern amenities</li>
          <li>Tracking system to monitor buses in real-time</li>
          <li>Dedicated customer support for all inquiries</li>
        </ul>

        <h2 className="about-subheading">How it Works</h2>
        <p className="about-description">
          Once you register for a student pass, you can enjoy seamless travel within the city using our buses. You can easily recharge your pass, track buses, and enjoy a stress-free journey to and from your educational institution.
        </p>
      </div>
    </div>
  );
};

export default About;

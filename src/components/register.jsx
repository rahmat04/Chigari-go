import React, { useState } from "react";
import './register.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle checkbox changes for terms and conditions
  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      terms: e.target.checked,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate if terms and conditions checkbox is checked
    if (!formData.terms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    try {
      // Send data to the backend API (ensure the endpoint matches your backend)
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "User registered successfully!");
        setError("");
        // Clear form data after successful registration
        setFormData({
          username: '',
          email: '',
          mobile: '',
          password: '',
          confirmPassword: '',
          terms: false,
        });
        // Redirect to the login page
        navigate('/login'); // Redirect to login page
      } else {
        setMessage("");
        setError(data.message || "An error occurred while registering.");
      }
    } catch (error) {
      setError("Server error. Please try again.");
      setMessage("");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <button className="cancel-btn" onClick={() => window.location.href = '/'}>X</button>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Mobile Number"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            required
          />
          <div className="terms">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleCheckboxChange}
            /> I agree to the <a href="#">Terms and Conditions</a>
          </div>
          <div className="button-group">
            <input type="submit" value="Register" />
          </div>
        </form>

        {/* Add Login button beside Register */}
        <div className="login-btn-container">
          <p>Already have an account?</p>
          <Link to="/login" className="btn login-btn">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

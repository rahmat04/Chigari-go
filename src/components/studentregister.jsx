import React, { useState } from "react";
import './studentregister.css';
import { useNavigate } from 'react-router-dom'; 

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    age: '',
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.name || !formData.mobile || !formData.age) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Send data to the backend API (ensure the endpoint matches your backend)
      const response = await fetch('http://localhost:3000/api/studentregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          age: formData.age,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Student registered successfully!");
        setError("");
        // Clear form data after successful registration
        setFormData({
          name: '',
          mobile: '',
          age: '',
        });
        // Redirect to the Student Pass page or any other page
        navigate('/studentFormSubmission'); 
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
    <div className="student-register-page">
      <div className="student-register-container">
        <button className="cancel-btn" onClick={() => window.location.href = '/'}>X</button>
        <h1>Application for Student Pass</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
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
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Age"
            required
          />

          <div className="button-group">
            <input type="submit" value="Register" />
          </div>
        </form>

        {/* Optionally, add a back button to the main page */}
        <div className="back-btn-container">
          <p>Back to main page?</p>
          <button onClick={() => window.location.href = '/'} className="btn back-btn">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;

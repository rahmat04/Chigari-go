import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  // Form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // For displaying errors
  const [error, setError] = useState('');

  // React Router DOM hook for navigation
  const navigate = useNavigate();

  // Handle text field changes logic
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit button logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Handle errors from the backend
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to login');
      }

      // Parse the response data
      const data = await response.json();
      const { token, role, id } = data;

      // Save the token to localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('id', id);

      // Redirect to home page
      navigate('/home');
    } catch (error) {
      setError(error.message || 'An error occurred while logging in');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
          </div>

          <div className="button-group">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

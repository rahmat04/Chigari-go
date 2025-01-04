import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { handlePayment } from './react-node-paymentgatway-main/frontend/src/Checkout.jsx'; // Import handlePayment
import './studentpass.css';

const StudentPass = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleRegisterClick = () => {
    navigate('/studentregister'); // Navigate to StudentFormSubmission page
  };

  return (
    <div className="student-pass-body">
      <div className="container">
        <h1>Student Pass Management</h1>

        <div className="section">
          <h2>Register for a New Pass</h2>
          <p>Do not have a student pass? Click below to register.</p>
          <button onClick={handleRegisterClick}>Register for a Student Pass</button>
        </div>

        <div className="section">
          <h2>Recharge Your Pass</h2>
          <button onClick={handlePayment}>Recharge Pass</button>
        </div>

        <div className="section">
          <h2>Transaction History</h2>
          <div className="history">
            <p>No transactions available.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPass;

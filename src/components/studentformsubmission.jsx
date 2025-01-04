import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './studentformsubmission.css';

const StudentFormSubmission = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate('/home');
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [navigate]);

  return (
    <div className="student-form-submission">
      <div className="message-container">
        <h1>Registration Successful</h1>
        <p className="verification-message">
          Verification process will begin soon. Once completed, your student pass will be sent by post. You will receive tracking information via email.
        </p>
        <p className="redirect-message">You will be redirected to the home page shortly...</p>
      </div>
    </div>
  );
};

export default StudentFormSubmission;

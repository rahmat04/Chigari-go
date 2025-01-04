import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './feedback.css';

const Feedback = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = document.querySelectorAll("input[type=radio]:required");
    const newErrors = {};

    requiredFields.forEach((field) => {
      const group = document.getElementsByName(field.name);
      if (!Array.from(group).some((option) => option.checked)) {
        newErrors[field.name] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("Please complete all required fields!");
      return;
    }

    alert("Thank you for your feedback!");
    navigate("/home");
  };

  return (
    <div className="feedback-page">
      <div className="feedback-spacer"></div>
      <div className="feedback-body">
        <h1 className="feedback-header">We Value Your Feedback</h1>
        <form id="feedback-form" className="feedback-form" onSubmit={handleSubmit}>
          {[{ name: "payment", label: "How satisfied were you with the payment process?" },
            { name: "booking", label: "How would you rate the booking experience?" }]
            .map(({ name, label }, idx) => (
              <div className="feedback-question" key={idx}>
                <div className="feedback-question-label">{label}</div>
                <div className="feedback-rating-options">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div className="feedback-rating-option" key={value}>
                      <input type="radio" name={name} value={value} required />
                      <label>{value}</label>
                    </div>
                  ))}
                </div>
                {errors[name] && <div className="feedback-error-message">Please rate this question.</div>}
              </div>
            ))}

          <div className="feedback-comments">
            <div className="feedback-comments-label">Do you have any other feedback or issues?</div>
            <textarea
              className="feedback-comments-textarea"
              name="comments"
              placeholder="Optional: Describe your feedback here..."
            ></textarea>
          </div>

          <button type="submit" className="feedback-submit-btn">Submit Feedback</button>
        </form>
      </div>
      <div className="feedback-footer">© 2024 Chigri Buses. All rights reserved.</div>
    </div>
  );
};

export default Feedback;

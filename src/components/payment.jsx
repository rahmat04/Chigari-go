import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const [qrCodeVisible, setQrCodeVisible] = useState(false);
  const [paymentLink] = useState('https://example.com/payment-link'); // Replace with your actual payment link

  // Dynamically load QRCode.js script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const toggleQRCode = () => {
    setQrCodeVisible(!qrCodeVisible);
    if (!qrCodeVisible) {
      setTimeout(generateQRCode, 0); // Ensure DOM updates before generating QR code
    }
  };

  const generateQRCode = () => {
    const qrCodeContainer = document.querySelector(".qrcode");
    qrCodeContainer.innerHTML = ""; // Clear existing QR code if any
    new QRCode(qrCodeContainer, {
      text: paymentLink,
      width: 200,
      height: 200,
    });
  };

  const downloadQRCode = () => {
    const qrCanvas = document.querySelector(".qrcode canvas");
    if (qrCanvas) {
      const qrImage = qrCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = qrImage;
      link.download = 'payment-qr-code.png';
      link.click();
    }
  };

  const simulatePayment = () => {
    const successMessage = document.getElementById('success-message');
    successMessage.style.display = 'block';

    setTimeout(() => {
      navigate('/feedback');
    }, 3000);
  };

  return (
    <div className="payment-page">
      <div className="spacer"></div>
      <div className="header-container">
        <h1>Complete Your Payment</h1>
      </div>

      <div className="payment-container">
        <h2>Select a Payment Method</h2>
        <div className="payment-options">
          <button className="payment-btn" onClick={() => window.open('https://pay.google.com/', '_blank')}>Google Pay</button>
          <button className="payment-btn" onClick={() => window.open('https://paytm.com/', '_blank')}>Paytm</button>
          <button className="payment-btn" onClick={() => window.open('https://www.phonepe.com/', '_blank')}>PhonePe</button>
        </div>

        <p className="or-text">OR</p>

        <button className="qr-code-btn" onClick={toggleQRCode}>
          {qrCodeVisible ? 'Hide QR Code' : 'Generate QR Code'}
        </button>

        {qrCodeVisible && (
          <div className="qr-code-section">
            <div className="section-title">Scan the QR Code to Pay:</div>
            <div className="qrcode"></div> {/* Container for QR Code */}
            <button className="redirect-btn" onClick={downloadQRCode}>Download QR Code</button>
          </div>
        )}

        <button className="redirect-btn" onClick={simulatePayment}>Confirm Payment</button>

        <div className="success-message" id="success-message">
          Payment Successful! Redirecting to feedback page...
        </div>
      </div>

      <div className="footer">© 2024 Chigri Buses. All rights reserved.</div>
    </div>
  );
};

export default Payment;

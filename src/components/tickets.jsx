import React, { useEffect } from "react";
import QRCode from "qrcode.react"; // QR Code React component
import './tickets.css'; // Include your ticket CSS

const Tickets = () => {
  useEffect(() => {
    // Any additional setup code if needed, like initializing data
  }, []);

  return (
    <div className="ticket-container">
      <div className="ticket">
        <img src="go.png" alt="Go Image" />
        <h2>Ticket</h2>
        <p>Source: Dharwad New Bus Stand</p>
        <p>Destination: Jubilee Circle</p>
        <p>Ticket is valid for 6 hrs only. Do not share the ticket.</p>
        <p>Ticket ID: 173993</p>
        <p>Date: January 3, 2025</p>
        <div className="qr-code">
          <QRCode value="Ticket ID: 173993" />
        </div>
      </div>
    </div>
  );
};

export default Tickets;

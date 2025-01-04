import React, { useState } from "react";
import { handlePayment } from "./react-node-paymentgatway-main/frontend/src/Checkout.jsx";
import './booking.css';
; // Update the relative path based on your directory structure

const Booking = () => {
  const stops = [
    "Dharwad New Bus Stand", "Dharwad BRTS Terminal", "Jubilee Circle", "Court Circle", "NTTF", 
    "Hosa Yellapur Cross", "Toll Naka", "Vidyagiri", "Gandhinagar", "Lakmanahalli", "Sattur", 
    "SDM Medical College", "Navluru Railway Station", "KMF", "Rayapur", "ISKCON Temple", "RTO", 
    "Navanagara", "APMC 3rd Gate", "Shantinikethan", "Biridevarakoppa", "Unakal Lake", "Unakal Village", 
    "Unakal Cross", "BVB", "Vidyanagar", "KIMS", "Hosur Regional Terminal", "Hosur Cross", 
    "Hubballi Central Bus Terminal", "HDMC", "DR. B R Ambedkar Circle", "SSS Railway Station Hubli", 
    "CBT Hubballi"
  ];

  const pricePerStop = 6;

  const [priceDetails, setPriceDetails] = useState({
    pricePerPerson: 0,
    totalPrice: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const calculatePrice = () => {
    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    const passengerCount = parseInt(document.getElementById("passengerCount").value, 10);

    setErrorMessage("");

    if (source && destination && passengerCount) {
      if (source === destination) {
        setErrorMessage("Source and Destination cannot be the same.");
        return;
      }

      const sourceIndex = stops.indexOf(source);
      const destinationIndex = stops.indexOf(destination);

      if (sourceIndex > destinationIndex) {
        alert("Destination should be after Source.");
        return;
      }

      const numberOfStops = destinationIndex - sourceIndex;
      const pricePerPerson = pricePerStop * numberOfStops;
      const totalPrice = pricePerPerson * passengerCount;

      setPriceDetails({ pricePerPerson, totalPrice });
      document.getElementById("priceContainer").style.display = "block";
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", backgroundColor: "#ada4d1", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", margin: 0 }}>
      <div style={{ backgroundColor: "#e5e2ec", padding: "40px", borderRadius: "15px", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", width: "500px", maxWidth: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "20px", color: "#333" }}>Book Your Bus Ticket</h1>
        <form>
          {/* Source Dropdown */}
          <select id="source" name="source" required>
            <option value="" disabled selected>Choose Source</option>
            {stops.map((stop, index) => (
              <option key={index} value={stop}>{stop}</option>
            ))}
          </select>

          {/* Destination Dropdown */}
          <select id="destination" name="destination" required>
            <option value="" disabled selected>Choose Destination</option>
            {stops.map((stop, index) => (
              <option key={index} value={stop}>{stop}</option>
            ))}
          </select>

          <select id="passengerCount" name="passengerCount" required>
            <option value="" disabled selected>Number of Passengers</option>
            {[...Array(7)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          <button type="button" onClick={calculatePrice}>Calculate Price</button>
        </form>

        {/* Price Details */}
        <div id="priceContainer" style={{ display: "none" }}>
          <p>Price per person: ₹{priceDetails.pricePerPerson}</p>
          <p>Total Price: ₹{priceDetails.totalPrice}</p>
        </div>


        <h5 style={{ fontSize: "15px", marginBottom: "20px", color: "#333" }}>Tickets will be sent to via Whatsapp</h5>
        <button
          onClick={handlePayment} // Call the imported function
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Booking;


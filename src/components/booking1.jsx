import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './booking.css'; // Import the CSS file

const Booking = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [passengerCount, setPassengerCount] = useState('');
  const [error, setError] = useState('');
  const [pricePerPerson, setPricePerPerson] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  const navigate = useNavigate();  // Initialize useNavigate

  const stops = [
    "Abasan Circle", "Ambedkar Circle", "BVM School", "Circuit House",
    "Gandhi Circle", "Gogte Circle", "Hubli Old Bus Stand", "Income Tax Office",
    "Manish Circle", "Vidyanagar"
  ];

  const pricePerStop = 6; // ₹6 per stop

  const calculatePrice = () => {
    setError('');
    setPricePerPerson(null);
    setTotalPrice(null);

    if (source && destination && passengerCount) {
      if (source === destination) {
        setError('Source and Destination cannot be the same.');
        return;
      }

      // Calculate stops
      const sourceIndex = stops.indexOf(source);
      const destinationIndex = stops.indexOf(destination);

      // Ensure source comes before destination
      if (sourceIndex > destinationIndex) {
        alert("Destination should be after Source.");
        return;
      }

      // Number of stops between source and destination
      const numberOfStops = destinationIndex - sourceIndex;

      // Price calculations
      const pricePerPerson = pricePerStop * numberOfStops;
      const totalPrice = pricePerPerson * passengerCount;

      setPricePerPerson(pricePerPerson);
      setTotalPrice(totalPrice);
    } else {
      alert('Please fill in all the fields.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Redirecting to payment page...');
    // Navigate to the payment page using React Router
    navigate("/payment");
  };

  return (
    <div className="booking-page-body">
      <div className="booking-container">
      <h1>Book Your Bus Ticket</h1>
      <form id="bookingForm" onSubmit={handleSubmit}>
        {/* Source and Destination Select */}
        <select
          id="source"
          name="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        >
          <option value="" disabled>Choose Source</option>
          {stops.map((stop, index) => (
            <option key={index} value={stop}>{stop}</option>
          ))}
        </select>

        <select
          id="destination"
          name="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        >
          <option value="" disabled>Choose Destination</option>
          {stops.map((stop, index) => (
            <option key={index} value={stop}>{stop}</option>
          ))}
        </select>

        {/* Error message for source and destination */}
        {error && <div className="error-message">{error}</div>}

        {/* Passenger Count Dropdown */}
        <select
          id="passengerCount"
          name="passengerCount"
          value={passengerCount}
          onChange={(e) => setPassengerCount(e.target.value)}
          required
        >
          <option value="" disabled>Number of Passengers</option>
          {[...Array(7)].map((_, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </select>

        {/* Calculate Button */}
        <button type="button" className="calculate-btn" onClick={calculatePrice}>Calculate Price</button>

        {/* Price Display */}
        {pricePerPerson !== null && totalPrice !== null && (
          <div className="price-container">
            <p>Price per person: ₹{pricePerPerson}</p>
            <p>Total Price: ₹{totalPrice}</p>
          </div>
        )}

        {/* Booking Button */}
        <button type="submit" className="book-btn">Proceed to Payment</button>
      </form>

      <div className="footer">© 2024 Chigri Buses. All rights reserved.</div>
    </div>
    </div>
  );
};

export default Booking;

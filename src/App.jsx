import React, { useState } from 'react';
import './App.css';

const App = () => {
const rows = 3;
const columns = 5;
const [selectedSeats, setSelectedSeats] = useState([]);
const [bookingDone, setBookingDone] = useState(false);

const handleSeatSelection = (row, column) => {
const seat = `${row}-${column}`;
if (selectedSeats.includes(seat)) {
setSelectedSeats(selectedSeats.filter(s => s !== seat));
} else {
setSelectedSeats([...selectedSeats, seat]);
}
};

const getSeatPrice = row => {
return 100 * (row + 1);
};

const totalPrice = selectedSeats.reduce((acc, seat) => {
const row = parseInt(seat.split("-")[0], 10);
return acc + getSeatPrice(row);
}, 0);

const handleBookNow = () => {
setSelectedSeats([]);
setBookingDone(true);
};

return (
<div className="container">
<div className="theater-container">
<div className="screen">
<h3 className="title">Screen here</h3>
<div className="theater-screen"></div>
<div className="seats-container">
      {[...Array(rows)].map((_, row) => (
        <div key={row} className="row">
          {[...Array(columns)].map((_, column) => {
            const seat = `${row}-${column}`;
            const isSelected = selectedSeats.includes(seat);
            const backgroundColor = isSelected ? '#91C6EE' : 'grey';
            return (
              <div
                key={`${row}-${column}`}
                className="seat"
                style={{ backgroundColor }}
                onClick={() => handleSeatSelection(row, column)}
              />
            );
          })}
        </div>
      ))}
    </div>
    <h4 className="price">Total Price: Rs. {totalPrice}</h4>
    <button className="book-now" onClick={handleBookNow}>Book Now</button>
  </div>
  </div>
  {bookingDone && (
    <div className="booking-done-popup">
      <p className='popup-text'>Your seats have been booked!</p>
    </div>
  )}
</div>
);
};

export default App;
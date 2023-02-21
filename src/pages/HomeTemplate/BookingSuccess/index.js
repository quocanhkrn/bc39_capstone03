import React from "react";
import confetti from "./1103-confetti-flat.gif";
import "./style.css";

function BookingSuccess() {
  return (
    <main className="booking-success container">
      <img className="d-block mx-auto" src={confetti} />
      <h1 className="text-center text-uppercase text-success">Reservation Completed!</h1>
      <p className="text-center">Thank you for your reservation. Have a great time in our box office!</p>
    </main>
  );
}

export default BookingSuccess;

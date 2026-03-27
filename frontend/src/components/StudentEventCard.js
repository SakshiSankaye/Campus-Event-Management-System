import React from "react";

function StudentEventCard({ event, onRegister, isRegistered }) {

  return (

    <div className="card">

      {/* Banner instead of image */}
      <div className={`event-banner ${event.color}`}>
        {event.title}
      </div>

      {/* Details */}
      <p><b>Date:</b> {event.date}</p>
      <p><b>Location:</b> {event.location}</p>

      {/* Button */}
      <button
        className="btn"
        onClick={() => onRegister(event.title)}
      >
        {isRegistered ? "Registered ✔" : "Register"}
      </button>

    </div>

  );

}

export default StudentEventCard;
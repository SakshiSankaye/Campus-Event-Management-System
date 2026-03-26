import React from "react";

function StudentEventCard({ event }) {

  return (

    <div className="card">

      {}
      <div className={`img-box ${event.color}`}>
        <div className="event-title-banner">
          {event.title}
        </div>
      </div>
      <p><b> Title:</b> {event.title}</p>
      <p><b> Date:</b> {event.date}</p>
      <p><b> Location:</b> {event.location}</p>

      <button className="btn">Register</button>

    </div>

  );

}

export default StudentEventCard;
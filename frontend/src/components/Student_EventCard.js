import React from "react";

const Student_EventCard = ({ event }) => {

  return (

    <div className="event-card">

      <h3>{event.title}</h3>

      <p>Date: {event.date}</p>

      <p>Location: {event.location}</p>

      <button className="register-btn">
        Register
      </button>

    </div>

  );

};

export default Student_EventCard;
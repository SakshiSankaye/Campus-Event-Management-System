import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import EventCard from "../components/events/EventCard";
import eventService from "../services/eventService";

const BrowseEvents = () => {

  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadEvents();
  }, [category]);

  const loadEvents = async () => {

    const data = await eventService.getEvents(category);

    setEvents(data);

  };

  return (

    <DashboardLayout>

      <h2>Browse Events</h2>

      <select
        onChange={(e) => setCategory(e.target.value)}
      >

        <option value="">All</option>
        <option value="technical">Technical</option>
        <option value="cultural">Cultural</option>
        <option value="sports">Sports</option>

      </select>

      <div className="event-grid">

        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}

      </div>

    </DashboardLayout>
  );

};

export default BrowseEvents;
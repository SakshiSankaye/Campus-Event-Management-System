import React, { useState, useEffect } from "react";
import StudentSidebar from "../components/StudentSidebar";
import Header from "../components/Header";
import StudentEventCard from "../components/StudentEventCard";
import "../styles/dashboard.css";

/*
  ================================
  Student Browse Events Page
  ================================
*/

function StudentBrowseEvent(){

  /* ===== STATE ===== */
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [registeredEvents, setRegisteredEvents] = useState([]);

  /* ===== DUMMY EVENTS ===== */
  const events = [
    {
      title: "Hackathon",
      date: "18 March",
      location: "Auditorium",
      category: "Technical",
      color: "technical"
    },
    {
      title: "Dance Fest",
      date: "20 March",
      location: "Main Hall",
      category: "Cultural",
      color: "cultural"
    },
    {
      title: "Football Match",
      date: "22 March",
      location: "Ground",
      category: "Sports",
      color: "sports"
    },
    {
      title: "Seminar",
      date: "25 March",
      location: "Hall A",
      category: "Technical",
      color: "seminar"
    }
  ];

  /* ===== LOAD REGISTERED EVENTS ===== */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("registeredEvents")) || [];
    setRegisteredEvents(stored);
  }, []);

  /* ===== REGISTER FUNCTION ===== */
  const handleRegister = (eventTitle) => {
    let stored = JSON.parse(localStorage.getItem("registeredEvents")) || [];

    if(!stored.includes(eventTitle)){
      stored.push(eventTitle);
      localStorage.setItem("registeredEvents", JSON.stringify(stored));
      setRegisteredEvents(stored);
    }
  };

  /* ===== FILTER LOGIC ===== */
  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || e.category === category)
  );

  /* ===== UI ===== */
  return(

    <div className="dashboard">

      {/* Sidebar */}
      <StudentSidebar/>

      <div className="main">

        {/* Header (SEARCH CONNECTED HERE ✅) */}
        <Header search={search} setSearch={setSearch} />

        <div className="content">

          {/* Title + Category Filter */}
          <div className="title-row">

            <div className="page-title">
              Browse Events
            </div>

            <select
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              className="category-dropdown"
            >
              <option>All</option>
              <option>Technical</option>
              <option>Cultural</option>
              <option>Sports</option>
            </select>

          </div>

          {/* Event Grid */}
          <div className="event-grid">

            {filteredEvents.map((event, index) => (
              <StudentEventCard
                key={index}
                event={event}
                onRegister={handleRegister}
                isRegistered={registeredEvents.includes(event.title)}
              />
            ))}

          </div>

        </div>

      </div>

    </div>

  );
}

export default StudentBrowseEvent;
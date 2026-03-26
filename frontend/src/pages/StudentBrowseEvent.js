import React from "react";
import StudentSidebar from "../components/StudentSidebar";
import Header from "../components/Header";
import StudentEventCard from "../components/StudentEventCard";
import "../styles/dashboard.css";
/*
  Browse Events Page
*/

function StudentBrowseEvent(){

  // Sample data (later from backend)
  const events = [
    { title: "Hackathon", date: "18 March", location: "Auditorium", color: "brown" },
    { title: "Seminar", date: "25 March", location: "Hall A", color: "green" },
    { title: "Coding Contest", date: "30 March", location: "Lab 2", color: "purple" },
    { title: "Tech Fest", date: "5 April", location: "Campus Ground", color: "orange" }
  ];

  return(

    <div className="dashboard">

      {/* Sidebar */}
      <StudentSidebar/>

      <div className="main">

        {/* Header */}
        <Header/>

        <div className="content">

          {/* Page Title */}
          <div className="page-title">
            Student Browse Events
          </div>

          {/* Event Grid */}
          <div className="event-grid">
            {events.map((event, index) => (
              <StudentEventCard key={index} event={event} />
            ))}
          </div>

        </div>

      </div>

    </div>

  )

}

export default StudentBrowseEvent;
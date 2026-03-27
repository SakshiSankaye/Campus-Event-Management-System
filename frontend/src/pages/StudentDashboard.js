import React from "react";
import Student_Sidebar from "../components/StudentSidebar";
import Header from "../components/Header";
import StudentEventCard from "../components/StudentEventCard";
import "../styles/dashboard.css";

function StudentDashboard(){
const user = JSON.parse(localStorage.getItem("user"));
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
  }
];

return(

<div className="dashboard">

  <Student_Sidebar/>

  <div className="main">

    <Header/>

    <div className="content">

      <div className="welcome-box">
  Welcome {user?.name} 👋
</div>

      {/* ✅ USE MAP HERE */}
      <div className="event-grid">

        {events.map((event, index) => (
          <StudentEventCard key={index} event={event} />
        ))}

      </div>

      <div className="registered-section">

        <h3>My Registered Events:</h3>

        <div className="registered-box">

          <p>Event Name | Date | Status | Action</p>
          <p>Hackathon | 18 Mar | Registered | View</p>
          <p>Seminar | 25 Mar | Attended | Certificate</p>

        </div>

      </div>

    </div>

  </div>

</div>

)

}

export default StudentDashboard;
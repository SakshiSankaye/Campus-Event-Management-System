import React from "react";
import StudentSidebar from "../components/StudentSidebar";
import Header from "../components/Header";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
/*
  Student My Events Page
*/

function StudentMyEvents(){

  // Sample data (later from backend)
const [registered, setRegistered] = useState([]);

useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("registeredEvents")) || [];
  
  const formatted = stored.map(e => ({
    name: e,
    date: "Upcoming"
  }));

  setRegistered(formatted);

}, []);

  const ongoing = [
    { name: "Coding Contest", date: "Today" }
  ];

  const completed = [
    { name: "Tech Fest", date: "5 April" }
  ];

  return(

    <div className="dashboard">

      <StudentSidebar/>

      <div className="main">

        <Header/>

        <div className="content">

          {/* Page Title */}
          <div className="page-title">
            My Events
          </div>

          {/* REGISTERED */}
          <div className="event-section registered-section-box">
            <h3> Registered Events</h3>

            <table>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {registered.map((e, i) => (
                  <tr key={i}>
                    <td>{e.name}</td>
                    <td>{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ONGOING */}
          <div className="event-section ongoing-section-box">
            <h3> Ongoing Events</h3>

            <table>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {ongoing.map((e, i) => (
                  <tr key={i}>
                    <td>{e.name}</td>
                    <td>{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* COMPLETED */}
          <div className="event-section completed-section-box">
            <h3> Completed Events</h3>

            <table>
              <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {completed.map((e, i) => (
                  <tr key={i}>
                    <td>{e.name}</td>
                    <td>{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>

  )
}

export default StudentMyEvents;
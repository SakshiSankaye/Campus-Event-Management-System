import React from "react";
import { Link } from "react-router-dom";

const Student_Sidebar = () => {

  return (

    <div className="sidebar">

      <h2>Campus Events</h2>

      <ul>

        <li>
          <Link to="/student-dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/browse-events">Browse Events</Link>
        </li>

        <li>
          <Link to="/registered-events">My Registered Events</Link>
        </li>

        <li>
          <Link to="/certificates">Certificates</Link>
        </li>

        <li>
          <Link to="/feedback">Feedback</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>

        <li>
          <Link to="/logout">Logout</Link>
        </li>

      </ul>

    </div>

  );

};

export default Student_Sidebar;
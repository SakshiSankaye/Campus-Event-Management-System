import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

import {
  LayoutDashboard,
  PlusCircle,
  CalendarDays,
  Users,
  Bell,
  Search,
  ClipboardList
} from "lucide-react";

export default function OrganizerDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalEvents: 0,
    totalParticipants: 0,
    upcomingEvents: 0,
    activities: []
  });

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: ""
  });

  const [showProfile, setShowProfile] = useState(false);
  const [showNotify, setShowNotify] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser({
        name: storedUser.name || "Guest",
        email: storedUser.email || "No Email",
        role: storedUser.role || "User"
      });
    }

    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard/stats"
      );
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard-wrap">

      {/* Sidebar */}
      <aside className="sidebar">
        <div>

          <div className="brand">
            <div className="brand-icon">✦</div>
            <h3>EVENT HUB</h3>
          </div>

          <nav className="nav-menu">

            <div
              className="nav-item active"
              onClick={() => navigate("/organizer-dashboard")}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </div>

            <div
              className="nav-item"
              onClick={() => navigate("/create-event")}
            >
              <PlusCircle size={16} />
              Create Event
            </div>

            <div
              className="nav-item"
              onClick={() => navigate("/organizer-manage-events")}
            >
              <CalendarDays size={16} />
              Manage Events
            </div>

            <div
              className="nav-item"
              onClick={() => navigate("/participants")}
            >
              <Users size={16} />
              Participants
            </div>

          </nav>
        </div>

        <button
          className="new-event-btn"
          onClick={() => navigate("/create-event")}
        >
          + New Event
        </button>
      </aside>

      {/* Main */}
      <main className="main-panel">

        {/* Header */}
        <div className="top-header">
          <h2>Smart Campus Event Management</h2>

          <div className="header-right">

            <div className="search-bar">
              <Search size={14} />
              <input placeholder="Search events..." />
            </div>

            {/* Notifications */}
            <div className="notify-wrap">
              <Bell
                size={18}
                className="clickable"
                onClick={() => {
                  setShowNotify(!showNotify);
                  setShowProfile(false);
                }}
              />

              {showNotify && (
                <div className="notify-box">
                  <p>🔔 New registration received</p>
                  <p>📅 Upcoming event tomorrow</p>
                  <p>✅ Payment confirmed</p>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="profile-wrap">

              <div
                className="user-box clickable"
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotify(false);
                }}
              >
                <div>
                  <h4>{user.name}</h4>
                  <p>{user.role}</p>
                </div>

                <div className="profile-circle">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {showProfile && (
                <div className="profile-menu">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>

                  <hr />

                  <div
                    onClick={() =>
                      navigate("/organizer-dashboard")
                    }
                  >
                    Dashboard
                  </div>

                  <div onClick={logout}>Logout</div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="hero">
          <h1>Welcome, {user.name}</h1>
          <p>Your digital stage is ready.</p>
        </section>

        {/* Stats */}
        <section className="stats-row">

          <div className="stat-card">
            <ClipboardList size={16} />
            <p>TOTAL EVENTS CREATED</p>
            <h3>{stats.totalEvents}</h3>
          </div>

          <div className="stat-card">
            <Users size={16} />
            <p>TOTAL PARTICIPANTS</p>
            <h3>{stats.totalParticipants}</h3>
          </div>

          <div className="stat-card blue-card">
            <CalendarDays size={16} />
            <p>UPCOMING EVENTS</p>
            <h3>{stats.upcomingEvents}</h3>
          </div>

        </section>

        {/* Bottom */}
        <section className="bottom-layout">

          <div className="activity-panel">
            <h3>Recent Activity</h3>

            {stats.activities.map((item, index) => (
              <div className="activity-row" key={index}>
                <div className="activity-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>

                <span className="activity-badge">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>

          <div className="side-panel">
            <div className="quick-panel">
              <h5>QUICK ACTIONS</h5>

              <button onClick={() => navigate("/create-event")}>
                Create Event
              </button>

              <button onClick={() => navigate("/participants")}>
                View Participants
              </button>

              <button onClick={() => navigate("/organizer-manage-events")}>
                Manage Events
              </button>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}
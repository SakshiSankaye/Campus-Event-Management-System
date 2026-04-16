import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  LayoutDashboard,
  PlusCircle,
  CalendarDays,
  Users
} from "lucide-react";

import "../styles/participants.css";
import { getEvents } from "../services/adminApi";

function Participants() {
  const navigate = useNavigate();

  /* ---------------- USER ---------------- */
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const userName =
    storedUser.name ||
    storedUser.fullname ||
    storedUser.fullName ||
    storedUser.username ||
    (storedUser.email
      ? storedUser.email.split("@")[0]
      : "Guest");

  const userEmail = storedUser.email || "No Email";
  const userRole = storedUser.role || "organizer";
  const firstLetter = userName.charAt(0).toUpperCase();

  /* ---------------- STATES ---------------- */
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotify, setShowNotify] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  /* ---------------- LOAD EVENTS ---------------- */
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      setEvents([]);
    }
  };

  /* ---------------- PARTICIPANTS DATA ---------------- */
  const participants = useMemo(() => {
    return events.flatMap((event) =>
      (event.registeredUsers || []).map((user, index) => ({
        id: `${event._id}-${index}`,
        name: user.name,
        event: event.title,
        date: event.date
      }))
    );
  }, [events]);

  const filteredParticipants = participants.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="pt-page">
      {/* SIDEBAR */}
      <aside className="pt-sidebar">
        <div>
          <div className="pt-logo">
            <div className="pt-icon">✦</div>

            <div>
              <h3>EVENT HUB</h3>
            </div>
          </div>

          <div
            className="pt-menu"
            onClick={() => navigate("/organizer-dashboard")}
          >
            <LayoutDashboard size={17} />Dashboard
          </div>

          <div
            className="pt-menu"
            onClick={() => navigate("/create-event")}
          >
            <PlusCircle size={17} />Create Event
          </div>

          <div
            className="pt-menu"
            onClick={() => navigate("/organizer-manage-events")}
          >
            <CalendarDays size={17} />Manage Events
          </div>

          <div className="pt-menu active">
            <Users size={17} />Participants
          </div>
        </div>

        <div className="pt-bottom">
          <button
            className="new-btn"
            onClick={() => navigate("/create-event")}
          >
            + Create New Event
          </button>

          <p>Help Center</p>
          <p onClick={logout}>Logout</p>
        </div>
      </aside>

      {/* MAIN */}
      <main className="pt-main">
        {/* TOPBAR */}
        <div className="ce-topbar">
          <div className="ce-search">
            <Search size={14} />
            <input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="header-right">
            {/* Notification */}
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
                  <h4>{userName}</h4>
                  <p>{userRole}</p>
                </div>

                <div className="profile-circle">
                  {firstLetter}
                </div>
              </div>

              {showProfile && (
                <div className="profile-menu">
                  <h4>{userName}</h4>
                  <p>{userEmail}</p>

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

        {/* HEADER */}
        <div className="pt-head">
          <div>
            <h1><b>Participants</b></h1>
          </div>
        </div>

        {/* STATS */}
        <div className="pt-stats">
          <div className="stat-card blue">
            <h2>{participants.length}</h2>
            <p>TOTAL PARTICIPANTS</p>
          </div>

          <div className="stat-card">
            <h2>{events.length}</h2>
            <p>TOTAL EVENTS</p>
          </div>

          <div className="stat-card">
            <h2>
              {
                events.filter(
                  (e) => (e.registeredUsers || []).length > 0
                ).length
              }
            </h2>
            <p>ACTIVE EVENTS</p>
          </div>
        </div>

        {/* TABLE */}
        <div className="table-card">
          <div className="table-head pt-row">
            <span>NAME</span>
            <span>EVENT</span>
            <span>DATE</span>
          </div>

          {filteredParticipants.length === 0 ? (
            <div className="empty-box">
              No participants found
            </div>
          ) : (
            filteredParticipants.map((p) => (
              <div className="pt-row data-row" key={p.id}>
                <div className="name-col">
                  <div className="avatar-sm"></div>
                  <span>{p.name}</span>
                </div>

                <span>{p.event}</span>
                <span>{p.date}</span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default Participants;
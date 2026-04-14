import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Settings,
  Users,
  CalendarDays
} from "lucide-react";

import "../styles/participants.css";
import { getEvents } from "../services/adminApi";

function Participants() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const data = await getEvents();
    setEvents(Array.isArray(data) ? data : []);
  };

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

  return (
    <div className="pt-page">

      {/* Sidebar */}
      <aside className="pt-sidebar">

        <div>
  <div className="pt-logo">
    <div className="pt-icon">✦</div>
    <div>
      <h3>Global Events</h3>
      <p>PREMIUM TIER</p>
    </div>
  </div>

  <div
    className="pt-menu"
    onClick={() => navigate("/organizer-dashboard")}
  >
    Dashboard
  </div>

  <div
    className="pt-menu"
    onClick={() => navigate("/create-event")}
  >
    Create Event
  </div>

  <div
    className="pt-menu"
    onClick={() => navigate("/organizer-manage-events")}
  >
    Manage Events
  </div>

  <div className="pt-menu active">
    Participants
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
          <p onClick={() => navigate("/")}>Logout</p>
        </div>

      </aside>

      {/* Main */}
      <main className="pt-main">

        {/* Topbar */}
        <div className="pt-top">

          <div className="search-box">
            <Search size={14} />
            <input
              placeholder="Search participants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="top-icons">
            <Settings size={16} />
            <Bell size={16} />
            <div className="avatar"></div>
          </div>

        </div>

        {/* Header */}
        <div className="pt-head">
          <div>
            <h1>Participants</h1>
            <p>
              Review attendees registered across all your events
              from one unified dashboard.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
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

        {/* Table */}
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
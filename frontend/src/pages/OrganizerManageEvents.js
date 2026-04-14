import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Settings,
  Download,
  Eye,
  Pencil,
  Trash2,
  LayoutDashboard,
  PlusCircle,
  CalendarDays,
  Users
} from "lucide-react";

import "../styles/organizerManageEvents.css";
import { getEvents, deleteEvent } from "../services/adminApi";

function OrganizerManageEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const loadEvents = useCallback(async () => {
    try {
      const data = await getEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setEvents([]);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const getStatus = (dateValue) => {
    if (!dateValue) return "Upcoming";

    const eventDate = new Date(dateValue);
    const today = new Date();

    const a = new Date(
      eventDate.getFullYear(),
      eventDate.getMonth(),
      eventDate.getDate()
    );

    const b = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    if (a.getTime() === b.getTime()) return "Today";
    if (a > b) return "Upcoming";
    return "Completed";
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const q = searchTerm.toLowerCase();

      const matchSearch =
        event.title?.toLowerCase().includes(q) ||
        event._id?.toLowerCase().includes(q);

      const matchDate =
        !dateFilter ||
        (event.date &&
          new Date(event.date).toISOString().slice(0, 10) === dateFilter);

      const status = getStatus(event.date);

      const matchStatus =
        statusFilter === "All" || status === statusFilter;

      return matchSearch && matchDate && matchStatus;
    });
  }, [events, searchTerm, dateFilter, statusFilter]);

  const handleDeleteClick = (event) => {
  setSelectedEvent(event);
  setShowDeleteModal(true);
};

const confirmDelete = async () => {
  try {
    await deleteEvent(selectedEvent._id);
    loadEvents();

    setShowDeleteModal(false);
    setSelectedEvent(null);
  } catch (error) {
    alert("Delete failed");
  }
};

  const handleExport = () => {
    if (filteredEvents.length === 0) {
      alert("No events to export");
      return;
    }

    const rows = [
      ["ID", "Title", "Date", "Status", "Registrations"]
    ];

    filteredEvents.forEach((e) => {
      rows.push([
        e._id,
        e.title,
        e.date,
        getStatus(e.date),
        e.registeredUsers?.length || 0
      ]);
    });

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "events-report.csv";
    a.click();
  };

  const totalEvents = events.length;
  const totalRegistrations = events.reduce(
    (sum, e) => sum + (e.registeredUsers?.length || 0),
    0
  );
  const upcoming = events.filter(
    (e) => getStatus(e.date) === "Upcoming"
  ).length;
  const completed = events.filter(
    (e) => getStatus(e.date) === "Completed"
  ).length;


  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedEvent, setSelectedEvent] = useState(null);
  return (
    <div className="manage-page">

      {/* Sidebar */}
      <aside className="sidebar">

        <div>

          <div className="brand">
            <div className="brand-icon">✦</div>

            <div>
              <h3>Global Events</h3>
              <p>PREMIUM TIER</p>
            </div>
          </div>

          <div
            className="menu-item"
            onClick={() => navigate("/organizer-dashboard")}
          >
            <LayoutDashboard size={17} />
            Dashboard
          </div>

          <div
            className="menu-item"
            onClick={() => navigate("/create-event")}
          >
            <PlusCircle size={17} />
            Create Event
          </div>

          <div className="menu-item active">
            <CalendarDays size={17} />
            Manage Events
          </div>

          <div
            className="menu-item"
            onClick={() => navigate("/participants")}
          >
            <Users size={17} />
            Participants
          </div>

        </div>

        <div className="sidebar-bottom">

          <button
            className="create-btn"
            onClick={() => navigate("/create-event")}
          >
            + Create New Event
          </button>

          <p>Help Center</p>
          <p onClick={() => navigate("/")}>Logout</p>

        </div>
      </aside>

      {/* Main */}
      <main className="main-content">

        {/* Topbar */}
        <div className="topbar">

          <div className="search-pill">
            <Search size={14} />
            <input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="top-actions">
            <Settings size={16} />
            <Bell size={16} />
            <div className="avatar"></div>
          </div>

        </div>

        {/* Header */}
        <div className="hero">

          <div>
            <h1>Manage Events</h1>

            <p>
              Orchestrate your upcoming experiences and review
              historical performance metrics from a unified stage.
            </p>
          </div>

          <div className="hero-buttons">

            <button
              className="btn-light"
              onClick={handleExport}
            >
              <Download size={14} />
              Export Report
            </button>

            <button
              className="btn-blue"
              onClick={() => navigate("/create-event")}
            >
              + New Event
            </button>

          </div>
        </div>

        {/* Filters */}
        <div className="filters">

          <div className="filter large">
            <Search size={14} />
            <input
              placeholder="Filter by event name, ID, or venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter">
            <CalendarDays size={14} />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          <div className="filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Today">Today</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

        </div>

        {/* Table */}
        <div className="table-box">

          <div className="table-head row">
            <span>EVENT NAME</span>
            <span>DATE & TIME</span>
            <span>STATUS</span>
            <span>ACTIONS</span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="empty">No events found</div>
          ) : (
            filteredEvents.map((e) => (
              <div className="row data-row" key={e._id}>

                <div className="event-cell">

                  <div className="thumb"></div>

                  <div>
                    <h4>{e.title}</h4>
                    <p>ID: {e._id.slice(-6)}</p>
                  </div>

                </div>

                <div className="date-cell">
                  <h5>{e.date}</h5>
                  <p>{e.createdBy || "Organizer"}</p>
                </div>

                <div>
                  <span className={`badge ${getStatus(e.date).toLowerCase()}`}>
                    {getStatus(e.date)}
                  </span>
                </div>

                <div className="actions">
                  <Eye
                    size={15}
                    onClick={() =>
                      alert(
                        `${e.title}\n${e.date}\nParticipants: ${
                          e.registeredUsers?.length || 0
                        }`
                      )
                    }
                  />

                  <Pencil
                    size={15}
                    onClick={() =>
                      navigate(`/organizer/edit-event/${e._id}`)
                    }
                  />

                  <Trash2
                    size={15}
                    onClick={() => handleDeleteClick(e)}
                  />
                </div>

              </div>
            ))
          )}

        </div>

        {/* Stats */}
        <div className="cards">

          <div className="card blue">
            <h2>{totalEvents}</h2>
            <p>TOTAL EVENTS</p>
          </div>

          <div className="card">
            <h2>{upcoming}</h2>
            <p>UPCOMING EVENTS</p>
          </div>

          <div className="card">
            <h2>{totalRegistrations}</h2>
            <p>TOTAL REGISTRATIONS</p>
          </div>

          <div className="card gold">
            <h2>{completed}</h2>
            <p>COMPLETED EVENTS</p>
          </div>

        </div>
{showDeleteModal && (
  <div className="delete-overlay">

    <div className="delete-modal">

      <div className="warning-icon">⚠</div>

      <h2>Are you sure you want to delete this event?</h2>

      <p>
        This action cannot be undone.
        All data related to{" "}
        <strong>{selectedEvent?.title}</strong>
        {" "}will be permanently removed.
      </p>

      <div className="delete-actions">

        <button
          className="cancel-btn"
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>

        <button
          className="delete-btn"
          onClick={confirmDelete}
        >
          🗑 Delete
        </button>

      </div>
    </div>
  </div>
)}
      </main>
    </div>
  );
}

export default OrganizerManageEvents;
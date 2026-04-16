import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
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
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showNotify, setShowNotify] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  /* ---------------- LOAD EVENTS ---------------- */
  const loadEvents = useCallback(async () => {
    try {
      const data = await getEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      setEvents([]);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  /* ---------------- STATUS ---------------- */
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

  /* ---------------- FILTER ---------------- */
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

  /* ---------------- DELETE ---------------- */
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

  /* ---------------- EXPORT ---------------- */
  const handleExport = () => {
    if (filteredEvents.length === 0) {
      alert("No events to export");
      return;
    }

    const rows = [["ID", "Title", "Date", "Status", "Registrations"]];

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

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  /* ---------------- STATS ---------------- */
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

  return (
    <div className="manage-page">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div>
          <div className="brand">
            <div className="brand-icon">✦</div>

            <div>
              <h3>EVENT HUB</h3>
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
          <p onClick={logout}>Logout</p>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main-content">
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

        {/* HERO */}
        <div className="hero">
          <div>
            <h1>Manage Events</h1>
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

        {/* FILTERS */}
        <div className="filters">
          <div className="filter large">
            <Search size={14} />
            <input
              placeholder="Filter by event name, ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter">
            <CalendarDays size={14} />Date 

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          <div className="filter">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Today">Today</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
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
                  <span
                    className={`badge ${getStatus(
                      e.date
                    ).toLowerCase()}`}
                  >
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
                      navigate(
                        `/organizer/edit-event/${e._id}`
                      )
                    }
                  />

                  <Trash2
                    size={15}
                    onClick={() =>
                      handleDeleteClick(e)
                    }
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* CARDS */}
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

        {/* DELETE MODAL */}
        {showDeleteModal && (
          <div className="delete-overlay">
            <div className="delete-modal">
              <div className="warning-icon">⚠</div>

              <h2>
                Are you sure you want to delete this
                event?
              </h2>

              <p>
                This action cannot be undone. All data
                related to{" "}
                <strong>
                  {selectedEvent?.title}
                </strong>{" "}
                will be permanently removed.
              </p>

              <div className="delete-actions">
                <button
                  className="cancel-btn"
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
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
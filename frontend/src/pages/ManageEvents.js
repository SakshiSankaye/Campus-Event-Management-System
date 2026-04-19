import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  LayoutDashboard,
  CalendarCheck,
  Users,
  FileBarChart2,
  Eye,
  Check,
  X,
  Settings,
  LifeBuoy
} from "lucide-react";

import { getEvents, deleteEvent } from "../services/adminApi";
import "../styles/eventApproval.css";

function ManageEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const adminName =
    user.name ||
    user.email?.split("@")[0] ||
    "Admin";

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    }
  };

  const removeEvent = async (id) => {
    await deleteEvent(id);
    loadEvents();
  };

  const getStatus = (index) => {
    if (index % 3 === 0) return "Pending";
    if (index % 3 === 1) return "Pending";
    return "Under Review";
  };

  const filtered = events.filter((item) =>
    (item.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const pendingCount = filtered.filter(
    (_, i) => getStatus(i) === "Pending"
  ).length;

  return (
    <div className="ea-page">

      {/* Sidebar */}
      <aside className="ea-sidebar">

        <div>
          <div className="ea-brand">
            <div className="ea-brand-icon">A</div>

            <div>
              <h3>Event Hub</h3>
              
            </div>
          </div>

          <div
            className="ea-menu"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <LayoutDashboard size={15} />
            Dashboard
          </div>

          <div className="ea-menu active">
            <CalendarCheck size={15} />
            Event Approvals
          </div>

          <div className="ea-menu"
          onClick={() =>
              navigate("/admin/users")
            }>
            <Users size={15} />
            Manage Users
          </div>

          <div className="ea-menu"onClick={() =>
              navigate("/admin/reports")
            }>
            <FileBarChart2 size={15} />
            Reports
          </div>
        </div>

        <div className="ea-side-bottom">
          <button className="ea-create-btn">
            Create Event
          </button>

          <div className="ea-side-link">
            <Settings size={14} />
            Settings
          </div>

          <div className="ea-side-link">
            <LifeBuoy size={14} />
            Support
          </div>
        </div>

      </aside>

      {/* Main */}
      <main className="ea-main">

        {/* Topbar */}
        <div className="ea-topbar">

          <div className="ea-search">
            <Search size={14} />
            <input
              placeholder="Search approvals..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="ea-profile-wrap">
            <Bell size={15} />

            <div className="ea-divider"></div>

            <div className="ea-profile-text">
              <h4>{adminName}</h4>
              <p>Admin Profile</p>
            </div>

            <div className="ea-avatar">
              {adminName.charAt(0).toUpperCase()}
            </div>
          </div>

        </div>

        {/* Heading */}
        <div className="ea-heading-row">

          <div>
            <h1>Event Approvals</h1>
            <p>
              Review and manage pending event
              submissions for the current cycle.
            </p>
          </div>

          <div className="ea-tabs">
            <span className="tab active">
              All Pending
            </span>
            <span className="tab">
              Recently Approved
            </span>
            <span className="tab">
              Rejected
            </span>
          </div>

        </div>

        {/* Stats */}
        <div className="ea-stats">

          <div className="ea-stat-card">
            <h2>{pendingCount}</h2>
            <p>Pending Review</p>
          </div>

          <div className="ea-stat-card">
            <h2>{events.length}</h2>
            <p>Approved This Month</p>
          </div>

          <div className="ea-stat-card">
            <h2>4.2h</h2>
            <p>Avg. Response Time</p>
          </div>

        </div>

        {/* Table */}
        <div className="ea-table-card">

          <div className="ea-row ea-table-head">
            <span>EVENT NAME</span>
            <span>ORGANIZER</span>
            <span>DATE</span>
            <span>STATUS</span>
            <span>ACTIONS</span>
          </div>

          {filtered.length === 0 ? (
            <div className="ea-empty">
              No events found
            </div>
          ) : (
            filtered.map((event, index) => {
              const status = getStatus(index);

              return (
                <div
                  className="ea-row ea-data-row"
                  key={event._id}
                >
                  <div className="event-col">
                    <div className="event-thumb">
                      {event.title
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h5>{event.title}</h5>
                      <small>
                        ID:
                        {event._id
                          ?.slice(-6)
                          .toUpperCase()}
                      </small>
                    </div>
                  </div>

                  <span>
                    {event.createdBy ||
                      "Organizer"}
                  </span>

                  <span>{event.date}</span>

                  <span>
                    <label
                      className={`status-pill ${
                        status ===
                        "Under Review"
                          ? "review"
                          : "pending"
                      }`}
                    >
                      {status}
                    </label>
                  </span>

                  <div className="ea-actions">
                    <Eye size={15} />
                    <Check
                      size={15}
                      className="ok"
                    />
                    <X
                      size={15}
                      className="bad"
                      onClick={() =>
                        removeEvent(event._id)
                      }
                    />
                  </div>
                </div>
              );
            })
          )}

          <div className="ea-pagination">
            <span>‹</span>
            <span className="pg active">
              1
            </span>
            <span className="pg">2</span>
            <span className="pg">3</span>
            <span>›</span>
          </div>

        </div>

        {/* Bottom Cards */}
        <div className="ea-bottom-grid">

          <div className="blue-box">
            <h3>Bulk Actions Ready</h3>
            <p>
              You have multiple events from the
              same organizer ready for review.
            </p>

            <button>
              Start Batch Review
            </button>
          </div>

          <div className="tip-box">
            <h3>✨ Pro Tip: Smart Filtering</h3>
            <p>
              Use search to quickly filter
              events by title or organizer.
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}

export default ManageEvents;
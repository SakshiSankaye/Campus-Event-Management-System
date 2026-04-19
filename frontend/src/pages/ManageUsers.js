import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  LayoutDashboard,
  CalendarCheck,
  Users,
  FileBarChart2,
  Settings,
  LifeBuoy,
  UserPlus,
  Pencil,
  Trash2
} from "lucide-react";

import { getUsers } from "../services/adminApi";
import "../styles/manageUsers.css";

function ManageUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const currentUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const adminName =
    currentUser.name ||
    currentUser.email?.split("@")[0] ||
    "Admin";

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = users.filter((user) =>
    `${user.name || ""} ${user.email || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const getRole = (index) => {
    if (index % 3 === 0) return "Admin";
    if (index % 3 === 1) return "Organizer";
    return "Student";
  };

  const getStatus = (index) => {
    return index % 4 === 2 ? "Inactive" : "Active";
  };

  return (
    <div className="mu-page">

      {/* Sidebar */}
      <aside className="mu-sidebar">

        <div>
          <div className="mu-brand">
            <div className="mu-brand-icon">A</div>
            <div>
              <h3>Event Hub</h3>
              
            </div>
          </div>

          <div
            className="mu-menu"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <LayoutDashboard size={15} />
            Dashboard
          </div>

          <div
            className="mu-menu"
            onClick={() =>
              navigate("/admin/manage-events")
            }
          >
            <CalendarCheck size={15} />
            Event Approvals
          </div>
            
          <div className="mu-menu active"
          onClick={() =>
              navigate("/admin/users")
            }>
            
            <Users size={15} />
            Manage Users
          </div>

          <div className="mu-menu"
          onClick={() =>
              navigate("/admin/reports")
            }>
            <FileBarChart2 size={15} />
            Reports
          </div>
        </div>

        <div className="mu-side-bottom">

          <button className="mu-create-btn">
            + Create Event
          </button>

          <div className="mu-side-link">
            <Settings size={14} />
            Settings
          </div>

          <div className="mu-side-link">
            <LifeBuoy size={14} />
            Support
          </div>

        </div>

      </aside>

      {/* Main */}
      <main className="mu-main">

        {/* Topbar */}
        <div className="mu-topbar">

          <div className="mu-search">
            <Search size={14} />
            <input
              placeholder="Search platform users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="mu-profile-wrap">
            <Bell size={15} />
            <div className="mu-divider"></div>

            <div className="mu-profile-text">
              <h4>Admin Profile</h4>
            </div>

            <div className="mu-avatar">
              {adminName.charAt(0).toUpperCase()}
            </div>
          </div>

        </div>

        {/* Heading */}
        <div className="mu-head-row">

          <div>
            <h1>User Management</h1>
            <p>
              Administrate access levels,
              monitor status, and manage
              platform participants.
            </p>
          </div>

          <div className="mu-head-actions">
            <button className="light-btn">
              Export CSV
            </button>

            <button className="blue-btn">
              <UserPlus size={14} />
              Add User
            </button>
          </div>

        </div>

        {/* Stats */}
        <div className="mu-stats">

          <div className="mu-stat-card">
            <small>TOTAL USERS</small>
            <h2>{users.length}</h2>
            <p>↗ 12% vs last month</p>
          </div>

          <div className="mu-stat-card">
            <small>ACTIVE NOW</small>
            <h2>
              {
                filtered.filter(
                  (_, i) =>
                    getStatus(i) ===
                    "Active"
                ).length
              }
            </h2>
            <p>● Real-time sessions</p>
          </div>

          <div className="mu-stat-card">
            <small>PENDING APPROVAL</small>
            <h2>
              {Math.floor(users.length / 3)}
            </h2>
            <p>⚠ Action required</p>
          </div>

        </div>

        {/* Table */}
        <div className="mu-table-card">

          <div className="mu-row mu-table-head">
            <span>NAME</span>
            <span>EMAIL ADDRESS</span>
            <span>ACCESS ROLE</span>
            <span>STATUS</span>
            <span>ACTIONS</span>
          </div>

          {filtered.map((user, index) => {
            const role = getRole(index);
            const status =
              getStatus(index);

            return (
              <div
                className="mu-row mu-data-row"
                key={user._id}
              >
                <div className="user-col">
                  <div className="user-avatar">
                    {(user.name || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <strong>
                    {user.name || "User"}
                  </strong>
                </div>

                <span className="muted">
                  {user.email}
                </span>

                <span>
                  <label
                    className={`role-pill ${role.toLowerCase()}`}
                  >
                    {role}
                  </label>
                </span>

                <span
                  className={`status-dot ${
                    status === "Active"
                      ? "green"
                      : "gray"
                  }`}
                >
                  ● {status}
                </span>

                <div className="mu-actions">
                  <Pencil size={14} />
                  <Trash2 size={14} />
                </div>
              </div>
            );
          })}

          <div className="mu-pagination">
            <span>‹</span>
            <span className="pg active">
              1
            </span>
            <span className="pg">2</span>
            <span className="pg">3</span>
            <span>›</span>
          </div>

        </div>

      </main>
    </div>
  );
}

export default ManageUsers;
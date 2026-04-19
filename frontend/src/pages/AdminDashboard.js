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
  Plus,
  ShieldAlert,
  Cloud,
  Database,
  Mail
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";

import { getStats } from "../services/adminApi";
import "../styles/admindashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    registrations: 0
  });

  const [search, setSearch] = useState("");

  const storedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const adminName =
    storedUser.name ||
    storedUser.email?.split("@")[0] ||
    "Admin";

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const chartData = [
    { name: "JAN", value: Math.max(5, stats.events * 0.2) },
    { name: "FEB", value: Math.max(8, stats.events * 0.35) },
    { name: "MAR", value: Math.max(12, stats.events * 0.5) },
    { name: "APR", value: Math.max(16, stats.events * 0.65) },
    { name: "MAY", value: Math.max(20, stats.events * 0.8) },
    { name: "JUN", value: Math.max(25, stats.events || 25) }
  ];

  const userGrowthData = [
    { month: "Jan", users: 10 },
    { month: "Feb", users: 20 },
    { month: "Mar", users: 35 },
    { month: "Apr", users: 45 },
    { month: "May", users: 58 },
    { month: "Jun", users: stats.users || 70 }
  ];

  return (
    <div className="ad-page">

      {/* Sidebar */}
      <aside className="ad-sidebar">

        <div>
          <div className="ad-logo">
            <div className="ad-logo-icon">A</div>
            <div>
              <h3>Event Hub</h3>
              
            </div>
          </div>

          <div className="ad-menu active">
            <LayoutDashboard size={17} />
            Dashboard
          </div>

          <div
            className="ad-menu"
            onClick={() => navigate("/admin/manage-events")}
          >
            <CalendarCheck size={17} />
            Event Approvals
          </div>

          <div
            className="ad-menu"
            onClick={() => navigate("/admin/users")}
          >
            <Users size={17} />
            Manage Users
          </div>

          <div
            className="ad-menu"
            onClick={() => navigate("/admin/reports")}
          >
            <FileBarChart2 size={17} />
            Reports
          </div>
        </div>

        <div className="ad-bottom">

          <button
            className="ad-create-btn"
            onClick={() => navigate("/create-event")}
          >
            <Plus size={16} />
            Create Event
          </button>

          <div className="ad-small-link">
            <Settings size={15} />
            Settings
          </div>

          <div className="ad-small-link">
            <LifeBuoy size={15} />
            Support
          </div>

          <div
            className="ad-small-link"
            onClick={logout}
          >
            Logout
          </div>

        </div>

      </aside>

      {/* Main */}
      <main className="ad-main">

        {/* Topbar */}
        <div className="ad-topbar">

          <div className="ad-search">
            <Search size={15} />
            <input
              placeholder="Search events, users, or logs..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="ad-right">

            <Bell size={17} />

            <div className="ad-profile">
              <div>
                <h4>{adminName}</h4>
                <p>System Lead</p>
              </div>

              <div className="ad-avatar">
                {adminName.charAt(0).toUpperCase()}
              </div>
            </div>

          </div>

        </div>

        {/* Heading */}
        <div className="ad-head">

          <div>
            <h1>Welcome, Admin</h1>
            <p>
              Here's a curated overview of your
              event architecture today.
            </p>
          </div>

          <div className="ad-head-btns">
            <button className="light-btn">
              Export Report
            </button>

            <button className="blue-btn">
              Launch Wizard
            </button>
          </div>

        </div>

        {/* Cards */}
        <div className="ad-cards">

          <div className="ad-card">
            <Users size={18} />
            <span className="growth green">
              +12%
            </span>
            <p>TOTAL USERS</p>
            <h2>{stats.users}</h2>
          </div>

          <div className="ad-card">
            <CalendarCheck size={18} />
            <span className="growth green">
              +4.2%
            </span>
            <p>TOTAL EVENTS</p>
            <h2>{stats.events}</h2>
          </div>

          <div className="ad-card brown">
            <ShieldAlert size={18} />
            <p>PENDING APPROVALS</p>
            <h2>
              {Math.max(
                0,
                stats.events -
                  stats.registrations
              )}
            </h2>
          </div>

        </div>

        {/* Charts */}
        <div className="ad-grid">

          {/* Bar Chart */}
          <div className="chart-card">

            <div className="card-title">
              <span>Events per Month</span>
              <small>Last 6 Months</small>
            </div>

            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* Line Chart */}
          <div className="chart-card">

            <div className="card-title">
              <span>User Growth</span>
            </div>

            <div className="growth-pill">
              +2,104 this month
            </div>

            <ResponsiveContainer
              width="100%"
              height={200}
            >
              <LineChart data={userGrowthData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#eef2f7"
                />
                <XAxis dataKey="month" />
                <YAxis hide />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#2563eb"
                  }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="mini-stats">
              <div>
                <p>ACTIVE</p>
                <h4>
                  {Math.floor(
                    stats.users * 0.68
                  )}
                </h4>
              </div>

              <div>
                <p>NEW</p>
                <h4>
                  {Math.floor(
                    stats.users * 0.1
                  )}
                </h4>
              </div>

              <div>
                <p>CHURN</p>
                <h4>
                  {Math.floor(
                    stats.users * 0.03
                  )}
                </h4>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="ad-grid">

          <div className="alerts-card">

            <h3>⚠ Recent System Alerts</h3>

            <div className="alert-item">
              <div>
                <strong>
                  Database latency spike detected
                </strong>
                <p>
                  Cluster-01 reported
                  450ms delay
                </p>
              </div>
              <small>2 MINS AGO</small>
            </div>

            <div className="alert-item">
              <div>
                <strong>
                  SSL Certificate Renewal
                </strong>
                <p>
                  Expires in 7 days
                </p>
              </div>
              <small>4 HOURS AGO</small>
            </div>

            <div className="alert-item">
              <div>
                <strong>
                  API Usage Limit
                </strong>
                <p>
                  Client nearing 90%
                  quota
                </p>
              </div>
              <small>12 HOURS AGO</small>
            </div>

          </div>

          <div className="status-card">

            <h3>Environment Status</h3>

            <div className="status-row">
              <Cloud size={15} />
              Production API
              <span>ONLINE</span>
            </div>

            <div className="status-row">
              <Database size={15} />
              Data Warehouse
              <span>STABLE</span>
            </div>

            <div className="status-row">
              <Mail size={15} />
              Email Gateway
              <span>ACTIVE</span>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;
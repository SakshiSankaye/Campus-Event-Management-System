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
  CalendarDays,
  Clock3,
  FileText,
  Download,
  ArrowRight
} from "lucide-react";

import "../styles/reports.css";

function Reports() {
  const navigate = useNavigate();

  const currentUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const adminName =
    currentUser.name ||
    currentUser.email?.split("@")[0] ||
    "Admin";

  const reports = [
    {
      title: "Q3 Financial Projection_v2",
      date: "Generated Oct 24, 2023 • 2.4 MB",
      color: "orange"
    },
    {
      title: "Tech Summit Attendee Feedback",
      date: "Generated Oct 18, 2023 • 1.1 MB",
      color: "blue"
    },
    {
      title: "Annual Growth Report 2023",
      date: "Generated Oct 05, 2023 • 5.8 MB",
      color: "purple"
    }
  ];

  return (
    <div className="rp-page">

      {/* Sidebar */}
      <aside className="rp-sidebar">

        <div>
          <div className="rp-brand">
            <div className="rp-brand-icon">A</div>

            <div>
              <h3>Event Hub</h3>
              
            </div>
          </div>

          <div
            className="rp-menu"
            onClick={() =>
              navigate("/admin/dashboard")
            }
          >
            <LayoutDashboard size={15} />
            Dashboard
          </div>

          <div
            className="rp-menu"
            onClick={() =>
              navigate("/admin/manage-events")
            }
          >
            <CalendarCheck size={15} />
            Event Approvals
          </div>

          <div
            className="rp-menu"
            onClick={() =>
              navigate("/admin/users")
            }
          >
            <Users size={15} />
            Manage Users
          </div>

          <div className="rp-menu active">
            <FileBarChart2 size={15} />
            Reports
          </div>
        </div>

        <div className="rp-side-bottom">

          <button className="rp-create-btn">
            + Create Event
          </button>

          <div className="rp-side-link">
            <Settings size={14} />
            Settings
          </div>

          <div className="rp-side-link">
            <LifeBuoy size={14} />
            Support
          </div>

        </div>

      </aside>

      {/* Main */}
      <main className="rp-main">

        {/* Topbar */}
        <div className="rp-topbar">

          <div className="rp-search">
            <Search size={14} />
            <input placeholder="Search reports..." />
          </div>

          <div className="rp-profile-wrap">
            <Bell size={15} />

            <div className="rp-divider"></div>

            <div className="rp-profile-text">
              <h4>Admin Profile</h4>
            </div>

            <div className="rp-avatar">
              {adminName.charAt(0).toUpperCase()}
            </div>
          </div>

        </div>

        {/* Heading */}
        <div className="rp-head-row">

          <h1>Analytics & Reports</h1>

          <div className="rp-head-actions">

            <button className="light-btn">
              <Clock3 size={14} />
              View History
            </button>

            <button className="blue-btn">
              <CalendarDays size={14} />
              Schedule New
            </button>

          </div>

        </div>

        {/* Top Grid */}
        <div className="rp-grid-top">

          {/* Report Generator */}
          <div className="rp-card large">

            <h3>
              📅 Events Performance Report
            </h3>

            <p>
              Configure parameters to analyze
              event engagement and success
              rates.
            </p>

            <div className="rp-form-grid">

              <div className="rp-field">
                <label>
                  DATE RANGE SELECTION
                </label>

                <div className="rp-input">
                  <CalendarDays size={14} />
                  Last 30 Days
                </div>
              </div>

              <div className="rp-field">
                <label>
                  EVENT CATEGORY
                </label>

                <div className="rp-input">
                  <FileText size={14} />
                  All Categories
                </div>
              </div>

            </div>

            <div className="rp-options">
              <span>
                ☐ Include Revenue Data
              </span>

              <span>
                ☑ Include Attendee Feedback
              </span>

              <button className="blue-btn">
                Generate Report
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

          {/* Finance Card */}
          <div className="finance-card">

            <div className="live-tag">
              LIVE FINANCIALS
            </div>

            <div className="money-icon">
              💳
            </div>

            <small>
              Monthly Processing Vol.
            </small>

            <h2>$482,900.00</h2>

            <p>
              ↗ +12.4% since last month
            </p>

            <button>
              View Detailed Ledger
            </button>

          </div>

        </div>

        {/* Bottom Grid */}
        <div className="rp-grid-bottom">

          {/* User Growth */}
          <div className="rp-card">

            <h3>User Growth Analytics</h3>

            <div className="mini-box">
              <small>ROLE FOCUSED</small>
              <strong>
                Architects vs Clients
              </strong>
            </div>

            <div className="mini-box">
              <small>ENGAGEMENT METRIC</small>
              <strong>
                Retention & Churn Rate
              </strong>
            </div>

            <button className="gray-btn">
              Generate Users Audit
            </button>

          </div>

          {/* Recent Reports */}
          <div className="rp-card">

            <div className="recent-head">
              <h3>Recent Reports</h3>
              <span>Clear History</span>
            </div>

            {reports.map((item, index) => (
              <div
                className="report-row"
                key={index}
              >
                <div
                  className={`dot ${item.color}`}
                ></div>

                <div className="report-info">
                  <strong>
                    {item.title}
                  </strong>
                  <p>{item.date}</p>
                </div>

                <div className="report-actions">
                  <Download size={13} />
                  PDF
                </div>

                <div className="report-actions">
                  <Download size={13} />
                  CSV
                </div>
              </div>
            ))}

          </div>

        </div>

      </main>
    </div>
  );
}

export default Reports;
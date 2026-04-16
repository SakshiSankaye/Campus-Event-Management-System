import React, { useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  CalendarDays,
  Users,
  Bell,
  Search,
} from "lucide-react";
import "../styles/dashboard.css";

export default function OrganizerCreateEvent() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const userName =
    storedUser.name ||
    storedUser.fullname ||
    storedUser.fullName ||
    storedUser.username ||
    (storedUser.email ? storedUser.email.split("@")[0] : "Guest");

  const userEmail = storedUser.email || "No Email";
  const userRole = storedUser.role || "organizer";
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const firstLetter = useMemo(() => {
    return userName.charAt(0).toUpperCase();
  }, [userName]);

  const [showNotify, setShowNotify] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [resourceSearch, setResourceSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    venue: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }
};
  const handleSubmit = async () => {
  try {
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("date", formData.startDate);
    data.append("createdBy", userName);

    if (image) {
      data.append("image", image);
    }

    await axios.post(
      "http://localhost:5000/api/events",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Event Created Successfully!");
    navigate("/organizer-dashboard");

  } catch (error) {
    alert("Failed to create event");
  }
};

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="ce-page">
      {/* Sidebar */}
      <aside className="ce-sidebar">
        <div>
          <div className="ce-logo">
            <div className="ce-logo-icon">✦</div>
            <div>
              <h3>EVENT HUB</h3>
            </div>
          </div>

          <div
            className="ce-menu-item"
            onClick={() => navigate("/organizer-dashboard")}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </div>

          <div className="ce-menu-item active">
            <PlusCircle size={16} />
            Create Event
          </div>

          <div
            className="ce-menu-item"
            onClick={() => navigate("/organizer-manage-events")}
          >
            <CalendarDays size={16} />
            Manage Events
          </div>

          <div
            className="ce-menu-item"
            onClick={() => navigate("/participants")}
          >
            <Users size={16} />
            Participants
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="ce-main">
        {/* Topbar */}
        <div className="ce-topbar">
          <h2>Create Event</h2>

          <div className="header-right">
            {/* Search */}
            <div className="ce-search">
              <Search size={14} />
              <input
                placeholder="Search resources..."
                value={resourceSearch}
                onChange={(e) => setResourceSearch(e.target.value)}
              />
            </div>

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
                  <p>✅ Event created successfully</p>
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

                <div className="profile-circle">{firstLetter}</div>
              </div>

              {showProfile && (
                <div className="profile-menu">
                  <h4>{userName}</h4>
                  <p>{userEmail}</p>
                  <hr />

                  <div onClick={() => navigate("/organizer-dashboard")}>
                    Dashboard
                  </div>

                  <div onClick={logout}>Logout</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="ce-grid">
          {/* Left */}
          <div className="ce-left">
            <div className="ce-card">
              <h3>Event Identity</h3>
              <p>Define the core personality and details of your occasion.</p>

              <label>EVENT TITLE</label>
              <input
                name="title"
                placeholder="e.g. Annual Architecture Symposium 2024"
                onChange={handleChange}
              />

              <div className="ce-two">
                <div>
                  <label>CATEGORY</label>
                  <input
                    name="category"
                    placeholder="Exhibition"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>VENUE</label>
                  <input
                    name="venue"
                    placeholder="Search location..."
                    onChange={handleChange}
                  />
                </div>
              </div>

              <label>DESCRIPTION</label>
              <textarea
                name="description"
                placeholder="Elaborate on the event's objectives, target audience, and key highlights..."
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="ce-card">
              <h3>Timeline</h3>
              <p>Schedule the windows for your event sessions.</p>

              <div className="ce-two">
                <div>
                  <label>START DATE & TIME</label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>END DATE & TIME</label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="ce-right">

  <div className="ce-card small">
    <h4>VISUAL IDENTITY</h4>

    {/* Upload Button */}
    <label className="upload-box">
      Upload Event Image
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />
    </label>

    {/* Preview */}
    <div className="preview-box">

  {preview ? (
    <div className="image-preview-wrapper">

      <img
        src={preview}
        alt="Preview"
        className="preview-img"
      />

      <button
        className="remove-img-btn"
        onClick={() => {
          setImage(null);
          setPreview("");
        }}
      >
        Remove Image
      </button>

    </div>
  ) : (
    "No image selected"
  )}

</div>
  </div>

  <div className="launch-card">
    <h3>Ready to Launch?</h3>

    <p>
      Ensure all mandatory details are filled to enable live registration.
    </p>

    <button onClick={handleSubmit}>
      Create Event
    </button>

    <button className="draft-btn">
      Save as Draft
    </button>
  </div>

</div>
        </div>
      </main>
    </div>
  );
}
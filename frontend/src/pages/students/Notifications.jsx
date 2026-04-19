import { useState, useEffect } from "react";
import API from "../../services/api";
import {
  Bell,
  Ticket,
  Clock,
  AlertCircle,
  Sparkles,
  Info,
  Check,
  Trash2,
  CheckCheck,
} from "lucide-react";
const notifications = [];
const TYPE_META = {
  reminder: {
    icon: Clock,
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
    label: "Reminder",
  },
  registration: {
    icon: Ticket,
    bg: "bg-brand-50",
    iconColor: "text-brand-500",
    label: "Registration",
  },
  waitlist: {
    icon: AlertCircle,
    bg: "bg-orange-50",
    iconColor: "text-orange-500",
    label: "Waitlist",
  },
  update: {
    icon: Info,
    bg: "bg-violet-50",
    iconColor: "text-violet-500",
    label: "Update",
  },
  new: {
    icon: Sparkles,
    bg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    label: "New Event",
  },
};

export default function Notifications() {
  const [notifs, setNotifs] = useState([]);
  const [filter, setFilter] = useState("All");

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await API.get("/api/notifications");
        setNotifs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
  }, []);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifs((n) => n.map((x) => ({ ...x, read: true })));

  const markRead = (id) =>
    setNotifs((n) =>
      n.map((x) => (x.id === id ? { ...x, read: true } : x))
    );

  const remove = (id) =>
    setNotifs((n) => n.filter((x) => x.id !== id));

  const filtered = notifs.filter((n) => {
    if (filter === "Unread") return !n.read;
    if (filter === "Read") return n.read;
    return true;
  });

  const tabs = ["All", "Unread", "Read"];

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900">
            Notifications
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {unreadCount > 0 ? (
              <>
                <span className="font-semibold text-gray-700">
                  {unreadCount}
                </span>{" "}
                unread notifications
              </>
            ) : (
              "All caught up!"
            )}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-xs font-semibold text-brand-600 bg-brand-50 px-4 py-2 rounded-xl"
          >
            <CheckCheck size={14} />
            Mark all read
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white shadow-card rounded-xl p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-sm rounded-lg ${filter === tab
              ? "bg-brand-500 text-white"
              : "text-gray-500"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Bell size={36} className="mx-auto mb-3 opacity-30" />
          No notifications
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((notif) => {
            const meta = TYPE_META[notif.type] || TYPE_META.update;
            const Icon = meta.icon;

            return (
              <li key={notif.id} className="bg-white p-4 rounded-xl shadow-card">
                <div className="flex justify-between">
                  <p className="font-semibold">{notif.title}</p>
                  <span className="text-xs text-gray-400">
                    {notif.time}
                  </span>
                </div>

                <p className="text-xs text-gray-400">{notif.body}</p>

                <div className="flex gap-2 mt-2">
                  {!notif.read && (
                    <button onClick={() => markRead(notif.id)}>
                      Mark read
                    </button>
                  )}
                  <button onClick={() => remove(notif.id)}>
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {notifs.length > 0 && (
        <p className="text-center text-xs text-gray-400">
          Showing {filtered.length} of {notifs.length}
        </p>
      )}
    </div>
  );
}
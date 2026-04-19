import { useState } from 'react'
import {
  User, Mail, Phone, GraduationCap, Hash, Shield, Bell,
  Lock, Trash2, Edit3, Save, X, CalendarDays, Ticket, Bookmark,
} from 'lucide-react'

// ✅ FIXED: Added proper default data
const userProfile = {
  name: "Pallavi Singh",
  email: "pallavi@example.com",
  phone: "9876543210",
  department: "Computer Science",
  year: "3rd Year",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pallavi",
  rollNo: "CS2023001",
  eventsAttended: 5,
  upcomingEvents: 2,
  savedEvents: 3,
  badges: [
    { label: "Active", color: "brand" },
    { label: "Top Participant", color: "violet" }
  ]
}

const BADGE_COLORS = {
  brand: 'bg-brand-100 text-brand-700',
  violet: 'bg-violet-100 text-violet-700',
  amber: 'bg-amber-100 text-amber-700',
}

export default function UserProfile() {
  const [editing, setEditing] = useState(false)

  const [form, setForm] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    department: userProfile.department,
    year: userProfile.year,
  })

  const handleChange = (field, val) =>
    setForm(f => ({ ...f, [field]: val }))

  const handleSave = () => {
    setEditing(false)
    // later → send to backend
  }

  const handleCancel = () => {
    setForm({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      department: userProfile.department,
      year: userProfile.year,
    })
    setEditing(false)
  }

  const stats = [
    {
      label: 'Events Attended',
      value: userProfile.eventsAttended,
      icon: CalendarDays,
      color: 'text-brand-500 bg-brand-50'
    },
    {
      label: 'Upcoming Events',
      value: userProfile.upcomingEvents,
      icon: Ticket,
      color: 'text-amber-500 bg-amber-50'
    },
    {
      label: 'Saved Events',
      value: userProfile.savedEvents,
      icon: Bookmark,
      color: 'text-violet-500 bg-violet-50'
    },
  ]

  const settingsSections = [
    { icon: Bell, label: 'Notification Preferences', sub: 'Email, push, and in-app alerts' },
    { icon: Lock, label: 'Privacy & Security', sub: 'Password, 2FA, and sessions' },
    { icon: Shield, label: 'Account Permissions', sub: 'Roles and access level' },
  ]

  return (
    <div className="max-w-screen-lg mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900">Profile</h1>
        <p className="text-sm text-gray-400 mt-1">
          Manage your account details and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="space-y-4">

          {/* Avatar */}
          <div className="bg-white shadow-card rounded-2xl p-6 text-center">
            <div className="relative inline-block mb-4">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-20 h-20 rounded-2xl bg-brand-100 mx-auto"
              />
            </div>

            <h2 className="font-bold text-gray-900 text-lg">{form.name}</h2>
            <p className="text-xs text-gray-400 mt-1">
              {form.department} · {form.year}
            </p>

            {/* BADGES */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {(userProfile.badges || []).map(b => (
                <span
                  key={b.label}
                  className={`text-xs px-2 py-1 rounded-full ${BADGE_COLORS[b.color]}`}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* STATS */}
          <div className="bg-white shadow-card rounded-2xl p-5 space-y-3">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="text-lg font-bold text-gray-900">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2 space-y-5">

          {/* ACCOUNT SETTINGS */}
          <div className="bg-white shadow-card rounded-2xl p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-gray-900">Account Settings</h3>

              {!editing ? (
                <button onClick={() => setEditing(true)}>Edit</button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleCancel}>Cancel</button>
                  <button onClick={handleSave}>Save</button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { field: 'name', label: 'Name' },
                { field: 'email', label: 'Email' },
                { field: 'phone', label: 'Phone' },
                { field: 'department', label: 'Department' },
                { field: 'year', label: 'Year' },
              ].map(({ field, label }) => (
                <div key={field}>
                  <label className="text-xs text-gray-400">{label}</label>

                  {editing ? (
                    <input
                      value={form[field]}
                      onChange={e => handleChange(field, e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                  ) : (
                    <p className="p-2 bg-gray-100 rounded">{form[field]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SETTINGS */}
          <div className="bg-white shadow-card rounded-2xl divide-y">
            {settingsSections.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="p-4 flex items-center gap-3">
                <Icon size={18} />
                <div>
                  <p className="font-semibold">{label}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* DANGER */}
          <div className="bg-red-50 p-4 rounded-xl">
            <button className="text-red-600 flex items-center gap-2">
              <Trash2 size={16} />
              Delete Account
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
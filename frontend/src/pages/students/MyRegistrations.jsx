import { useState } from 'react'
import { Calendar, MapPin, Ticket, CheckCircle2, Clock, Download, X, Eye } from 'lucide-react'

const myRegistrations = [];
const TABS = ['All', 'Upcoming', 'Past']

const STATUS_STYLES = {
  confirmed: { bg: 'bg-brand-100', text: 'text-brand-700', label: 'Confirmed' },
  attended: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Attended' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' },
}

const TAG_COLORS = {
  Tech: 'bg-brand-100 text-brand-700',
  Workshop: 'bg-violet-100 text-violet-700',
  Music: 'bg-pink-100 text-pink-700',
  Design: 'bg-amber-100 text-amber-700',
  Career: 'bg-emerald-100 text-emerald-700',
}

export default function MyRegistrations() {
  const [activeTab, setActiveTab] = useState('All')

  const filtered = myRegistrations.filter(r => {
    if (activeTab === 'Upcoming') return !r.attended
    if (activeTab === 'Past') return r.attended
    return true
  })

  const summary = {
    total: myRegistrations.length,
    upcoming: myRegistrations.filter(r => !r.attended).length,
    attended: myRegistrations.filter(r => r.attended).length,
  }

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900">My Registrations</h1>
        <p className="text-sm text-gray-400 mt-1">Manage your event tickets and schedule</p>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Registered', value: summary.total, icon: Ticket, color: 'text-brand-500 bg-brand-50' },
          { label: 'Upcoming', value: summary.upcoming, icon: Clock, color: 'text-amber-500 bg-amber-50' },
          { label: 'Attended', value: summary.attended, icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-50' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white shadow-card rounded-2xl p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color.split(' ')[1]}`}>
              <Icon size={18} className={color.split(' ')[0]} strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">{label}</p>
              <p className="text-2xl font-display font-bold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white shadow-card rounded-xl p-1 w-fit">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150
              ${activeTab === tab ? 'bg-brand-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Registration table */}
      <div className="bg-white shadow-card rounded-2xl overflow-hidden">
        {/* Table header */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 bg-surface-muted border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
          <span>Event</span>
          <span>Date</span>
          <span>Ticket ID</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Ticket size={32} className="mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No registrations found</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {filtered.map(reg => {
              const s = STATUS_STYLES[reg.status] ?? STATUS_STYLES.confirmed
              return (
                <li key={reg.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-4 hover:bg-surface transition-colors">

                  {/* Event info */}
                  <div className="flex items-center gap-3">
                    <img src={reg.event.image} alt={reg.event.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{reg.event.title}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin size={10} className="text-gray-400" />
                        <span className="text-xs text-gray-400 truncate">{reg.event.location}</span>
                      </div>
                      <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${TAG_COLORS[reg.event.tag]}`}>
                        {reg.event.tag}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={11} className="text-gray-400" />
                      {reg.event.date.split(' · ')[0]}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Registered {reg.registeredOn}</p>
                  </div>

                  {/* Ticket ID */}
                  <p className="text-xs font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded-lg w-fit">{reg.ticketId}</p>

                  {/* Status badge */}
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${s.bg} ${s.text}`}>
                    {s.label}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-xl hover:bg-brand-50 text-gray-400 hover:text-brand-500 transition-colors" title="View">
                      <Eye size={15} />
                    </button>
                    {!reg.attended && (
                      <button className="p-2 rounded-xl hover:bg-brand-50 text-gray-400 hover:text-brand-500 transition-colors" title="Download ticket">
                        <Download size={15} />
                      </button>
                    )}
                    {!reg.attended && (
                      <button className="p-2 rounded-xl hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Cancel">
                        <X size={15} />
                      </button>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Sync hint */}
      <div className="flex items-center justify-between bg-white shadow-card rounded-2xl p-4">
        <div>
          <p className="text-sm font-semibold text-gray-800">Sync with Calendar</p>
          <p className="text-xs text-gray-400 mt-0.5">Add all your upcoming events to Google Calendar automatically</p>
        </div>
        <button className="bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
          Sync Now
        </button>
      </div>
    </div>
  )
}

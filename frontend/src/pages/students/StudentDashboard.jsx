import {
  CalendarDays,
  BookMarked,
  Bell,
  LayoutGrid,
  Search,
  Clock,
  ArrowRight,
  Ticket,
  CheckCircle2,
  BookmarkPlus,
  AlertCircle,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

import StatCard from "../../components/StatCard";
import EventCard from "../../components/EventCard";
const stats = [
  { id: 1, label: 'Events', value: 12, change: '+2 this week', color: 'brand' },
  { id: 2, label: 'Registered', value: 4, change: '+1', color: 'violet' },
  { id: 3, label: 'Attended', value: 8, change: '+3', color: 'green' },
  { id: 4, label: 'Saved', value: 2, change: '0', color: 'brand' },
];
const upcomingEvents = [
  { id: 1, title: 'Tech Fest', date: '2026-05-10', location: 'Auditorium', attendees: 120, price: 'Free', tag: 'Tech', status: 'open', description: 'A festival of technology.' },
  { id: 2, title: 'Hackathon', date: '2026-05-15', location: 'Lab 1', attendees: 80, price: 'Free', tag: 'Tech', status: 'open', description: '24-hour coding event.' },
];
const recentActivity = [
  { id: 1, type: 'register', action: 'Registered for', subject: 'Tech Fest' },
  { id: 2, type: 'attended', action: 'Attended', subject: 'AI Seminar' },
];
const heroEvent = {
  title: 'AI Seminar',
  subtitle: 'Learn about the latest in AI',
  date: '2026-05-09',
  time: '10:00 AM',
  spotsLeft: 5,
};

/* ─── activity icon helper ─────────────────────────── */
const ActivityIcon = ({ type }) => {
  const map = {
    register: { icon: Ticket, bg: 'bg-brand-50', color: 'text-brand-500' },
    reminder: { icon: Bell, bg: 'bg-amber-50', color: 'text-amber-500' },
    attended: { icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-500' },
    saved: { icon: BookmarkPlus, bg: 'bg-violet-50', color: 'text-violet-500' },
    waitlist: { icon: AlertCircle, bg: 'bg-pink-50', color: 'text-pink-500' },
  }
  const { icon: Icon, bg, color } = map[type] ?? map.register
  return (
    <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
      <Icon size={15} className={color} strokeWidth={2} />
    </div>
  )
}

/* ─── stat icon map ─────────────────────────────────── */
const STAT_ICONS = [CalendarDays, BookMarked, Bell, LayoutGrid]

/* ─── Quick action button ───────────────────────────── */
const QuickAction = ({ icon: Icon, label, sub, color }) => {
  const colors = {
    brand: 'from-brand-500 to-brand-600',
    violet: 'from-violet-500 to-violet-600',
    green: 'from-emerald-500 to-emerald-600',
  }
  return (
    <button className={`flex items-center gap-3 bg-gradient-to-br ${colors[color]} text-white rounded-2xl p-4 hover:opacity-90 active:scale-95 transition-all duration-150 text-left w-full`}>
      <div className="bg-white/20 rounded-xl p-2.5">
        <Icon size={18} strokeWidth={2} />
      </div>
      <div>
        <p className="font-display font-bold text-sm">{label}</p>
        <p className="text-xs text-white/70 mt-0.5">{sub}</p>
      </div>
      <ChevronRight size={16} className="ml-auto opacity-70" />
    </button>
  )
}

/* ─── Main Dashboard ────────────────────────────────── */
export default function StudentDashboard() {
  return (
    <div className="space-y-7 max-w-screen-xl mx-auto">

      {/* ── Welcome + Hero Card ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Welcome text */}
        <div className="lg:col-span-1 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={15} className="text-amber-400" />
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest">Good morning</span>
          </div>
          <h1 className="font-display font-bold text-3xl text-gray-900 leading-tight">
            Welcome back,<br />
            <span className="text-brand-600">Pallavi 👋</span>
          </h1>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            You have <span className="text-gray-700 font-medium">4 upcoming events</span> this week.
            Don't miss the AI talk tomorrow!
          </p>
          <div className="mt-5 flex gap-3">
            <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
              <Search size={14} />
              Explore Events
            </button>
            <button className="flex items-center gap-2 bg-white text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2.5 rounded-xl shadow-card transition-colors">
              <CalendarDays size={14} />
              My Schedule
            </button>
          </div>
        </div>

        {/* Hero featured event card */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-hero-gradient p-6 text-white shadow-card min-h-[200px]">
          {/* background pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 80% 20%, white 1px, transparent 1px), radial-gradient(circle at 20% 80%, white 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          {/* decorative blob */}
          <div className="absolute right-0 top-0 w-52 h-52 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Featured Event
            </span>
            <h2 className="font-display font-bold text-xl leading-snug max-w-xs">
              {heroEvent.title}
            </h2>
            <p className="text-white/70 text-sm mt-1.5 max-w-sm">{heroEvent.subtitle}</p>

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-white/80">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={13} />
                {heroEvent.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {heroEvent.time}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button className="flex items-center gap-2 bg-white text-brand-700 hover:bg-brand-50 text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm">
                Register Now
                <ArrowRight size={14} />
              </button>
              <span className="text-xs text-white/60">
                Only <strong className="text-white">{heroEvent.spotsLeft} spots</strong> left!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard
            key={s.id}
            icon={STAT_ICONS[i]}
            label={s.label}
            value={s.value}
            change={s.change}
            color={s.color}
          />
        ))}
      </div>

      {/* ── Main content: Events + Sidebar ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Upcoming Events (takes 2/3 width on xl) */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-gray-900 text-lg">Upcoming Events</h2>
            <button className="text-xs text-brand-500 hover:text-brand-700 font-semibold flex items-center gap-1">
              View all <ArrowRight size={13} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Right column: Quick Actions + Recent Activity */}
        <div className="space-y-5">

          {/* Quick Actions */}
          <div>
            <h2 className="font-display font-bold text-gray-900 text-lg mb-3">Quick Actions</h2>
            <div className="space-y-2.5">
              <QuickAction icon={Search} label="Browse Events" sub="Explore 58 events" color="brand" />
              <QuickAction icon={CalendarDays} label="View Calendar" sub="Sep 2024 schedule" color="violet" />
              <QuickAction icon={BookMarked} label="My Registrations" sub="4 active, 8 past" color="green" />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-card p-5">
            <h2 className="font-display font-bold text-gray-900 text-base mb-4">Recent Activity</h2>
            <ul className="space-y-3.5">
              {recentActivity.map(item => (
                <li key={item.id} className="flex items-start gap-3">
                  <ActivityIcon type={item.type} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">
                      {item.action}{' '}
                      <span className="font-semibold text-gray-800">{item.subject}</span>
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="mt-4 w-full text-xs text-brand-500 hover:text-brand-700 font-semibold text-center py-2 rounded-xl hover:bg-brand-50 transition-colors">
              View all activity
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

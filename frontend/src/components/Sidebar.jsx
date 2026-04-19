import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Search, BookMarked, CalendarDays,
  UserCircle, Zap, Bell, X,
} from 'lucide-react'
const notifications = [];

const unread = notifications.filter(n => !n.read).length


const NAV_ITEMS = [
  { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/student/browse', icon: Search, label: 'Browse Events' },
  { to: '/student/registrations', icon: BookMarked, label: 'My Registrations' },
  { to: '/student/calendar', icon: CalendarDays, label: 'Calendar' },
  { to: '/student/notifications', icon: Bell, label: 'Notifications', badge: unread },
  { to: '/student/profile', icon: UserCircle, label: 'Profile' },
]


export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-60 bg-white shadow-sidebar z-30
          flex flex-col transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-hero-gradient flex items-center justify-center">
              <Zap size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold text-gray-900 text-lg tracking-tight">EventSys</span>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-gray-600" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto scrollbar-hide">
          <p className="px-3 pt-2 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400">Menu</p>
          {NAV_ITEMS.map(({ to, icon: Icon, label, badge }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                ${isActive ? 'bg-brand-50 text-brand-600 font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={17} strokeWidth={isActive ? 2.5 : 1.8} className={isActive ? 'text-brand-500' : 'text-gray-400'} />
                  <span className="flex-1">{label}</span>
                  {badge > 0 && (
                    <span className="bg-brand-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none py-1">
                      {badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 bg-surface-muted rounded-xl px-3 py-2.5">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pallavi&backgroundColor=b6e3f4"
              alt="avatar"
              className="w-8 h-8 rounded-full bg-brand-100"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">Pallavi Singh</p>
              <p className="text-[10px] text-gray-400 truncate">Computer Science · Year 3</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

import { Bell, Menu, Search, Settings } from 'lucide-react'
import { useState } from 'react'

export default function TopNavbar({ onMenuClick }) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center gap-4">
      {/* Mobile menu button */}
      <button
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        onClick={onMenuClick}
      >
        <Menu size={20} />
      </button>

      {/* Search bar */}
      <div
        className={`flex items-center gap-2 bg-surface-muted rounded-xl px-3 py-2 flex-1 max-w-sm transition-all duration-200
          ${searchFocused ? 'ring-2 ring-brand-200 bg-white' : ''}`}
      >
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search events, clubs…"
          className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Notification bell */}
        <button className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Settings */}
        <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
          <Settings size={18} />
        </button>

        {/* Avatar */}
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pallavi&backgroundColor=b6e3f4"
          alt="avatar"
          className="w-8 h-8 rounded-full bg-brand-100 cursor-pointer"
        />
      </div>
    </header>
  )
}

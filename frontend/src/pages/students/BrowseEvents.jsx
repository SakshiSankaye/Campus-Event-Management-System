
import { Search, SlidersHorizontal, Calendar, MapPin, Users, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

const CATEGORIES = ['All', 'Technology', 'Design', 'Career', 'Music', 'Workshop']

const TAG_COLORS = {
  Tech: 'bg-brand-100 text-brand-700',
  Workshop: 'bg-violet-100 text-violet-700',
  Music: 'bg-pink-100 text-pink-700',
  Design: 'bg-amber-100 text-amber-700',
  Career: 'bg-emerald-100 text-emerald-700',
}

const STATUS_BADGE = {
  open: 'bg-emerald-100 text-emerald-700',
  registered: 'bg-brand-100 text-brand-700',
  waitlist: 'bg-amber-100 text-amber-700',
}

const STATUS_LABEL = {
  open: 'Open',
  registered: 'Registered',
  waitlist: 'Waitlisted',
}

export default function BrowseEvents() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCat] = useState('All')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [page, setPage] = useState(1)
  const PER_PAGE = 6



  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/api/events");
        setEvents(res.data.length ? res.data : [
          {
            id: 1,
            title: "Tech Fest",
            description: "Exciting tech event",
            date: "2026-05-10",
            location: "Auditorium",
            attendees: 120,
            price: "Free",
            status: "open",
            tag: "Tech"
          }
        ]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);
  const filtered = events.filter(e => {
    const matchSearch =
      (e.title?.toLowerCase().includes(search.toLowerCase()) || "") ||
      (e.location?.toLowerCase().includes(search.toLowerCase()) || "");
    const matchCat =
      activeCategory === 'All' || e.tag === activeCategory;

    return matchSearch && matchCat;
  });
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-2xl text-gray-900">Discover Experiences</h1>
        <p className="text-sm text-gray-400 mt-1">Explore all events happening on your campus</p>
      </div>

      {/* Search + Filter bar */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white shadow-card rounded-xl px-4 py-2.5 flex-1 min-w-[200px]">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search events, venues…"
            className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium shadow-card transition-colors
            ${filtersOpen ? 'bg-brand-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCat(cat); setPage(1) }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150
              ${activeCategory === cat
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white text-gray-500 shadow-card hover:bg-gray-50'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-gray-400">
        Showing <span className="font-semibold text-gray-600">{filtered.length}</span> events
        {activeCategory !== 'All' && <> in <span className="font-semibold text-gray-600">{activeCategory}</span></>}
      </p>

      {/* Event grid */}
      {paginated.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <Search size={36} className="mx-auto mb-3 opacity-30" />
          <p className="font-semibold">No events found</p>
          <p className="text-xs mt-1">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginated.map(event => (
            <BrowseEventCard key={event.id} event={event} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-xl bg-white shadow-card text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-xl text-xs font-bold transition-all
                ${p === page ? 'bg-brand-500 text-white shadow-sm' : 'bg-white text-gray-500 shadow-card hover:bg-gray-50'}`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-xl bg-white shadow-card text-gray-500 hover:bg-gray-50 disabled:opacity-30 transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}


function BrowseEventCard({ event }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 group flex flex-col">
      <div className="relative h-44 overflow-hidden">
        <img src={event.image || 'https://via.placeholder.com/400x200?text=Event'} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${TAG_COLORS[event.tag] ?? 'bg-gray-100 text-gray-600'}`}>
          {event.tag}
        </span>
        <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_BADGE[event.status]}`}>
          {STATUS_LABEL[event.status]}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-xs text-gray-400 line-clamp-2 mb-3">{event.description}</p>
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400"><Calendar size={11} />{event.date}</div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400"><MapPin size={11} />{event.location}</div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400"><Users size={11} />{event.attendees} registered · {event.price}</div>
        </div>
        <button
          onClick={() => navigate(`/student/event/${event.id}`)}
          className="mt-auto w-full bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  )
}

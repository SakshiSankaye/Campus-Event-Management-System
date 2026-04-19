import { useState } from 'react'
import { ChevronLeft, ChevronRight, CalendarDays, Plus } from 'lucide-react'
const calendarEvents = [];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const DOT_COLORS = {
  brand: { dot: 'bg-brand-500', pill: 'bg-brand-100 text-brand-700', border: 'border-brand-200' },
  violet: { dot: 'bg-violet-500', pill: 'bg-violet-100 text-violet-700', border: 'border-violet-200' },
  amber: { dot: 'bg-amber-500', pill: 'bg-amber-100 text-amber-700', border: 'border-amber-200' },
  green: { dot: 'bg-emerald-500', pill: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-200' },
  pink: { dot: 'bg-pink-500', pill: 'bg-pink-100 text-pink-700', border: 'border-pink-200' },
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

export default function CalendarView() {
  const [current, setCurrent] = useState({ year: 2024, month: 8 }) // Sep 2024
  const [selected, setSelected] = useState(null)

  const { year, month } = current
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const today = new Date()

  const eventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return calendarEvents.filter(e => e.date === dateStr)
  }

  const selectedEvents = selected ? eventsForDay(selected) : []

  const prev = () => setCurrent(c => c.month === 0
    ? { year: c.year - 1, month: 11 }
    : { ...c, month: c.month - 1 })

  const next = () => setCurrent(c => c.month === 11
    ? { year: c.year + 1, month: 0 }
    : { ...c, month: c.month + 1 })

  // build grid cells
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const isToday = (d) => d && today.getFullYear() === year && today.getMonth() === month && today.getDate() === d

  return (
    <div className="max-w-screen-xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-900">Calendar</h1>
          <p className="text-sm text-gray-400 mt-1">Your event schedule at a glance</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors">
          <Plus size={15} />
          Add to Calendar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Calendar grid (2/3 width) */}
        <div className="lg:col-span-2 bg-white shadow-card rounded-2xl p-6">

          {/* Month navigation */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-lg text-gray-900">
              {MONTHS[month]} {year}
            </h2>
            <div className="flex gap-2">
              <button onClick={prev} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setCurrent({ year: 2024, month: 8 })} className="px-3 py-1.5 text-xs font-semibold text-brand-600 bg-brand-50 rounded-lg hover:bg-brand-100 transition-colors">
                Today
              </button>
              <button onClick={next} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_OF_WEEK.map(d => (
              <div key={d} className="text-center text-[10px] font-bold uppercase tracking-wide text-gray-400 py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              const events = day ? eventsForDay(day) : []
              const isTodays = isToday(day)
              const isSel = selected === day && day

              return (
                <div
                  key={idx}
                  onClick={() => day && setSelected(isSel ? null : day)}
                  className={`relative rounded-xl p-1.5 min-h-[64px] cursor-pointer transition-all duration-150
                    ${!day ? 'cursor-default' : 'hover:bg-gray-50'}
                    ${isSel ? 'bg-brand-50 ring-2 ring-brand-300' : ''}
                  `}
                >
                  {day && (
                    <>
                      <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-semibold mx-auto mb-1
                        ${isTodays ? 'bg-brand-500 text-white' : 'text-gray-700'}`}>
                        {day}
                      </span>
                      <div className="space-y-0.5">
                        {events.slice(0, 2).map(ev => {
                          const c = DOT_COLORS[ev.color] ?? DOT_COLORS.brand
                          return (
                            <div key={ev.id} className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md truncate ${c.pill}`}>
                              {ev.title}
                            </div>
                          )
                        })}
                        {events.length > 2 && (
                          <div className="text-[9px] text-gray-400 pl-1">+{events.length - 2} more</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Sidebar: selected day / all events */}
        <div className="space-y-4">

          {/* Selected day events */}
          {selected && (
            <div className="bg-white shadow-card rounded-2xl p-5">
              <h3 className="font-display font-bold text-base text-gray-900 mb-3">
                {MONTHS[month]} {selected}
              </h3>
              {selectedEvents.length === 0 ? (
                <p className="text-xs text-gray-400">No events on this day</p>
              ) : (
                <ul className="space-y-2.5">
                  {selectedEvents.map(ev => {
                    const c = DOT_COLORS[ev.color] ?? DOT_COLORS.brand
                    return (
                      <li key={ev.id} className={`flex items-center gap-3 border rounded-xl px-3 py-2.5 ${c.border} bg-white`}>
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${c.dot}`} />
                        <div>
                          <p className="text-xs font-semibold text-gray-800">{ev.title}</p>
                          <p className="text-[10px] text-gray-400">{ev.time}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )}

          {/* All events this month */}
          <div className="bg-white shadow-card rounded-2xl p-5">
            <h3 className="font-display font-bold text-base text-gray-900 mb-3 flex items-center gap-2">
              <CalendarDays size={16} className="text-brand-500" />
              This Month
            </h3>
            {calendarEvents.length === 0 ? (
              <p className="text-xs text-gray-400">No events this month</p>
            ) : (
              <ul className="space-y-3">
                {calendarEvents.map(ev => {
                  const c = DOT_COLORS[ev.color] ?? DOT_COLORS.brand
                  const day = parseInt(ev.date.split('-')[2])
                  return (
                    <li
                      key={ev.id}
                      onClick={() => setSelected(day)}
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-xl px-2 py-1.5 -mx-2 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${c.pill}`}>
                        {day}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800 truncate">{ev.title}</p>
                        <p className="text-[10px] text-gray-400">{ev.time}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full shrink-0 ${c.dot}`} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

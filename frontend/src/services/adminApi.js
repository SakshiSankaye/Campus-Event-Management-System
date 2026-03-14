import API from "./api"

/* ---------------- DASHBOARD STATS ---------------- */

export const getStats = async () => {
  try {
    const res = await API.get("/admin/stats")
    return res.data
  } catch (error) {
    console.error("Error fetching stats:", error)
    return {
      users: 0,
      events: 0,
      registrations: 0
    }
  }
}

/* ---------------- USERS ---------------- */

export const getUsers = async () => {
  try {
    const res = await API.get("/users")
    return res.data
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

/* ---------------- EVENTS ---------------- */

export const getEvents = async () => {
  try {
    const res = await API.get("/events")
    return res.data
  } catch (error) {
    console.error("Error fetching events:", error)
    return []
  }
}

/* ---------------- CREATE EVENT ---------------- */

export const createEvent = async (eventData) => {
  try {
    const res = await API.post("/events", eventData)
    return res.data
  } catch (error) {
    console.error("Error creating event:", error)
    return null
  }
}

/* ---------------- DELETE EVENT ---------------- */

export const deleteEvent = async (id) => {
  try {
    const res = await API.delete(`/events/${id}`)
    return res.data
  } catch (error) {
    console.error("Error deleting event:", error)
    return null
  }
}

/* ---------------- UPDATE EVENT ---------------- */

export const updateEvent = async (id, eventData) => {
  try {
    const res = await API.put(`/events/${id}`, eventData)
    return res.data
  } catch (error) {
    console.error("Error updating event:", error)
    return null
  }
}
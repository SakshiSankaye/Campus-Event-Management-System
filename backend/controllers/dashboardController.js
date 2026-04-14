const Event = require("../models/Event");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();

    const totalParticipants = await User.countDocuments({
      role: "student"
    });

    const upcomingEvents = await Event.countDocuments({
      date: { $gte: new Date() }
    });

    const latestEvents = await Event.find()
      .sort({ createdAt: -1 })
      .limit(4);

    const activities = latestEvents.map((event) => ({
      title: `New event created: ${event.title}`,
      desc: `Venue: ${event.venue || "Main Hall"}`,
      tag: "Event"
    }));

    res.json({
      totalEvents,
      totalParticipants,
      upcomingEvents,
      activities
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats }; 
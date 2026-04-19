const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
    try {
        const event = new Event({
            ...req.body,
            organizerId: req.user.id,
            status: "pending"
        });

        await event.save();

        res.status(201).json({
            message: "Event created, waiting for admin approval",
            event
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.approveEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        event.status = "approved";
        await event.save();

        res.json({ message: "Event approved" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.rejectEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        event.status = "rejected";
        await event.save();

        res.json({ message: "Event rejected" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getApprovedEvents = async (req, res) => {
    try {
        const events = await Event.find({ status: "approved" });

        res.json(events);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.registerEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        event.participants.push({
            userId: req.user.id,
            name: req.user.name,
            email: req.user.email
        });

        await event.save();

        res.json({ message: "Registered successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getParticipants = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        res.json(event.participants);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getAllEventsReport = async (req, res) => {
    try {
        const events = await Event.find();

        const report = events.map(event => ({
            title: event.title,
            status: event.status,
            totalParticipants: event.participants.length
        }));

        res.json(report);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
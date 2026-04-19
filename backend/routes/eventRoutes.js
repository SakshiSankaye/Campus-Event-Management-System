const express = require("express");
const router = express.Router();

const {
    createEvent,
    approveEvent,
    rejectEvent,
    getApprovedEvents,
    registerEvent,
    getParticipants,
    getAllEventsReport
} = require("../controllers/eventController");

const auth = require("../middleware/authMiddleware");

// Organizer
router.post("/create", auth, createEvent);

// Admin
router.put("/approve/:id", auth, approveEvent);
router.put("/reject/:id", auth, rejectEvent);

// Student
router.get("/approved", getApprovedEvents);
router.post("/register/:id", auth, registerEvent);

// Organizer/Admin
router.get("/participants/:id", auth, getParticipants);

// Admin report
router.get("/report", auth, getAllEventsReport);

module.exports = router;
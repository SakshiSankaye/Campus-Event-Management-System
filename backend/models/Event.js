const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    time: String,
    venue: String,
    organizerId: String,

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    participants: [
        {
            userId: String,
            name: String,
            email: String
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
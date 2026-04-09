const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["student","organizer","admin"],
    default: "student"
  },

  // ⭐ ADD THESE TWO LINES
  resetToken: String,
  resetTokenExpire: Date,
  profilePic: String
})

module.exports = mongoose.model("User", UserSchema)
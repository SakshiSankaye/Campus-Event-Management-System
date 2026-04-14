const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/userRoutes")
const eventRoutes = require("./routes/eventRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express() // dont change other sections just update required for now

// ================= MIDDLEWARE =================

app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))
app.use("/api/dashboard", dashboardRoutes);
// ================= DATABASE =================

mongoose.connect("mongodb://127.0.0.1:27017/campus_events", {

})
.then(() => {
  console.log("MongoDB Connected")
})
.catch((err) => {
  console.log(err)
})

// ================= ROUTES =================

app.use("/api/auth", authRoutes)

app.use("/api/users", userRoutes)

app.use("/api/events", eventRoutes) 

// Test route
app.get("/", (req, res) => {
  res.send("Backend Running")
})

// ================= SERVER =================

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
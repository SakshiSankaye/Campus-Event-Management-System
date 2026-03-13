const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRoutes = require("./routes/auth")

const app = express()

// ================= MIDDLEWARE =================

app.use(cors())
app.use(express.json())

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

// Test route
app.get("/", (req, res) => {
  res.send("Backend Running")
})

// ================= SERVER =================

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
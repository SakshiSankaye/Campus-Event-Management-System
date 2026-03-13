const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRoutes = require("./routes/auth")

const app = express()

app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/campus_events")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

// Routes
app.use("/api/auth", authRoutes)

// Test route
app.get("/",(req,res)=>{
res.send("Backend Running")
})

app.listen(5000, ()=>{
console.log("Server running on port 5000")
})
const express = require("express")
const router = express.Router()
const Event = require("../models/Event")

// CREATE EVENT

router.post("/",async(req,res)=>{

const event = new Event(req.body)

await event.save()

res.json(event)

})

// GET EVENTS

router.get("/",async(req,res)=>{

const events = await Event.find()

res.json(events)

})

// UPDATE EVENT

router.put("/:id",async(req,res)=>{

const updatedEvent = await Event.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)

res.json(updatedEvent)

})

// DELETE EVENT

router.delete("/:id",async(req,res)=>{

await Event.findByIdAndDelete(req.params.id)

res.json({message:"Event deleted"})

})

// MARK ATTENDANCE
router.post("/:id/attendance", async(req,res)=>{

const {name,email} = req.body

const event = await Event.findById(req.params.id)

event.attendance.push({name,email})

await event.save()

res.json({message:"Attendance marked"})
})

module.exports = router
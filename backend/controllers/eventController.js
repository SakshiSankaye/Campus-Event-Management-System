const Event = require("../models/Event")

exports.createEvent = async(req,res)=>{

try{

const event = new Event(req.body)

await event.save()

res.json(event)

}catch(err){

res.status(500).json(err)

}

}

exports.getEvents = async(req,res)=>{

try{

const events = await Event.find()

res.json(events)

}catch(err){

res.status(500).json(err)

}

}
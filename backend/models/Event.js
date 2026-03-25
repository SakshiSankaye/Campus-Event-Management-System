const mongoose = require("mongoose")

const EventSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

description:{
type:String
},

date:{
type:String,
required:true
},

createdBy:{
type:String
},

// ⭐ ADD THIS (Participants)
registeredUsers:[
{
name:{
type:String
}
}
]

})

module.exports = mongoose.model("Event",EventSchema)
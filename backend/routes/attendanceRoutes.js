const express = require("express")
const router = express.Router()

router.post("/",(req,res)=>{

const {eventId} = req.body

res.json({message:"Attendance marked for "+eventId})

})

module.exports = router
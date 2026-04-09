const express = require("express")
const router = express.Router()

const User = require("../models/User")

router.get("/", async (req,res)=>{

const users = await User.find()

res.json(users)

})
router.get("/profile/:id", async(req,res)=>{
try{

const user = await User.findById(req.params.id)

res.json(user)

}catch(err){
res.status(500).json({message:"Error"})
}
})
router.put("/profile/:id", async(req,res)=>{
try{

const updatedUser = await User.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)

res.json(updatedUser)

}catch(err){
res.status(500).json({message:"Update failed"})
}
})
module.exports = router
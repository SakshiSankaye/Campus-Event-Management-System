const express = require("express")
const router = express.Router()

const User = require("../models/User")
const bcrypt = require("bcryptjs")

// SIGNUP
router.post("/signup", async (req,res)=>{

try{

const {name,email,password,role} = req.body

const existingUser = await User.findOne({email})

if(existingUser){
return res.status(400).json({message:"User already exists"})
}

const hashedPassword = await bcrypt.hash(password,10)

const user = new User({
name,
email,
password:hashedPassword,
role
})

await user.save()

res.json({message:"Signup successful"})

}
catch(err){
res.status(500).json(err)
}

})


// LOGIN
router.post("/login", async (req,res)=>{

try{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){
return res.status(400).json({message:"User not found"})
}

const isMatch = await bcrypt.compare(password,user.password)

if(!isMatch){
return res.status(400).json({message:"Invalid credentials"})
}

res.json({
message:"Login successful",
user:{
id:user._id,
role:user.role
}
})

}
catch(err){
res.status(500).json(err)
}

})

module.exports = router
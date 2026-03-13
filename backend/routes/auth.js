const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/signup",async(req,res)=>{

const {name,email,password,role} = req.body

const hash = await bcrypt.hash(password,10)

const user = new User({
name,
email,
password:hash,
role
})

await user.save()

res.json({message:"Signup success"})

})

router.post("/login",async(req,res)=>{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user) return res.status(400).json({msg:"User not found"})

const valid = await bcrypt.compare(password,user.password)

if(!valid) return res.status(400).json({msg:"Wrong password"})

const token = jwt.sign({id:user._id,role:user.role},"secret")

res.json({token,role:user.role})

})

module.exports = router
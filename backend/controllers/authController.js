const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.signup = async(req,res)=>{

try{

const {name,email,password,role} = req.body

const existingUser = await User.findOne({email})

if(existingUser){
return res.status(400).json({message:"User already exists"})
}

const hashed = await bcrypt.hash(password,10)

const user = new User({
name,
email,
password:hashed,
role
})

await user.save()

res.json({message:"Signup successful"})

}catch(err){

res.status(500).json(err)

}

}

exports.login = async(req,res)=>{

try{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){
return res.status(400).json({message:"User not found"})
}

const match = await bcrypt.compare(password,user.password)

if(!match){
return res.status(400).json({message:"Invalid password"})
}

const token = jwt.sign(
{id:user._id,role:user.role},
"secret",
{expiresIn:"1d"}
)

res.json({
token,
role:user.role
})

}catch(err){

res.status(500).json(err)

}

}
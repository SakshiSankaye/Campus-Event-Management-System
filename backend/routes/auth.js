const express = require("express")
const router = express.Router()

const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const nodemailer = require("nodemailer")

const User = require("../models/User")

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {

    const { name, email, password, role } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    })

    await newUser.save()

    res.json({ message: "Signup successful" })

  } catch (error) {
    console.log("SIGNUP ERROR:", error)
    res.status(500).json({ message: "Server error" })
  }
})


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        role: user.role
      }
    })

  } catch (error) {
    console.log("LOGIN ERROR:", error)
    res.status(500).json({ message: "Server error" })
  }
})


// ================= FORGOT PASSWORD =================
router.post("/forgot-password", async (req, res) => {

  try {

    const { email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // 🔐 Generate Token
    const token = crypto.randomBytes(32).toString("hex")

    user.resetToken = token
    user.resetTokenExpire = Date.now() + 15 * 60 * 1000

    await user.save()

    const resetLink = `http://localhost:3000/reset-password/${token}`

    // 📧 EMAIL CONFIG (GMAIL)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "yourgmail@gmail.com",   // 👉 replace
        pass: "your_app_password"      // 👉 replace
      }
    })

    // 🔥 TRY EMAIL
    try {

      await transporter.sendMail({
        to: user.email,
        subject: "Password Reset",
        html: `<h3>Password Reset</h3>
               <p>Click below link:</p>
               <a href="${resetLink}">${resetLink}</a>`
      })

      res.json({ message: "Reset link sent to email" })

    } catch (emailError) {

      console.log("EMAIL FAILED → USING CONSOLE")

      // ✅ fallback (IMPORTANT)
      console.log("RESET LINK:", resetLink)

      res.json({
        message: "Email failed. Use link from server console."
      })
    }

  } catch (err) {
    console.log("FORGOT PASSWORD ERROR:", err)
    res.status(500).json({ message: "Server error" })
  }
})


// ================= RESET PASSWORD =================
router.post("/reset-password/:token", async (req, res) => {

  try {

    const { password } = req.body

    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExpire: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    user.password = hashedPassword
    user.resetToken = undefined
    user.resetTokenExpire = undefined

    await user.save()

    res.json({ message: "Password updated successfully" })

  } catch (err) {
    console.log("RESET ERROR:", err)
    res.status(500).json({ message: "Server error" })
  }
})
router.post("/change-password/:id", async(req,res)=>{

const {password} = req.body

const hashedPassword = await bcrypt.hash(password,10)

await User.findByIdAndUpdate(req.params.id,{
password: hashedPassword
})

res.json({message:"Password updated"})

})
module.exports = router
const express = require("express")
const multer = require("multer")
const cloudinary = require("../config/cloudinary")

const router = express.Router()

const upload = multer({dest:"uploads/"})

router.post("/",upload.single("image"),async(req,res)=>{

const result = await cloudinary.uploader.upload(req.file.path)

res.json({url:result.secure_url})

})

module.exports = router
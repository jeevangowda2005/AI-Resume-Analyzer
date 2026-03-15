const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/User")

const router = express.Router()

router.post("/register", async (req,res)=>{

 const {email,password} = req.body

 const hashed = await bcrypt.hash(password,10)

 const user = new User({email,password:hashed})

 await user.save()

 res.json("User registered")

})

router.post("/login", async (req,res)=>{

 const {email,password} = req.body

 const user = await User.findOne({email})

 const valid = await bcrypt.compare(password,user.password)

 if(!valid) return res.status(401).json("Invalid login")

 const token = jwt.sign(
   {id:user._id},
   process.env.JWT_SECRET
 )

 res.json({token})

})

module.exports = router
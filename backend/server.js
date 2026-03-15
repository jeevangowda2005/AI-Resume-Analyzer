const express = require("express")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/db")

const analyzeRoutes = require("./routes/analyzeRoutes")
const authRoutes = require("./routes/authRoutes");
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/analyze",analyzeRoutes)
app.use("/auth", authRoutes)

app.listen(5050,()=>{

 console.log("Server running")

})
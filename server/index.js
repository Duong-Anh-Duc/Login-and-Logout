const express = require("express")
require("dotenv").config()
const cors = require("cors")
const { connectDB } = require("./config/db")
const app = express()
connectDB()
app.use(express.json())
app.use("/", require("./routes/authRoutes"))
const port = 4000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
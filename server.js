require("dotenv").config()
require('./models')
const mongoose = require('mongoose')
const express = require("express"),
    cors = require("cors"),
    bcrypt = require("bcrypt")

const app = express()
const PORT = process.env.PORT || 8000
app.use(cors())
app.use(express.json())

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
      } catch (error) {
        console.log(error);
        process.exit(1);
      }
    }

app.get('/', (req, res) => {
    try {
        res.status(200).json({ msg: "Backend Online" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Server encountered an error" })
    }
})

app.use("/api-v1/user", require("./controllers/api-v1/user"))
app.use("/api-v1/couple", require("./controllers/api-v1/couple"))
app.use("/api-v1/question", require("./controllers/api-v1/question"))
app.use("/api-v1/goal", require("./controllers/api-v1/goal"))
app.use("/api-v1/photo", require("./controllers/api-v1/photo"))

// Listening on port 
//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})
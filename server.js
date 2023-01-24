require("dotenv").config()
require('./models')
const express = require("express"),
    cors = require("cors"),
    bcrypt = require("bcrypt")

const app = express()
const PORT = process.env.PORT || 8000
app.use(cors())
app.use(express.json())

// example middleware
// const myMiddleware = ( req, res, next ) => {
//     console.log('hello i am a middleware')
//     res.locals.myData = 'I am data that is passed out of the middleware'
//     next()
// }

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
app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`)
})
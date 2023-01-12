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

// Listening on port 
app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`)
})
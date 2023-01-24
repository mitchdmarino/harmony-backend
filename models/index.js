require('dotenv').config()

// const mongoose = require('mongoose')

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/harmony'

// mongoose.connect(MONGODB_URI)

// const db = mongoose.connection

// db.once('open', () => {
//     console.log(`connected to MongoDB @ ${db.host}: ${db.port}`)
// })

// db.on('error', err => {
//     console.error('We have a database problem 😓', err)
// })

module.exports = {
    // Export DB models.
    User: require('./user'),
    Couple: require('./couple'),
    Photo: require('./photo'),
    Goal: require('./goal'),
    Question: require('./question'),
    Conflict: require('./conflict'),
    GoalStep: require('./goalstep')
}
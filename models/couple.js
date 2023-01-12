const mongoose = require("mongoose")
const Schema = mongoose.Schema


const CoupleSchema = new Schema ({    
    users: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    photos: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Photo'
        }
    ],
    questions: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Question'
        }
    ], 
    goals: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Goal'
        }
    ],
    conflicts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Conflict'
        }
    ]    
})

const Couple = mongoose.model('Couple', CoupleSchema);

module.exports = Couple;




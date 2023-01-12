const mongoose = require("mongoose")
const Schema = mongoose.Schema


const ConflictSchema = new Schema ({    
    desciption: {
        type: String,
        required: true,
    },
    couple: 
    {
        type: mongoose.Types.ObjectId,
        ref: 'Couple'
    },
    initiator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Conflict = mongoose.model('Conflict', ConflictSchema);

module.exports = Conflict;
const mongoose = require("mongoose")
const Schema = mongoose.Schema


const GoalSchema = new Schema ({    
    title: {
        type: String,
        required: true,
    },
    steps: [
        {
            description: String,
            completed: Boolean,
        }
    ],
    couple: 
    {
        type: mongoose.Types.ObjectId,
        ref: 'Couple'
    },
})

const Goal = mongoose.model('Goal', GoalSchema);

module.exports = Goal;
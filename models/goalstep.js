const mongoose = require("mongoose")
const Schema = mongoose.Schema


const GoalStepSchema = new Schema ({    
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false,
    },
    goal: {
        type: mongoose.Types.ObjectId,
        ref: 'goal'
    }
})

const GoalStep = mongoose.model('GoalStep', GoalStepSchema);

module.exports = GoalStep;
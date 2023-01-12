const mongoose = require("mongoose")
const Schema = mongoose.Schema


const QuestionSchema = new Schema ({    
    question: {
        type: String,
        required: true,
    },
    // one answer for each partner
    answers: [
        {
            text: {
                type: String,
            },
            author: {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    couple: 
    {
        type: mongoose.Types.ObjectId,
        ref: 'Couple'
    },
})

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
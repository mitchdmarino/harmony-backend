const router = require("express").Router();
const db = require("../../models");
const verifyUser = require("./verifyUser");


// POST /question

router.post("/", verifyUser, async (req, res) => {
    try {
        const user = res.locals.user
        const couple = await db.Couple.findById(res.locals.user.coupleId).populate("questions")
        if (couple) {
            const newQuestion = await db.Question.create({
                question: req.body.question,
                couple: user.coupleId
            })
            await newQuestion.save()
            couple.questions.push(newQuestion) 
            await couple.save()
            return res.status(201).json({msg: "New Question successfully created", couple: couple})
        }
        else {
            return res.status(401).json({msg: "You must create or join a couple first"})
        }
    } catch (error) {
        console.warn(error)
        return res.status(500).json({msg: "Server Error"})
    }
})

router.post("/:id/answer", verifyUser, async (req,res) => {
    try {
        const question = await db.Question.findById(req.params.id)
        // ensure that the user belongs to the same couple in the question 
        const user = res.locals.user 
        if (user.coupleId !== question.couple) {
            return res.status(400).json({msg: "You do not have permission to answer this question"})
        }
        else if (question.answers.length === 2) {
            return res.status(400).json({msg: "Question already answered"})
        } 
        else if (question.answers.length === 1) {
            // check if user already answered
            if (question.answers[0].author === user.id) {
                return res.status(400).json({msg: "You already answered this question"})
            }
            else {
                question.answers.push(req.body)
            }
        }
        else {
            question.answers.push(req.body)
        }
        await question.save()
       
        return res.status(200).json({msg: "You answered the question", question: question})
        
    } catch (error) {
        console.warn(error)
        return res.status(500).json({msg: "Server Error"})
    }
})

module.exports = router
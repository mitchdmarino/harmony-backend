const router = require("express").Router();
const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyUser = require("./verifyUser");

// GET /goals 

router.get('/', verifyUser, async (req,res) => {
    try {
        const user = res.locals.user 
        const goals = await db.Goal.find({couple: user.coupleId}).populate("steps")
        if (goals) {
            return res.status(200).json({msg: "Success", goals: goals})
        }
    } catch (error) {
        console.warn(error)
        return res.status(500).json({msg: "server error"})
    }
})

router.get('/:id', verifyUser, async (req,res) => {
    try {
        const goal = await db.Goal.findById(req.params.id).populate("steps")
        // verify that goal belongs to coupleId
        return res.status(200).json({msg: 'Success', goal: goal})

    } catch (error) {
        console.warn(error)
        return res.status(500).json({msg: "server error"})
    }
})

// Create a new goal 
router.post('/', verifyUser, async (req,res) => {
    try {
        const {title, steps} = req.body
        const couple = await db.Couple.findById(res.locals.user.coupleId).populate('goals').populate('goals.steps')
        const newGoal = await db.Goal.create({
            title: title,
            couple: res.locals.user.coupleId
        })
        // for each step sent, create a new step in the database and add it to newGoal
        for await (const step of steps) {
            let newStep = await db.GoalStep.create({
                description: step.value,
                completed: false,
                goal: newGoal.id
            })
            await newStep.save()
            newGoal.steps.push(newStep)
        }
        await newGoal.save()
        couple.goals.push(newGoal)
        await couple.save()
        return res.status(201).json({msg: 'Success', goal: newGoal, couple: couple})
        
    } catch (error) {
        console.warn(error)
        return res.status(500).json({msg: "server error"})
    }
})

// Complete a goal step // needs work
router.post('/:goalId/step/:stepId', verifyUser, async (req,res) => {
    try {
        const step = await db.GoalStep.findById(req.params.stepId)
        step.completed = true
        await step.save()
        const goal = await db.Goal.findById(req.params.goalId).populate("steps")
        return res.status(200).json({msg: "Success", goal: goal})
    } catch (error) {
        console.warn(error)
        return res.status(500).json({msg: "server error"})
    }
})

module.exports = router 
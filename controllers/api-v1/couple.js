const router = require("express").Router();
const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyUser = require("./verifyUser");

// POST /couple (one user of a couple will choose this option to create the couple data entry)
router.post("/", verifyUser, async (req, res) => {
    try {
        const user = res.locals.user
        // make sure the user does not have a couple assigned
        if (user.coupleId) {
            return res.status(400).json({msg: "Cannot be assigned to more than 1 couple"})
        }
        // create a new couple entry
        const couple = await db.Couple.create(req.body)
        // add the current user to the couple
        couple.users.push(user)
        user.coupleId = couple.id
        await couple.save()
        await user.save()
        // log the updated user in
        const payload = {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            id: user.id,
            coupleId: user.coupleId
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
          })

        res.status(201).json({msg: "New couple successfully created", couple: couple, user: user, token: token})
    } catch (error) {
        console.warn(error)
        res.status(500).json({msg: "Server Error"})
    }
})

// POST /couple/:id/partner to add the second partner
router.post("/:id/partner", verifyUser, async (req,res) => {
    try {
        const user = res.locals.user
        console.log(req.params.id)
        // make sure the user does not have a couple assigned
        if (user.coupleId) {
            return res.status(400).json({msg: "Cannot be assigned to more than 1 couple"})
        }
        const couple = await db.Couple.findById(req.params.id)
        if (!couple) {
            return res.status(400).json({msg: "Invalid couple ID. Did you mean to create a new couple?"})
        }
        if (couple.users.length >= 2) {
            return res.status(400).json({msg: "Uh oh, this couple already has 2 members."})
        }
        if (couple.users[0].id === user.id) {
            return res.status(400).json({msg: "You cannot add yourself to a couple twice"})
        }
        couple.users.push(user)
        user.coupleId = couple.id
        await couple.save()
        await user.save()
         // log the updated user in
         const payload = {
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            id: user.id,
            coupleId: user.coupleId
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
          })
        return res.status(200).json({msg: "Success", couple: couple, user: user, token: token})
    } catch (error) {
        console.warn(error)
        res.status(500).json({msg: "Server Error"})
    }
}) 

router.get("/", verifyUser, async (req, res) => {
    try {
        const user = res.locals.user
        if (!user.coupleId) {
            return res.status(400).json({msg: "No couple found"})
        }
        const couple = await db.Couple.findById(user.coupleId).populate('users')
        if (!couple) {
            return res.status(400).json({msg: "Couple not found"})
        }
        res.status(200).json({msg: "Success", couple: couple})
    } catch(error) {
        console.warn(error)
        res.status(500).json({msg: "Server Error"})
    }
})

module.exports = router

const router = require("express").Router();
const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyUser = require("./verifyUser");

// POST /user/signup
router.post("/signup", async (req, res) => {
    try {
        const foundUser = await db.User.findOne({
            email: req.body.email
        }) 
        if (foundUser) {
            return res.status(400).json({msg: "That email already has an associated User."})
        }
        // Hash the User password
        const hashedPassword = await bcrypt.hash(req.body.password, 12)

        const newUser = await db.User.create({
            fname: req.body.fname,
            lname: req.body.lname, 
            email: req.body.email,
            password: hashedPassword
        })
        await newUser.save();
        const payload = {
            fname: newUser.fname,
            lname: newUser.lname,
            email: newUser.email,
            id: newUser.id,
            coupleId: newUser.coupleId, 
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        res.status(201).json({token})
    } catch (error) {
        console.warn(error)
        if (error.name === "ValidationError") {
            return res.status(400).json({msg: error.message})
        } else {
            return res.status(500).json({msg: "Server Error"})
        }
    }
})

// POST /user/login -- Validate the login credentials.
router.post("/login", async (req, res) => {
    try {
      // The User is searched for in the DB.
      const findUser = await db.User.findOne({
        email: req.body.email,
      });
  
      // If the User is not found, a status of 400 is sent.
      // The User is sent an error message.
      if (!findUser) {
        return res.status(400).json({ msg: "Invalid login credentials" });
      }
      // The supplied password is checked to see if it matched the password in the DB.
      const passwordCheck = await bcrypt.compare(
        req.body.password,
        findUser.password
      )
      // If they don't match, return and let the User know that login has failed.
      if (!passwordCheck) {
        return res.status(400).json({ msg: "Invalid login credentials " });
      }
      // A jwt payload is created.
      const payload = {
        fname: findUser.fname,
        lname: findUser.lname,
        email: findUser.email,
        id: findUser.id,
        coupleId: findUser.coupleId, 
        color: findUser.color,
        profilePicture: findUser.profilePicture
    }
      // The jwt is signed and sent back.
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      })
      res.status(200).json({ token })
    } catch (err) {
      console.log(err)
    }
  })

  router.get("/", verifyUser, async(req,res) => {
    try {
        const user = await db.User.findById(res.locals.user.id)
        return res.status(200).json({msg: "Success", user: user})
    } catch (error) {
        console.warn(error)
        return res.status(500).json({msg: "Cannot GET user"})
    }
  })
  router.put("/", verifyUser, async (req,res) => {
    try {
        const user = await db.User.findByIdAndUpdate(res.locals.user.id, {
          fname : req.body.fname,
          lname : req.body.lname,
          email : req.body.email,
          color : req.body.color,
          profilePicture : req.body.profilePicture,
        })
        await user.save()
        return res.status(200).json({msg: "Success", user: user})
    } catch (error) {
        console.warn(error)
        return res.status(500).json({msg: "Cannot GET user"})
    }
  })

  router.delete('/', verifyUser, async(req,res) => {
    try {
        await db.User.findByIdAndDelete(res.locals.user.id)
        return res.status(200).json({msg: "Success. User deleted"})
    } catch (error) {
        console.warn(error)
        return res.status(500).json({msg: "Error while trying to delete user"})
    }
  })

  module.exports = router



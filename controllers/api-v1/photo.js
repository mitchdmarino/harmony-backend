const router = require("express").Router();
const db = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyUser = require("./verifyUser");
require("dotenv").config()
const cloudinary = require('cloudinary').v2




// GET SIGNATURE
router.get('/signature', verifyUser, async (req,res) => {
    try {
        const timestamp = Math.round((new Date).getTime()/1000)
        const signature = cloudinary.utils.api_sign_request({
            timestamp: timestamp,
            folder: "Harmony"
        }, process.env.CLOUDINARY_API_SECRET)
        return res.status(200).json({msg: "Success", timestamp: timestamp, signature: signature, apiKey: process.env.CLOUDINARY_API_KEY, cloudName: process.env.CLOUDINARY_API_CLOUD_NAME})
    } catch (error) {
        console.warn(error)
        return res.status(500).json({msg: "Error"})
    }
})


// GET /photos 

router.get('/:page?', verifyUser, async (req,res) => {
    try {
        const user = res.locals.user 
        let photos = await db.Photo.find({})
        photos.reverse()
        if (photos) {
            
            if (req.query.page) {
                photos = photos.slice(0+req.query.page * 10, 10+ req.query.page * 10)
                return res.status(200).json({msg: "Success", photos: photos})
            }
            return res.status(200).json({msg: "Success", photos: photos})
        }
        
    } catch (error) {
        console.warn(error)
        return res.status(500).json({msg: "server error"})
    }
})

// POST photo
router.post('/', verifyUser, async (req,res) => {
    try {
        const user = res.locals.user 
        const url = req.body.url
        const couple = await db.Couple.findById(user.coupleId).populate('photos')
        const newPhoto = await db.Photo.create({
            url: url,
            owner: couple.id
        })
        await newPhoto.save()
        couple.photos.push(newPhoto)
        await couple.save()
        return res.status(201).json({photos: couple.photos})
    } catch (error) {
        console.warn(error)
        return res.status(500).json({msg: "server error"})
    }
})

module.exports = router
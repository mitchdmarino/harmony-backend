const jwt = require('jsonwebtoken')
const db = require('../../models')

const verifyUser = async (req, res, next) => {
    try {
        // The jwt from the client is sent in the headers 
        const authHeader = req.headers.authorization
        // The jwt is decoded.
        // A catch will be thrown if the signature is invalid.
        // console.log(req.headers)    
        const decode = jwt.verify(authHeader, process.env.JWT_SECRET)
        // The User in the db that sent the jwt is found.
        const foundUser = await db.User.findById(decode._id)
        // The User is mounted on the res.locals, so the downstream route has the logged in User.        
        res.locals.user = foundUser
        
        next()

    } catch (err) {
        // This means there is a authentication error 
        console.warn(err)
        res.status(401).json({ msg: 'User authentication failed', headers: req.headers})
    }
}

module.exports = verifyUser
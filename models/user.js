const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const UserSchema = new Schema ({    
    fname: {
        type: String, 
        required: true, 
    },
    lname: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true, 
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    color: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    coupleId: {
        type: mongoose.Types.ObjectId,
        ref: 'Couple'
    }
    
})

UserSchema.path('email').validate(function (email) {
    return email.length;
}, 'Email cannot be blank');

UserSchema.path('email').validate(function (email) {
    return new Promise(resolve => {
        const User = mongoose.model('User');

        // Check only when it is a new user or when email field is modified
        if (this.isNew || this.isModified('email')) {
            User.find({ email }).exec((err, users) => resolve(!err && !users.length));
        } else resolve(true);
    });
}, 'Email `{VALUE}` already exists');

UserSchema.methods.isValidPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
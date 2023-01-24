const mongoose = require("mongoose")
const Schema = mongoose.Schema


const PhotoSchema = new Schema ({    
    url: {
        type: String,
        required: true,
    },
    owner: 
    {
        type: mongoose.Types.ObjectId,
        ref: 'Couple'
    },
    // album: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Album'
    // }
})

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
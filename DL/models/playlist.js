const mongoose = require('mongoose');
const { SchemaTypes } = mongoose
const playlistSchema = new mongoose.Schema({


    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'user'
        // type:String
    },
    title: {
        type: String,
        required: true,
        //unique for 1 user!
    },

    //,
    songs: [
        { songId: { type: String } }
    ]
})


const playlistModel = mongoose.model('playlist', playlistSchema);
module.exports = { playlistModel }


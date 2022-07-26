

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required:true
    },
    email: {//or userName
        type: String,
        unique: true
    },
        salt:{
        type: String,
        required: true,
        select: false
    },
hashedPassword:{
    type: String,
    required: true,
    select: false
},
    // password: {
    //     type: String,
    //     required: true,
    //     select: false
    // },
    createDate: {
        type: Date,
        default: Date.now
    },
    address: {
        street: { type: String },
        homeNum: { type: Number },
        city: { type: String },
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    lastLog: {
        type: Date,
        default: Date.now
    },
    phoneNumber:{
        type:String,
        unique:true
    },
    // token: {
    //     type: String,
    //     required: true,
    //     select: false
    // },
    isActive: {
        type: Boolean,
        default: true
    }
    // permission: {
    //     type: String,
    //     enum: ['viewer', 'editor', 'admin'],
    //     default: 'viewer'
    // }

    // playlist: [{
    //     itemId: { type: SchemaTypes.ObjectId, ref: 'item' },
    //     qty: { type: Number, required: true, default: 1 }
    // }],

})


const userModel = mongoose.model('user', userSchema);
module.exports = { userModel }
// module.exports.userModel = userModel



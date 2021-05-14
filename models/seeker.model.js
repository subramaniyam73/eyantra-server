const mongoose = require('mongoose')

// need to be tested
// while intialaizing use mongoose.Types.ObjectId('4edd40c86762e0fb12000003') if getting from req.body or as string
const ObjectId = mongoose.Schema.ObjectId

const seekerSchema = new mongoose.Schema({
    user : {
        type: ObjectId,
        required: true
    },
    isVerified : {
        type: Boolean,
        required: true,
        // default: false
    },
    stage : {
        type: Number,
        required: true
    },
    f1 : {
        type: String,
        required: true
    },
    f2 : {
        type: String,
        required: true
    },
    f3 : {
        type: String,
        required: true
    },
    f4 : {
        type: String,
        required: true
    },
    f5 : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    license : {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('seeker', seekerSchema)
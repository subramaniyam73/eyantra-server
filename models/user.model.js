const mongoose = require('mongoose')

// userType = 0 => seeker
// usertype = 1 => investor

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    session : {
        type: String,
        required: true
    },
    userType : {
        type: Number,
        required: true
    },
    eth : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('user', userSchema)
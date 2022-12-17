const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: String,
    gender: String,
    birthDay: Date,
    address: String,
    email:{
        type: String,
        required: true,
        unique: true
    },
    classAttend:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
        default: null,
    },
    grade:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade',
        default: null,
    }
})

module.exports = mongoose.model('Student', studentSchema)
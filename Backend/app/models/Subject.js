const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema({
    name: String,
    passGrade: {
        type: Number,
        default: 5
    }
})

module.exports = mongoose.model('Subject',subjectSchema)
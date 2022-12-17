const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className: {
        type: String,
        unique: true,
    },
    maxAttend:{
        type: Number,
        default: 40
    },
    studentList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }]
})

module.exports = mongoose.model('Class',classSchema)


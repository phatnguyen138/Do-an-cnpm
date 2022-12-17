const mongoose = require('mongoose')

const gradeSchema = new mongoose.Schema({
    fifteen: {
        type: Number,
        default: 0
    },
    midterm: {
        type: Number,
        default: 0
    },
    lastterm: {
        type: Number,
        default: 0
    },
    subjectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    term:{
        // True: 1, False: 2
        type: Boolean,
    },
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }
})

module.exports = mongoose.model('Grade',gradeSchema)


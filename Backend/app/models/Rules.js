const mongoose = require('mongoose')

const ruleSchema = new mongoose.Schema({
    minAge:{
        type: Number,
        default: 15
    },
    maxAge:{
        type: Number,
        default: 20
    },
})

module.exports = mongoose.model('Rule',ruleSchema)
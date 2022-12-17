const mongoose = require('mongoose')

const ruleSchema = new mongoose.Schema({
    minAge:{
        type: Number.isInteger,
        default: 15
    },
    maxAge:{
        type: Number.isInteger,
        default: 20
    }
})

module.exports = mongoose.model('Rule',ruleSchema)
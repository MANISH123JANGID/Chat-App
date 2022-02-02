const mongoose = require('mongoose')

let userMessage = mongoose.Schema({
    name:{
        type: 'string'
    },
    message: {
        type: 'string'
    }
},{
    Timestamp:true
})

module.exports =userMessage;
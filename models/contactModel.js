// Trying to use this model gives metadata error 
// in elastic storage
let mongoose = require('mongoose')

let contactSchema = mongoose.Schema({
    uuid: String,
    name: String,
    telephone: Number,
    email: String
})

module.exports = mongoose.model('contact', contactSchema)

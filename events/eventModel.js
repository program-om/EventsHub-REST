const mongoose = require('mongoose')

const Schema = mongoose.Schema
const eventSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    date: String
})
module.exports = mongoose.model('event', eventSchema, 'events')
//'events' is the name of db collection

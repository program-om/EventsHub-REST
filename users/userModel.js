const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    likedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event'}]
})
module.exports = mongoose.model('user', userSchema, 'users')//'users' is the name of db collection

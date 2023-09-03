const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    googleId: String,
    displayName: String,
    email: String,
})
const User = model('User', UserSchema)
module.exports = User
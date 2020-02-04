const mongoose = require('mongoose');
const  { Schema } = require('mongoose');

const userSchema = new Schema({
        _id: Number,
        phone: Number,
        created: Number,
        language: String,
    },
    { _id: false }
);

module.exports.User = new mongoose.model('User', userSchema);

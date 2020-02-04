const mongoose = require('mongoose');
const  { Schema } = require('mongoose');

const orderSchema = new Schema({
        user_id: Number,
        created: Number,
        model: String,
        photos: String
    },
    {}
);

module.exports.Order = new mongoose.model('Order', orderSchema);

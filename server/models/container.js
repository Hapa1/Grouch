const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const containerSchema = new Schema({
    name: String,
    type: String,
    description: String,
    address: String,
    ctype: String,
    city: String,
    level: Number,
    lat: Number,
    lng: Number,
    imgUrl: String,
    wasteLevels: [{
        type: Number
    }],
    wasteTimes: [{
        type: String
    }],
    emptyLevel: Number,
});

module.exports = mongoose.model('Container', containerSchema);


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    title: { type: String, required: true, unique: true},
    address: {type: String, required: true, unique : true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    cafeseat: {type: String},
});

module.exports = mongoose.model("location", locationSchema);
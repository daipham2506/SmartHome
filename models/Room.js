const mongoose = require("mongoose")
autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const RoomSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now,
    }
})

RoomSchema.plugin(autoIncrement.plugin, "Room")

module.exports = Room = mongoose.model("Room", RoomSchema)
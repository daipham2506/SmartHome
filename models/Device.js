const mongoose = require("mongoose")
autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const DeviceSchema = new mongoose.Schema({
	roomId: {
		type: Number,
		ref: 'Room'
	},
	value: {
		type: Number,
		required: true,
	},
	type: {
		type: String,
		required: true
	},
	timeReceive: {
		type: Date,
		default: Date.now,
	}
})

DeviceSchema.plugin(autoIncrement.plugin, "Device")

module.exports = Device = mongoose.model("Device", DeviceSchema)
const mongoose = require("mongoose")

const DeviceSchema = new mongoose.Schema({
	_id: String,
	roomId: {
		type: Number,
		ref: 'Room'
	},
	value: {
		type: Number,
		default: 0
	},
	type: {
		type: String,
		required: true
	}
})

module.exports = Device = mongoose.model("Device", DeviceSchema)
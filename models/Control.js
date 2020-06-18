const mongoose = require("mongoose")
autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const ControlSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	deviceId: {
		type: String,
		ref: 'Device',
	},
	value: {
		type: Number,
		required: true
	},
	isTurnOn: {
		type: Boolean,
		required: true
	},
	time: {
		type: String,
		required: true
	}
})

ControlSchema.plugin(autoIncrement.plugin, "Control")

module.exports = Control = mongoose.model("Control", ControlSchema)
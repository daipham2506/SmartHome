const mongoose = require("mongoose")
autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const ValueSensorSchema = new mongoose.Schema({
	deviceId: {
		type: String,
		ref: 'Device',
	},
	value: {
		type: Number,
		required: true
	},
	time: {
		type: String,
		required: true
	}
})

ValueSensorSchema.plugin(autoIncrement.plugin, "ValueSensor")

module.exports = ValueSensor = mongoose.model("ValueSensor", ValueSensorSchema)
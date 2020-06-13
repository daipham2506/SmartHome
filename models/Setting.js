const mongoose = require("mongoose")
autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

const SettingSchema = new mongoose.Schema({
	value: {
		type: Number,
		required: true,
	},
	type: {
		type: String,
		required: true
	},
	time: {
		type: Date,
		default: Date.now,
	}
})

SettingSchema.plugin(autoIncrement.plugin, "Setting")

module.exports = Setting = mongoose.model("Setting", SettingSchema)
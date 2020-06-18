const express = require("express")
const router = express.Router()
const mqtt = require('mqtt');

const auth = require('../../middleware/auth')
const Control = require("../../models/Control")
const Device = require("../../models/Device")

const client = mqtt.connect('mqtt://52.240.52.68:1883');

// @route   GET api/control/all
// @Desc    get all control
router.get('/all', async (req, res) => {
   try {
      controls = await Control.find().sort({ _id: -1 }).populate('user');
      res.json(controls);
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error")
   }
})

// @route   POST api/control
// @Access  Private
router.post('/', auth, async (req, res) => {
   const { deviceId, user, value, type, time } = req.body;
   let isTurnOn = value === 0 ? false : true;
   try {
      control = new Control({ deviceId, user, value, isTurnOn, type, time });
      await control.save()
      await Device.findById(deviceId).then(data => {
         data.value = value;
         data.save();
      })
      // Publish to server
      let topic = type === 'light' ? 'Topic/LightD' : 'Topic/Speaker';
      client.publish(topic,`[{ "device_id": "${deviceId}","values": ["1", "${value.toString()}"]}]`)

      res.status(200).json("You have setting successfully!")
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error")
   }
})

module.exports = router

const express = require("express")
const router = express.Router()
const mqtt = require('mqtt');

const auth = require('../../middleware/auth')
const Control = require("../../models/Control")
const Device = require("../../models/Device")
const User = require("../../models/User")

const sendEmail = require("../../util/sendEmail")

const client = mqtt.connect('mqtt://52.240.52.68:1883');

// @route   GET api/control/all
// @Desc    get all control
router.get('/all', async (req, res) => {
   try {
      controls = await Control.find().limit(1000).sort({ _id: -1 }).populate('user');
      res.json(controls);
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error")
   }
})

// @route   POST api/control
// @Access  Private
router.post('/', auth, async (req, res) => {
   const { deviceId, user, value, type, time, nameUser } = req.body;
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

      //send email to admin
      let users = await User.find().select('email -_id');

      sendEmail(
         users, 
         `Having a new setting on the device '${type}' (ID: ${deviceId})`,
         `Hello,
         <br>
         <b>${nameUser}</b> just changed the value of '${type}' (ID: ${deviceId}) on ${time}<br>
         The new value of the device is : <b> ${value} </b>  <br>
         <hr>
         This is an automated email, Please do not reply to this email. <br>
         Thank you.
         `
      )

      res.status(200).json("You have setting successfully!")
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error")
   }
})

module.exports = router

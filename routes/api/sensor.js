const express = require("express")
const router = express.Router()

// const auth = require('../../middleware/auth')
const ValueSensor = require("../../models/ValueSensor")

// @route   GET api/sensor/all
// @Desc    get all value sensor
router.get('/all', async (req, res) => {
   try {
      values = await ValueSensor.find().sort({ _id: -1 });
      res.json(values);
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error")
   }
})

router.get('/newest', async (req, res) => {
   try {
      values = await ValueSensor.find().sort({ _id: -1 });
      res.json(values);
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
   }
})

module.exports = router

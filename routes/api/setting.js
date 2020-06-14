const express = require("express")
const router = express.Router()

const auth = require('../../middleware/auth')
const Setting = require("../../models/Setting")

// @route   POST api/setting/light-sensor
// @Access  Private
router.post('/light-sensor', auth, async (req, res) => {
   const { value, type, time } = req.body;
   try {
      setting = new Setting({value, type, time});
      await setting.save()
      res.status(200).json("You have setting successfully!")
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error")
   }
})

// @route   GET api/setting/light-sensor/last
// @Desc    get last row
router.get('/light-sensor/last', async (req, res) => {
  try {
     setting = await Setting.findOne({type: "sensor"}).sort({ _id: -1});
     res.json(setting)
  } catch (err) {
     console.log(err.message);
     res.status(500).send("Server error")
  }
})

// @route   GET api/setting/light-sensor/last
// @Desc    get all setting light sensor
router.get('/light-sensor/all', async (req, res) => {
   try {
      settings = await Setting.find({type: "sensor"}).sort({_id: -1});
      res.json(settings);
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error")
   }
 })

module.exports = router

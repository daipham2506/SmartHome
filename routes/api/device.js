const express = require("express")
const router = express.Router()

// const auth = require('../../middleware/auth')
const Device = require("../../models/Device")

// @route   GET api/device/:roomId
// @Desc    get all devices by roomId
router.get('/:roomId', async (req, res) => {
  try {
    devices = await Device.find({ roomId: req.params.roomId });
    res.json(devices);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error")
  }
})

module.exports = router

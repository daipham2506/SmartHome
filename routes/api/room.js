const express = require("express")
const router = express.Router()

// const auth = require('../../middleware/auth')
const Room = require("../../models/Room")

// @route   GET api/room/all
// @Desc    get all room
router.get('/all', async (req, res) => {
   try {
      rooms = await Room.find();
      res.json(rooms);
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error")
   }
 })

module.exports = router

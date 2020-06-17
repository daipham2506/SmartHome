const express = require("express")
const router = express.Router()

// const auth = require('../../middleware/auth')
const Control = require("../../models/Control")

// @route   GET api/control/all
// @Desc    get all control
router.get('/all', async (req, res) => {
   try {
      controls = await Control.find().sort({_id: -1});
      res.json(controls);
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error")
   }
 })

module.exports = router

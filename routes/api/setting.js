const express = require("express")
const router = express.Router()

const auth = require('../../middleware/auth')
const Setting = require("../../models/Setting")

// @route   POST api/setting/light
// @Access  Private
router.post('/light', auth, async (req, res) => {
   const { value, type } = req.body;
   try {
      setting = new Setting({value, type});
      await setting.save()
      res.status(200).json("You have setting successfully!")
   } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error")
   }
})

// @route   GET api/setting/light/last
// @Desc    get last row
// @Access  Private
router.get('/light/last', async (req, res) => {
  try {
     setting = await Setting.findOne({type: "light"}).sort({ _id: -1});
     res.json(setting)
  } catch (err) {
     console.log(err.message);
     res.status(500).send("Server error")
  }
})

module.exports = router

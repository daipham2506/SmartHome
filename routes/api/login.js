const express = require("express")
const router = express.Router()
const config = require("config")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

User = require('../../models/User')


// @route   POST api/auth
// @Desc    Authentication user & get token
// @Access  Public
router.post('/', async (req, res) => {
  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        msg: 'Account does not exist'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        msg: 'Password incorrect. Please try again!'
      })
    }

    //return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 86400 },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token })
      }
    )
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error")
  }
})

module.exports = router

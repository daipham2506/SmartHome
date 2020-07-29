const express = require("express")
const router = express.Router()
const gravatar = require("gravatar")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const config = require("config")

const User = require("../../models/User")
const auth = require('../../middleware/auth')

// @route   POST api/users
// @Access  Public
router.post('/', async (req, res) => {

   const { name, email, password } = req.body;

   try {
      // see if user exist
      let user = await User.findOne({ email })

      if (user) {
         return res.status(400).json({
            error: 'User already exists!'
         })
      }

      //get user gravatar
      const avatar = gravatar.url(email, {
         s: '200',
         r: 'pg',
         d: 'mm'
      })

      user = new User({
         name,
         email,
         password,
         avatar
      })

      //encrypt password
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      //return jsonwebtoken
      const payload = {
         user: {
            id: user.id
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

// @route   GET api/users/all
// @Access  Public
router.get('/all', async (req, res) => {
   try {
      const users = await User.find().select("-password -avatar -isAdmin");
      res.status(200).json(users);
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error")
   }
})

// @route   DELETE api/users/delete/:id
// @Access  Private
router.delete('/delete/:id', async (req, res) => {
   try {
      const user = await User.findById(req.params.id);
      if (!user) {
         return res.status(404).json('User not found');
      }
      await user.remove();
      res.json('User removed');
   } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
   }
})

module.exports = router

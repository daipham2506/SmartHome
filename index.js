const express = require("express")

const connectDB = require('./config/db')

const app = express()

// Connect MongoDB
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

// import iot
const { subcribeDevices } = require('./iot/iot')

// import test 
const { publishLightSensor } = require('./test/light')

app.get('/', (req, res) => {
  return res.send('API running')
})

// Define Route
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/setting', require('./routes/api/setting'))
app.use('/api/control', require('./routes/api/control'))
app.use('/api/sensor', require('./routes/api/sensor'))
app.use('/api/room', require('./routes/api/room'))
app.use('/api/device', require('./routes/api/device'))

publishLightSensor();

subcribeDevices();

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
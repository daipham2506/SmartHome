const express = require("express")

const connectDB = require('./config/db')

const app = express()

// Connect MongoDB
connectDB()

// Init Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  return res.send('API running')
})

// Define Route
app.use('/api/users', require('./routes/api/users'))
app.use('/api/login', require('./routes/api/login'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Sever started on port ${PORT}`)
})
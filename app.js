const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload');

const errorMiddleware = require('./middleware/error')
const { API_PREFIX, SOCKET_PORT } = require('./constant.js')
const { connectSocket } = require('./config/socket.js')

// Rotes
const faceMatching = require('./routes/faceMatchRoutes.js')

app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(fileUpload());

// Set up Socket.IO
const server = connectSocket(app)

server.listen(SOCKET_PORT, () => {
  console.log(`Socket is running on http://localhost:${SOCKET_PORT}`)
})

// health checker
app.get(`/`, (_, res) => {
  res.send('Face Matching is running')
})

app.get(`${API_PREFIX}`, (_, res) => {
  res.send('Face Matching is running')
})

// All Route
app.use(`${API_PREFIX}/api/v1/face-match`, faceMatching)

// error middleware
app.use(errorMiddleware)

module.exports = app

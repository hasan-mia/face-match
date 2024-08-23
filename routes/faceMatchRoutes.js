const express = require('express')
const { CheckFaceMatch } = require('../controllers/faceMatchingController')

const router = express.Router()

router.route('/').post(CheckFaceMatch)

module.exports = router

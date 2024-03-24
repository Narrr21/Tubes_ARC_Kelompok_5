const express = require('express')
const router = express.Router()
const db = require('../models/database')

router
    .get('/',async (req, res) => {
        res.render('home/index')
    })

module.exports = router
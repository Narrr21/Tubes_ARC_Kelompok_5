const express = require('express')
const router = express.Router()
const db = require('../models/database')

router
    .get('/',async (req, res) => {
        res.render('search/index')
    })
    .get('/again',async (req, res) => {
        hasil = await db.getImageById(1)
        res.render('search/index')
    })

module.exports = router
const express = require('express')
const router = express.Router()
const db = require('../models/database')

router
    .route('/')
    .get(async (req, res) => {
        makanan = await db.getAllData('kulinerNangor')
        res.render('home/index', {data: makanan })
    })

router
    .route('/info')
    .get(async (req, res) => {
        res.render('home/info')
    })

module.exports = router
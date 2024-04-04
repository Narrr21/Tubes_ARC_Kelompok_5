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
    .route('/info/:uid')
    .get(async (req, res) => {
        tag = req.params.uid
        makanan = await db.getDataByCriteria('kulinerNangor','kulinerId',tag)
        res.render('home/information', {data:makanan})
    })

module.exports = router


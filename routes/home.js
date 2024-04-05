const express = require('express')
const router = express.Router()
const db = require('../models/database')

router
    .route('/')
    .get(async (req, res) => {
        host = await db.getAllData('hosting')
        res.render('home/index', {data: host})
    })

router
    .route('/info/:uid')
    .get(async (req, res) => {
        tag = req.params.uid
        host = await db.getDataByCriteria('hosting','hostId',tag)
        res.render('home/information', {data:host})
    })

module.exports = router


const express = require('express')
const router = express.Router()
const db = require('../models/database')

router
    .route('/')
    .get(async (req, res) => {
        res.render('search/index')
    })
    .post(async (req, res) => {
        const makanan = await db.getAllMakanan()
        const searchInput = req.body.search
        res.render('search/display', {data: makanan, search: searchInput})
    })
module.exports = router
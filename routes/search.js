const express = require('express')
const router = express.Router()
const db = require('../models/database')

router
    .route('/')
    .get(async (req, res) => {
        res.render('search/index')
    })
    .post(async (req, res) => {
        const searchBy = req.body.searchBy
        const sortBy = req.body.sortBy
        const searchInput = req.body.search
        var makananFilter = await db.getDataBySearch('kulinerNangor', searchBy, searchInput)
        var makananUrut = await db.sortDataByCriteria('kulinerNangor', sortBy, 'ASC', makananFilter[0])
        res.render('search/display', {data: makananUrut, search: searchInput})
    })
module.exports = router
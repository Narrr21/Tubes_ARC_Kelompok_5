const express = require('express')
const router = express.Router()
const db = require('../models/database')

router
    .route('/')
    .get(async (req, res) => {
        res.render('search/index')
    })
    .post(async (req, res) => {
        if (req.body.all) {
            var makanan = await db.getAllData('kulinerNangor')
        } else{
            if (req.body.search )  {
                var searchInput = req.body.search
            } else {searchInput = '%'}
            if (req.body.searchBy )  {
                var searchBy = req.body.searchBy
            } else {searchBy = 'kulinerId'}
            if (req.body.sortBy )  {
                var sortBy = req.body.sortBy
            } else {sortBy = 'kulinerId'}
            if (req.body.foodOrDrink )  {
                var jenis = req.body.foodOrDrink
            } else {jenis = '%'}
            if (req.body.order){
                var order = req.body.order
            } else {order = 'DESC'}
            var makanan = await db.searchMakanan('kulinerNangor', searchBy, jenis, sortBy, order, searchInput)
        }
        res.render('search/display', {data: makanan})
    })
module.exports = router
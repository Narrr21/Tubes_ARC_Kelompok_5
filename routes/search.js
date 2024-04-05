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
            var host = await db.getAllData('hosting')
        } else{
            if (req.body.search && req.body.searchBy)  {
                if (req.body.search )  {
                    var searchInput = req.body.search
                } else {searchInput = '%'}
                if (req.body.searchBy )  {
                    var searchBy = req.body.searchBy
                } else {searchBy = 'hostName'}
            } else if (req.body.search)  {
                var searchInput = req.body.search
                var searchBy = 'hostName'
            } else if (req.body.searchBy) {
                var searchBy = req.body.searchBy
                var searchInput = '%'
            } else {
                var searchBy = 'hostName'
                var searchInput = '%'
            }
            if (req.body.sortBy )  {
                var sortBy = req.body.sortBy
            } else {sortBy = 'hostId'}
            if (req.body.price){
                gratis = (req.body.price == "0")
                if (gratis){
                    var price = "= 0"
                } else {var price = "> 0"}
            } else {price = '>= 0'}
            if (req.body.order){
                var order = req.body.order
            } else {order = 'ASC'}
            var host = await db.searchMakanan('hosting', searchBy, price, sortBy, order, searchInput)
        }
        res.render('search/display', {data: host})
    })
module.exports = router
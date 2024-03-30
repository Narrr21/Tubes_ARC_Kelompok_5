const express = require('express')
const router = express.Router()
const db = require('../models/database')

router
    .get('/',async (req, res) => {
        res.render('home/index')
    })
    .get('/1',async (req, res) => {
        hasil = await db.getMakananById(1)
        res.render('home/index', {data: hasil})
    })
    .get('/img',async (req, res) => {
        linkGambar = await db.getImageById(1)
        res.render('home/index', {data: linkGambar})
    })

module.exports = router
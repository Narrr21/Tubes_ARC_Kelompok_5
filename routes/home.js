const express = require('express')
const router = express.Router()
const db = require('../models/database')

router
    .get('/',async (req, res) => {
        res.render('home/index')
    })
    .get('/test',async (req, res) => {
        let gambar = (await db.getMakananById(1))[0]["images"]
        let nama = (await db.getMakananByRating(10))[0]["foodName"]
        let userName = (await db.getUserByUid(1))[0]["userName"]
        let age = (await db.getUserByCount(-5))[0]["userAge"]
        
        const Hasil = [gambar, nama, userName, age]
        res.render('home/test', {data: Hasil})
    })
    .get('/img',async (req, res) => {
        linkGambar = (await db.getMakananById(1, 0))["images"]
        res.render('home/information', {data: linkGambar})
    })

module.exports = router
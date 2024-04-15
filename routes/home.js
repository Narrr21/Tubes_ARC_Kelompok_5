const express = require('express')
const router = express.Router()
const db = require('../models/database')
const rev = require('../controller/review')

router
    .route('/')
    .get(async (req, res) => {
        host = await rev.getHostAndReview()
        console.log(host)
        res.render('home/index', {data: host})
    })

router
    .route('/info/:hostId')
    .get(async (req, res) => {
        tag = req.params.hostId
        console.log(tag)
        host = await db.getDataByCriteria('hosting','hostId',tag)
        reviews = await rev.getReviewByHostId(tag);
        avg = await rev.getAverageReviewByHostId(tag);
        res.render('home/information', {data:host,review : reviews, averageRating : avg})
    })
    .post(async (req, res) => {
        tag = req.params.hostId
        await rev.review(req, res, tag)
        host = await db.getDataByCriteria('hosting','hostId',tag)
        reviews = await rev.getReviewByHostId(tag);
        avg = await rev.getAverageReviewByHostId(tag);
        res.render('home/information', {data:host,review : reviews, averageRating : avg});
    })

module.exports = router


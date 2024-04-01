const express = require('express')
const router = express.Router()
const auth = require('../models/auth')

router
    .route('/')
    .get(async (req,res) =>{
        res.render('register/index',{message:""})
    })
    .post(async (req,res) =>{
        retval = await auth.register(req,res)
        res.render('register/index',{message : retval})
    })

module.exports =  router
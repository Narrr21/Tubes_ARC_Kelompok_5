const express = require('express')
const router = express.Router()
const auth = require('../controller/auth')

router
    .get('/login',async (req,res) =>{
        const token = req.cookies.jwt;
        if (token) {
            res.status(200).redirect('../');
        }
        else{
            res.render('login/index',{message : ""})
        }
    })
    .post('/login',async (req,res) =>{
        await auth.login(req,res)
    })

    .get('/register',async (req,res) =>{
        const token = req.cookies.jwt;
        if (token) {
            res.status(200).redirect('../');
        }
        else{
            res.render('register/index',{message:""})

        }
    })
    .post('/register',async (req,res) =>{
        await auth.register(req,res)
    })

    .get('/logout',async (req,res) =>{
        await auth.logout(req,res);
        res.redirect('/')
    })


module.exports =  router
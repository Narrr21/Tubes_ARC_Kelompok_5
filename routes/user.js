const express = require('express')
const router = express.Router()
const db = require('../models/database')
const user = require('../controller/user')
const jwt = require('jsonwebtoken');
const { requireAuth } = require('../middleware/authMiddleware');
const upload  = require('../controller/upload')

async function uploadMiddleware(req,res,next) {
    var decodedId = await user.getIdfromCookies(req);
    var currentuser = await user.userFindById(decodedId)  
    console.log(currentuser[0].userName)
    const multerMiddleware = upload.storageMake('../public/storage/Images/profilePicture/'+currentuser[0].userName+'/','profilepic.png','profilepicture');
    await user.updateProfilePicById(decodedId)
    multerMiddleware(req, res, next);
}

router
    .route('/edit')
    .get(requireAuth,async (req,res) => {
        var decodedId = await user.getIdfromCookies(req);
        var currentuser = await user.userFindById(decodedId)  
        res.render('user/edit',{user : currentuser[0]});
    })
    .post(requireAuth,uploadMiddleware, async (req,res)=>{
        var decodedId = await user.getIdfromCookies(req);
        var currentuser = await user.userFindById(decodedId)  
        user.updateBio(req,res,decodedId)
        res.redirect(currentuser[0].userName);
    })

router
    .route('/:username')
    .get(async (req, res) => {
        const token = req.cookies.jwt;
        if(token){
            var decodedId = await user.getIdfromCookies(req);
        }
        else{
            var decodedId = null;
        }
        var username = req.params.username
        var uname = await user.getUserByUsername(username)
        if (req.decodedCookies){
            var loggedIn = await user.userFindById(decodedId)
        }
        else{
            var loggedIn = [{userName: ''}]
        }
        
        if(uname.length>0){
            var visitedUser = await user.getUserByUsername(req.params.username)
            var userReview = await user.getUserReview(visitedUser[0].uid);
            console.log(userReview)
            res.render('user/index',{user : uname[0],logged : loggedIn[0], data: userReview})
        }
        else{
            res.render('user/userNotFound')
        }
    })


module.exports = router
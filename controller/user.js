const mysql = require("mysql2")
const bcrypt = require("bcryptjs")
const bodyParser = require("body-parser")
const jwt = require('jsonwebtoken');

const dotenv = require ('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function userFindById(uid){
    var user =  await pool.query(`
    SELECT
        *
    FROM
        dataUser
    WHERE
        uid = '${uid}'`)
    return user[0];
}

async function accountFindById(uid){
    var account =  await pool.query(`
    SELECT
        *
    FROM
        account
    WHERE
        uid = '${uid}'`)
    return account[0];
}

async function getAllUser(){
    var account =  await pool.query(`
    SELECT
        *
    FROM
        account`)
    return account[0];
}

async function getUserByUsername(username){
    var user =  await pool.query(`
    SELECT
        *
    FROM
        dataUser
    WHERE
        userName = '${username}'`)
    return user[0];
}

async function getUserByUsername(username){
    var user =  await pool.query(`
    SELECT
        *
    FROM
        dataUser
    WHERE
        userName = '${username}'`)
    return user[0];
}

function getIdfromCookies(req){
    const token = req.cookies.jwt;
        jwt.verify(token, 'secretKey', (err, decodedToken) => {
            if (err) {
              console.log(err.message);
              return null
            } else {
              req.decodedCookies = decodedToken
            }
          })
    return req.decodedCookies.id
        
}

async function updateProfilePicById(id){
    var user =  await pool.query(`
    UPDATE 
        dataUser
    SET
        profilePicture = concat(username,'/profilepic')
    WHERE
        uid = '${id}'`);
}

async function getUserReview(id){
    var userReview =  await pool.query(`
    SELECT
        *
    FROM
        kulinerNangor,review
    WHERE
        kulinerNangor.kulinerId = review.kulinerId
        AND
        review.userId = ${id}`);
    return userReview[0]
}

async function updateBio(req,res,id){
    const { bio } = req.body;
    console.log(bio)
    var userBio = await pool.query(`
    UPDATE 
        dataUser
    SET
        bio = '${bio}'
    WHERE
        uid= '${id}'`)
  }

module.exports = {
    userFindById,
    accountFindById,
    getAllUser,
    getUserByUsername,
    getIdfromCookies,
    updateProfilePicById,
    getUserReview,
    updateBio
}
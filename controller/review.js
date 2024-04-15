const mysql = require("mysql2")
const bodyParser = require("body-parser")
const jwt = require('jsonwebtoken');
const { getIdfromCookies } = require("./user")

const dotenv = require ('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function review(req,res,hostId) {
    const {reviewText, rating} = req.body;

    const uId = getIdfromCookies(req)

    await pool.query(`
    INSERT INTO review 
        (userId, hostId, reviewText, rating)
    VALUES
        ('${uId}','${hostId}', '${reviewText}', '${rating}');`)
    console.log("1")
    
}

module.exports = {review}
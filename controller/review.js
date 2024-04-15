const mysql = require("mysql2")
const bodyParser = require("body-parser")
const jwt = require('jsonwebtoken');
const { getIdfromCookies } = require("./user")
const user = require('./user')

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
    const uid = getIdfromCookies(req)
    const username = await user.userFindById(uid)
    await pool.query(`
    INSERT INTO review 
        (userId, hostId, username, reviewText, rating)
    VALUES
        ('${uid}','${hostId}', '${username[0].userName}','${reviewText}', '${rating}')
    ON DUPLICATE KEY UPDATE
        reviewText = '${reviewText}',rating = '${rating}', reviewDate = CURRENT_TIMESTAMP;`)
}

async function getReviewByHostId(hostId){
    var review =  await pool.query(`
    SELECT
        *
    FROM
        review
    WHERE
        hostId = '${hostId}'`)
    return review[0];
}

async function getHostAndReview(){
    var result = await pool.query(`
    SELECT 
        hosting.*,ROUND(COALESCE(AVG(review.rating),0),2) as rating 
    FROM 
        hosting
    LEFT JOIN
        review on hosting.hostId = review.hostId
    GROUP BY 
        hosting.hostId;
    `)
    return result[0]
}  

async function getAverageReviewByHostId(hostId){
    var avg =  await pool.query(`
    SELECT
        ROUND(AVG(rating),2) as avg
    FROM
        review
    WHERE
        hostId = '${hostId}'`)
    if(avg[0][0].avg == null){
        return 0;
    }
    else{
        return avg[0][0].avg;
    }
}

module.exports = {
    review,
    getReviewByHostId,
    getAverageReviewByHostId,
    getHostAndReview
}
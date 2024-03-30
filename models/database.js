const mysql = require ('mysql2')

const dotenv = require ('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// Makanan

var blankMakanan = 
[{
    "id": "Nothing Found",
    "foodName": "Nothing Found",
    "foodOrDrink": "Nothing Found",
    "images": "Nothing Found",
    "rating": "Nothing Found"
}]

async function getMakananById(a){
    var result = await pool.query(`
    SELECT * FROM kulinerNangor
    WHERE id = ?
    `, [a])
    if (result[0].length == 0){
        return blankUser[0]
    }
    return result[0][0]
}

async function getMakananByName(a){
    const result = await pool.query(`
    SELECT * FROM kulinerNangor
    WHERE foodName = ?
    `, [a])
    return result[0]
}

async function getMakananByRating(a){
    var result = await pool.query(`
    SELECT * FROM kulinerNangor
    WHERE rating = ?
    `, [a])
    if (result[0].length == 0){
        return blankMakanan
    }
    return result[0]
}

async function getMakananByType(a){
    const result = await pool.query(`
    SELECT * FROM kulinerNangor
    WHERE foodOrDrink = ?
    `, [a])
    return result[0]
}

// User

var blankUser = 
[{
    "uid": "Nothing Found",
    "userName": "Nothing Found",
    "profilePicture": "Nothing Found",
    "userAge": "Nothing Found",
    "gender": "Nothing Found",
    "countFood": "Nothing Found"
}]

async function getUserByUid(a){
    var result = await pool.query(`
    SELECT * FROM dataUser
    WHERE uid = ?
    `, [a])
    if (result[0].length == 0){
        return blankUser[0]
    }
    return result[0][0]
}

async function getUserByName(a){
    const result = await pool.query(`
    SELECT * FROM dataUser
    WHERE userName = ?
    `, [a])
    return result[0]
}

async function getUserByCount(a){
    var result = await pool.query(`
    SELECT * FROM dataUser
    WHERE countFood = ?
    `, [a])
    if (result[0].length == 0){
        return blankUser
    }
    return result[0]
}

async function getUserLessByCount(a){
    var result = await pool.query(`
    SELECT * FROM dataUser
    WHERE countFood <= ?
    `, [a])
    if (result[0].length == 0){
        return blankUser
    }
    return result[0]
}

async function getUserMoreByCount(a){
    var result = await pool.query(`
    SELECT * FROM dataUser
    WHERE countFood >= ?
    `, [a])
    if (result[0].length == 0){
        return blankUser
    }
    return result[0]
}

module.exports = {
    getMakananById,
    getMakananByName,
    getMakananByRating,
    getMakananByType,
    getUserByUid,
    getUserByName,
    getUserByCount,
    getUserLessByCount,
    getUserMoreByCount,
}
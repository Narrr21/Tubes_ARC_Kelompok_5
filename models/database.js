const mysql = require ('mysql2')

const dotenv = require ('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getMakananById(a){
    const result = await pool.query(`
    SELECT * FROM kulinerNangor
    WHERE id = ?
    `, [a])
    return result[0][0]['foodName']
}

async function getImageById(a){
    const result = await pool.query(`
    SELECT * FROM kulinerNangor
    WHERE id = ?
    `, [a])
    return result[0][0]['images']
}


module.exports = {
    getMakananById,
    getImageById
}
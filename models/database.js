const mysql = require ('mysql2')

const dotenv = require ('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

var blankHost = 
{
    "hostId": "Nothing Found",
    "hostName": "Nothing Found",
    "price": "Nothing Found",
    "images": "Nothing Found",
    "rating": "Nothing Found"
}

var blankUser = 
{
    "uid": "Nothing Found",
    "userName": "Nothing Found",
    "profilePicture": "Nothing Found",
    "userAge": "Nothing Found",
    "gender": "Nothing Found",
    "countFood": "Nothing Found"
}

async function check(result, table){
    if (result[0].length === 0) {
        if (table == 'kulinerNangor'){
            return [blankHost]
        } else if (table == 'dataUser'){
            return [blankUser]
        } else {
            return [[0]]
        }
    }
    return result[0];
}

async function getAllData(table){
    var result = await pool.query(`
    SELECT * FROM ${table};
    `)
    return result[0]
}  

async function getDataByCriteria(table, column, value) {
    const result = await pool.query(`
    SELECT * FROM ${table}
    WHERE ${column} = ?
    ;`, [value])
    return check(result, table)
}

async function getDataMoreLessByCriteria(table, column, condition , value) {
    var result = await pool.query(`
    SELECT * FROM ${table}
    WHERE ${column} ${condition} ?
    ;`, [value])
    return check(result, table)
}

async function getDataBySearch(table, column, value) {
    const result = await pool.query(`
    SELECT * FROM ${table}
    WHERE ${column} LIKE '%${value}%'
    ;`);
    return check(result, table)
}

async function searchMakanan(table, columnSearch, jenis,  columnSort, order, searchInput){
    var result = await pool.query(`
    SELECT * FROM ${table} 
    WHERE ${columnSearch} LIKE '%${searchInput}%'
    AND foodOrDrink LIKE '%${jenis}%'
    ORDER BY ${columnSort} ${order};
    `)
    return check(result, table)
}

module.exports = {
    blankMakanan,
    getAllData,
    getDataByCriteria,
    getDataBySearch,
    getDataMoreLessByCriteria,
    searchMakanan
}
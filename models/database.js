const mysql = require ('mysql2')

const dotenv = require ('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

var blankMakanan = 
{
    "kulinerId": "Nothing Found",
    "foodName": "Nothing Found",
    "foodOrDrink": "Nothing Found",
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
            return [blankMakanan]
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

// async function getMakananById(a){
//     return await getDataByCriteria('kulinerNangor', 'kulinerId', a)
// }

// async function getMakananByName(a) {
//     return await getDataByCriteria('kulinerNangor', 'foodName', a)
// }
  
// async function getMakananByRating(a) {
//     return await getDataByCriteria('kulinerNangor', 'rating', a)
// }
  
// async function getMakananByType(a) {
//     return await getDataByCriteria('kulinerNangor', 'foodOrDrink', a)
// }

// async function getUserByUid(a){
//     return await getDataByCriteria('dataUser', 'uid', a)
// }

// async function getUserByName(a){
//     return await getDataByCriteria('dataUser', 'userName', a)
// }

// async function getUserByCount(a) {
//     return await getDataByCriteria('dataUser','countFood', a)
// }

// async function getMakananMoreByRating(a) {
//     return await getDataMoreLessByCriteria('kulinerNangor','rating', true ,a);
// }

// async function getMakananLessByRating(a) {
//     return await getDataMoreLessByCriteria('kulinerNangor','rating', false ,a);
// }

// async function getUserMoreByCount(a) {
//     return await getDataMoreLessByCriteria('dataUser','countFood', true ,a);
// }

// async function getUserLessByCount(a) {
//     return await getDataMoreLessByCriteria('dataUser','countFood', false ,a);
// }

// async function getUserMoreByAge(a) {
//     return await getDataMoreLessByCriteria('dataUser','userAge', true ,a);
// }

// async function getUserLessByAge(a) {
//     return await getDataMoreLessByCriteria('dataUser','userAge', false ,a);
// }

// async function getUserMoreByUid(a) {
//     return await getDataMoreLessByCriteria('dataUser','uid', true ,a);
// }

// async function getUserLessByUid(a) {
//     return await getDataMoreLessByCriteria('dataUser','uid', false ,a);
// }

// async function getUserMoreByRating(a) {
//     return await getDataMoreLessByCriteria('dataUser','rating', true ,a);
// }

// async function getUserLessByRating(a) {
//     return await getDataMoreLessByCriteria('dataUser','rating', false ,a);
// }

// async function getMakananByNameSearch(a) {
//     return await getDataBySearch('kulinerNangor', 'foodName', a)
// }
  
// async function getMakananByRatingSearch(a) {
//     return await getDataBySearch('kulinerNangor', 'rating', a)
// }
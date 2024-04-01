const mysql = require("mysql2")
const bcrypt = require("bcryptjs")
const bodyParser = require("body-parser")

const dotenv = require ('dotenv')
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()



// register
// Untuk Encryption passwordnya masih in progress, tapi ini udah ngeadd account + dataUser
async function register(req,res) {
    // console.log(req.body);
    const {email,pw,pwconfirm} = req.body;
    var checkEmail = await pool.query(`
    SELECT
        email
    FROM
        account
    WHERE 
        email = ?`,email)
    // console.log(checkEmail[0])

    if(checkEmail[0].length>0){
        // console.log(checkEmail[0])
        return "That email is already in use";
    }
    if(pw!=pwconfirm){
        // console.log(pw,pwconfirm)
        return "Password don't match";
    }
    else{
        await pool.query(`
        INSERT INTO account 
            (email, password)
        VALUES
            ('${email}','${pw}');`)
        
        var uid = await pool.query(`
            SELECT 
                uid
            FROM
                account
            WHERE
                email = '${email}';
            `)
        // console.log(uid[0][0]['uid'])
        await pool.query(`
            INSERT INTO dataUser 
            (   uid,
                userName,
                profilePicture,
                userAge,
            )
            VALUES
                ('${uid[0][0]['uid']}','${email}','DEFAULTPIC','0');`)
        
        return "Email registered!"
    }
}

// TODO : Login
async function login(req,res){

}

// TODO : Logout
async function logout(req,res){

}

// TODO : isLoggedIn (Pengecekan kondisi Login)
async function isLoggedIn(req,res){

}



module.exports = {
    register,
    login,
    logout,
    isLoggedIn
}

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


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'secretKey', {
    expiresIn: maxAge
  });
};

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
        res.status(400).render('register',{message:"That email is already in use"});
    }
    else if(pw!=pwconfirm){
        // console.log(pw,pwconfirm)
        res.status(400).render('register',{message:"Password don't match"});
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
                userAge
            )
            VALUES
                (?, ?, ?, ?);`, [uid[0][0]['uid'], email, 'DEFAULTPIC', '0']);

        res.status(201).render('register',{message:'Email Registered!'});
    }
}


// TODO : Login
async function login(req,res){
    const { email, pw } = req.body;
    try {
        var accCandidate = await pool.query(`
        SELECT
          *
        FROM
          account
        WHERE
            email = '${email}'`)
        
        if(accCandidate[0].length==0 || accCandidate[0][0]['password']!=pw){
            res.status(403).render('login',{message:'Incorrect Email or Password!'});
        }
        else{
            const token = createToken(accCandidate[0][0]['uid']);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).redirect('../');
        }
    } 
    catch (err) {
      res.status(400).json({ errors });
    }
  }
  

// TODO : Logout
async function logout(req,res){
    res.cookie('jwt', '', { maxAge: 1 });
}



async function userFindById(uid){
    var user =  pool.query(`
    SELECT
        *
    FROM
        dataUser
    WHERE
        uid = '${uid}'`)
    return user[0];
}

async function accountFindById(uid){
    var account =  pool.query(`
    SELECT
        *
    FROM
        account
    WHERE
        uid = '${uid}'`)
    return account[0];
}



module.exports = {
    register,
    login,
    logout,
    userFindById,
    accountFindById
}

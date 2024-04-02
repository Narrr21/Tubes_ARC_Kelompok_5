if (process.env.NODE_ENV !== 'production'){
    require('dotenv')
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const db = require('./models/database')
const homeRouter = require('./routes/home')
const searchRouter = require('./routes/search')
const authRouter = require('./routes/auth')

const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware')
const { userFindById,accountFindById } = require('./controller/auth')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

app.use('/home', homeRouter)
app.use('/search', searchRouter)
app.use('/auth',authRouter)


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("There's an error!")
})



app.get('/',requireAuth, async (req, res) => {
// Ini edit aja gpp, ini buat ngetes doang
    try {
        const x = await accountFindById(req.decodedCookies.id)
        res.render('index', {email: x[0].email})
    }
    catch(err){
        console.log(err)
    }
    res.statusCode = 400
    res.end()
})

app.listen(process.env.PORT || 3000)
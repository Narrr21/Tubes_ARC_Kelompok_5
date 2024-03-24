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

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

app.use('/home', homeRouter)
app.use('/search', searchRouter)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send("There's an error!")
})

app.get('/', async (req, res) => {
    hasil = await db.tes()
    res.render('index')
})

app.listen(process.env.PORT || 3000)
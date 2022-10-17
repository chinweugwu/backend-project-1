if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const router = require('./routes/index')
const mongoose = require('mongoose');

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/', router)

//We'd need to install a program to let us load environment variables on our appication - npm i --save-dev dotenv
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true}) //Setting up the connection

const db = mongoose.connection // Initializing connection to a variable name "db"

db.on('error', error => {
    console.error(error)
})

db.once('open', () => {
    console.log("Connected to the Mongoose")
})

app.listen(process.env.PORT || 4000)
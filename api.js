//define api end points
const express = require('express')
const mongoose = require('mongoose')
const db = "mongodb://admin:admin0Pass@ds129821.mlab.com:29821/eventsdb"
const app = express()

//----Routers
const usersRouter = require('./users/userRoute')
const eventsRouter = require('./events/eventRoute')
const placesRouter = require('./places/placesRoute')
const authRouter = require('./auth/authRoute')
const defaultRouter = require('./default')

//connect to the db
mongoose.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if(err){
        console.error('Error: ' + err)
    } else{
        console.log('Connected to mongodb')
    }
})

app.use('/', defaultRouter)

app.use('/users', usersRouter)

app.use('/events', eventsRouter)

app.use('/places', placesRouter)//made up

app.use('/auth', authRouter)

module.exports = app
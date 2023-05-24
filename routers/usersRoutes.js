const express = require('express')
const app = express()
const ctr = require('../controllers/userController')
const authentication= require('../middleware/authentication')

app.post('/register',ctr.register)

app.post('/login',ctr.login)

app.use(authentication)

app.put('/',ctr.EditUser)

app.patch('/topup',ctr.topUpBalance)

app.delete('/',ctr.deleteUsers)

module.exports = app
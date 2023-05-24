const express = require('express')
const app = express()
const usersRoute = require('./usersRoutes')
const productsRoute = require('./productsRoutes')
const categoriesRoute = require('./categoryRoutes')
const transactionsRoute = require('./transactionRoutes')
const authentication = require('../middleware/authentication')
const Authorization = require('../middleware/authorization')

app.use('/users', usersRoute)

app.use(authentication)

app.use('/transactions', transactionsRoute)
app.use('/categories',Authorization.AdminAuthorization ,categoriesRoute)
app.use('/products',Authorization.AdminAuthorization, productsRoute)

module.exports = app
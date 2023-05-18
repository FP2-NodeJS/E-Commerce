const express = require('express')
const app = express()
const usersRoute = require('./usersRoutes')
const categoriesRoute = require('./categoryRoutes')
const productsRoute = require('./productsRoutes')
const transactionsRoute = require('./transactionRoutes')

app.use('/users', usersRoute)
app.use('/categories', categoriesRoute)
app.use('/products', productsRoute)
app.use('/transactions', transactionsRoute)

module.exports = app
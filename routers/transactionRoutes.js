const express = require('express')
const app = express()
const transactionController = require('../controllers/transactionsController');


app.post('/', transactionController.order)

app.get('/user', transactionController.getUserTransaction)

app.get('/admin', transactionController.getAdmin)

app.get('/:transactionId', transactionController.getTransactionById)


module.exports = app
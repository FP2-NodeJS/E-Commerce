const express = require('express')
const app = express()
const ctr = require('../controllers/categoryController')
const Authorization = require('../middleware/authorization')

app.get('/', ctr.showCategory)

app.post('/', ctr.addCategory)

app.patch('/:categoryId',Authorization.CategoriesAuthor, ctr.updateCategory)

app.delete('/:categoryId',Authorization.CategoriesAuthor, ctr.deleteCategory)

module.exports = app
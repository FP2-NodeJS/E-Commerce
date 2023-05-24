const express = require('express')
const app = express()
const ctr = require('../controllers/productController')
const Authorization = require('../middleware/authorization')

app.get('/', ctr.ShowProduct)

app.post('/',ctr.AddProduct)

app.put('/:productId',Authorization.ProductsAuthor,ctr.EditProduct)

app.patch('/:productId',Authorization.ProductsAuthor,ctr.EditCategoryOfProduct)

app.delete('/:productId',Authorization.ProductsAuthor, ctr.DeleteProduct)

module.exports = app
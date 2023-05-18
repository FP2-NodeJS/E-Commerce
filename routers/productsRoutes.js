const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.status(200).json({message: "show products"})
})

app.post('/',(req,res)=>{
    res.status(200).json({message: "add products"})
})

app.put('/:productId',(req,res)=>{
    res.status(200).json({message: "edit products"})
})

app.patch('/:productId',(req,res)=>{
    res.status(200).json({message: "patch products"})
})

app.delete('/:productId',(req,res)=>{
    res.status(200).json({message: "delete products"})
})

module.exports = app
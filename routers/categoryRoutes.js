const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.status(200).json({message: "show category"})
})

app.post('/',(req,res)=>{
    res.status(200).json({message: "add category"})
})

app.patch('/:categoryId',(req,res)=>{
    res.status(200).json({message: "patch category"})
})

app.delete('/:categoryId',(req,res)=>{
    res.status(200).json({message: "delete category"})
})

module.exports = app
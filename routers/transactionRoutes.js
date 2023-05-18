const express = require('express')
const app = express()

app.get('/user',(req,res)=>{
    res.status(200).json({message: "show current user transaction history"})
})

app.post('/',(req,res)=>{
    res.status(200).json({message: "add transaction history"})
})

app.get('/admin',(req,res)=>{
    res.status(200).json({message: "show all user transaction history"})
})

app.get('/:productId',(req,res)=>{
    res.status(200).json({message: "show transaction history by id"})
})


module.exports = app
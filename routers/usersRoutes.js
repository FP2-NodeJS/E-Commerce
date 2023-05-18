const express = require('express')
const app = express()

app.post('/register',(req,res)=>{
    res.status(200).json({message: "register"})
})

app.post('/login',(req,res)=>{
    res.status(200).json({message: "login"})
})

app.put('/',(req,res)=>{
    res.status(200).json({message: "edit user"})
})

app.patch('/topup',(req,res)=>{
    res.status(200).json({message: "patch user"})
})

app.delete('/',(req,res)=>{
    res.status(200).json({message: "delete user"})
})

module.exports = app
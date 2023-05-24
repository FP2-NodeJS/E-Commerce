require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const router = require("./routers/routes")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/`);
})
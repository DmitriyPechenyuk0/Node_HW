const moment = require('moment');
const express = require('express');
const fs = require('fs')
const path = require('path')

const pathToJson = path.join(__dirname, 'posts.json')

const jsonFile = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'))

const app = express()

const PORT = 8000
const HOST = 'localhost'
const PROTOCOL = `http`

let getDate = ()=> moment().format('YYYY/MM/DD HH:mm:ss');

let getCurrentWeekday = () => moment().format('dddd');

app.get("/timestamp", (req, res) =>{
    res.json(getDate())
})

app.get("/posts", (req, res) =>{
    res.json(jsonFile)
})

app.listen(PORT, HOST, () => {
    console.log(`Server started on ${PROTOCOL}://${HOST}:${PORT}`)
})
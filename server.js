const moment = require('moment');
const express = require('express')

const app = express()

const PORT = 8000
const HOST = 'localhost'
const PROTOCOL = `http`

let getDate = ()=> moment().format('YYYY/MM/DD HH:mm:ss');

let getCurrentWeekday = () => moment().format('dddd');

app.get("/timestamp", (req, res) =>{
    res.json(getDate())
})

app.listen(PORT, HOST, () => {
    console.log(`Server started on ${PROTOCOL}://${HOST}:${PORT}`)
})
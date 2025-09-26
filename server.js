const moment = require('moment');
const express = require('express');
const fs = require('fs')
const path = require('path');

const pathToJson = path.join(__dirname, 'posts.json')

const jsonFile = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'))

const app = express()

const PORT = 8000
const HOST = 'localhost'
const PROTOCOL = `http`

let getDate = ()=> moment().format('YYYY/MM/DD HH:mm:ss');

// let getCurrentWeekday = () => moment().format('dddd');

app.get("/timestamp", (req, res) =>{
    res.json(getDate())
})

app.get("/posts", (req, res) =>{
    let { skip, take } = req.query
    if (take && skip){
        take = +take; skip = +skip
        
        // res.json({take: isNaN(take), skip: isNaN(skip)})

        if (!isNaN(take) && !isNaN(skip)){
            let sliced = jsonFile.slice(skip, skip + take)
            res.json(sliced)
        }
    }
    if (take){
        take = +take
        if (!isNaN(take)){
            let taked = jsonFile.slice(0, take)
            res.json(taked)
        }
    }
    if (skip){
        skip = +skip
        
        if(!isNaN(skip)){
            let skipped = jsonFile.slice(skip)
            res.json(skipped)
        }
    }
})


app.get("/posts/:id",(req, res)=>{

    const id = +req.params.id
    console.log(id)
    if (isNaN(id)){
        res.status(400).json("id must be an integer");
        return;
    }

    const post = jsonFile.find((post)=>{

        const isMatch = post.id === id
        return isMatch
    })
    if (!post){
        res.status(404).json("product not found")
        return;
    }
    
    res.json(post)
})



app.listen(PORT, HOST, () => {
    console.log(`Server started on ${PROTOCOL}://${HOST}:${PORT}`)
})
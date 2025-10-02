const moment = require('moment');
const express = require('express');
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const pathToJson = path.join(__dirname, 'posts.json')

const jsonFile = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'))

const app = express()
app.use(express.json())

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
    } else{
        res.json(jsonFile)
    }
})



app.post('/posts', async (req, res) => {
    let body = req.body
    if (!body) {
        res.status(422).json("Body is required.")
        return
    }
    
    const newPost = {id: jsonFile.length + 1, ...body}

    if (!newPost.title) {
        res.status(422).json("title is required.")
        return
    }
    if (!newPost.description) {
        res.status(422).json("description is required.")
        return
    }
    if (!newPost.image) {
        res.status(422).json("image is required.")
        return
    }
    try{
        jsonFile.push(newPost)
        await fsp.writeFile(pathToJson, JSON.stringify(jsonFile, null, 4))
        res.status(201).json(newPost)
    } catch (err){
        res.status(500).json(`Post creation error: ${err}`)
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
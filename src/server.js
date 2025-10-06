const express = require('express');

const PostRouter = require('./Post/post.routes')

const app = express()
app.use(express.json())
app.use(PostRouter)

const PORT = 8000
const HOST = 'localhost'
const PROTOCOL = `http`

app.listen(PORT, HOST, () => {
    console.log(`Server started on ${PROTOCOL}://${HOST}:${PORT}`)
})
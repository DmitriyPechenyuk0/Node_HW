import express from 'express'

import { PostRouter } from './Post/post.routes'

const app: express.Express = express()
app.use(express.json())
app.use(PostRouter)

const PORT: number = 8000
const HOST: string = 'localhost'
const PROTOCOL: string = `http`

app.listen(PORT, HOST, () => {
    console.log(`Server started on ${PROTOCOL}://${HOST}:${PORT}`)
})
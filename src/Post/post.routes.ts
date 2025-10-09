import express from 'express'
import { PostController } from './post.controller'

const PostRouter: express.Router = express.Router()

PostRouter.get("/posts", PostController.getAll)
PostRouter.get("/posts/:id", PostController.getByID)
PostRouter.post("/posts", PostController.create)


export { PostRouter }
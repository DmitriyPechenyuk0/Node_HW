const { Router } = require('express')
const PostController = require('./post.controller')

PostRouter = Router()

PostRouter.get("/posts", PostController.getAll)
PostRouter.get("/posts/:id", PostController.getByID)
PostRouter.post("/posts", PostController.create)

module.exports = PostRouter
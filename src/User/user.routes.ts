import express from 'express'
import { UserController } from './user.controller'

const UserRouter: express.Router = express.Router()

UserRouter.get("/login", UserController.login)
// UserRouter.get("/register", UserController.register)
// UserRouter.get("/me", UserController.register)


export { UserRouter }
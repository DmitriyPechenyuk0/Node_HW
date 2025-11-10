// import { UserService } from "./user.service";
import { UserControllerContract } from "./user.types";
import { env } from "../config/env";
import { sign, verify } from "jsonwebtoken"
import { userService } from "./user.service";

export const UserController: UserControllerContract = {
    login: async (req, res) => {
        let body = req.body
        if (!body) {
            res.status(422).json("Body is required.")
            return
        }
        if (!body.email){
            res.status(422).json('email is required.')
            return
        }
        if (!body.password){
            res.status(422).json('password is required.')
            return
        }
        
        const usr = await userService.login(body.email)

        if (!usr) {
            res.status(404).json("User not found")
            return
        } else {
            res.status(200).json(sign(body.email, env.SECRET_KEY))
        }
        
    }
    // register: async(req, res) => {

    // },
    // me: async (req, res) => {

    // }
}
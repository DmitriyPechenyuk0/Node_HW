import { Request, Response } from "express"
import { PostService } from "./post.service";

export const PostController = {
    getAll: (req: Request, res: Response) =>{
        // let { skip, take } = req.query
        let skip: any = req.query.skip
        let take: any = req.query.take
        res.json(PostService.getAll(take, skip))
    },
    getByID: (req: Request, res: Response)=>{
        if (!req.params.id){
            res.status(400).json("id is required");
            return
        } 
        const id = +req.params.id
        console.log(id)
        if (isNaN(id)){
            res.status(400).json("id must be an integer");
            return;
        }
      
        res.json(PostService.getByID(id))
    },
    create: async (req:Request, res:Response) => {
        let body = req.body
        if (!body) {
            res.status(422).json("Body is required.")
            return
        }

        if (!body.title){
            res.status(422).json('title is required.')
            return
        }
        
        if (!body.description){
            res.status(422).json('description is required.')
            return
        }
        if (!body.image){
            res.status(422).json('image is required.')
            return
        }

        

        const post = await PostService.create(body)
        if (!post) {
            res.status(500).json("Product creation error")
            return
        }
        res.status(201).json(post)
    }
}
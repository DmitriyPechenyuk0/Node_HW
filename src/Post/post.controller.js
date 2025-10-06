const PostService = require('./post.service')

const PostController = {
    getAll: (req, res) =>{
        let { skip, take } = req.query
        res.json(PostService.getAll(take, skip))
    },
    getByID: (req, res)=>{

        const id = +req.params.id
        console.log(id)
        if (isNaN(id)){
            res.status(400).json("id must be an integer");
            return;
        }
      
        res.json(PostService.getByID(id))
    },
    create: async (req, res) => {
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

module.exports = PostController
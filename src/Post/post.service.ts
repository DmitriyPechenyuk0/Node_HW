import fs from 'fs';
import path from 'path';
import fsp from 'fs/promises';
import { Post, CreatePostData, UpdatePostData, PostServiceContract } from "./post.types";

const pathToJson = path.join(__dirname, 'posts.json')

const jsonFile: Post[] = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'))

export const PostService: PostServiceContract = {
    async create(data){
        try{
            const newPost = {...data, id: jsonFile.length + 1}
            jsonFile.push(newPost)
            await fsp.writeFile(pathToJson, JSON.stringify(jsonFile, null, 4))
            return newPost
        } catch (err){
            return `Post creation error: ${err}`
        }
    },
    getAll(take, skip){
        if (take && skip){
            
            take = +take; skip = +skip
            
            if (!isNaN(take) && !isNaN(skip)){
                let sliced = jsonFile.slice(skip, skip + take)
                return sliced
            }
        }
        if (take){
            take = +take
            if (!isNaN(take)){
                let taked = jsonFile.slice(0, take)
                return taked
            }
        }
        if (skip){
            skip = +skip
            
            if(!isNaN(skip)){
                let skipped = jsonFile.slice(skip)
                return skipped
            }
        } else{
            return jsonFile
        }
    },
    getByID(id){
        const post = jsonFile.find((post)=>{

            const isMatch = post.id === id
            return isMatch
        })
        if (!post){
            return null
        }
        return post
    },
    async update(id, data){
        const post = this.getByID(id)
        if (!post) {
            return null
        }
        try {
            const updatedPost = { ...post, ...data }
            jsonFile.splice(id - 1, 1, updatedPost)
            await fsp.writeFile(pathToJson, JSON.stringify(jsonFile, null, 4))
            return updatedPost
        } catch (error) {
            console.log(error)
            return null
        }
    }
}
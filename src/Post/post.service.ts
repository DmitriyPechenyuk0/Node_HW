import fs from 'fs';
import path from 'path';
import fsp from 'fs/promises';

const pathToJson = path.join(__dirname, 'posts.json')

const jsonFile: {
    id: number,
    title: string,
    description: string,
    image: string,
    likes?: number
}[] = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'))

export const PostService = {
    async create(data: {
        title: string,
        description: string,
        image: string
    }){
        try{
            const newPost = {...data, id: jsonFile.length + 1}
            jsonFile.push(newPost)
            await fsp.writeFile(pathToJson, JSON.stringify(jsonFile, null, 4))
            return newPost
        } catch (err){
            return `Post creation error: ${err}`
        }
    },
    getAll(take: number, skip: number){
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
    getByID(id:number){
        const post = jsonFile.find((post)=>{

            const isMatch = post.id === id
            return isMatch
        })
        if (!post){
            return null
        }
        return post
    }

}
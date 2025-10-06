const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const pathToJson = path.join(__dirname, 'posts.json')

const jsonFile = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'))

const PostService = {
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
    }

}

module.exports = PostService
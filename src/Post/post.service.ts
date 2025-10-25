import fs from 'fs';
import path from 'path';
import fsp from 'fs/promises';
import { Post, CreatePostData, UpdatePostData, PostServiceContract } from "./post.types";
import { PrismaClient } from '../generated/prisma';
import { title } from 'process';

// const pathToJson = path.join(__dirname, 'posts.json')

// const jsonFile: Post[] = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'))
const client = new PrismaClient()

export const PostService: PostServiceContract = {
    async create(data){
        try{
            const newPost = await client.post.create({data:
                {
                    title: data.title,
                    description: data.description,
                    image: data.image

                }
            })
            return newPost
        } catch (err){
            client.$disconnect()
            return `Post creation error: ${err}`
        }
    },
    getAll: async (take, skip) => {
        if (take && skip){
            
            take = +take; skip = +skip
            
            if (!isNaN(take) && !isNaN(skip)){
                try {
                    let sliced = await client.post.findMany({skip: skip, take: take})
                    return sliced
                } catch (error) {
                    client.$disconnect()
                    return undefined
                }
            }
        }
        if (take){
            take = +take
            if (!isNaN(take)){
                try {
                    let taked = await client.post.findMany({take: take})
                    return taked
                } catch (error) {
                    client.$disconnect()
                    return undefined
                }
            }
        }
        if (skip){
            skip = +skip
            
            if(!isNaN(skip)){
                try {
                    let skipped = await client.post.findMany({skip: skip})
                    return skipped
                } catch (error) {
                    client.$disconnect()
                    return undefined
                }
            }
        } else{
            try {
                return await client.post.findMany()
            } catch (error) {
                client.$disconnect()
                return undefined
            }
        }
    },
    getByID(id){
        try {
            const post = client.post.findUniqueOrThrow(
                {where: {id: id}}
            )
            return post
            
        } catch (error) {
            client.$disconnect()
            return null
        }
    },
    async update(id, data){
        try {
            let updateData: UpdatePostData = {};
            if (data.title !== undefined) updateData.title = data.title;
            if (data.description !== undefined) updateData.description = data.description;
            if (data.image !== undefined) updateData.image = data.image;

            let updatedPost = await client.post.update({
                where: {
                    id: id
                },
                data: updateData
            })

            return updatedPost
        } catch (error) {
            client.$disconnect()
            console.log(error)
            return null
        }
    },
    async delete(id) {
        try {
            client.post.delete({
                where: {
                    id: id
                }
            })
        } catch (error) {
            client.$disconnect()
            return null
        }
    },
}
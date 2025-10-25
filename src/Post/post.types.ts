import { Request, Response } from "express";
import { PrismaClient, Prisma, Tag } from "../generated/prisma";

export type Post = Prisma.PostGetPayload<{}>;
export type PostWithTags = Prisma.PostGetPayload<{include: {tags: true}}>;

export type CreatePost = Prisma.PostUncheckedCreateInput;
export type CreatePostChecked = Prisma.PostCreateInput;

export type UpdatePost = Prisma.PostUncheckedUpdateInput;
export type UpdatePostChecked = Prisma.PostUpdateInput;

export type CreatePostData = Omit<Post, "id">

export type UpdatePostData = Partial<Post> 

// PostWithTags
// CreatePost
// CreatePostChecked
// UpdatePost
// UpdatePostChecked

// Request<P, ResBody, ReqBody, ReqQuery, Locals>
// P - динамічний параметри (req.params)
// ResBody - відповідь контроллера, те, що робимо у res.json
// ReqBody - тіло запиту (при POST/PATCH) в req.body
// ReqQuery - query параметри запиту, те, що в req.body
// Locals поки не чіпаємо

// Response<ResBody, Locals>
// ResBody - відповідь контроллера, те, що робимо у res.json
// Locals поки не чіпаємо

export interface PostServiceContract {
    getAll: (take: number | undefined, skip: number | undefined) =>  Promise<Post[] | undefined> ;
    create: (data: CreatePostData) => Promise<Post | string>;
    getByID: (id: number) => Promise<Post> | null;
    update: (id: number, data: UpdatePostData) => Promise<Post | null>;
    delete: (id: number) => Promise<Post| string | undefined | null >
}

export interface PostControllerContract {
    getAll: (req: Request<object, Post[] | string, object, {take?:number, skip?:number}>, res: Response<Post[] | string | object>) => void,
    getByID: (req: Request<{id: string}, Post | string, object>, res: Response<Post | string | object | null>) => void,
    create: (req: Request<object, Post | string, CreatePostData, object>, res: Response<Post | string | object | null>) => Promise<void>,
    update: (req: Request<{id: string}, Post | string, UpdatePostData, object>, res: Response<Post | string | object>) => Promise<void>
    delete: (req: Request<{id: string}, Post | string, object>, res: Response<string | null | Post>) => Promise<void>
}
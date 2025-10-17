import { Request, Response } from "express";

export interface Post {
    id: number;
    title: string;
    description: string;
    image: string;
    likes?: string;
}

export type CreatePostData = Omit<Post, "id">
export type UpdatePostData = Partial<Post>

export interface PostServiceContract {
    create: (data: CreatePostData) => Promise<Post | string>;
    getAll: (skip: number, take: number | null) => Post[] | undefined;
    getByID: (id: number) => Post | null;
    update: (id: number, data: UpdatePostData) => Promise<Post | null>;
}

export interface PostControllerContract {
    getAll: (req: Request<object, Post[] | string, object, {take?:number, skip?:number}>, res: Response<Post[] | string | object>) => void,
    getByID: (req: Request<{id: string}, Post | string, object>, res: Response<Post | string | object | null>) => void,
    create: (req: Request<object, Post | string, CreatePostData, object>, res: Response<Post | string | object | null>) => Promise<void>,
    update: (req: Request<{id: string}, Post | string, UpdatePostData, object>, res: Response<Post | string | object>) => Promise<void>
}
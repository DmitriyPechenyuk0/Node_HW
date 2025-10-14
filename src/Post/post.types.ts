export interface Post {
    id: number;
    title: string;
    description: string;
    image: string;
    likes?: string;
}

export type CreatePostData = Omit<Post, "id">
export type UpdatePostData = Partial<Omit<Post, "id">>

export interface PostServiceContract {
    create: (data: CreatePostData) => Promise<Post | string>;
    getAll: (skip: number, take: number | null) => Post[] | undefined;
    getByID: (id: number) => Post | null;
    update: (id: number, data: UpdatePostData) => Promise<Post | null>;
}
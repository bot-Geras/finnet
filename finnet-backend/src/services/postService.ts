import type {Post, CreatePostInput} from '../types';
import {createFileStorage} from "../utils/fileStorage";

const postStorage = createFileStorage<Post>("posts.json");

export const getAllPosts = (): Post[] => {
    return postStorage.readAll();
};

export const getPostsByUserId = (userId: number): Post[] => {
    const allPosts = postStorage.readAll();
    return allPosts.filter(post => post.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const createPost = (userId: number, postInput: CreatePostInput): Post => {
    const posts = postStorage.readAll();
    const newPost: Post = {
        id: postStorage.generateId(),
        userId,
        title: postInput.title.trim(),
        body: postInput.body.trim(),
        createdAt: new Date().toISOString(),
    };
    posts.push(newPost);
    postStorage.writeAll(posts);
    return newPost;
};

export const getPostsCountByUser = (userId: number): number => {
    const allPosts = postStorage.readAll();
    return allPosts.filter(post => post.userId === userId).length;
};


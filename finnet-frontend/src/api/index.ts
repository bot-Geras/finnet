import type { User, Post, CreatePostInput, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.BASE_URL!;
console.log(API_BASE_URL);

export const getUsers = async (): Promise<ApiResponse<User[]>> => {
    const response = await fetch(`${API_BASE_URL}/users`);
    return response.json();
};

export const getUserById = async (userId: number): Promise<ApiResponse<User>> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    return response.json();
};

export const getPostsByUserId = async (userId: number): Promise<ApiResponse<Post[]> & { user?: { id: number; name: string } }> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`);
    return response.json();
};

export const createPost = async (userId: number, post: CreatePostInput): Promise<ApiResponse<Post>> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    return response.json();
};

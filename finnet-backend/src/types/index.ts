export interface User {
    id: number;
    name: string;
    email: string;
    company: Company;
    address: Address;

}

export interface Company {
    name: string;
}

export interface Address {
    street: string;
    city: string;
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    createdAt: string;
}

export interface CreatePostInput {
    title: string;
    body: string;

}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
    message?: string;
    errors? : string[];
    count?: number;
}
// lib/types/auth.ts
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'editor';
}

export interface AuthSession {
    user: User;
    expires: string;
}

export interface LoginResponse {
    success: boolean;
    error?: string;
}

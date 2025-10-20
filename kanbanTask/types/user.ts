
export interface User {
    id?: string;
    name: string;
    surname: string;
    email?: string;
    password: string;
    avatarIndex: number;
    created_at?: Date;
    updated_at?: Date;
} 
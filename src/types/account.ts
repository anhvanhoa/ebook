export type Role = 'reader' | 'author' | 'admin';
export type UserPayload = {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    username: string;
    role: Role;
    createdAt: Date;
};

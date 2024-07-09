import { Document } from 'mongoose';

interface User extends Document {
    name: string;
    userName: string;
    password: string;
    email: string;
    activated: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default User;

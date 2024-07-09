import mongoose from 'mongoose';

type User = Required<{
    name: string;
    userName: string;
    password: string;
    email: string;
    activated: boolean;
    createdAt: Date;
}> &
    Partial<{
        updatedAt: Date;
        _id: mongoose.Types.ObjectId;
    }>;

export default User;

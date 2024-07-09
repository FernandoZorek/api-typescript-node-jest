import { Request, Response, NextFunction } from 'express';
import User from '@src/models/user';
import { isEmail } from 'validator';

interface UserRequest {
    name: string;
    userName: string;
    password: string;
    activated: boolean;
    email: string;
}

class UserController {
    public async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name, userName, password, activated, email } = req.body as UserRequest;

        if (!name || !userName || !password || !email || typeof activated === 'undefined') {
            res.status(400).json({ errors: [{ detail: 'Missing invalid required data to create new user' }] });
            return;
        }

        if (!isEmail(email)) {
            res.status(400).json({ errors: [{ detail: 'Invalid email format' }] });
            return;
        }

        try {

            const existingUser = await User.findOne({ email });
            if (existingUser) {
            res.status(409).json({ errors: [{ detail: 'Email already in use' }] });
            return;
            }
            const newUser = new User({ name, userName, password, activated, email });
            await newUser.save();
            res.status(201).json({ data: newUser });
        } catch (error) {
            next(error);
        }
    }

    public async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users: User[] = await User.find().select('-password');
            res.status(200).json({ data: users });
        } catch (error) {
            next(error);
        }
    }

    public async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        try {
            const user = await User.findById(id).select('-password');
            if (!user) {
                res.status(404).json({ errors: [{ detail: 'User not found' }] });
                return;
            }
            res.status(200).json({ data: user });
        } catch (error) {
            next(error);
        }
    }

    public async updateUserStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const { operation } = req.body as { operation: string };

        if (!['enable', 'disable'].includes(operation)) {
            res.status(400).json({ errors: [{ detail: `Operation not allowed. Invalid operation named: ${operation}` }] });
            return;
        }

        try {
            const user = await User.findById(id);
            if (!user) {
                res.status(404).json({ errors: [{ detail: 'User not found' }] });
                return;
            }

            user.activated = operation === 'enable';
            await user.save();

            res.status(200).json({ data: user });
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;

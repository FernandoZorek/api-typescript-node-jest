import { Model } from 'mongoose';
import User from './userDocument';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserModel extends Model<User> {}

export default UserModel;

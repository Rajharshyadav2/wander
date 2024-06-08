import 'dotenv/config';
import User from './user-schema';
import connectDB from './connect';
import {UserFormData} from './user-validation';
import {hashPasswordMiddleware} from '@/lib/hash-password';

class UserService {
  private readonly dbUrl = process.env.CONNECTION_STRING ?? '';
  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase(): Promise<void> {
    await connectDB(this.dbUrl);
  }

  async createUser(userData: UserFormData) {
    const newUser = {
      userName: userData.userName,
      userEmail: userData.userEmail,
      userPassword: await hashPasswordMiddleware(userData.userPassword),
    };

    const user = await User.create(newUser);
    return user;
  }

  async getAllUsers() {
    const allUsers = await User.find({});
    return allUsers;
  }

  async getUserByEmail(userEmail: string) {
    const user = await User.findOne({userEmail});
    return user;
  }
}

export default UserService;

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default class AuthService {
  static async authenticate(data) {
    const { email, password } = data;

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid password.');
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return { user, token };
  }
}
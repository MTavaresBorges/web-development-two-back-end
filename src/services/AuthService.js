import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class AuthService {
  async authenticate(data) {
    try {
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

      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
    } catch (error) {
      throw new Error('Could not authenticate user.');
    }
  }
}
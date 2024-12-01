import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default class UserService {
  static async all() {
    try {
      return await prisma.users.findMany();
    } catch (error) {
      throw new Error('Could not fetch users.');
    }
  }

  static async findById(id) {
    try {
      return await prisma.users.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error('Could not fetch user.');
    }
  }

  static async create(data) {
    try {
      const { password } = data;
      data.password = await bcrypt.hash(password, 10);

      return await prisma.users.create({
        data,
      });
    } catch (error) {
      throw new Error('Could not create user.');
    }
  }

  static async update(id, data) {
    try {
      return await prisma.users.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error('Could not update user.');
    }
  }

  static async delete(id) {
    try {
      return await prisma.users.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Could not delete user.');
    }
  }
}
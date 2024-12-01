import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default class UserService {
  static async all() {
    try {
      return await prisma.products.findMany();
    } catch (error) {
      throw new Error('Could not fetch products.');
    }
  }

  static async findById(id) {
    try {
      return await prisma.products.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error('Could not fetch product.');
    }
  }

  static async create(data) {
    try {
      return await prisma.products.create({
        data
      });
    } catch (error) {
      throw new Error('Could not create product.');
    }
  }

  static async update(id, data) {
    try {
      return await prisma.products.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error('Could not update product.');
    }
  }

  static async delete(id) {
    try {
      return await prisma.products.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Could not delete product.');
    }
  }
}
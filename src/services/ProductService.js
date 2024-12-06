import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class ProductService {
  static async all(userId = null) { 
    try {
      const filter = userId ? { where: { userId } } : {};
      return await prisma.products.findMany(filter);
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

  static async create(userId, data) {
    try {
      return await prisma.products.create({
        data: {
          ...data,
          user: { connect: { id: userId } },
        }
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
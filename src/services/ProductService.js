import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class ProductService {
  static async all(userId = null) { 
    const filter = userId ? { where: { userId } } : {};
    return await prisma.products.findMany(filter);
  }

  static async findById(id) {
    return await prisma.products.findUnique({
      where: { id },
    });
  }

  static async create(userId, data) {
    return await prisma.products.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      }
    });
  }

  static async update(id, data) {
    return await prisma.products.update({
      where: { id },
      data,
    });
  }

  static async delete(id) {
    return await prisma.products.delete({
      where: { id },
    });
  }
}
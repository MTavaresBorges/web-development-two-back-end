import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
  async create(req, res, next) {
    try {
      const { full_name, email, password } = req.body;

      if (!full_name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      const createdUser = await prisma.users.create({
        data: { full_name, email, password },
        select: {
          full_name: true,
          email: true,
        },
      });

      res.status(201).json(createdUser);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { full_name, email, password } = req.body;

      if (!full_name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      const { id } = req.params;

      const updatedUser = await prisma.users.update({
        where: { id: parseInt(id) },
        data: { full_name, email, password },
        select: {
          id: true,
          full_name: true,
          email: true,
        },
      });

      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  }

  async list(req, res, next) {
    try {
      const users = await prisma.users.findMany({
        select: {
          id: true,
          full_name: true,
          email: true,
        },
      });
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();

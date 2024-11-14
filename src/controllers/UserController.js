import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
  async create(req, res, next) {
    try {
      // Filtrando apenas os campos desejados
      const { full_name, email, password } = req.body;

      // Validação opcional: verificar se todos os campos necessários estão presentes
      if (!full_name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      // Criando o usuário com os campos filtrados
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
      const { id } = req.params;
      const updatedData = req.body;

      const updatedUser = await prisma.users.update({
        where: { id: parseInt(id) },
        data: updatedData,
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

  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const deletedUser = await prisma.users.delete({
        where: { id: parseInt(id) },
        select: {
          id: true,
          full_name: true,
          email: true,
        },
      });

      res.status(200).json(deletedUser);
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

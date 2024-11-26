import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductController {

    async create(req, res, next) {
        try {
            const { name, description, price, banner } = req.body;

            if (!name || !price) {
            return res
                .status(400)
                .json({ message: "Todos os campos são obrigatórios" });
            }

            const createdProduct = await prisma.products.create({
            data: { name, description, price, banner },
            select: {
                name: true,
                description: true,
                price: true,
                banner: true
            },
            });

            res.status(201).json(createdProduct);
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
    try {
        const { name, description, price, banner } = req.body;

        if (!name || !price) {
        return res
            .status(400)
            .json({ message: "Todos os campos são obrigatórios" });
        }

        const { id } = req.params;

        const updatedProduct = await prisma.products.update({
        where: { id: parseInt(id) },
        data: { name, description, price, banner },
        select: {
            name: true,
            description: true,
            price: true,
            banner: true
        },
        });

        res.status(200).json(updatedProduct);
    } catch (err) {
        next(err);
        }
    }

    async list(req, res, next) {
    try {
        const products = await prisma.products.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            banner: true
        },
    });
    res.status(200).json(products);
    } catch (err) {
        next(err);
        }
    }
}

export default new ProductController();
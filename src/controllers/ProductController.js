import * as Yup from 'yup';
import ProductService from '../services/ProductService.js';

export default class ProductController {
  static async index(req, res) {
    const products = await ProductService.all(req.userId);
    res.json({ products });
  }

  static async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      description: Yup.string().required(),
    });

    try {
      const data = req.body;

      await schema.validate(data, { abortEarly: false });

      const product = await ProductService.create(req.userId, data);

      res.status(201).json(product);
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        return res.status(422).json({ errors: err.errors });
      }

      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      description: Yup.string(),
    });

    try {
      const data = req.body;

      await schema.validate(data, { abortEarly: false });

      const { id } = req.params;

      const product = await ProductService.update(parseInt(id), data);

      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }

      res.json(product);
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        return res.status(422).json({ errors: err.errors });
      }

      res.status(500).json({ message: err.message });
    }
  }

  static async show(req, res) {
    try {
      const { id } = req.params;

      const product = await ProductService.findById(parseInt(id));

      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }

      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  static async destroy(req, res) {
    try {
      const { id } = req.params;

      const product = await ProductService.delete(parseInt(id));

      if (!product) {
        return res.status(404).json({ message: 'Product not found.' });
      }

      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
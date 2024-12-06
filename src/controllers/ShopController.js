import ProductService from '../services/ProductService.js';

export default class ShopController {
  static async handle(req, res) {
    try {
      const { id } = req.params;

      const products = await ProductService.all(parseInt(id));

      res.json({ products });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}
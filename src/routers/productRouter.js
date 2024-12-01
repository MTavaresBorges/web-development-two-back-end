import express from 'express';
import ProductController from '../controllers/ProductController.js';

const router = express.Router();

router.get('/', ProductController.index);
router.post('/', ProductController.store);
router.put('/:id', ProductController.update);
router.get('/:id', ProductController.show);
router.delete('/:id', ProductController.destroy);

export default router;
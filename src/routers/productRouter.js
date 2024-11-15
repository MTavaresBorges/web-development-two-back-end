import express from 'express'
import ProductController from '../controllers/ProductController.js'

const router = express.Router()

router.get('/', ProductController.list)
router.post('/', ProductController.create)
router.put('/:id', ProductController.update)

export default router
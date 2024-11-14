import express from 'express'
import UserController from '../controllers/UserController.js'

const router = express.Router()

router.post('/', UserController.create)
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete)

export default router
import express from 'express';
import multer from 'multer';
import authenticated from '../middlewares/authenticated.js';
import ProductController from '../controllers/ProductController.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.use(authenticated);

router.get('/', ProductController.index);
router.post('/', ProductController.store);
router.put('/:id', ProductController.update);
router.get('/:id', ProductController.show);
router.delete('/:id', ProductController.destroy);
router.post('/:id/upload-banner', upload.single('file'), ProductController.uploadBanner);

export default router;
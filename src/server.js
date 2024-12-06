import express from 'express';
import cors from 'cors'

import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import TestConnectionController from './controllers/TestConnectionController.js';
import NotFoundController from './controllers/NotFoundController.js';
import AuthController from './controllers/AuthController.js';
import ShopController from './controllers/ShopController.js';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', TestConnectionController.handle);
app.post('/authenticate', AuthController.authenticate);
app.get('/shop/:id', ShopController.handle);
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('*', NotFoundController.handle);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
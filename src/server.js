import express from 'express';
import cors from 'cors'

import userRouter from './routers/userRouter.js';
// import productRouter from './routers/productRouter.js';
import TestConnectionController from './controllers/TestConnectionController.js';
import NotFoundController from './controllers/NotFoundController.js';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/test-connection', TestConnectionController.handle);
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('*', NotFoundController.handle);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routers/userRouter.js';

dotenv.config();

const app = express();

// const corsOptions = {
//     origin: (origin, callback) => {
//         const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Origin not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };

// app.use(cors(corsOptions));

// app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/user', userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://${process.env.HOST || 'localhost'}:${port}`);
});

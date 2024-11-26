import express from 'express';

const app = express();

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
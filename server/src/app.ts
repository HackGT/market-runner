import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'

import { scoresRoutes } from './routes/scores';
import { handleError } from './utils/handleError';
import { isAuthenticated } from './auth/auth';

const PORT = process.env.PORT || 8000

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cors());

app.get("/status", (req, res) => {
  res.status(200).send("Success")
})

app.use('/scores', scoresRoutes)

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
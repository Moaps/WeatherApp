import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importar o middleware cors
import userRoutes from './routes/user';

dotenv.config();

const app = express();

// Usar o middleware cors
app.use(cors());

app.use(express.json());

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
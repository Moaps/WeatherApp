import cors from 'cors'; // Importar o middleware cors
import dotenv from 'dotenv';
import express from 'express';
import dataviewPrev from './routes/dataview-previsao';
import userRoutes from './routes/user';

dotenv.config();

const app = express();

// Usar o middleware cors
app.use(cors());

app.use(express.json());

app.use('/users', userRoutes);
app.use('/dataview', dataviewPrev);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
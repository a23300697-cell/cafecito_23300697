import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pedidoRoutes from './routes/pedidoRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const carpetaFront = path.join(__dirname, '..', 'front');

const app = express();
const PUERTO = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(carpetaFront));

app.get('/', (req, res) => {
  res.sendFile(path.join(carpetaFront, 'index.html'));
});

app.use('/', pedidoRoutes);

app.listen(PUERTO, () => {
  console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});

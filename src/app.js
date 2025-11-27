// src/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Rotas (ajuste os caminhos se seu projeto usar nomes diferentes)
import productsRouter from './routes/products.js';
import movementsRouter from './routes/movements.js';
import reportsRouter from './routes/reports.js';
import authRouter from './routes/auth.js';

const app = express();

// middlewares base
import helmet from 'helmet'; // (ou const helmet = require('helmet'))
app.use(helmet({
  contentSecurityPolicy: false,    // desliga CSP (libera <script> inline)
  crossOriginOpenerPolicy: false   // remove o aviso amarelo
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// servir arquivos estáticos do frontend
app.use(express.static('public'));

// rotas da API
app.use('/auth', authRouter);
app.use('/produtos', productsRouter);
app.use('/movimentacoes', movementsRouter);
app.use('/relatorios', reportsRouter);

// rota raiz -> index.html
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.get('/', (_req, res) => {
  res.sendFile(join(__dirname, '../public/index.html'));
});

export default app;

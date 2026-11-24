import express from 'express';
import cors from 'cors';

import clientesRoutes from './routes/clientes.routes';
import loginRoutes from './routes/login.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'OK'
  });
});

app.use('/api/v1/clientes', clientesRoutes);
app.use('/api/v1/login', loginRoutes);

export default app;
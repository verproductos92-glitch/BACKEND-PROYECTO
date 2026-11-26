import express from 'express';
import cors from 'cors';

import catalogoRoutes from './routes/catalogo.routes';
import loginRoutes from './routes/login.routes';
import promocionesRoutes from './routes/promociones.routes';
import productoRoutes from './routes/producto.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'OK'
  });
});

app.use('/api/v1/catalogo', catalogoRoutes);
app.use('/api/v1/promociones', promocionesRoutes);
app.use('/api/v1/producto', productoRoutes);
app.use('/api/v1/login', loginRoutes);

export default app;
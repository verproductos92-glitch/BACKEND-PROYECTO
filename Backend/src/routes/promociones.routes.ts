
import { Router } from 'express';
import {
  obtenerPromociones,
  obtenerPromocionesPorId,
  crearPromociones,
  actualizarPromociones,
  eliminarPromociones
} from '../controllers/promociones.controller';

const router = Router();

router.get('/', obtenerPromociones);
router.get('/:id', obtenerPromocionesPorId);
router.post('/', crearPromociones);
router.put('/:id', actualizarPromociones);
router.delete('/:id', eliminarPromociones);

export default router;

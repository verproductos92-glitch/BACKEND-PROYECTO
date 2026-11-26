import { Router } from 'express';
import {
  obtenerCatalogo,
  obtenerCatalogoPorId,
  crearCatalogo,
  actualizarCatalogo,
  eliminarCatalogo
} from '../controllers/catalogo.controller';
 
const router = Router();
 
router.get('/', obtenerCatalogo);
router.get('/:id', obtenerCatalogoPorId);
router.post('/', crearCatalogo);
router.put('/:id', actualizarCatalogo);
router.delete('/:id', eliminarCatalogo);
 
export default router;
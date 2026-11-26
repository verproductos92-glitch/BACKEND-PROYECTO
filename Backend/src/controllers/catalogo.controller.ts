import { Request, Response } from 'express';

import { CatalogoModel } from '../models/catalogo.models';
 
export const obtenerCatalogo = async (req: Request, res: Response) => {

  try {

    const items = await CatalogoModel.obtenerTodos();

    res.json(items);

  } catch (error) {

    console.error('Error al obtener el catálogo:', error);

    res.status(500).json({ message: 'Error interno del servidor' });

  }

};
 
export const obtenerCatalogoPorId = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);
 
    if (Number.isNaN(id)) {

      return res.status(400).json({ message: 'ID inválido' });

    }
 
    const item = await CatalogoModel.obtenerPorId(id);
 
    if (!item) {

      return res.status(404).json({ message: 'Producto no encontrado' });

    }
 
    res.json(item);

  } catch (error) {

    console.error('Error al obtener el producto:', error);

    res.status(500).json({ message: 'Error interno del servidor' });

  }

};
 
export const crearCatalogo = async (req: Request, res: Response) => {

  try {

    const { producto, especificaciones, precio } = req.body;
 
    if (!producto || !especificaciones || precio === undefined) {

      return res.status(400).json({

        message: 'producto, especificaciones y precio son obligatorios'

      });

    }
 
    const item = await CatalogoModel.crear({ producto, especificaciones, precio });
 
    res.status(201).json(item);

  } catch (error) {

    console.error('Error al crear el producto:', error);

    res.status(500).json({ message: 'Error interno del servidor' });

  }

};
 
export const actualizarCatalogo = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);
 
    if (Number.isNaN(id)) {

      return res.status(400).json({ message: 'ID inválido' });

    }
 
    const { producto, especificaciones, precio } = req.body;
 
    if (!producto || !especificaciones || precio === undefined) {

      return res.status(400).json({

        message: 'producto, especificaciones y precio son obligatorios'

      });

    }
 
    const item = await CatalogoModel.actualizar(id, { producto, especificaciones, precio });
 
    if (!item) {

      return res.status(404).json({ message: 'Producto no encontrado' });

    }
 
    res.json(item);

  } catch (error) {

    console.error('Error al actualizar el producto:', error);

    res.status(500).json({ message: 'Error interno del servidor' });

  }

};
 
export const eliminarCatalogo = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);
 
    if (Number.isNaN(id)) {

      return res.status(400).json({ message: 'ID inválido' });

    }
 
    const eliminado = await CatalogoModel.eliminar(id);
 
    if (!eliminado) {

      return res.status(404).json({ message: 'Producto no encontrado' });

    }
 
    res.status(204).send();

  } catch (error) {

    console.error('Error al eliminar el producto:', error);

    res.status(500).json({ message: 'Error interno del servidor' });

  }

};
 
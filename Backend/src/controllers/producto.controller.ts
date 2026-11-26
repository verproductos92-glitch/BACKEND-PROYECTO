
import { Request, Response } from 'express';

import { ProductoModel } from '../models/producto.models';

export const obtenerProducto = async (req: Request, res: Response) => {

  try {

    const items = await ProductoModel.obtenerTodos();

    res.json(items);

  } catch (error) {

    console.error('Error al obtener los productos:', error);

    res.status(500).json({ message: 'Error interno del servidor' });

  }

};

export const obtenerProductoPorId = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {

      return res.status(400).json({ message: 'ID inválido' });

    }

    const item = await ProductoModel.obtenerPorId(id);

    if (!item) {

      return res.status(404).json({ message: 'Producto no encontrado' });

    }

    res.json(item);

  } catch (error) {

    console.error('Error al obtener el producto:', error);

    res.status(500).json({ message: 'Error interno del servidor' });

  }

};

export const crearProducto = async (req: Request, res: Response) => {

  try {

    const { nombre, descripcion, precio } = req.body;

    if (!nombre || !descripcion || precio === undefined) {

      return res.status(400).json({

        message: 'nombre, descripcion y precio son obligatorios'

      });

    }

    const item = await ProductoModel.crear({ nombre, descripcion, precio });

    res.status(201).json(item);

  } catch (error) {

    console.error('Error al crear el producto:', error);

    res.status(500).json({ message: 'Error interno del servidor' });

  }

};

export const actualizarProducto = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {

      return res.status(400).json({ message: 'ID inválido' });

    }

    const { nombre, descripcion, precio } = req.body;

    if (!nombre || !descripcion || precio === undefined) {

      return res.status(400).json({

        message: 'nombre, descripcion y precio son obligatorios'

      });

    }

    const item = await ProductoModel.actualizar(id, { nombre, descripcion, precio });

    if (!item) {

      return res.status(404).json({ message: 'Producto no encontrado' });

    }

    res.json(item);

  } catch (error) {

    console.error('Error al actualizar el producto:', error);

    res.status(500).json({ message: 'Error interno del servidor' });

  }

};

export const eliminarProducto = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {

      return res.status(400).json({ message: 'ID inválido' });

    }

    const eliminado = await ProductoModel.eliminar(id);

    if (!eliminado) {

      return res.status(404).json({ message: 'Producto no encontrado' });

    }

    res.status(204).send();

  } catch (error) {

    console.error('Error al eliminar el producto:', error);

    res.status(500).json({ message: 'Error interno del servidor' });

  }

};

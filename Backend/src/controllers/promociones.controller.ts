
import { Request, Response } from 'express';

import { PromocionesModel } from '../models/promociones.models';

export const obtenerPromociones = async (req: Request, res: Response) => {

  try {

    const items = await PromocionesModel.obtenerTodos();

    res.json(items);

  } catch (error) {

    console.error('Error al obtener las promociones:', error);

    res.status(500).json({ message: 'Error interno del servidor' });

  }

};

export const obtenerPromocionesPorId = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {

      return res.status(400).json({ message: 'ID inválido' });

    }

    const item = await PromocionesModel.obtenerPorId(id);

    if (!item) {

      return res.status(404).json({ message: 'Promoción no encontrada' });

    }

    res.json(item);

  } catch (error) {

    console.error('Error al obtener la promoción:', error);

    res.status(500).json({ message: 'Error interno del servidor' });

  }

};

export const crearPromociones = async (req: Request, res: Response) => {

  try {

    const { promocion, descripcion, descuento } = req.body;

    if (!promocion || !descripcion || descuento === undefined) {

      return res.status(400).json({

        message: 'promocion, descripcion y descuento son obligatorios'

      });

    }

    const item = await PromocionesModel.crear({ promocion, descripcion, descuento });

    res.status(201).json(item);

  } catch (error) {

    console.error('Error al crear la promoción:', error);

    res.status(500).json({ message: 'Error interno del servidor' });

  }

};

export const actualizarPromociones = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {

      return res.status(400).json({ message: 'ID inválido' });

    }

    const { promocion, descripcion, descuento } = req.body;

    if (!promocion || !descripcion || descuento === undefined) {

      return res.status(400).json({

        message: 'promocion, descripcion y descuento son obligatorios'

      });

    }

    const item = await PromocionesModel.actualizar(id, { promocion, descripcion, descuento });

    if (!item) {

      return res.status(404).json({ message: 'Promoción no encontrada' });

    }

    res.json(item);

  } catch (error) {

    console.error('Error al actualizar la promoción:', error);

    res.status(500).json({ message: 'Error interno del servidor' });

  }

};

export const eliminarPromociones = async (req: Request, res: Response) => {

  try {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {

      return res.status(400).json({ message: 'ID inválido' });

    }

    const eliminado = await PromocionesModel.eliminar(id);

    if (!eliminado) {

      return res.status(404).json({ message: 'Promoción no encontrada' });

    }

    res.status(204).send();

  } catch (error) {

    console.error('Error al eliminar la promoción:', error);

    res.status(500).json({ message: 'Error interno del servidor' });

  }

};

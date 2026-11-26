
import { pool } from '../config/db';

export interface Producto {

  id: number;

  nombre: string;

  descripcion: string;

  precio: number;

}

type DatosProducto = Omit<Producto, 'id'>;

export const ProductoModel = {

  obtenerTodos: async (): Promise<Producto[]> => {

    const { rows } = await pool.query('SELECT * FROM producto ORDER BY id');

    return rows;

  },

  obtenerPorId: async (id: number): Promise<Producto | undefined> => {

    const { rows } = await pool.query('SELECT * FROM producto WHERE id = $1', [id]);

    return rows[0];

  },

  crear: async (datos: DatosProducto): Promise<Producto> => {

    const { nombre, descripcion, precio } = datos;

    const { rows } = await pool.query(

      `INSERT INTO producto (nombre, descripcion, precio)

       VALUES ($1, $2, $3)

       RETURNING *`,

      [nombre, descripcion, precio]

    );

    return rows[0];

  },

  actualizar: async (id: number, datos: DatosProducto): Promise<Producto | null> => {

    const { nombre, descripcion, precio } = datos;

    const { rows } = await pool.query(

      `UPDATE producto

       SET nombre = $1, descripcion = $2, precio = $3

       WHERE id = $4

       RETURNING *`,

      [nombre, descripcion, precio, id]

    );

    return rows[0] ?? null;

  },

  eliminar: async (id: number): Promise<boolean> => {

    const { rowCount } = await pool.query('DELETE FROM producto WHERE id = $1', [id]);

    return (rowCount ?? 0) > 0;

  }

};

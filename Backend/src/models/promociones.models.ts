
import { pool } from '../config/db';

export interface Promociones {

  id: number;

  promocion: string;

  descripcion: string;

  descuento: number;

}

type DatosPromociones = Omit<Promociones, 'id'>;

export const PromocionesModel = {

  obtenerTodos: async (): Promise<Promociones[]> => {

    const { rows } = await pool.query('SELECT * FROM promociones ORDER BY id');

    return rows;

  },

  obtenerPorId: async (id: number): Promise<Promociones | undefined> => {

    const { rows } = await pool.query('SELECT * FROM promociones WHERE id = $1', [id]);

    return rows[0];

  },

  crear: async (datos: DatosPromociones): Promise<Promociones> => {

    const { promocion, descripcion, descuento } = datos;

    const { rows } = await pool.query(

      `INSERT INTO promociones (promocion, descripcion, descuento)

       VALUES ($1, $2, $3)

       RETURNING *`,

      [promocion, descripcion, descuento]

    );

    return rows[0];

  },

  actualizar: async (id: number, datos: DatosPromociones): Promise<Promociones | null> => {

    const { promocion, descripcion, descuento } = datos;

    const { rows } = await pool.query(

      `UPDATE promociones

       SET promocion = $1, descripcion = $2, descuento = $3

       WHERE id = $4

       RETURNING *`,

      [promocion, descripcion, descuento, id]

    );

    return rows[0] ?? null;

  },

  eliminar: async (id: number): Promise<boolean> => {

    const { rowCount } = await pool.query('DELETE FROM promociones WHERE id = $1', [id]);

    return (rowCount ?? 0) > 0;

  }

};

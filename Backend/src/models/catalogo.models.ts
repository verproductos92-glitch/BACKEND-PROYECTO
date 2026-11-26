import { pool } from '../config/db';
 
export interface Catalogo {

  id: number;

  producto: string;

  especificaciones: string;

  precio: number;

}
 
type DatosCatalogo = Omit<Catalogo, 'id'>;
 
export const CatalogoModel = {

  obtenerTodos: async (): Promise<Catalogo[]> => {

    const { rows } = await pool.query('SELECT * FROM catalogo ORDER BY id');

    return rows;

  },
 
  obtenerPorId: async (id: number): Promise<Catalogo | undefined> => {

    const { rows } = await pool.query('SELECT * FROM catalogo WHERE id = $1', [id]);

    return rows[0];

  },
 
  crear: async (datos: DatosCatalogo): Promise<Catalogo> => {

    const { producto, especificaciones, precio } = datos;
 
    const { rows } = await pool.query(

      `INSERT INTO catalogo (producto, especificaciones, precio)

       VALUES ($1, $2, $3)

       RETURNING *`,

      [producto, especificaciones, precio]

    );
 
    return rows[0];

  },
 
  actualizar: async (id: number, datos: DatosCatalogo): Promise<Catalogo | null> => {

    const { producto, especificaciones, precio } = datos;
 
    const { rows } = await pool.query(

      `UPDATE catalogo

       SET producto = $1, especificaciones = $2, precio = $3

       WHERE id = $4

       RETURNING *`,

      [producto, especificaciones, precio, id]

    );
 
    return rows[0] ?? null;

  },
 
  eliminar: async (id: number): Promise<boolean> => {

    const { rowCount } = await pool.query('DELETE FROM catalogo WHERE id = $1', [id]);

    return (rowCount ?? 0) > 0;

  }

};
 
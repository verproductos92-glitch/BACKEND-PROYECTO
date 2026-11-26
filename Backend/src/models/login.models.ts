import { pool } from '../config/db';
 
export interface Login {
  usuario: string;
  password: string;
}
 
export const LoginModel = {
  validar: async (usuario: string, password: string) => {
    const { rows } = await pool.query(
      'SELECT id, usuario FROM usuarios WHERE usuario = $1 AND password = $2',
      [usuario, password]
    );
  
    return rows[0] || null;
  },
};
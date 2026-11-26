 import path from "path"; //buscar el archivo .env
import dotenv from "dotenv"; //dotenv es un paquete que permite cargar variables de entorno desde un archivo .env a process.env
import { Pool } from "pg";//hace la conexion a base de datos postgres
 
dotenv.config({ path: path.resolve(__dirname, "../.env") });
 
export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
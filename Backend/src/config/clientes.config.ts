import type { Cliente } from '../models/clientes.model';

export const clientesDB: Cliente[] = [
  {
    id: 1,
    nombre: 'Ana',
    apellido: 'García',
    edad: 30,
    sexo: 'F',
    email: 'ana.garcia@example.com',
    fecha_creacion: new Date('2024-01-15T10:00:00.000Z')
  },
  {
    id: 2,
    nombre: 'Carlos',
    apellido: 'Ramírez',
    edad: 41,
    sexo: 'M',
    email: 'carlos.ramirez@example.com',
    fecha_creacion: new Date('2024-02-02T08:30:00.000Z')
  },
  {
    id: 3,
    nombre: 'Lucía',
    apellido: 'Fernández',
    edad: 25,
    sexo: 'F',
    email: 'lucia.fernandez@example.com',
    fecha_creacion: new Date('2024-03-21T16:45:00.000Z')
  }
];

export const obtenerSiguienteId = (): number => {
  const maxId = clientesDB.reduce((max, cliente) => Math.max(max, cliente.id), 0);

  return maxId + 1;
};

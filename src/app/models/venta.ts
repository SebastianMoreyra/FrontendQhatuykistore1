import { Usuario } from './usuario';

export class Venta {
  idVenta: number = 0;
  montoTotal: number = 0;
  fechaHora: Date = new Date();
  users: Usuario = new Usuario();
}
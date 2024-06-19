import { Usuario } from './usuario';

export class Delivery {
  idDelivery: number = 0;
  direccionDelivery: string = '';
  estadoDelivery: string = '';
  telefono: number = 0;
  datosAdicionales: string = '';
  users: Usuario = new Usuario();
}

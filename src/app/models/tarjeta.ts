export class Tarjeta {
  idTarjeta: number = 0;
  titular:string = "";
  tipo:string = "";
  numero:string = "";
  ccv:number = 0;
  fechaVencimiento:Date = new Date();
  direccionFacturacion:string = "";
}
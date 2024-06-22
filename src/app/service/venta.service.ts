import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/enviroment';
import { Subject } from 'rxjs';
import { Venta } from '../models/venta';
import { HttpClient } from '@angular/common/http';
const base_url=enviroment.base

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private url=`${base_url}/ventas`;
  private listaCambio= new Subject<Venta[]>();
  constructor(private http:HttpClient) { }
  
  list(){
    return this.http.get<Venta[]>(this.url);
  }
  insert(c:Venta){
    return this.http.post(this.url, c);
  }
  setLista(listaNueva:Venta[]){
    this.listaCambio.next(listaNueva);
  }
  getLista(){
    return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Venta>(`${this.url}/${id}`)
  }
  update(c:Venta){
    return this.http.put(this.url, c);
  }
}

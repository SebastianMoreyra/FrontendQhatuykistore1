import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { enviroment } from '../../environments/enviroment';
import { Delivery } from '../models/delivery';
import { DeliveryxUsuarioDTO } from '../models/deliveryxUsuarioDTO';
const base_url=enviroment.base

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private url=`${base_url}/deliveries`;
  private listaCambio= new Subject<Delivery[]>();
  constructor(private http:HttpClient) { }
  
  list(){
    return this.http.get<Delivery[]>(this.url);
  }
  insert(c:Delivery){
    return this.http.post(this.url, c);
  }
  setLista(listaNueva:Delivery[]){
    this.listaCambio.next(listaNueva);
  }
  getLista(){
    return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Delivery>(`${this.url}/${id}`)
  }
  update(c:Delivery){
    return this.http.put(this.url, c);
  }
  getCantidad():Observable<DeliveryxUsuarioDTO[]>{
    return this.http.get<DeliveryxUsuarioDTO[]>(`${this.url}/consulta02`);
  }
}

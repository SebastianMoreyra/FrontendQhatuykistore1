import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/enviroment';
import { Productos } from '../models/producto';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url=enviroment.base

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url=`${base_url}/productos`;
  private listaCambio= new Subject<Productos[]>();
  constructor(private http:HttpClient) { }
  
  list(){
    return this.http.get<Productos[]>(this.url);
  }
  insert(c:Productos){
    return this.http.post(this.url, c);
  }
  setLista(listaNueva:Productos[]){
    this.listaCambio.next(listaNueva);
  }
  getLista(){
    return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Productos>(`${this.url}/${id}`)
  }
  update(c:Productos){
    return this.http.put(this.url, c);
  }
}

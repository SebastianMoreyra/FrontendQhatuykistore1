import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/enviroment';
import { Categoria } from '../models/categoria';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url=enviroment.base

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url=`${base_url}/categorias`;
  private listaCambio= new Subject<Categoria[]>();
  constructor(private http:HttpClient) { }
  
  list(){
    return this.http.get<Categoria[]>(this.url);
  }
  insert(c:Categoria){
    return this.http.post(this.url, c);
  }
  setLista(listaNueva:Categoria[]){
    this.listaCambio.next(listaNueva);
  }
  getLista(){
    return this.listaCambio.asObservable()
  }

  listId(id:number){
    return this.http.get<Categoria>(`${this.url}/${id}`)
  }
  update(c:Categoria){
    return this.http.put(this.url, c);
  }
}

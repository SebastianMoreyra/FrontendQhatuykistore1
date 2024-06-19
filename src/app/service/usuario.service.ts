import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/enviroment';
import { Usuario } from '../models/usuario';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url = enviroment.base;

@Injectable({
  providedIn:'root',
})
export class UsuarioService {
  private url = `${base_url}/usuarios`;
  private listaC = new Subject<Usuario[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Usuario[]>(this.url);
  }
  setList(listaNueva: Usuario[]) {
    this.listaC.next(listaNueva);
  }
  getList() {
    return this.listaC.asObservable();
  }
}

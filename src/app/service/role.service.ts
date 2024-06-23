import { Injectable } from '@angular/core';
import { enviroment } from '../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RolxUsuarioDTO } from '../models/rolxUsuarioDTO';
const base_url=enviroment.base

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private url=`${base_url}/roles`;
  constructor(private http:HttpClient) { }

  getCantidadRolexUsuario():Observable<RolxUsuarioDTO[]>{
    return this.http.get<RolxUsuarioDTO[]>(`${this.url}/consulta01`);
  }
}

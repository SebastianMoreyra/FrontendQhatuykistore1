import { TarjetasMasProximasAVencerDTO } from './../models/tarjetasMasProximasAVencerDTO';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { enviroment } from '../../environments/enviroment';
import { Tarjeta } from '../models/tarjeta';
import { TipotarjetamasusadoDTO } from '../models/tipotarjetamasusadoDTO';
const base_url = enviroment.base;

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  private url = `${base_url}/tarjetas`;
  private listaCambio = new Subject<Tarjeta[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Tarjeta[]>(this.url);
  }
  insert(c: Tarjeta) {
    return this.http.post(this.url, c);
  }
  setLista(listaNueva: Tarjeta[]) {
    this.listaCambio.next(listaNueva);
  }
  getLista() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Tarjeta>(`${this.url}/${id}`);
  }
  update(c: Tarjeta) {
    return this.http.put(this.url, c);
  }

  getTipoTarjetaMasUsado(): Observable<TipotarjetamasusadoDTO[]> {
    return this.http.get<TipotarjetamasusadoDTO[]>(
      `${this.url}/tarjetaquery01`
    );
  }

  getTarjetaMasProximaVencimiento(): Observable<
    TarjetasMasProximasAVencerDTO[]
  > {
    return this.http.get<TarjetasMasProximasAVencerDTO[]>(
      `${this.url}/tarjetaquery02`
    );
  }
}

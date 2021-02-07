import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Gastos } from '../models/gasto.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  public gasto: Gastos;

  constructor(private http: HttpClient) { }

  get id(): string {
    return this.gasto.id || '';
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarGasto() {
    
    const url = `${base_url}/gasto`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, gasto: Gastos[]}) => resp.gasto)
    )
  }

  obtenerGastosPorId(id: string) {
    const url = `${base_url}/gasto/${id}`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, gasto: Gastos}) => resp.gasto)
    )
  }

  crearGasto(gasto: Gastos, idpre: string) {
    const url = `${base_url}/gasto/${idpre}`;
    return this.http.post(url, gasto, this.headers);

  }
    
  actualizarGasto(gasto: Gastos) {
    const url = `${base_url}/gasto/${gasto.id}`;
    return this.http.put(url, gasto, this.headers);

  }
  
  borrarGasto(id: string) {
    const url = `${base_url}/gasto/${id}`;
    return this.http.delete(url, this.headers);

  }
}

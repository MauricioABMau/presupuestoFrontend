import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Presupuesto } from '../models/presupuesto.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class PresupuestoService {

  public presupuesto: Presupuesto;

  constructor(private http: HttpClient) { }

  get id(): string {
    return this.presupuesto.id || '';
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

  cargarPresupuesto() {
    
    const url = `${base_url}/presupuesto`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, presupuesto: Presupuesto[]}) => resp.presupuesto)
    )
  }

  obtenerPresupuestoPorId(id: string) {
    const url = `${base_url}/presupuesto/${id}`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, presupuesto: Presupuesto}) => resp.presupuesto)
    )
  }

  crearPresupuesto(presupuesto: Presupuesto, idpro: string) {
    const url = `${base_url}/presupuesto/${idpro}`;
    return this.http.post(url, presupuesto, this.headers);

  }
    
  actualizarPresupuesto(presupuesto: Presupuesto) {
    const url = `${base_url}/presupuesto/${presupuesto.id}`;
    return this.http.put(url, presupuesto, this.headers);

  }
  
  borrarPresupuesto(id: string) {
    const url = `${base_url}/presupuesto/${id}`;
    return this.http.delete(url, this.headers);

  }
}

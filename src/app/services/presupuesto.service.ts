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

  constructor(private http: HttpClient) { }

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

  crearPresupuesto(presupuesto_total: ConstrainDouble, presupuesto_precio_unitario: ConstrainDouble, utilidad: ConstrainDouble, iva: ConstrainDouble, it: ConstrainDouble) {
    const url = `${base_url}/presupuesto`;
    return this.http.post(url, {presupuesto_total, presupuesto_precio_unitario, utilidad, iva, it}, this.headers);

  }
    
  actualizarPresupuesto(id: string, presupuesto_total: ConstrainDouble, presupuesto_precio_unitario: ConstrainDouble, utilidad: ConstrainDouble, iva: ConstrainDouble, it: ConstrainDouble) {
    const url = `${base_url}/presupuesto/${id}`;
    return this.http.put(url, {presupuesto_total, presupuesto_precio_unitario, utilidad, iva, it}, this.headers);

  }
  
  borrarPresupuesto(id: string) {
    const url = `${base_url}/presupuesto/${id}`;
    return this.http.delete(url, this.headers);

  }
}

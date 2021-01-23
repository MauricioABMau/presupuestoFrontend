import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Proyecto } from '../models/proyecto.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

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

  cargarProyecto() {
    
    const url = `${base_url}/proyecto`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, proyecto: Proyecto[]}) => resp.proyecto)
      )
    }
    
  crearProyecto(nombre_proyecto: string, departamento: string, direccion: string) {
    const url = `${base_url}/proyecto`;
    return this.http.post(url, {nombre_proyecto, departamento, direccion}, this.headers);

  }
    
  actualizarProyecto(id: string, nombre_proyecto: string, departamento: string, direccion: string) {
    const url = `${base_url}/proyecto/${id}`;
    return this.http.put(url, {nombre_proyecto, departamento, direccion}, this.headers);

  }
  
  borrarProyecto(id: string) {
    const url = `${base_url}/proyecto/${id}`;
    return this.http.delete(url, this.headers);

  }

}

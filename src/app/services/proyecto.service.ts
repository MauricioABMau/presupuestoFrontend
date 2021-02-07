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

  public proyecto: Proyecto;
  
  constructor(private http: HttpClient) { }

  get id(): string {
    return this.proyecto.id || '';
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

  cargarProyecto() {
    
    const url = `${base_url}/proyecto`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, proyecto: Proyecto[]}) => resp.proyecto)
      )
    }

  obtenerProyectoPorId(id: string) {
    const url = `${base_url}/proyecto/${id}`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, proyecto: Proyecto}) => resp.proyecto)
    )
  }
    
  crearProyecto(proyecto: Proyecto) {
    const url = `${base_url}/proyecto`;
    return this.http.post(url, proyecto, this.headers);

  }
    
  actualizarProyecto(proyecto: Proyecto) {
    const url = `${base_url}/proyecto/${proyecto.id}`;
    return this.http.put(url, proyecto, this.headers);

  }
  
  borrarProyecto(id: string) {
    const url = `${base_url}/proyecto/${id}`;
    return this.http.delete(url, this.headers);

  }

}

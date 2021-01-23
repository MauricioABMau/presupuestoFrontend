import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Herramienta } from '../models/herramienta.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HerramientaService {

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

  cargarHerramienta() {
    
    const url = `${base_url}/herramienta`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, herramienta: Herramienta[]}) => resp.herramienta)
    )
  }

  crearHerramienta(nombre_herramienta: string,
                   tipo: string,
                   precio_herramienta: ConstrainDouble,) {
    const url = `${base_url}/herramienta`;
    return this.http.post(url, {nombre_herramienta,
                                tipo,
                                precio_herramienta}, this.headers);

  }
    
  actualizarHerramienta(id: string, 
                        nombre_herramienta: string,
                        tipo: string,
                        precio_herramienta: ConstrainDouble,) {
    const url = `${base_url}/herramienta/${id}`;
    return this.http.put(url, {nombre_herramienta,
      tipo,
      precio_herramienta}, this.headers);

  }
  
  borrarHerramienta(id: string) {
    const url = `${base_url}/herramienta/${id}`;
    return this.http.delete(url, this.headers);

  }
}

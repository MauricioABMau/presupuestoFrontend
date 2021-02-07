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

  public herramienta: Herramienta;

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

  obtenerHerramientaPorId(id: string) {
    const url = `${base_url}/herramienta/${id}`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, herramienta: Herramienta}) => resp.herramienta)
    )
  }
    
  crearHerramienta(herramienta: Herramienta, idit: string) {
    const url = `${base_url}/herramienta/${idit}`;
    return this.http.post(url, herramienta, this.headers);

  }
    
  actualizarHerramienta(herramienta: Herramienta) {
    const url = `${base_url}/herramienta/${herramienta.id}`;
    return this.http.put(url, herramienta, this.headers);

  }
  
  borrarHerramienta(id: string) {
    const url = `${base_url}/herramienta/${id}`;
    return this.http.delete(url, this.headers);

  }
}

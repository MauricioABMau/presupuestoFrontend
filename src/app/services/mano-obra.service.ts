import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ManoObra } from '../models/manoObra.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ManoObraService {

  public manoObra: ManoObra;

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

  cargarManoObra() {
    
    const url = `${base_url}/manoObra`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, manoObra: ManoObra[]}) => resp.manoObra)
    )
  }

  obtenerManoObraPorId(id: string) {
    const url = `${base_url}/manoObra/${id}`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, manoObra: ManoObra}) => resp.manoObra)
    )
  }
    

  crearManoObra(manoObra: ManoObra, idit: string) {
    const url = `${base_url}/manoObra/${idit}`;
    return this.http.post(url, manoObra, this.headers);

  }

  actualizarManoObra(manoObra: ManoObra) {
    const url = `${base_url}/manoObra/${manoObra.id}`;
    return this.http.put(url, manoObra, this.headers);

  }

  borrarManoObra(id: string) {
    const url = `${base_url}/manoObra/${id}`;
    return this.http.delete(url, this.headers);

  }
}

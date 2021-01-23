import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Material } from '../models/material.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

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

  cargarMaterial() {
    
    const url = `${base_url}/material`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, material: Material[]}) => resp.material)
    )
  }

  crearMaterial(nombre_material: string,
                cantidad_material: ConstrainDouble,
                precio_material: ConstrainDouble,) {
    const url = `${base_url}/material`;
    return this.http.post(url, {nombre_material,
                                cantidad_material,
                                precio_material}, this.headers);
  }

  actualizarMaterial(id: string,
                    nombre_material: string,
                    cantidad_material: ConstrainDouble,
                    precio_material: ConstrainDouble,) {
  const url = `${base_url}/material/${id}`;
  return this.http.put(url, {nombre_material,
                             cantidad_material,
                             precio_material}, this.headers);
  }

  borrarMaterial(id: string) {
    const url = `${base_url}/material/${id}`;
    return this.http.delete(url, this.headers);
  }
}

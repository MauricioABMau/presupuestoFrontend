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

  public material: Material;

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

  obtenerMaterialPorId(id: string) {
    const url = `${base_url}/material/${id}`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, material: Material}) => resp.material)
    )
  }

  crearMaterial(material: Material, idit: string) {
    const url = `${base_url}/material/${idit}`;
    return this.http.post(url, material, this.headers);
  }

  actualizarMaterial(material: Material) {
  const url = `${base_url}/material/${material.id}`;
  return this.http.put(url, material, this.headers);
  }

  borrarMaterial(id: string) {
    const url = `${base_url}/material/${id}`;
    return this.http.delete(url, this.headers);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Item } from '../models/item.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ItemService {

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

  cargarItem() {
    
    const url = `${base_url}/item`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, item: Item[]}) => resp.item)
    )
  }

  crearItem(descripcion: ConstrainDouble, unidad: ConstrainDouble, cantidad: ConstrainDouble, precio_producto: ConstrainDouble) {
    const url = `${base_url}/item`;
    return this.http.post(url, {descripcion, unidad, cantidad, precio_producto}, this.headers);

  }
    
  actualizarItem(id: string, descripcion: ConstrainDouble, unidad: ConstrainDouble, cantidad: ConstrainDouble, precio_producto: ConstrainDouble) {
    const url = `${base_url}/item/${id}`;
    return this.http.put(url, {descripcion, unidad, cantidad, precio_producto}, this.headers);

  }
  
  borrarItem(id: string) {
    const url = `${base_url}/item/${id}`;
    return this.http.delete(url, this.headers);

  }
}

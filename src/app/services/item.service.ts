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

  public item: Item;

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

  obtenerItemPorId(id: string) {
    const url = `${base_url}/item/${id}`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, item: Item}) => resp.item)
    )
  }

  crearItem(item: Item, idpre: string) {
    const url = `${base_url}/item/${idpre}`;
    return this.http.post(url, item, this.headers);

  }
    
  actualizarItem(item: Item) {
    const url = `${base_url}/item/${item.id}`;
    return this.http.put(url, item, this.headers);

  }
  
  borrarItem(id: string) {
    const url = `${base_url}/item/${id}`;
    return this.http.delete(url, this.headers);

  }
}

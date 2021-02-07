import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { Usuario } from '../models/usuario.model';
import { Proyecto } from '../models/proyecto.model';
import { Presupuesto } from '../models/presupuesto.model';
import { ManoObra } from '../models/manoObra.model';
import { Material } from '../models/material.model';
import { Herramienta } from '../models/herramienta.model';
import { Item } from '../models/item.model';
import { Gastos } from '../models/gasto.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  private transformarUsuarios(resultados: any[]): Usuario[]{
    
    return resultados.map(
      user => new Usuario(user.nombre, user.apellido, user.email, user.estado, '', user.google, user.imagen, user.rol, user.id)
    )
  }

  private transformarProyectos(resultados: any[]): Proyecto[]{
    return resultados;
  }

  private transformarPresupuesto(resultados: any[]): Presupuesto[]{
    return resultados;
  }

  private transformarGasto(resultados: any[]): Gastos[]{
    return resultados;
  }

  private transformarItem(resultados: any[]): Item[]{
    return resultados;
  }

  private transformarHerramienta(resultados: any[]): Herramienta[]{
    return resultados;
  }

  private transformarMaterial(resultados: any[]): Material[]{
    return resultados;
  }

  private transformarManoObra(resultados: any[]): ManoObra[]{
    return resultados;
  }

  
  //implementar las otras busquedas
  buscar(tipo: 'usuarios'| 'proyectos' | 'presupuestos' | 'gastos' | 'items' | 'materiales' | 'herramientas' | 'manoObra', termino: string) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
    .pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.transformarUsuarios(resp.resultados);      
          case 'proyectos':
            return this.transformarProyectos(resp.resultados);
          case 'presupuestos':
            return this.transformarPresupuesto(resp.resultados);
          case 'gastos':
            return this.transformarGasto(resp.resultados);
          case 'items':
            return this.transformarItem(resp.resultados);
          case 'materiales':
            return this.transformarMaterial(resp.resultados);
          case 'herramientas':
            return this.transformarHerramienta(resp.resultados);
          case 'manoObra':
            return this.transformarManoObra(resp.resultados);
        
          default:
            return[];
        }
      })
    )
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Gastos } from '../models/gasto.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GastoService {

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

  cargarGasto() {
    
    const url = `${base_url}/gasto`;
    return this.http.get(url, this.headers)
    .pipe(
      map((resp: {ok: boolean, gasto: Gastos[]}) => resp.gasto)
    )
  }

  crearGasto(lugar: ConstrainDouble,
                   profesional: ConstrainDouble,
                   documentos_legales: ConstrainDouble,
                   costo_garantia_contratos: ConstrainDouble,
                   costo_operacion: ConstrainDouble,
                   costo_administrativo: ConstrainDouble,
                   gasto_profecional_especial: ConstrainDouble,
                   riesgo_imprevisto: ConstrainDouble,
                   movilizacion_demolicion: ConstrainDouble,) {
    const url = `${base_url}/gasto`;
    return this.http.post(url, {lugar,
                                profesional,
                                documentos_legales,
                                costo_garantia_contratos,
                                costo_operacion,
                                costo_administrativo,
                                gasto_profecional_especial,
                                riesgo_imprevisto,
                                movilizacion_demolicion}, this.headers);

  }
    
  actualizarGasto(id: string,
                        lugar: ConstrainDouble,
                        profesional: ConstrainDouble,
                        documentos_legales: ConstrainDouble,
                        costo_garantia_contratos: ConstrainDouble,
                        costo_operacion: ConstrainDouble,
                        costo_administrativo: ConstrainDouble,
                        gasto_profecional_especial: ConstrainDouble,
                        riesgo_imprevisto: ConstrainDouble,
                        movilizacion_demolicion: ConstrainDouble,) {
    const url = `${base_url}/gasto/${id}`;
    return this.http.put(url, { lugar,
                                profesional,
                                documentos_legales,
                                costo_garantia_contratos,
                                costo_operacion,
                                costo_administrativo,
                                gasto_profecional_especial,
                                riesgo_imprevisto,
                                movilizacion_demolicion}, this.headers);

  }
  
  borrarGasto(id: string) {
    const url = `${base_url}/gasto/${id}`;
    return this.http.delete(url, this.headers);

  }
}

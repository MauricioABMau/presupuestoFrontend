import { Component, OnInit } from '@angular/core';
import { Presupuesto } from '../../models/presupuesto.model';

import { PresupuestoService } from '../../services/presupuesto.service';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styles: [
  ]
})
export class PresupuestoComponent implements OnInit {

  public presupuestos: Presupuesto[] = [];
  public cargando: boolean = true;
  public totalPresupuesto: number = 0;
  public desde: number = 0;

  constructor(private presupuestoService: PresupuestoService) { }
  
  ngOnInit(): void {
    this.cargarPresupuesto();
  }

  cargarPresupuesto() {
    this.cargando = true;

    this.presupuestoService.cargarPresupuesto()
    .subscribe(presupuesto => {
      console.log(presupuesto);
      this.cargando = false;
      this.presupuestos = presupuesto;
    })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if(this.desde < 0) {
      this.desde = 0;
    } else if(this.desde >= this.totalPresupuesto) {
      this.desde -= valor;
    }
    this.cargarPresupuesto();
  }

}

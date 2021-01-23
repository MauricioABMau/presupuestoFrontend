import { Component, OnInit } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gastos } from '../../models/gasto.model';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styles: [
  ]
})
export class GastoComponent implements OnInit {

  public gastos: Gastos[] = [];
  public cargando: boolean = true;
  public totalGasto: number = 0;
  public desde: number = 0;

  constructor(private gastoService: GastoService) { }
  
  ngOnInit(): void {
    this.cargarGasto();
  }

  cargarGasto() {
    this.cargando = true;

    this.gastoService.cargarGasto()
    .subscribe(gasto => {
      console.log(gasto);
      this.cargando = false;
      this.gastos = gasto;
    })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if(this.desde < 0) {
      this.desde = 0;
    } else if(this.desde >= this.totalGasto) {
      this.desde -= valor;
    }
    this.cargarGasto();
  }

}

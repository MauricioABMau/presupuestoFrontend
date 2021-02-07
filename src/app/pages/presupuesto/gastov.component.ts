import { Component, OnInit } from '@angular/core';
import { Presupuesto } from '../../models/presupuesto.model';
import { FormGroup } from '@angular/forms';
import { Gastos } from '../../models/gasto.model';
import { PresupuestoService } from '../../services/presupuesto.service';
import { BusquedasService } from '../../services/busquedas.service';
import { GastoService } from '../../services/gasto.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gastov',
  templateUrl: './gastov.component.html',
  styles: [
  ]
})
export class GastovComponent implements OnInit {

  public presupuestos: Presupuesto[] = [];
  public cargando: boolean = true;
  public totalGasto: number = 0;
  public desde: number = 0;
  public presupuetoForm: FormGroup;
  public idpro: string = '';
  public gastos: Gastos[] = [];

  constructor(private presupuestoService: PresupuestoService,
    private busquedasService: BusquedasService,
    private gastoService: GastoService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
     this.idpro = id;
    })
    this.cargarGasto();
}

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.cargarGasto();
    }
    this.busquedasService.buscar('presupuestos', termino)
    .subscribe((resultados: Presupuesto[]) => {
      this.presupuestos = resultados
    })
  }

  cargarGasto() {
    this.cargando = false;
    this.gastoService.cargarGasto()
    .subscribe( resp => {
      for (let index = 0; index < resp.length; index++) {
        if(resp[index].presupuestoId.toString() === this.idpro){
          this.gastos.push(resp[index])
          console.log(this.gastos);
        }
      }
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

  eliminarGasto(gasto: Gastos) {
    
    Swal.fire({
      title: 'Borrar gasto?',
      text: `Esta a punto de borrar a ${gasto.id}`,
      icon:'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if(result.value){
        this.gastoService.borrarGasto(gasto.id)
        .subscribe(resp => {
          this.cargarGasto();
          Swal.fire(
          'Gasto borrado',
          `${gasto.id} fue eliminado correctamente`,
          'success'
        );
      });
      }
    })
  }


}

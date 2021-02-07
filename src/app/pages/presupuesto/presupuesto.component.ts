import { Component, OnInit } from '@angular/core';
import { Presupuesto } from '../../models/presupuesto.model';

import { PresupuestoService } from '../../services/presupuesto.service';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../services/busquedas.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

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
  public presupuestoForm: FormGroup;

  constructor(private presupuestoService: PresupuestoService,
              private busquedasService: BusquedasService,
              private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.cargarPresupuesto();
    this.presupuestoForm = this.fb.group({
      presupuesto_total: ['', Validators.required],
      presupuesto_precio_unitario: ['', Validators.required],
      utilidad: ['', Validators.required],
      iva: ['', Validators.required],
      it: ['', Validators.required]
    })
  }

  buscar(termino: string) {
    console.log(termino);
    if(termino.length === 0) {
      return this.cargarPresupuesto();
    }
    this.busquedasService.buscar('presupuestos', termino)
    .subscribe((resultados: Presupuesto[]) => {
      this.presupuestos = resultados
    })
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

  guardarCambios(presupuesto: Presupuesto) {
    this.presupuestoService.actualizarPresupuesto(presupuesto)
    .subscribe(resp => {
      Swal.fire('Actualizado', presupuesto.proyecto.nombre_proyecto, 'success')
    })
  }
  
  eliminarPresupuesto(presupuesto: Presupuesto) {
    
    Swal.fire({
      title: 'Borrar presupuesto?',
      text: `Esta a punto de borrar a ${presupuesto.id}`,
      icon:'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if(result.value){
        this.presupuestoService.borrarPresupuesto(presupuesto.id)
        .subscribe(resp => {
          this.cargarPresupuesto();
          Swal.fire(
          'Presupuesto borrado',
          `${presupuesto.id} fue eliminado correctamente`,
          'success'
        );
      });
      }
    })
  }

}

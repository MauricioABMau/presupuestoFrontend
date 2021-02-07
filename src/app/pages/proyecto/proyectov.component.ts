import { Component, OnInit } from '@angular/core';
import { BusquedasService } from '../../services/busquedas.service';
import { Proyecto } from '../../models/proyecto.model';
import { FormGroup } from '@angular/forms';
import { ProyectoService } from '../../services/proyecto.service';
import { ActivatedRoute } from '@angular/router';
import { PresupuestoService } from '../../services/presupuesto.service';
import { Presupuesto } from '../../models/presupuesto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectov',
  templateUrl: './proyectov.component.html',
  styles: [
  ]
})
export class ProyectovComponent implements OnInit {

  public proyectos: Proyecto[] = [];
  public cargando: boolean = true;
  public totalProyecto: number = 0;
  public desde: number = 0;
  public proyectoForm: FormGroup;
  public idpro: string = '';
  public presupuestos: Presupuesto[] = [];

  constructor(private proyectoService: ProyectoService,
    private busquedasService: BusquedasService,
    private presupuestoService: PresupuestoService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
     this.idpro = id;
    })
    this.cargarPresupuesto();
}

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.cargarPresupuesto();
    }
    this.busquedasService.buscar('proyectos', termino)
    .subscribe((resultados: Proyecto[]) => {
      this.proyectos = resultados
    })
  }

  cargarPresupuesto() {
    this.cargando = false;
    this.presupuestoService.cargarPresupuesto()
    .subscribe( resp => {
      for (let index = 0; index < resp.length; index++) {
        if(resp[index].proyectoId.toString() === this.idpro){
          this.presupuestos.push(resp[index])
          console.log(this.presupuestos);
        }
      }
    })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if(this.desde < 0) {
      this.desde = 0;
    } else if(this.desde >= this.totalProyecto) {
      this.desde -= valor;
    }
    this.cargarPresupuesto();
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

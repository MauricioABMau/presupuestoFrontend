import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ProyectoService } from '../../services/proyecto.service';
import { BusquedasService } from '../../services/busquedas.service';

import { Proyecto } from '../../models/proyecto.model';
import { Presupuesto } from '../../models/presupuesto.model';
import { PresupuestoService } from '../../services/presupuesto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styles: [
  ]
})
export class ProyectoComponent implements OnInit {

  public proyectos: Proyecto[] = [];
  public cargando: boolean = true;
  public totalProyecto: number = 0;
  public desde: number = 0;
  public proyectoForm: FormGroup;

  constructor(private proyectoService: ProyectoService,
              private busquedasService: BusquedasService,
              private presupuestoService: PresupuestoService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cargarProyecto();
    this.proyectoForm = this.fb.group({
      nombre_proyecto: ['', Validators.required],
      departamento: ['', Validators.required],
      direccion: ['', Validators.required]
    })
  }

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.cargarProyecto();
    }
    this.busquedasService.buscar('proyectos', termino)
    .subscribe((resultados: Proyecto[]) => {
      this.proyectos = resultados
    })
  }

  cargarProyecto() {
    this.cargando = true;
    this.proyectoService.cargarProyecto()
    .subscribe(proyecto => {
      this.cargando = false;
      this.proyectos = proyecto;
    })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if(this.desde < 0) {
      this.desde = 0;
    } else if(this.desde >= this.totalProyecto) {
      this.desde -= valor;
    }
    this.cargarProyecto();
  }

  guardarCambios(proyecto: Proyecto) {
    this.proyectoService.actualizarProyecto(proyecto)
    .subscribe(resp => {
      Swal.fire('Actualizado', proyecto.nombre_proyecto, 'success')
    })
  }
  
  eliminarProyecto(proyecto: Proyecto) {
    
    Swal.fire({
      title: 'Borrar proyecto?',
      text: `Esta a punto de borrar a ${proyecto.nombre_proyecto}`,
      icon:'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if(result.value){
        this.proyectoService.borrarProyecto(proyecto.id)
        .subscribe(resp => {
          this.cargarProyecto();
          Swal.fire(
          'Proyecto borrado',
          `${proyecto.nombre_proyecto} fue eliminado correctamente`,
          'success'
        );
      });
      }
    })
  }

  verificaPresupuesto(presupuestoId: string) {  
    var auxPresupuesto: Presupuesto[] = [];
    this.presupuestoService.cargarPresupuesto()
    .subscribe( resp => {   
      for (let index = 0; index < resp.length; index++) {
        if(resp[index].proyectoId === null) {
          
        } else {
          if(resp[index].proyectoId === presupuestoId){
            auxPresupuesto.push(resp[index]);
          }
        }
      }
      if(auxPresupuesto.length >= 1) {
        Swal.fire(
          'No puede crear mas presupuesto para este proyecto',
          '',
          'error'
        )
        this.router.navigateByUrl(`dashboard/proyecto`)
      } else {
        this.router.navigateByUrl(`/dashboard/presupuestoc/nuevo/${presupuestoId}`)
      }
    })    
  }

}

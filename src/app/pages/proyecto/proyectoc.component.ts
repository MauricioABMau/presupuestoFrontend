import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-proyectoc',
  templateUrl: './proyectoc.component.html',
  styles: [
  ]
})
export class ProyectocComponent implements OnInit {

  public proyectoForm: FormGroup;
  public proyectos: Proyecto[] = [];
  public proyectoSeleccionado: Proyecto;

  constructor(private fb: FormBuilder,
              private proyectoService: ProyectoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(({id}) => {
       this.cargarProyectoById(id);
    })
    this.proyectoForm = this.fb.group({
      nombre_proyecto: ['', Validators.required],
      departamento: ['', Validators.required],
      direccion: ['', Validators.required],
    });
    this.cargarProyecto();
    
  }

  cargarProyecto() {
    this.proyectoService.cargarProyecto()
    .subscribe(proyecto => {
      this.proyectos = proyecto;
    })
  }
  
  cargarProyectoById(id: string) {

    if(id === 'nuevo') {
      return;
    }
    this.proyectoService.obtenerProyectoPorId(id)
    .subscribe(proyecto => {
      if(!proyecto) {
        return this.router.navigateByUrl(`dashboard/proyecto`)
      }
      const{nombre_proyecto, departamento, direccion} = proyecto;
      console.log(proyecto);
      this.proyectoSeleccionado = proyecto;
      this.proyectoForm.setValue({nombre_proyecto, departamento, direccion})
    })
  }

  guardarProyecto() {
    const {nombre_proyecto} = this.proyectoForm.value;

    if(this.proyectoSeleccionado) {
      //actualizar
      const data = { ...this.proyectoForm.value, id: this.proyectoSeleccionado.id}
      this.proyectoService.actualizarProyecto(data)
      .subscribe(resp => {
        Swal.fire('Actualizado', `${nombre_proyecto} actualizado`, 'success')
      })
    } else {
      //crear
      
      this.proyectoService.crearProyecto(this.proyectoForm.value)
      .subscribe((resp: any) => {
        console.log(resp);
        Swal.fire('Creado', `${nombre_proyecto} creado correctamente`, 'success');
        this.router.navigateByUrl(`dashboard/proyectoc/${resp.proyectoDB.id}`)
      })
    }
  }



}

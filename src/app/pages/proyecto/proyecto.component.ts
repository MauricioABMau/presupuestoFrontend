import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../services/proyecto.service';
import { Proyecto } from '../../models/proyecto.model';
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

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit(): void {
    this.cargarProyecto();
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


}

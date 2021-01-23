import { Component, OnInit } from '@angular/core';
import { Herramienta } from '../../models/herramienta.model';
import { HerramientaService } from '../../services/herramienta.service';

@Component({
  selector: 'app-estimacion-herramienta',
  templateUrl: './estimacion-herramienta.component.html',
  styles: [
  ]
})
export class EstimacionHerramientaComponent implements OnInit {

  public herramientas: Herramienta[] = [];
  public cargando: boolean = true;
  public totalHerramienta: number = 0;
  public desde: number = 0;

  constructor(private herramientaService: HerramientaService) { }
  
  ngOnInit(): void {
    this.cargarHerramienta();
  }

  cargarHerramienta() {
    this.cargando = true;

    this.herramientaService.cargarHerramienta()
    .subscribe(herramienta => {
      console.log(herramienta);
      this.cargando = false;
      this.herramientas = herramienta;
    })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if(this.desde < 0) {
      this.desde = 0;
    } else if(this.desde >= this.totalHerramienta) {
      this.desde -= valor;
    }
    this.cargarHerramienta();
  }

}

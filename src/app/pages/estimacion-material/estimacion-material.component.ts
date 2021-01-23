import { Component, OnInit } from '@angular/core';
import { Material } from '../../models/material.model';
import { MaterialService } from '../../services/material.service';

@Component({
  selector: 'app-estimacion-material',
  templateUrl: './estimacion-material.component.html',
  styles: [
  ]
})
export class EstimacionMaterialComponent implements OnInit {

  public materiales: Material[] = [];
  public cargando: boolean = true;
  public totalMaterial: number = 0;
  public desde: number = 0;

  constructor(private materialService: MaterialService) { }
  
  ngOnInit(): void {
    this.cargarMaterial();
  }

  cargarMaterial() {
    this.cargando = true;

    this.materialService.cargarMaterial()
    .subscribe(material => {
      console.log(material);
      this.cargando = false;
      this.materiales = material;
    })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if(this.desde < 0) {
      this.desde = 0;
    } else if(this.desde >= this.totalMaterial) {
      this.desde -= valor;
    }
    this.cargarMaterial();
  }

}

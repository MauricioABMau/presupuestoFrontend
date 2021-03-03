import { Component, OnInit } from '@angular/core';
import { Material } from '../../models/material.model';
import { MaterialService } from '../../services/material.service';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../services/busquedas.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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
  public materialForm: FormGroup;


  constructor(private materialService: MaterialService,
              private busquedasService: BusquedasService,
              private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.cargarMaterial();
    this.materialForm = this.fb.group({
      nombre_material: ['', Validators.required],
      precio_material: ['', Validators.required],
      cantidad_material: ['', Validators.required],
    })
  }

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.cargarMaterial();
    }
    this.busquedasService.buscar('materiales', termino)
    .subscribe((resultados: Material[]) => {
      this.materiales = resultados
    })
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

  guardarCambios(material: Material) {
    this.materialService.actualizarMaterial(material)
    .subscribe(resp => {
      Swal.fire('Actualizado', material.id, 'success')
    })
  }
  
  eliminarMaterial(material: Material) {
    
    Swal.fire({
      title: 'Borrar material?',
      text: `Esta a punto de borrar a ${material.id}`,
      icon:'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if(result.value){
        this.materialService.borrarMaterial(material.id)
        .subscribe(resp => {
          this.cargarMaterial();
          Swal.fire(
          'Material borrado',
          `${material.id} fue eliminado correctamente`,
          'success'
        );
      });
      }
    })
  }
}

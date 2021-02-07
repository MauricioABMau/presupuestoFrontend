import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';
import { BusquedasService } from '../../services/busquedas.service';
import { ActivatedRoute } from '@angular/router';
import { Material } from '../../models/material.model';
import { FormGroup } from '@angular/forms';
import { MaterialService } from '../../services/material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-materialv',
  templateUrl: './materialv.component.html',
  styles: [
  ]
})
export class MaterialvComponent implements OnInit {

  public items: Item[] = [];
  public cargando: boolean = true;
  public totalMaterial: number = 0;
  public desde: number = 0;
  public itemForm: FormGroup;
  public idpro: string = '';
  public materiales: Material[] = [];

  constructor(private itemService: ItemService,
    private busquedasService: BusquedasService,
    private materialService: MaterialService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
     this.idpro = id;
    })
    this.cargarMaterial();
}

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.cargarMaterial();
    }
    this.busquedasService.buscar('items', termino)
    .subscribe((resultados: Item[]) => {
      this.items = resultados
    })
  }

  cargarMaterial() {
    this.cargando = false;
    this.materialService.cargarMaterial()
    .subscribe( resp => {
      for (let index = 0; index < resp.length; index++) {
        if(resp[index].itemId.toString() === this.idpro){
          this.materiales.push(resp[index])
          console.log(this.materiales);
        }
      }
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

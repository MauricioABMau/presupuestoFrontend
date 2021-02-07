import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../services/busquedas.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styles: [
  ]
})
export class ItemComponent implements OnInit {

  public items: Item[] = [];
  public cargando: boolean = true;
  public totalItem: number = 0;
  public desde: number = 0;
  public itemForm: FormGroup;

  constructor(private itemService: ItemService,
              private busquedasService: BusquedasService,
              private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.cargarItem();
    this.itemForm = this.fb.group({
      descripcion: ['', Validators.required],
      unidad: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio_producto: ['', Validators.required],
    })
  }

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.cargarItem();
    }
    this.busquedasService.buscar('items', termino)
    .subscribe((resultados: Item[]) => {
      this.items = resultados
    })
  }

  cargarItem() {
    this.cargando = true;

    this.itemService.cargarItem()
    .subscribe(item => {
      console.log(item);
      this.cargando = false;
      this.items = item;
    })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if(this.desde < 0) {
      this.desde = 0;
    } else if(this.desde >= this.totalItem) {
      this.desde -= valor;
    }
    this.cargarItem();
  }

  guardarCambios(item: Item) {
    this.itemService.actualizarItem(item)
    .subscribe(resp => {
      Swal.fire('Actualizado', item.id, 'success')
    })
  }
  
  eliminarItem(item: Item) {
  
    Swal.fire({
      title: 'Borrar item?',
      text: `Esta a punto de borrar a ${item.id}`,
      icon:'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if(result.value){
        this.itemService.borrarItem(item.id)
        .subscribe(resp => {
          this.cargarItem();
          Swal.fire(
          'Item borrado',
          `${item.id} fue eliminado correctamente`,
          'success'
        );
      });
      }
    })
  }

}

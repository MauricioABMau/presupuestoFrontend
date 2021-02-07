import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Presupuesto } from '../../models/presupuesto.model';
import { Item } from '../../models/item.model';
import { PresupuestoService } from '../../services/presupuesto.service';
import { BusquedasService } from '../../services/busquedas.service';
import { ItemService } from '../../services/item.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-itemv',
  templateUrl: './itemv.component.html',
  styles: [
  ]
})
export class ItemvComponent implements OnInit {

  public presupuestos: Presupuesto[] = [];
  public cargando: boolean = true;
  public totalItem: number = 0;
  public desde: number = 0;
  public presupuetoForm: FormGroup;
  public idpro: string = '';
  public items: Item[] = [];

  constructor(private presupuestoService: PresupuestoService,
    private busquedasService: BusquedasService,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
     this.idpro = id;
    })
    this.cargarItem();
}

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.cargarItem();
    }
    this.busquedasService.buscar('presupuestos', termino)
    .subscribe((resultados: Presupuesto[]) => {
      this.presupuestos = resultados
    })
  }

  cargarItem() {
    this.cargando = false;
    this.itemService.cargarItem()
    .subscribe( resp => {
      for (let index = 0; index < resp.length; index++) {
        if(resp[index].presupuestoId.toString() === this.idpro){
          this.items.push(resp[index])
          console.log(this.items);
        }
      }
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
          'Gasto borrado',
          `${item.id} fue eliminado correctamente`,
          'success'
        );
      });
      }
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { ManoObra } from '../../models/manoObra.model';
import { ManoObraService } from '../../services/mano-obra.service';
import { ItemService } from '../../services/item.service';
import { BusquedasService } from '../../services/busquedas.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../../models/item.model';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mano-obrav',
  templateUrl: './mano-obrav.component.html',
  styles: [
  ]
})
export class ManoObravComponent implements OnInit {

  public items: Item[] = [];
  public cargando: boolean = true;
  public totalmanoObra: number = 0;
  public desde: number = 0;
  public itemForm: FormGroup;
  public idpro: string = '';
  public manoObras: ManoObra[] = [];

  constructor(private itemService: ItemService,
    private busquedasService: BusquedasService,
    private manoObraService: ManoObraService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
     this.idpro = id;
    })
    this.cargarManoObra();
}

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.cargarManoObra();
    }
    this.busquedasService.buscar('items', termino)
    .subscribe((resultados: Item[]) => {
      this.items = resultados
    })
  }

  cargarManoObra() {
    this.cargando = false;
    this.manoObraService.cargarManoObra()
    .subscribe( resp => {
      for (let index = 0; index < resp.length; index++) {
        if(resp[index].itemId.toString() === this.idpro){
          this.manoObras.push(resp[index])
          console.log(this.manoObras);
        }
      }
    })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if(this.desde < 0) {
      this.desde = 0;
    } else if(this.desde >= this.totalmanoObra) {
      this.desde -= valor;
    }
    this.cargarManoObra();
  }

  eliminarManoObra(manoObra: ManoObra) {
    
    Swal.fire({
      title: 'Borrar manoObra?',
      text: `Esta a punto de borrar a ${manoObra.id}`,
      icon:'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if(result.value){
        this.manoObraService.borrarManoObra(manoObra.id)
        .subscribe(resp => {
          this.cargarManoObra();
          Swal.fire(
          'Mano de obra borrado',
          `${manoObra.id} fue eliminado correctamente`,
          'success'
        );
      });
      }
    })
  }


}

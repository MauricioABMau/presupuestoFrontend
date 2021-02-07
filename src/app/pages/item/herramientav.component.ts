import { Component, OnInit } from '@angular/core';
import { HerramientaService } from '../../services/herramienta.service';
import { Item } from '../../models/item.model';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { ItemService } from '../../services/item.service';
import { FormGroup } from '@angular/forms';
import { Herramienta } from '../../models/herramienta.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-herramientav',
  templateUrl: './herramientav.component.html',
  styles: [
  ]
})
export class HerramientavComponent implements OnInit {

  public items: Item[] = [];
  public cargando: boolean = true;
  public totalHerramienta: number = 0;
  public desde: number = 0;
  public itemForm: FormGroup;
  public idpro: string = '';
  public herramientas: Herramienta[] = [];

  constructor(private itemService: ItemService,
    private busquedasService: BusquedasService,
    private herramientaService: HerramientaService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
     this.idpro = id;
    })
    this.cargarHerramienta();
}

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.cargarHerramienta();
    }
    this.busquedasService.buscar('items', termino)
    .subscribe((resultados: Item[]) => {
      this.items = resultados
    })
  }

  cargarHerramienta() {
    this.cargando = false;
    this.herramientaService.cargarHerramienta()
    .subscribe( resp => {
      for (let index = 0; index < resp.length; index++) {
        if(resp[index].itemId.toString() === this.idpro){
          this.herramientas.push(resp[index])
          console.log(this.herramientas);
        }
      }
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

  eliminarHerramienta(herramienta: Herramienta) {
    
    Swal.fire({
      title: 'Borrar herramienta?',
      text: `Esta a punto de borrar a ${herramienta.id}`,
      icon:'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if(result.value){
        this.herramientaService.borrarHerramienta(herramienta.id)
        .subscribe(resp => {
          this.cargarHerramienta();
          Swal.fire(
          'Herramienta borrado',
          `${herramienta.id} fue eliminado correctamente`,
          'success'
        );
      });
      }
    })
  }


}

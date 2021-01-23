import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

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

  constructor(private itemService: ItemService) { }
  
  ngOnInit(): void {
    this.cargarItem();
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

}

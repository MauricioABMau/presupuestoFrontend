import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-itemc',
  templateUrl: './itemc.component.html',
  styles: [
  ]
})
export class ItemcComponent implements OnInit {

  public itemForm: FormGroup;
  public items: Item[] = [];
  public itemSeleccionado: Item;
  public url: string = '';
  public idpre: string = '';

  constructor(private fb: FormBuilder,
              private itemService: ItemService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(({id}) => {
       this.cargarItemById(id);
       this.idpre = id;
    })
    this.itemForm = this.fb.group({
      descripcion: ['', Validators.required],
      unidad: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio_producto: ['', Validators.required],
    });
    this.cargarItem();
    
  }

  cargarItem() {
    this.itemService.cargarItem()
    .subscribe(item => {
      this.items = item;
    })
  }
  
  cargarItemById(id: string) {
    this.url = this.activatedRoute.snapshot.url[1].path;

    if(this.url === 'nuevo') {
      return;
    }
    this.itemService.obtenerItemPorId(id)
    .subscribe(item => {
      if(!item) {
        return this.router.navigateByUrl(`dashboard/item`)
      }
      const{descripcion, unidad, cantidad, precio_producto} = item;
      console.log(item);
      this.itemSeleccionado = item;
      this.itemForm.setValue({descripcion, unidad, cantidad, precio_producto})
    })
  }

  guardarItem() {
    const {id} = this.itemForm.value;

    if(this.itemSeleccionado) {
      //actualizar
      const data = { ...this.itemForm.value, id: this.itemSeleccionado.id}
      this.itemService.actualizarItem(data)
      .subscribe(resp => {
        Swal.fire('Actualizado', `${id} actualizado`, 'success')
      })
    } else {
      //crear
      
      this.itemService.crearItem(this.itemForm.value, this.idpre)
      .subscribe((resp: any) => {
        console.log(resp);
        Swal.fire('Creado', `${id} creado correctamente`, 'success');
        this.router.navigateByUrl(`dashboard/itemc/${resp.itemDB.id}`)
      })
    }
  }



}

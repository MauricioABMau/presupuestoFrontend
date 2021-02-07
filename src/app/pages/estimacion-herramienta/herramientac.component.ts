import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Herramienta } from '../../models/herramienta.model';
import { HerramientaService } from '../../services/herramienta.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-herramientac',
  templateUrl: './herramientac.component.html',
  styles: [
  ]
})
export class HerramientacComponent implements OnInit {

  public herramientaForm: FormGroup;
  public herramientas: Herramienta[] = [];
  public herramientaSeleccionado: Herramienta;
  public url: string = '';
  public idit: string = '';

  constructor(private fb: FormBuilder,
              private herramientaService: HerramientaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(({id}) => {
       this.cargarHerramientaById(id);
       this.idit = id;
    })
    this.herramientaForm = this.fb.group({
      descripcion: ['', Validators.required],
      unidad: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio_producto: ['', Validators.required],
    });
    this.cargarHerramienta();
    
  }

  cargarHerramienta() {
    this.herramientaService.cargarHerramienta()
    .subscribe(herramienta => {
      this.herramientas = herramienta;
    })
  }
  
  cargarHerramientaById(id: string) {
    this.url = this.activatedRoute.snapshot.url[1].path;

    if(this.url === 'nuevo') {
      return;
    }
    this.herramientaService.obtenerHerramientaPorId(id)
    .subscribe(herramienta => {
      if(!herramienta) {
        return this.router.navigateByUrl(`dashboard/herramienta`)
      }
      const{nombre_herramienta, tipo, precio_herramienta} = herramienta;
      console.log(herramienta);
      this.herramientaSeleccionado = herramienta;
      this.herramientaForm.setValue({nombre_herramienta, tipo, precio_herramienta})
    })
  }

  guardarHerramienta() {
    const {id} = this.herramientaForm.value;

    if(this.herramientaSeleccionado) {
      //actualizar
      const data = { ...this.herramientaForm.value, id: this.herramientaSeleccionado.id}
      this.herramientaService.actualizarHerramienta(data)
      .subscribe(resp => {
        Swal.fire('Actualizado', `${id} actualizado`, 'success')
      })
    } else {
      //crear
      
      this.herramientaService.crearHerramienta(this.herramientaForm.value, this.idit)
      .subscribe((resp: any) => {
        console.log(resp);
        Swal.fire('Creado', `${id} creado correctamente`, 'success');
        this.router.navigateByUrl(`dashboard/herramientac/${resp.herramientaDB.id}`)
      })
    }
  }



}

import { Component, OnInit } from '@angular/core';
import { Herramienta } from '../../models/herramienta.model';
import { HerramientaService } from '../../services/herramienta.service';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../services/busquedas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-estimacion-herramienta',
  templateUrl: './estimacion-herramienta.component.html',
  styles: [
  ]
})
export class EstimacionHerramientaComponent implements OnInit {

  public herramientas: Herramienta[] = [];
  public cargando: boolean = true;
  public totalHerramienta: number = 0;
  public desde: number = 0;
  public herramientaForm: FormGroup;


  constructor(private herramientaService: HerramientaService,
              private busquedasService: BusquedasService,
              private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.cargarHerramienta();
    this.herramientaForm = this.fb.group({
      nombre_herramienta: ['', Validators.required],
      tipo: ['', Validators.required],
      precio_herramienta: ['', Validators.required],
      
    })
  }

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.cargarHerramienta();
    }
    this.busquedasService.buscar('herramientas', termino)
    .subscribe((resultados: Herramienta[]) => {
      this.herramientas = resultados
    })
  }

  cargarHerramienta() {
    this.cargando = true;

    this.herramientaService.cargarHerramienta()
    .subscribe(herramienta => {
      console.log(herramienta);
      this.cargando = false;
      this.herramientas = herramienta;
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

  guardarCambios(herramienta: Herramienta) {
    this.herramientaService.actualizarHerramienta(herramienta)
    .subscribe(resp => {
      Swal.fire('Actualizado', herramienta.id, 'success')
    })
  }
  
  eliminarHerramienta(herramienta: Herramienta) {
    this.herramientaService.borrarHerramienta(herramienta.id)
    .subscribe(resp => {
      this.cargarHerramienta();
      Swal.fire('Borrado', herramienta.id, 'success')
    })
  }

}

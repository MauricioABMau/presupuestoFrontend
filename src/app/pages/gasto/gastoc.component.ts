import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Gastos } from '../../models/gasto.model';
import { GastoService } from '../../services/gasto.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gastoc',
  templateUrl: './gastoc.component.html',
  styles: [
  ]
})
export class GastocComponent implements OnInit {

  public gastoForm: FormGroup;
  public gastos: Gastos[] = [];
  public gastoSeleccionado: Gastos;
  public url: string = '';
  public idpre: string = '';

  constructor(private fb: FormBuilder,
              private gastoService: GastoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(({id}) => {
       this.cargarGastosById(id);
       this.idpre = id;
    })
    this.gastoForm = this.fb.group({
      lugar: ['', Validators.required],
      profesional: ['', Validators.required],
      documentos_legales: ['', Validators.required],
      costo_garantia_contratos: ['', Validators.required],
      costo_operacion: ['', Validators.required],
      costo_administrativo: ['', Validators.required],
      gasto_profecional_especial: ['', Validators.required],
      riesgo_imprevisto: ['', Validators.required],
      movilizacion_demolicion: ['', Validators.required],
    });
    this.cargarGastos();
    
  }

  cargarGastos() {
    this.gastoService.cargarGasto()
    .subscribe(gasto => {
      this.gastos = gasto;
    })
  }
  
  cargarGastosById(id: string) {
    this.url = this.activatedRoute.snapshot.url[1].path;

    if(this.url === 'nuevo') {
      return;
    }
    this.gastoService.obtenerGastosPorId(id)
    .subscribe(gasto => {
      if(!gasto) {
        return this.router.navigateByUrl(`dashboard/gasto`)
      }
      const{lugar, profesional, documentos_legales, costo_garantia_contratos, costo_operacion, costo_administrativo, gasto_profecional_especial, riesgo_imprevisto, movilizacion_demolicion}  = gasto;
      console.log(gasto);
      this.gastoSeleccionado = gasto;
      this.gastoForm.setValue({lugar, profesional, documentos_legales, costo_garantia_contratos, costo_operacion, costo_administrativo, gasto_profecional_especial, riesgo_imprevisto, movilizacion_demolicion})
    })
  }

  guardarGastos() {
    const {id} = this.gastoForm.value;

    if(this.gastoSeleccionado) {
      //actualizar
      const data = { ...this.gastoForm.value, id: this.gastoSeleccionado.id}
      this.gastoService.actualizarGasto(data)
      .subscribe(resp => {
        Swal.fire('Actualizado', `${id} actualizado`, 'success')
      })
    } else {
      //crear
      
      this.gastoService.crearGasto(this.gastoForm.value, this.idpre)
      .subscribe((resp: any) => {
        console.log(resp);
        Swal.fire('Creado', `${id} creado correctamente`, 'success');
        this.router.navigateByUrl(`dashboard/gastoc/${resp.gastoDB.id}`)
      })
    }
  }

}

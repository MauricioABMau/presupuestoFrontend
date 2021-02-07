import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Presupuesto } from '../../models/presupuesto.model';
import { PresupuestoService } from '../../services/presupuesto.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-presupuestoc',
  templateUrl: './presupuestoc.component.html',
  styles: [
  ]
})
export class PresupuestocComponent implements OnInit {

  public presupuestoForm: FormGroup;
  public presupuestos: Presupuesto[] = [];
  public presupuestoSeleccionado: Presupuesto;
  public url: string = '';
  public idpro: string = '';

  constructor(private fb: FormBuilder,
              private presupuestoService: PresupuestoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(({id}) => {
       this.cargarPresupuestoById(id);
      this.idpro = id;
    })
    
    this.presupuestoForm = this.fb.group({
      presupuesto_total: ['', Validators.required],
      presupuesto_precio_unitario: ['', Validators.required],
      utilidad: ['', Validators.required],
      iva: ['', Validators.required],
      it: ['', Validators.required],
    });
    this.cargarPresupuesto();
    
  }

  cargarPresupuesto() {
    this.presupuestoService.cargarPresupuesto()
    .subscribe(presupuesto => {
      this.presupuestos = presupuesto;
    })
  }
  
  cargarPresupuestoById(id: string) {
    this.url = this.activatedRoute.snapshot.url[1].path;
   
    if(this.url === 'nuevo') {
      return;
    }
    this.presupuestoService.obtenerPresupuestoPorId(id)
    .subscribe(presupuesto => {
      if(!presupuesto) {
        return this.router.navigateByUrl(`dashboard/presupuesto`)
      }
      const{presupuesto_total, presupuesto_precio_unitario, utilidad, iva, it} = presupuesto;
      console.log(presupuesto);
      this.presupuestoSeleccionado = presupuesto;
      this.presupuestoForm.setValue({presupuesto_total, presupuesto_precio_unitario, utilidad, iva, it})
    })
  }

  guardarPresupuesto() {
    const {id} = this.presupuestoForm.value;

    if(this.presupuestoSeleccionado) {
      //actualizar
      const data = { ...this.presupuestoForm.value, id: this.presupuestoSeleccionado.id}
      this.presupuestoService.actualizarPresupuesto(data)
      .subscribe(resp => {
        Swal.fire('Actualizado', `${id} actualizado`, 'success')
      })
    } else {
      //crear
      
      this.presupuestoService.crearPresupuesto(this.presupuestoForm.value, this.idpro)
      .subscribe((resp: any) => {
        console.log(resp);
        Swal.fire('Creado', `${id} creado correctamente`, 'success');
        this.router.navigateByUrl(`dashboard/presupuestoc/${resp.presupuestoDB.id}`)
      })
    }
  }



}

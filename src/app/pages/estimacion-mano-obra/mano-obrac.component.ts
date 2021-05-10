import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ManoObra } from '../../models/manoObra.model';
import { ManoObraService } from '../../services/mano-obra.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mano-obrac',
  templateUrl: './mano-obrac.component.html',
  styles: [
  ]
})
export class ManoObracComponent implements OnInit {

  public manoObraForm: FormGroup;
  public manoObras: ManoObra[] = [];
  public manoObraSeleccionado: ManoObra;
  public url: string = '';
  public idit: string = '';

  constructor(private fb: FormBuilder,
              private manoObraService: ManoObraService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe(({id}) => {
       this.cargarManoObraById(id);
       this.idit = id;
    })
    this.manoObraForm = this.fb.group({
      cargo: ['', Validators.required],
      sueldo: ['', Validators.required],
      horas: ['', Validators.required],
      nro_personal: ['', Validators.required],
    });
    this.cargarManoObra();
    
  }

  cargarManoObra() {
    this.manoObraService.cargarManoObra()
    .subscribe(manoObra => {
      this.manoObras = manoObra;
    })
  }
  
  cargarManoObraById(id: string) {
    this.url = this.activatedRoute.snapshot.url[1].path;

    if(this.url === 'nuevo') {
      return;
    }
    this.manoObraService.obtenerManoObraPorId(id)
    .subscribe(manoObra => {
      if(!manoObra) {
        return this.router.navigateByUrl(`dashboard/manoObra`)
      }
      const{cargo, sueldo, nro_personal} = manoObra;
      console.log(manoObra);
      this.manoObraSeleccionado = manoObra;
      this.manoObraForm.setValue({cargo, sueldo, nro_personal})
    })
  }

  guardarManoObra() {
    const {id} = this.manoObraForm.value;

    if(this.manoObraSeleccionado) {
      //actualizar
      const data = { ...this.manoObraForm.value, id: this.manoObraSeleccionado.id}
      this.manoObraService.actualizarManoObra(data)
      .subscribe(resp => {
        Swal.fire('Actualizado', `${id} actualizado`, 'success');
        this.router.navigateByUrl(`dashboard/estimacionManoObra`);
      })
    } else {
      //crear
      
      this.manoObraService.crearManoObra(this.manoObraForm.value, this.idit)
      .subscribe((resp: any) => {
        console.log(resp);
        Swal.fire('Creado', `${id} creado correctamente`, 'success');
        this.router.navigateByUrl(`dashboard/item`)
      })
    }
  }

}

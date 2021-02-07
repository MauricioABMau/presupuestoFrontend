import { Component, OnInit } from '@angular/core';
import { ManoObra } from '../../models/manoObra.model';
import { ManoObraService } from '../../services/mano-obra.service';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../services/busquedas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-estimacion-mano-obra',
  templateUrl: './estimacion-mano-obra.component.html',
  styles: [
  ]
})
export class EstimacionManoObraComponent implements OnInit {

  public manoObras: ManoObra[] = [];
  public cargando: boolean = true;
  public totalManoObra: number = 0;
  public desde: number = 0;
  public manoObraForm: FormGroup;

  constructor(private manoObraService: ManoObraService,
              private busquedasService: BusquedasService,
              private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.cargarManoObra();
    this.manoObraForm = this.fb.group({
      cargo: ['', Validators.required],
      sueldo: ['', Validators.required],
     })
  }


  buscar(termino: string) {
    if(termino.length === 0) {
      return this.cargarManoObra();
    }
    this.busquedasService.buscar('manoObra', termino)
    .subscribe((resultados: ManoObra[]) => {
      this.manoObras = resultados
    })
  }

  cargarManoObra() {
    this.cargando = true;

    this.manoObraService.cargarManoObra()
    .subscribe(manoObra => {
      console.log(manoObra);
      this.cargando = false;
      this.manoObras = manoObra;
    })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if(this.desde < 0) {
      this.desde = 0;
    } else if(this.desde >= this.totalManoObra) {
      this.desde -= valor;
    }
    this.cargarManoObra();
  }

  guardarCambios(manoObra: ManoObra) {
    this.manoObraService.actualizarManoObra(manoObra)
    .subscribe(resp => {
      Swal.fire('Actualizado', manoObra.id, 'success')
    })
  }
  
  eliminarManoObra(manoObra: ManoObra){
    
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
          'ManoObra borrado',
          `${manoObra.id} fue eliminado correctamente`,
          'success'
        );
      });
      }
    })
  }

}

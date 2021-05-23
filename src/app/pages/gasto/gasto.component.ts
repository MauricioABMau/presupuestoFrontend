import { Component, OnInit } from '@angular/core';
import { GastoService } from '../../services/gasto.service';
import { Gastos } from '../../models/gasto.model';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../services/busquedas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-gasto',
  templateUrl: './gasto.component.html',
  styles: [
  ]
})
export class GastoComponent implements OnInit {

  public gastos: Gastos[] = [];
  public cargando: boolean = true;
  public totalGasto: number = 0;
  public desde: number = 0;
  public gastoForm: FormGroup;

  constructor(private gastoService: GastoService,
              private busquedasService: BusquedasService,
              private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.cargarGasto();
    this.gastoForm = this.fb.group({
      lugar: ['', Validators.required],
      profesional: ['', Validators.required],
      documentos_legales: ['', Validators.required],
      costo_garantia_contratos: ['', Validators.required],
      costo_operacion: ['', Validators.required],
      costo_administrativo: ['', Validators.required],
      gasto_profecional_especial: ['', Validators.required],
      riesgo_imprevisto: ['', Validators.required],
      movilizacion_demolicion: ['', Validators.required]
                      
    })
  }

  buscar(termino: string) {
    if(termino.length === 0) {
      return this.cargarGasto();
    }
    this.busquedasService.buscar('gastos', termino)
    .subscribe((resultados: Gastos[]) => {
      this.gastos = resultados
    })
  }


  cargarGasto() {
    this.cargando = true;

    this.gastoService.cargarGasto()
    .subscribe(gasto => {
      this.cargando = false;
      this.gastos = gasto;
    })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;
    if(this.desde < 0) {
      this.desde = 0;
    } else if(this.desde >= this.totalGasto) {
      this.desde -= valor;
    }
    this.cargarGasto();
  }

  guardarCambios(gasto: Gastos) {
    this.gastoService.actualizarGasto(gasto)
    .subscribe(resp => {
      Swal.fire('Actualizado', gasto.id, 'success')
    })
  }
  
  eliminarGasto(gasto: Gastos) {
    
    Swal.fire({
      title: 'Borrar gasto?',
      text: `Esta a punto de borrar a ${gasto.id}`,
      icon:'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if(result.value){
        this.gastoService.borrarGasto(gasto.id)
        .subscribe(resp => {
          this.cargarGasto();
          Swal.fire(
          'Gasto borrado',
          `${gasto.id} fue eliminado correctamente`,
          'success'
        );
      });
      }
    })
  }

}

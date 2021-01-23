import { Component, OnInit } from '@angular/core';
import { ManoObra } from '../../models/manoObra.model';
import { ManoObraService } from '../../services/mano-obra.service';

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

  constructor(private manoObraService: ManoObraService) { }
  
  ngOnInit(): void {
    this.cargarManoObra();
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

}

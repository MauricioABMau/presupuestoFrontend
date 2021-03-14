import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Proyecto } from '../../models/proyecto.model';
import { ProyectoService } from '../../services/proyecto.service';
import { PresupuestoService } from '../../services/presupuesto.service';
import { Presupuesto } from '../../models/presupuesto.model';
import { Gastos } from '../../models/gasto.model';
import { GastoService } from '../../services/gasto.service';
import { ItemService } from '../../services/item.service';
import { Material } from '../../models/material.model';
import { MaterialService } from '../../services/material.service';
import { HerramientaService } from '../../services/herramienta.service';
import { ManoObraService } from '../../services/mano-obra.service';
import { Herramienta } from '../../models/herramienta.model';
import { ManoObra } from '../../models/manoObra.model';

@Component({
  selector: 'app-generar-presupuesto',
  templateUrl: './generar-presupuesto.component.html',
  styles: [
  ]
})
export class GenerarPresupuestoComponent implements OnInit {

  public proyectos: Proyecto[] = [];
  public idpro: string = '';
  public idpre;
  public idg: string = '';
  public idi: string = '';
  public cargando: boolean = false;
  public presupuestos: Presupuesto[] = [];
  public gastos: Gastos[] = [];
  public materiales: Material[] = [];
  public herramientas: Herramienta[] = [];
  public manoObra: ManoObra[] = [];
  
  public total: number = 0;
  public totalMaterial: number = 0;
  public totalHerramienta: number = 0;
  public totalManoObra: number = 0;
  public totalGasto: number = 0;
  

  constructor(private proyectoService: ProyectoService,
              private presupuestoService: PresupuestoService,
              private gastoService: GastoService,
              private itemService: ItemService,
              private materialService: MaterialService,
              private herramientaService: HerramientaService,
              private manoObraService: ManoObraService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.idpro = id;
     })    
     this.cargarPresupuesto();     
  }

  
  
  
  cargarPresupuesto() {   
    this.presupuestoService.cargarPresupuesto()
    .subscribe( presupuesto => {
      this.idpre = this.cargarIdPre(presupuesto);
      this.cargarGasto(this.idpre);
      this.cargarItem(this.idpre);
      this.presupuestos = presupuesto;
    })
  }
  
  cargarIdPre(presupuesto: Presupuesto[]): string {
    for (let index = 0; index < presupuesto.length; index++) {
      if(presupuesto[index].proyectoId.toString() === this.idpro){
        return presupuesto[index].id;
      }
    }  
  }
  
  calcularGasto(gasto: Gastos[]): number {
    var total: ConstrainDouble = 0;
    for (let index = 0; index < gasto.length; index++) {
      total = gasto[index].lugar + 
              gasto[index].profesional + 
              gasto[index].documentos_legales + 
              gasto[index].costo_garantia_contratos + 
              gasto[index].costo_operacion + 
              gasto[index].costo_administrativo + 
              gasto[index].gasto_profecional_especial + 
              gasto[index].riesgo_imprevisto + 
              gasto[index].movilizacion_demolicion;
      
    }
    return total;
  }
  
  cargarGasto(idpre: string) {
    this.total = 0;
    this.gastoService.cargarGasto()
    .subscribe( resp => {      
      for (let index = 0; index < resp.length; index++) {
        if(resp[index].presupuestoId === null) {
          console.log('error');
        } else {
          if(resp[index].presupuestoId === idpre){
            this.idg = resp[index].id
            this.gastos.push(resp[index]);
            this.total = this.calcularGasto(this.gastos);
          }
        }
      }
    })
  }
  
  cargarItem(idpre: string) {   
    this.itemService.cargarItem()
    .subscribe( resp => {      
      for (let index = 0; index < resp.length; index++) {
        if(resp[index].presupuestoId === null) {
          
        } else {
          if(resp[index].presupuestoId === idpre){
            this.idi = resp[index].id
            this.cargarMaterial(this.idi);
            this.cargarHerramienta(this.idi);
            this.cargarManoObra(this.idi);
          }
        }
      }
    })
  } 

  cargarMaterial(idI: string) {
    this.materialService.cargarMaterial()
    .subscribe( resp => {      
     
      for (let index = 0; index < resp.length; index++) {
        if(resp[index].itemId === null) {
          console.log('error');
        }         
        if(resp[index].itemId === idI){
          this.totalMaterial = Number(this.totalMaterial) + (Number(resp[index].precio_material) * Number(resp[index].cantidad_material))
          console.log(this.totalMaterial + ' es el total');
          this.materiales.push(resp[index]);
          console.log(this.materiales);
        }        
      }
    })
    
  }
  
  cargarHerramienta(idI: string) {
    this.herramientaService.cargarHerramienta()
    .subscribe( resp => { 
      for (let index = 0; index < resp.length; index++) {
        console.log(resp[index].itemId);
        if(resp[index].itemId === null) {
          console.log('error');
        } 
        if(resp[index].itemId === idI){
          this.totalHerramienta = Number(this.totalHerramienta) + (Number(resp[index].precio_herramienta) * Number(resp[index].cantidad_herramienta));
          console.log('total herramienta: ' + this.totalHerramienta);
          this.herramientas.push(resp[index]);
        }        
      }
    })    
  }
  
  cargarManoObra(idI: string) {
    this.manoObraService.cargarManoObra()
    .subscribe( resp => { 
      for (let index = 0; index < resp.length; index++) {
        if(resp[index].itemId === null) {
          console.log('error');
        } 
        if(resp[index].itemId === idI){
          this.totalManoObra = this.totalManoObra + resp[index].sueldo;
          this.manoObra.push(resp[index]);
        }        
      }
    })    
  }


}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { GastoComponent } from './gasto/gasto.component';
import { ItemComponent } from './item/item.component';
import { EstimacionHerramientaComponent } from './estimacion-herramienta/estimacion-herramienta.component';
import { EstimacionManoObraComponent } from './estimacion-mano-obra/estimacion-mano-obra.component';
import { EstimacionMaterialComponent } from './estimacion-material/estimacion-material.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioComponent } from './usuario/usuario.component';
import { ComponentsModule } from '../components/modal-imagen/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { ProyectocComponent } from './proyecto/proyectoc.component';
import { PresupuestocComponent } from './presupuesto/presupuestoc.component';
import { GastocComponent } from './gasto/gastoc.component';
import { ItemcComponent } from './item/itemc.component';
import { HerramientacComponent } from './estimacion-herramienta/herramientac.component';
import { ManoObracComponent } from './estimacion-mano-obra/mano-obrac.component';
import { MaterialcComponent } from './estimacion-material/materialc.component';
import { ProyectovComponent } from './proyecto/proyectov.component';
import { GastovComponent } from './presupuesto/gastov.component';
import { ItemvComponent } from './presupuesto/itemv.component';
import { MaterialvComponent } from './item/materialv.component';
import { HerramientavComponent } from './item/herramientav.component';
import { ManoObravComponent } from './item/mano-obrav.component';
import { GenerarPresupuestoComponent } from './generar-presupuesto/generar-presupuesto.component'


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ProyectoComponent,
    PresupuestoComponent,
    GastoComponent,
    ItemComponent,
    EstimacionHerramientaComponent,
    EstimacionManoObraComponent,
    EstimacionMaterialComponent,
    AccountSettingsComponent,
    PerfilComponent,
    UsuarioComponent,
    ProyectocComponent,
    PresupuestocComponent,
    GastocComponent,
    ItemcComponent,
    HerramientacComponent,
    ManoObracComponent,
    MaterialcComponent,
    ProyectovComponent,
    GastovComponent,
    ItemvComponent,
    MaterialvComponent,
    HerramientavComponent,
    ManoObravComponent,
    GenerarPresupuestoComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    ProyectoComponent,
    PresupuestoComponent,
    GastoComponent,
    ItemComponent,
    EstimacionHerramientaComponent,
    EstimacionManoObraComponent,
    EstimacionMaterialComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    PipesModule
  ] 
})
export class PagesModule { }

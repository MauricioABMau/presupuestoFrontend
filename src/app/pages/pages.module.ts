import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { PrecioUnitarioComponent } from './precio-unitario/precio-unitario.component';
import { ItemComponent } from './item/item.component';
import { EstimacionHerramientaComponent } from './estimacion-herramienta/estimacion-herramienta.component';
import { EstimacionManoObraComponent } from './estimacion-mano-obra/estimacion-mano-obra.component';
import { EstimacionMaterialComponent } from './estimacion-material/estimacion-material.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ProyectoComponent,
    PresupuestoComponent,
    PrecioUnitarioComponent,
    ItemComponent,
    EstimacionHerramientaComponent,
    EstimacionManoObraComponent,
    EstimacionMaterialComponent,
    AccountSettingsComponent,
    PerfilComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    ProyectoComponent,
    PresupuestoComponent,
    PrecioUnitarioComponent,
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
    RouterModule
  ] 
})
export class PagesModule { }

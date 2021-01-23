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
import { PipesModule } from '../pipes/pipes.module'


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
    UsuarioComponent
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

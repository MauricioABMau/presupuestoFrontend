import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ProyectoComponent } from './proyecto/proyecto.component';



@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    ProyectoComponent
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    ProyectoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ] 
})
export class PagesModule { }

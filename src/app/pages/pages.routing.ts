import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { PrecioUnitarioComponent } from './precio-unitario/precio-unitario.component';
import { ItemComponent } from './item/item.component';
import { EstimacionHerramientaComponent } from './estimacion-herramienta/estimacion-herramienta.component';
import { EstimacionManoObraComponent } from './estimacion-mano-obra/estimacion-mano-obra.component';
import { EstimacionMaterialComponent } from './estimacion-material/estimacion-material.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '', component: DashboardComponent, data: {titulo: 'Dashboard', subtitulo: 'Dashboard'}},
            {path: 'proyecto', component: ProyectoComponent, data: {titulo: 'Dashboard', subtitulo: 'Proyecto'} },
            {path: 'presupuesto', component: PresupuestoComponent, data: {titulo: 'Proyecto', subtitulo: 'Presupuesto'} },
            {path: 'precioUnitario', component: PrecioUnitarioComponent, data: {titulo: 'Proyecto', subtitulo: 'Precio Unitario'} },
            {path: 'item', component: ItemComponent, data: {titulo: 'Dashboard', subtitulo: 'Item'} },
            {path: 'estimacionHerramienta', component: EstimacionHerramientaComponent, data: {titulo: 'Item', subtitulo: 'Herramienta'} },
            {path: 'estimacionManoObra', component: EstimacionManoObraComponent, data: {titulo: 'Item', subtitulo: 'Mano de Obra'} },
            {path: 'estimacionMaterial', component: EstimacionMaterialComponent, data: {titulo: 'Item', subtitulo: 'Material'} },
            {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Dashboard', subtitulo: 'Ajustes de tema'} },
        ]        
    },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class PagesRoutingModule {}
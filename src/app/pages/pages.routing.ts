import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { PrecioUnitarioComponent } from './precio-unitario/precio-unitario.component';
import { ItemComponent } from './item/item.component';
import { EstimacionHerramientaComponent } from './estimacion-herramienta/estimacion-herramienta.component';
import { EstimacionManoObraComponent } from './estimacion-mano-obra/estimacion-mano-obra.component';
import { EstimacionMaterialComponent } from './estimacion-material/estimacion-material.component';

const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        children: [
            {path: '', component: DashboardComponent},
            {path: 'proyecto', component: ProyectoComponent},
            {path: 'presupuesto', component: PresupuestoComponent},
            {path: 'precioUnitario', component: PrecioUnitarioComponent},
            {path: 'item', component: ItemComponent},
            {path: 'estimacionHerramienta', component: EstimacionHerramientaComponent},
            {path: 'estimacionManoObra', component: EstimacionManoObraComponent},
            {path: 'estimacionMaterial', component: EstimacionMaterialComponent},
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
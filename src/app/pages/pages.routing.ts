import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProyectoComponent } from './proyecto/proyecto.component';

const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        children: [
            {path: '', component: DashboardComponent},
            {path: 'proyecto', component: ProyectoComponent},
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
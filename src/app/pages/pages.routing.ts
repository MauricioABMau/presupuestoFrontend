import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { ProyectocComponent } from './proyecto/proyectoc.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { GastoComponent } from './gasto/gasto.component';
import { ItemComponent } from './item/item.component';
import { EstimacionHerramientaComponent } from './estimacion-herramienta/estimacion-herramienta.component';
import { EstimacionManoObraComponent } from './estimacion-mano-obra/estimacion-mano-obra.component';
import { EstimacionMaterialComponent } from './estimacion-material/estimacion-material.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PresupuestocComponent } from './presupuesto/presupuestoc.component';
import { GastocComponent } from './gasto/gastoc.component';
import { ItemcComponent } from './item/itemc.component';
import { HerramientacComponent } from './estimacion-herramienta/herramientac.component';
import { ManoObracComponent } from './estimacion-mano-obra/mano-obrac.component';
import { MaterialcComponent } from './estimacion-material/materialc.component';
import { ProyectovComponent } from './proyecto/proyectov.component';
import { GastovComponent } from './presupuesto/gastov.component';
import { ItemvComponent } from './presupuesto/itemv.component';
import { HerramientavComponent } from './item/herramientav.component';
import { ManoObravComponent } from './item/mano-obrav.component';
import { MaterialvComponent } from './item/materialv.component';
const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '', component: DashboardComponent, data: {titulo: 'Dashboard', subtitulo: 'Dashboard'}},
            
            {path: 'proyecto', component: ProyectoComponent, data: {titulo: 'Dashboard', subtitulo: 'Proyecto'} },
            {path: 'proyectoc/:id', component: ProyectocComponent, data: {titulo: 'Dashboard', subtitulo: 'Proyecto'} },
            {path: 'presupuestov/:id', component: ProyectovComponent, data: {titulo: 'Dashboard', subtitulo: 'Proyecto'} },

            {path: 'presupuesto', component: PresupuestoComponent, data: {titulo: 'Proyecto', subtitulo: 'Presupuesto'} },
            {path: 'presupuestoc/:id', component: PresupuestocComponent, data: {titulo: 'Proyecto', subtitulo: 'Presupuesto'} },
            {path: 'presupuestoc/nuevo/:id', component: PresupuestocComponent, data: {titulo: 'Proyecto', subtitulo: 'Presupuesto'} },

            {path: 'gasto', component: GastoComponent, data: {titulo: 'Proyecto', subtitulo: 'Gasto'} },
            {path: 'gastoc/:id', component: GastocComponent, data: {titulo: 'Proyecto', subtitulo: 'Gasto'} },
            {path: 'gastoc/nuevo/:id', component: GastocComponent, data: {titulo: 'Proyecto', subtitulo: 'Gasto'} },
            {path: 'gastov/:id', component: GastovComponent, data: {titulo: 'Proyecto', subtitulo: 'Gasto'} },

            {path: 'item', component: ItemComponent, data: {titulo: 'Dashboard', subtitulo: 'Item'} },
            {path: 'itemc/:id', component: ItemcComponent, data: {titulo: 'Dashboard', subtitulo: 'Item'} },
            {path: 'itemc/nuevo/:id', component: ItemcComponent, data: {titulo: 'Dashboard', subtitulo: 'Item'} },
            {path: 'itemv/:id', component: ItemvComponent, data: {titulo: 'Dashboard', subtitulo: 'Item'} },

            {path: 'estimacionHerramienta', component: EstimacionHerramientaComponent, data: {titulo: 'Item', subtitulo: 'Herramienta'} },
            {path: 'estimacionHerramientac/:id', component: HerramientacComponent, data: {titulo: 'Item', subtitulo: 'Herramienta'} },
            {path: 'estimacionHerramientac/nuevo/:id', component: HerramientacComponent, data: {titulo: 'Item', subtitulo: 'Herramienta'} },
            {path: 'estimacionHerramientav/:id', component: HerramientavComponent, data: {titulo: 'Item', subtitulo: 'Herramienta'} },
            
            {path: 'estimacionManoObra', component: EstimacionManoObraComponent, data: {titulo: 'Item', subtitulo: 'Mano de Obra'} },
            {path: 'estimacionManoObrac/:id', component: ManoObracComponent, data: {titulo: 'Item', subtitulo: 'Mano de Obra'} },
            {path: 'estimacionManoObrac/nuevo/:id', component: ManoObracComponent, data: {titulo: 'Item', subtitulo: 'Mano de Obra'} },
            {path: 'estimacionManoObrav/:id', component: ManoObravComponent, data: {titulo: 'Item', subtitulo: 'Mano de Obra'} },

            {path: 'estimacionMaterial', component: EstimacionMaterialComponent, data: {titulo: 'Item', subtitulo: 'Material'} },
            {path: 'estimacionMaterialc/:id', component: MaterialcComponent, data: {titulo: 'Item', subtitulo: 'Material'} },
            {path: 'estimacionMaterialc/nuevo/:id', component: MaterialcComponent, data: {titulo: 'Item', subtitulo: 'Material'} },
            {path: 'estimacionMaterialv/:id', component: MaterialvComponent, data: {titulo: 'Item', subtitulo: 'Material'} },
        
            {path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Dashboard', subtitulo: 'Ajustes de tema'} },
            {path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil de usuario'} },
            {path: 'usuario', component: UsuarioComponent, data: {titulo: 'Usuarios'} },
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
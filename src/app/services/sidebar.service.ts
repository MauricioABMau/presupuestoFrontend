import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Main', url: '/'},
        {titulo: 'proyecto', url: 'proyecto'},
        {titulo: 'item', url: 'item'},
        {titulo: 'usuario', url: 'usuario'},
      ]
    },
    {
      titulo: 'Proyecto',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'presupuesto', url: 'presupuesto'},
        {titulo: 'gasto', url: 'gasto'},
      ]
    },
    {
      titulo: 'Item',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'estimacionHerramienta', url: 'estimacionHerramienta'},
        {titulo: 'estimacionManoObra', url: 'estimacionManoObra'},
        {titulo: 'estimacionMaterial', url: 'estimacionMaterial'},
      ]
    }
  ]

  constructor() { }
}

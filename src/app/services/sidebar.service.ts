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
      ]
    },
    {
      titulo: 'Proyecto',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'presupuesto', url: 'presupuesto'},
        {titulo: 'precioUnitario', url: 'precioUnitario'},
      ]
    },
    {
      titulo: 'Item',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'estimacionHerramienta', url: 'estimacionHerramienta'},
        {titulo: 'estimacionManoObra', url: 'estimacionManoObra'},
        {titulo: 'estimacionMaterial', url: 'estimacionMaterial'},
      ]
    }
  ]

  constructor() { }
}

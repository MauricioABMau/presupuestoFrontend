import { Usuario } from '../interfaces/usuario.interface';
import { Presupuesto } from './presupuesto.model';

interface _MaterialItem {
    descripcion: string,
    unidad: number,
    cantidad: number,
    precio_producto: number,
    presupuesto?: Presupuesto,
    id?: string    
}

export class  Material {
    constructor(
        public nombre_material: string,
        public unidad: string,
        public precio_material: number,
        public cantidad_material: number,
        public item?: _MaterialItem,
        public usuario?: Usuario,
        public id?: string,
        public itemId?: string
    ) {

    }
}
import { Usuario } from '../interfaces/usuario.interface';

interface _MaterialItem {
    descripcion: string,
    unidad: number,
    cantidad: number,
    precio_producto: number,
    id?: string    
}

export class  Material {
    constructor(
        public nombre_material: string,
        public precio_material: number,
        public cantidad_material: number,
        public item?: _MaterialItem,
        public usuario?: Usuario,
        public id?: string,
        public itemId?: string
    ) {

    }
}
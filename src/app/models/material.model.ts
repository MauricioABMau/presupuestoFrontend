import { Usuario } from '../interfaces/usuario.interface';

interface _MaterialItem {
    descripcion: string,
    unidad: ConstrainDouble,
    cantidad: ConstrainDouble,
    precio_producto: ConstrainDouble,
    id?: string    
}

export class  Material {
    constructor(
        public nombre_material: string,
        public cantidad_material: ConstrainDouble,
        public precio_material: ConstrainDouble,
        public item?: _MaterialItem,
        public usuario?: Usuario,
        public id?: string,
        public itemId?: string
    ) {

    }
}
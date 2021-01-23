import { Usuario } from '../interfaces/usuario.interface';

interface _HerramientaItem {
    descripcion: string,
    unidad: ConstrainDouble,
    cantidad: ConstrainDouble,
    precio_producto: ConstrainDouble,
    id?: string;  
    
}

export class  Herramienta {
    constructor(
        public nombre_herramienta: string,
        public tipo: string,
        public precio_herramienta: ConstrainDouble,
        public item?: _HerramientaItem,
        public usaurio?: Usuario,
        public id?: string
    ) {

    }
}
import { Usuario } from '../interfaces/usuario.interface';

interface _HerramientaItem {
    descripcion: string,
    unidad: number,
    cantidad: number,
    precio_producto: number,
    id?: string;  
    
}

export class  Herramienta {
    constructor(
        public nombre_herramienta: string,
        public tipo: string,
        public precio_herramienta: number,
        public cantidad_herramienta: number,
        public item?: _HerramientaItem,
        public usaurio?: Usuario,
        public id?: string,
        public itemId?: string
    ) {

    }
}
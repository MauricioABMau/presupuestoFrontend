import { Usuario } from '../interfaces/usuario.interface';

interface _ManoObraItem {
    descripcion: string,
    unidad: number,
    cantidad: number,
    precio_producto: number,
    id?: string    
}

export class  ManoObra {
    constructor(
        public cargo: string,
        public sueldo: number,
        public nro_personal: number,
        public item?: _ManoObraItem,
        public usuario?: Usuario,
        public id?: string,
        public itemId?: string
    ) {

    }
}
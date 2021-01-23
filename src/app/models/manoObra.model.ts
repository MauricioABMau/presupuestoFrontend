import { Usuario } from '../interfaces/usuario.interface';

interface _ManoObraItem {
    descripcion: string,
    unidad: ConstrainDouble,
    cantidad: ConstrainDouble,
    precio_producto: ConstrainDouble,
    id?: string    
}

export class  ManoObra {
    constructor(
        public cargo: string,
        public sueldo: ConstrainDouble,
        public item?: _ManoObraItem,
        public usuario?: Usuario,
        public id?: string
    ) {

    }
}
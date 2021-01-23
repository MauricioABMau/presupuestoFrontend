import { Usuario } from '../interfaces/usuario.interface';

interface _ItemPresupuesto {
    presupuesto_total: ConstrainDouble,
    presupuesto_precio_unitario: ConstrainDouble,
    utilidad: ConstrainDouble,
    iva: ConstrainDouble,
    it: ConstrainDouble,
    id?: string,
}

export class  Item {
    constructor(
        public descripcion: string,
        public unidad: ConstrainDouble,
        public cantidad: ConstrainDouble,
        public precio_producto: ConstrainDouble,
        public presupuesto?: _ItemPresupuesto,
        public usaurio?: Usuario,
        public id?: string
    ) {

    }
}

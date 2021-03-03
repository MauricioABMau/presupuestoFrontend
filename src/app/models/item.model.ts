import { Usuario } from '../interfaces/usuario.interface';

interface _ItemPresupuesto {
    presupuesto_total: number,
    presupuesto_precio_unitario: number,
    utilidad: number,
    iva: number,
    it: number,
    id?: string,
}

export class  Item {
    constructor(
        public descripcion: string,
        public unidad: number,
        public cantidad: number,
        public precio_producto: number,
        public presupuesto?: _ItemPresupuesto,
        public usaurio?: Usuario,
        public id?: string,
        public presupuestoId?: string
    ) {

    }
}

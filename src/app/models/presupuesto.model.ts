import { Usuario } from '../interfaces/usuario.interface';

interface _PresupuestoProyecto {
    nombre_proyecto: string,
    departamento: string,
    direccion: string,
    id: string,
}

export class Presupuesto {
    constructor(public presupuesto_total: number,
                public presupuesto_precio_unitario: number,
                public utilidad: number,
                public iva: number,
                public it: number,
                public actividad: string,
                public unidad: string,
                public codigo: string,
                public numero: number,
                public moneda: string,
                public proyecto?: _PresupuestoProyecto,
                public usuario?: Usuario,
                public id?: string,
                public proyectoId?: string
                ) {}
}
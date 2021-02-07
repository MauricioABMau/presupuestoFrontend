import { Usuario } from '../interfaces/usuario.interface';

interface _PresupuestoProyecto {
    nombre_proyecto: string,
    departamento: string,
    direccion: string,
    id: string,
}

export class Presupuesto {
    constructor(public presupuesto_total: ConstrainDouble,
                public presupuesto_precio_unitario: ConstrainDouble,
                public utilidad: ConstrainDouble,
                public iva: ConstrainDouble,
                public it: ConstrainDouble,
                public proyecto?: _PresupuestoProyecto,
                public usuario?: Usuario,
                public id?: string,
                public proyectoId?: string
                ) {}
}
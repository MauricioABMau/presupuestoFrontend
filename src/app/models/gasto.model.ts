import { Usuario } from '../interfaces/usuario.interface';
interface _GastosPresupuesto {
    utilidad: number,
    iva: number,
    it: number,
    id: string,
}

export class Gastos {
    constructor(public lugar: number,
                public profesional: number,
                public documentos_legales: number,
                public costo_garantia_contratos: number,
                public costo_operacion: number,
                public costo_administrativo: number,
                public gasto_profecional_especial: number,
                public riesgo_imprevisto: number,
                public movilizacion_demolicion: number,
                public id?: string,
                public presupuestoId?: string,
                public presupuesto?: _GastosPresupuesto,
                public usuario?: Usuario
                ) {}
}
import { Usuario } from '../interfaces/usuario.interface';
interface _GastosPresupuesto {
    utilidad: ConstrainDouble,
    iva: ConstrainDouble,
    it: ConstrainDouble,
    id: string,
}



export class Gastos {
    constructor(public lugar: ConstrainDouble,
                public profesional: ConstrainDouble,
                public documentos_legales: ConstrainDouble,
                public costo_garantia_contratos: ConstrainDouble,
                public costo_operacion: ConstrainDouble,
                public costo_administrativo: ConstrainDouble,
                public gasto_profecional_especial: ConstrainDouble,
                public riesgo_imprevisto: ConstrainDouble,
                public movilizacion_demolicion: ConstrainDouble,
                public id?: string,
                public presupueso?: _GastosPresupuesto,
                public usuario?: Usuario
                ) {}
}
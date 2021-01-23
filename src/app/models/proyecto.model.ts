import { Usuario } from '../interfaces/usuario.interface';


export class  Proyecto {
    constructor(
        public nombre_proyecto: string,
        public departamento: string,
        public direccion: string,
        public fecha: Date,
        public id?: string,
        public usuario?: Usuario
    ) {

    }
}
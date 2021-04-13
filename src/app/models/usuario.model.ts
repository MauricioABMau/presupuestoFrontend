import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {
    constructor(
        public nombre: string,
        public apellido: string,
        public email: string,
        public estado: boolean,
        public password?: string,
        public google?: boolean,
        public imagen?: string,
        public rol?: 'ADMIN_ROLE' | 'USER_ROLE',
        public id?: string) {
            
        }
        get imagenUrl() {
            if(!this.imagen) {
                return `${base_url}/upload/usuarios/no-image`;
            } else if(this.imagen.includes('https')) {
                return this.imagen;
            } else if(this.imagen) {
                return `${base_url}/upload/usuarios/${this.imagen}`;
            } else {
                return `${base_url}/upload/usuarios/no-image`;
            }
        }

}
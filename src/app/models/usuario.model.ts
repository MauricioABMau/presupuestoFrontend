export class Usuario {
    constructor(
        public nombre: string,
        public apellido: string,
        public email: string,
        public estado: boolean,
        public password?: string,
        public imagen?: string,
        public google?: boolean,
        public rol?: string,
        public id?: string) {
            
        }

}
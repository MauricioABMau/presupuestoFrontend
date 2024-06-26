import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo: 'usuarios';
  public id: string;
  public img: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get ocultarModal() {
    return this._ocultarModal;
  }

  abrirModal(tipo:'usuarios', id: string, img: string = 'no-img') {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    if(img){
      if(img.includes('https')) {
        this.img = img;
      } else {
        this.img = `${base_url}/upload/${tipo}/${img}`
      };
    } else {
      this.img = `${base_url}/upload/usuarios/no-image`
    }
     
      
      
  }
  
  cerrarModal() {
    this._ocultarModal = true;
  }

  
}

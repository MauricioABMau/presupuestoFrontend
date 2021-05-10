import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService) { 
                this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required],
      apellido: [ this.usuario.apellido, Validators.required],
      rol: [ this.usuario.rol],
      estado: [ this.usuario.estado],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
    .subscribe(() => {
      const {nombre, apellido, rol, estado, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.apellido = apellido,
      this.usuario.rol = rol,
      this.usuario.estado = estado,
      this.usuario.email = email;
     
      Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    })
  } 
  
  cambiarImagen(file: File) {
    this.imagenSubir = file;
    if(!file) {
      return this.imgTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.id)
    .then(img => {
      this.usuario.imagen = img;
      Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
    }).catch(err => {
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    });
  }

}

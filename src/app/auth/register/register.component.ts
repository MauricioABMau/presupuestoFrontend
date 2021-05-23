import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    //borrar
    
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    estado: [false , Validators.required],
    imagen: [null],
    termino: [false, Validators.required],

  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if(this.registerForm.invalid){
      return;
    }
    //Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        //Navegar al dashboard
        this.router.navigateByUrl('/login');
        Swal.fire('Falta activar su cuenta', this.registerForm.get('nombre').value , 'success');
      }, (err) => {
        //Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  campoNoValido (campo: string):boolean {
    if(this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('termino').value && this.formSubmitted;
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (FormGroup: FormGroup) => {
      const pass1Control = FormGroup.get(pass1Name);
      const pass2Control = FormGroup.get(pass2Name);
      if(pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({noEsIgual: true})
      }
    }
  }

  ngOnInit(): void {
  }

}

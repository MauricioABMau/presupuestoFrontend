import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import { RegisterForm } from '../interfaces/register.form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuario.interface';

import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;
  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) { 
  this.googleInit();
              }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.id || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  googleInit() {

    return new Promise((resolve: any) => {
      console.log('entro');
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '257796411891-oq3ll570dskqtmqcpsrehpiht3b0e5ab.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',          // Request scopes in addition to 'profile' and 'email'
        });
        resolve();
      });

    })
  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    })
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        //arreglar la posicion
        const {nombre, apellido, email, estado, password, google, imagen = '', rol, id} = resp.usuario;
        this.usuario = new Usuario(nombre, apellido, email, estado, password, google, imagen, rol, id)
        console.log(this.usuario);
        localStorage.setItem('token', resp.token)         
        return true;
      }),
      catchError(error => of(false) )
    )
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuario`, formData)
    .pipe(
      tap((resp: any ) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

  actualizarPerfil(data: { email: string, nombre: string, rol: string, estado: boolean, apellido: string}) {
    data = {
      ...data,
      rol: "",
      estado: true,
      apellido: "",
    }
    return this.http.put(`${base_url}/usuario/${this.uid}`, data, this.headers)
  }
  
  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap((resp: any ) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }
  
  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap((resp: any ) => {
        localStorage.setItem('token', resp.token)
      })
    )
  }

  cargarUsuarios(desde: number =0) {
    
    const url = `${base_url}/usuario?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
    .pipe(
      map(resp => {
        const usuarios = resp.usuarios.map( user => new Usuario(user.nombre, user.apellido, user.email, user.estado, '', user.google, user.imagen, user.rol, user.id))
        return {
          total: resp.total,
          usuarios
        };
      })
    )
  }
  
  eliminarUsuario(usuario: Usuario) {
    const url = `${base_url}/usuario/${usuario.id}`;
    return this.http.delete(url, this.headers);
  }


  guardarUsuario(usuario: Usuario) {
    return this.http.put(`${base_url}/usuario/${usuario.id}`, usuario, this.headers);
  }
}

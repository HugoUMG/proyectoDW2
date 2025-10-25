import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Credenciales } from '../models/credenciales';
import { RegistroRequest } from '../models/registro-request';
import { LoginResponse } from '../models/login-response';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  private usuarioActualSubject = new BehaviorSubject<Usuario | null>(null);
  usuarioActual$ = this.usuarioActualSubject.asObservable();

  constructor() {
    if (typeof window !== 'undefined') {
      const almacenado = window.localStorage.getItem('usuarioActual');
      if (almacenado) {
        try {
          const usuario = JSON.parse(almacenado) as Usuario;
          this.usuarioActualSubject.next(usuario);
        } catch (error) {
          window.localStorage.removeItem('usuarioActual');
        }
      }
    }
  }

  login(credenciales: Credenciales): Observable<Usuario> {
    return new Observable(observer => {
      fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales)
      })
        .then(async response => {
          if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            const mensaje = (errorBody && errorBody.message) ? errorBody.message : 'No se pudo iniciar sesión.';
            throw new Error(mensaje);
          }
          return response.json() as Promise<LoginResponse>;
        })
        .then(data => {
          const usuario: Usuario = {
            username: data.username,
            email: data.email,
            token: data.token
          };
          this.establecerUsuario(usuario);
          observer.next(usuario);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  registrar(payload: RegistroRequest): Observable<Usuario> {
    return new Observable(observer => {
      fetch(`${this.baseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(async response => {
          if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            const mensaje = (errorBody && errorBody.message) ? errorBody.message : 'No se pudo registrar el usuario.';
            throw new Error(mensaje);
          }
          return response.json() as Promise<LoginResponse>;
        })
        .then(data => {
          const usuario: Usuario = {
            username: data.username,
            email: data.email,
            token: data.token
          };
          this.establecerUsuario(usuario);
          observer.next(usuario);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('usuarioActual');
    }
    this.usuarioActualSubject.next(null);
  }

  private establecerUsuario(usuario: Usuario): void {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('usuarioActual', JSON.stringify(usuario));
    }
    this.usuarioActualSubject.next(usuario);
  }
}

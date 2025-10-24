import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  username = '';
  password = '';
  email = '';
  cargando = false;
  modo: 'login' | 'registro' = 'login';
  mensaje = '';
  tipoMensaje: 'success' | 'error' | '' = '';
  usuarioActual: Usuario | null = null;
  private subscription: Subscription;

  constructor(private authService: AuthService) {
    this.subscription = this.authService.usuarioActual$.subscribe(usuario => {
      this.usuarioActual = usuario;
      if (usuario) {
        this.mensaje = `Sesión activa como ${usuario.username}`;
        this.tipoMensaje = 'success';
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  alternarModo(): void {
    this.modo = this.modo === 'login' ? 'registro' : 'login';
    this.mensaje = '';
    this.tipoMensaje = '';
    this.password = '';
  }

  enviar(): void {
    if (!this.username || !this.password || (this.modo === 'registro' && !this.email)) {
      this.mostrarMensaje('Complete todos los campos requeridos.', 'error');
      return;
    }

    this.cargando = true;
    const accion = this.modo === 'login'
      ? this.authService.login({ username: this.username, password: this.password })
      : this.authService.registrar({ username: this.username, password: this.password, email: this.email });

    accion.subscribe({
      next: usuario => {
        const mensaje = this.modo === 'login'
          ? `Bienvenido ${usuario.username}`
          : `Usuario ${usuario.username} registrado correctamente.`;
        this.mostrarMensaje(mensaje, 'success');
        this.resetCampos();
        this.cargando = false;
      },
      error: error => {
        const mensaje = error instanceof Error ? error.message : 'Ocurrió un error durante la autenticación.';
        this.mostrarMensaje(mensaje, 'error');
        this.cargando = false;
      }
    });
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.resetCampos();
    this.mostrarMensaje('Sesión cerrada correctamente.', 'success');
  }

  private resetCampos(): void {
    this.username = '';
    this.password = '';
    this.email = '';
    this.modo = 'login';
  }

  private mostrarMensaje(mensaje: string, tipo: 'success' | 'error'): void {
    this.mensaje = mensaje;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensaje = '';
      this.tipoMensaje = '';
    }, 4000);
  }
}

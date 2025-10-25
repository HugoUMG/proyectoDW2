import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceGeneralComponent } from './components/balance-general/balance-general.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { Usuario } from './models/usuario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BalanceGeneralComponent, TransaccionesComponent, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Sistema Contable';
  usuarioAutenticado: Usuario | null = null;

  constructor(private authService: AuthService) {
    this.authService.usuarioActual$.subscribe(usuario => {
      this.usuarioAutenticado = usuario;
    });
  }
}

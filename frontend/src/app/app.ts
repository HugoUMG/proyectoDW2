import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceGeneralComponent } from './components/balance-general/balance-general.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { PresentacionComponent } from './components/presentacion/presentacion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PresentacionComponent, BalanceGeneralComponent, TransaccionesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Sistema Contable';
}
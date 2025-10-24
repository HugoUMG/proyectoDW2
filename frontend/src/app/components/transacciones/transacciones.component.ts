import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransaccionService } from '../../services/transaccion.service';
import { Transaccion, CrearTransaccionPayload } from '../../models/transaccion';
import { TransaccionBitacora } from '../../models/transaccion-bitacora';
import { Cuenta } from '../../models/cuenta';

@Component({
  selector: 'app-transacciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transacciones.component.html',
  styleUrl: './transacciones.component.css'
})
export class TransaccionesComponent implements OnInit {
  cuentas: Cuenta[] = [];
  transacciones: Transaccion[] = [];
  bitacora: TransaccionBitacora[] = [];
  nuevaTransaccion: CrearTransaccionPayload = { cuentaId: 0, descripcion: '', monto: 0 };
  mensajeEstado = '';
  tipoMensaje: 'success' | 'error' | '' = '';
  cargando = false;

  constructor(private transaccionService: TransaccionService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    this.transaccionService.cuentas().subscribe({
      next: cuentas => {
        this.cuentas = cuentas;
        if (cuentas.length > 0 && this.nuevaTransaccion.cuentaId === 0) {
          this.nuevaTransaccion.cuentaId = cuentas[0].id;
        }
        this.cargarTransacciones();
        this.cargarBitacora();
      },
      error: error => {
        console.error('Error al cargar cuentas', error);
        this.mostrarMensaje('No se pudieron cargar las cuentas disponibles.', 'error');
        this.cargando = false;
      }
    });
  }

  cargarTransacciones(): void {
    this.transaccionService.listar().subscribe({
      next: transacciones => {
        this.transacciones = transacciones;
        this.cargando = false;
      },
      error: error => {
        console.error('Error al cargar transacciones', error);
        this.mostrarMensaje('No se pudieron cargar las transacciones.', 'error');
        this.cargando = false;
      }
    });
  }

  cargarBitacora(): void {
    this.transaccionService.bitacora().subscribe({
      next: bitacora => {
        this.bitacora = bitacora;
      },
      error: error => {
        console.error('Error al cargar la bitácora', error);
      }
    });
  }

  registrarTransaccion(): void {
    if (!this.nuevaTransaccion.descripcion || !this.nuevaTransaccion.cuentaId) {
      this.mostrarMensaje('Debe ingresar la descripción y seleccionar una cuenta.', 'error');
      return;
    }

    this.cargando = true;
    this.transaccionService.crear(this.nuevaTransaccion).subscribe({
      next: () => {
        this.mostrarMensaje('Transacción registrada correctamente.', 'success');
        this.nuevaTransaccion = { cuentaId: this.nuevaTransaccion.cuentaId, descripcion: '', monto: 0 };
        this.cargarTransacciones();
        this.cargarBitacora();
      },
      error: error => {
        console.error('Error al registrar la transacción', error);
        this.mostrarMensaje('No se pudo registrar la transacción. Intente nuevamente.', 'error');
        this.cargando = false;
      }
    });
  }

  private mostrarMensaje(mensaje: string, tipo: 'success' | 'error'): void {
    this.mensajeEstado = mensaje;
    this.tipoMensaje = tipo;
    setTimeout(() => {
      this.mensajeEstado = '';
      this.tipoMensaje = '';
    }, 4000);
  }
}

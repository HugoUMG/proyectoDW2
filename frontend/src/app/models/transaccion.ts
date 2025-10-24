import { Cuenta } from './cuenta';

export interface Transaccion {
  id: number;
  fecha: string;
  descripcion: string;
  monto: number;
  nodoId: string;
  nodoIp: string;
  cuenta: Cuenta;
}

export interface CrearTransaccionPayload {
  cuentaId: number;
  descripcion: string;
  monto: number;
}

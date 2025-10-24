import { Transaccion } from './transaccion';

export interface TransaccionBitacora {
  id: number;
  fechaRegistro: string;
  nodoId: string;
  nodoIp: string;
  detalle: string;
  transaccion: Transaccion;
}

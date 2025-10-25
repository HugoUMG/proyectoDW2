import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaccion, CrearTransaccionPayload } from '../models/transaccion';
import { TransaccionBitacora } from '../models/transaccion-bitacora';
import { Cuenta } from '../models/cuenta';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {
  private apiUrl = 'http://localhost:8080/api/transacciones';
  private cuentasUrl = 'http://localhost:8080/api/cuentas';

  listar(): Observable<Transaccion[]> {
    return new Observable(observer => {
      fetch(this.apiUrl)
        .then(response => response.json())
        .then((data: Transaccion[]) => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  crear(payload: CrearTransaccionPayload): Observable<Transaccion> {
    return new Observable(observer => {
      fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`No se pudo crear la transacción (HTTP ${response.status})`);
          }
          return response.json();
        })
        .then((data: Transaccion) => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  bitacora(): Observable<TransaccionBitacora[]> {
    return new Observable(observer => {
      fetch(`${this.apiUrl}/bitacora`)
        .then(response => response.json())
        .then((data: TransaccionBitacora[]) => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  cuentas(): Observable<Cuenta[]> {
    return new Observable(observer => {
      fetch(this.cuentasUrl)
        .then(response => response.json())
        .then((data: Cuenta[]) => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }
}

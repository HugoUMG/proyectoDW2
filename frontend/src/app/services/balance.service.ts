import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  // ✅ Usar URL absoluta con puerto 8080
  private apiUrl = 'http://localhost:8080/api/balance';

  getBalance(): Observable<any> {
    return new Observable(observer => {
      fetch(this.apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => {
          console.error('Error fetching balance:', error);
          observer.error(error);
        });
    });
  }
}
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceService } from '../../services/balance.service';

@Component({
  selector: 'app-balance-general',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance-general.component.html',
  styleUrl: './balance-general.component.css'
})
export class BalanceGeneralComponent implements OnInit {
  balance: any = {};

  constructor(
    private balanceService: BalanceService,
    private cdr: ChangeDetectorRef // ✅ Agregar esto
  ) { }

  ngOnInit(): void {
    this.loadBalance();
  }

  loadBalance(): void {
    this.balanceService.getBalance().subscribe((data: any) => {
      this.balance = data;
      console.log('Datos del balance:', this.balance);
      this.cdr.detectChanges(); // ✅ Forzar actualización
    });
  }
}
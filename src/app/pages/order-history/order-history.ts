import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../services/order';
import { CommonModule, CurrencyPipe, DatePipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule, CurrencyPipe, DatePipe, RouterModule, SlicePipe, UpperCasePipe],
  templateUrl: './order-history.html',
  styleUrl: './order-history.scss',
})
export class OrderHistory implements OnInit {
  orderService = inject(OrderService);

  orders = signal<any[]>([]);

  ngOnInit() {
    this.orderService.getUserOrders().subscribe({
      next: (res) => {
        this.orders.set(res);
      },
      error: (err) => console.log('Error fetching orders', err)
    });
  }
}

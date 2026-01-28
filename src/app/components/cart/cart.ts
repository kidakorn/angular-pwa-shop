import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CartService } from '../../services/cart';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, LucideAngularModule, RouterLink, ReactiveFormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  isCheckoutOpen = signal(false);

  constructor(public cartService: CartService) { }

  openCheckout() {
    this.isCheckoutOpen.set(true);
  }

  closeCheckout() {
    this.isCheckoutOpen.set(false);
  }

  provinces = signal ([
    'กรุงเทพมหานคร', 'นนทบุรี', 'ปทุมธานี', 
    'สมุทรปราการ', 'เชียงใหม่', 'ขอนแก่น', 'ชลบุรี'
  ]);

  checkoutForm = new FormGroup ({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    postalCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')]),
    province: new FormControl('', Validators.required),
  });

  onConfirmOrder() {
    if (this.checkoutForm.valid) {
    console.log('ข้อมูลลูกค้า:', this.checkoutForm.value);
    alert('บันทึกข้อมูลเรียบร้อย!');
    this.closeCheckout();
  }
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }
  
}

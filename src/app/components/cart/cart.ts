import { QRCodeComponent } from 'angularx-qrcode';
import generatePayload from 'promptpay-qr';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CartService } from '../../services/cart';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, LucideAngularModule, RouterLink, ReactiveFormsModule, QRCodeComponent],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  isCheckoutOpen = signal(false);

  constructor(public cartService: CartService, private http: HttpClient, private router: Router) {

    this.loadAddressData();

    this.checkoutForm.get('postalCode')?.valueChanges.subscribe(value => {
      if (value && value.length === 5) {

        const filtered = this.fullAddressDatabase().filter(item => item.zipcode == value);

        const results = filtered.map(item => ({
          subDistrict: item.district,
          district: item.amphoe,
          province: item.province
        }));

        this.addressOptions.set(results);
        this.checkoutForm.get('subDistrict')?.setValue('');
      } else {
        this.addressOptions.set([]);
      }
    });

    this.checkoutForm.get('subDistrict')?.valueChanges.subscribe(selectedSubDistrict => {
      if (selectedSubDistrict) {
        const address = this.addressOptions().find(item => item.subDistrict === selectedSubDistrict);

        if (address) {
          this.checkoutForm.patchValue({
            district: address.district,
            province: address.province
          });
        }
      }
    });
  }

  loadAddressData() {
    const url = 'https://raw.githubusercontent.com/earthchie/jquery.Thailand.js/master/jquery.Thailand.js/database/raw_database/raw_database.json';
    this.http.get<any[]>(url).subscribe(data => {
      this.fullAddressDatabase.set(data);
      console.log('โหลดข้อมูลที่อยู่ไทยสำเร็จ! จำนวน:', data.length, 'รายการ');
    });
  }

  fullAddressDatabase = signal<any[]>([]);

  addressOptions = signal<any[]>([]);

  openCheckout() {
    this.isCheckoutOpen.set(true);
  }

  closeCheckout() {
    this.isCheckoutOpen.set(false);
  }

  checkoutForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    postalCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5}$')]),
    province: new FormControl('', Validators.required),
    addressDetail: new FormControl('', Validators.required),
    subDistrict: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    paymentMethod: new FormControl('', Validators.required)
  });

  validateNumber(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  finalAmount = signal(0);
  selectedPaymentMethod = signal('');
  qrCodeString = signal('');

  onConfirmOrder() {
    if (this.checkoutForm.valid) {
      this.finalAmount.set(this.cartService.totalPrice());

      const payload = generatePayload('090-759-6314', { amount: (this.cartService.totalPrice()) });
      this.qrCodeString.set(payload);

      const method = this.checkoutForm.value.paymentMethod
      if (method) {
        this.selectedPaymentMethod.set(method);
      }

      this.closeCheckout();
      this.isOrderSuccess.set(true);
      this.cartService.clearCart();
      this.isCheckoutOpen.set(false);
    }
  }

  isOrderSuccess = signal(false);

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
  }

  goToHome() {
    this.router.navigate(['/']);
    this.isOrderSuccess.set(false);
  }

}

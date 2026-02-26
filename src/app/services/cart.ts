import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { CartItem, Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private cartItems = signal<CartItem[]>([]);

  totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  );

  cartCount = computed(() => this.cartItems().length);

  constructor() { }

  getCartItems() {
    return this.cartItems;
  }

  loadCart() {
    this.http.get<any>(`${environment.apiUrl}/cart`).subscribe({
      next: (res) => {
        if (res && res.products) {
          this.cartItems.set(res.products);
        }
      },
      error: (err) => console.log('No cart found or not logged in yet')
    });
  }

  private syncCartWithServer() {
    const payload = {
      cartItems: this.cartItems().map(item => ({
        product: item.product._id,
        quantity: item.quantity,
      }))
    };
    this.http.post(`${environment.apiUrl}/cart`, payload).subscribe();
  }

  addToCart(product: Product) {
    this.cartItems.update(items => {
      const index = items.findIndex(i => i.product._id === product._id);
      if (index !== -1) {
        items[index].quantity += 1;
      } else {
        items.push({ product, quantity: 1 });
      }
      return [...items];
    });
    this.syncCartWithServer();
  }

  removeFromCart(index: number) {
    this.cartItems.update(items => {
      const newItems = [...items];
      newItems.splice(index, 1);
      return newItems;
    });
    this.syncCartWithServer();
  }

  updateQuantity(index: number, change: number) {
    this.cartItems.update(items => {
      const newQuantity = items[index].quantity + change;

      if (newQuantity > 0) {
        items[index].quantity = newQuantity;
      }
      return [...items];
    });
    this.syncCartWithServer();
  }

  clearFrontendCart() {
    this.cartItems.set([]);
  }

  clearCart() {
    this.cartItems.set([]);
    this.http.delete(`${environment.apiUrl}/cart`).subscribe({
      next: () => console.log('Cart cleared in database successfully!'),
      error: (err) => console.log('Failed to clear cart in DB', err)
    });
  }

  submitOrder(shippingAddress: any, paymentDetails: any) {

    const formattedItem = this.cartItems().map(item => ({
      productId: item.product._id,
      quantity: item.quantity,
    }));

    const orderPayload = {
      items: formattedItem,
      shippingAddress: shippingAddress,
      paymentDetails: paymentDetails,
    };

    return this.http.post(`${environment.apiUrl}/orders`, orderPayload);
  }
}

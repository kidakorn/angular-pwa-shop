import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { CartItem, Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = signal<CartItem[]>(
    JSON.parse(localStorage.getItem('cart_items') || '[]')
  );

  totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  );

  cartCount = computed(() => this.cartItems().length);

  constructor(private http: HttpClient) {
    effect(() => {
      localStorage.setItem('cart_items', JSON.stringify(this.cartItems()));
    });
  }

  getCartItems() {
    return this.cartItems;
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
  }

  removeFromCart(index: number) {
    this.cartItems.update(items => {
      const newItems = [...items];
      newItems.splice(index, 1);
      return newItems;
    });
  }

  updateQuantity(index: number, change: number) {
    this.cartItems.update(items => {
      const newQuantity = items[index].quantity + change;

      if (newQuantity > 0) {
        items[index].quantity = newQuantity;
      }
      return [...items];
    });
  }

  clearCart() {
    this.cartItems.set([]);
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

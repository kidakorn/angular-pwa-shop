import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

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

  constructor() {
    effect(() => {
      localStorage.setItem('cart_items', JSON.stringify(this.cartItems()));
    });
  }

  getCartItems() {
    return this.cartItems;
  }

  addToCart(product: Product) {
    this.cartItems.update(items => {
      const index = items.findIndex(i => i.product.id === product.id);

      if (index !== -1) {
        items[index].quantity += 1; // มีสินค้าแล้ว เพิ่มจำนวน
      } else {
        items.push({ product, quantity: 1 }); // ยังไม่มีสินค้า เพิ่มรายการใหม่
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
}

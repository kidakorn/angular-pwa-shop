import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private products: Product[] = [
    {
      id: 1,
      name: 'Angular PWA Guide',
      price: 450,
      description: 'เรียนรู้วิธีสร้าง PWA แบบละเอียด ตั้งแต่เริ่มต้นจนถึงการ Deploy',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400&h=300',
      category: 'Book'
    },
    {
      id: 2,
      name: 'Coding Coffee Mug',
      price: 290,
      description: 'แก้วกาแฟเซรามิกทนความร้อน สกรีนลายสำหรับชาว Developer',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400&h=300',
      category: 'Accessories'
    }
  ];
  constructor() { }

  getProduct() : Product[] {
    return this.products;
  }
}

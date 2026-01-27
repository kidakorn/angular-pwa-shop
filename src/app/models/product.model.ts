export interface Product {
	id: string;
	name: string;
	price: number;
	description: string;
	imageUrl: string;
	category: string;
	inventory: number;
	rating?: number; // เครื่องหมาย ? หมายความว่าจะมีข้อมูลนี้หรือไม่ก็ได้ครับ
	isBestSeller: boolean;
}

export interface CartItem {
	product: Product;
	quantity: number;
}
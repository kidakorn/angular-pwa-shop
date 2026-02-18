export interface Product {
	_id: string;
	title: string;
	images: string[];
	stock: number;
	price: number;
	description: string;
	soldCount?: number;
	category: any;

	rating?: number; // เครื่องหมาย ? หมายความว่าจะมีข้อมูลนี้หรือไม่ก็ได้ครับ
	isBestSeller: boolean;
}

export interface CartItem {
	product: Product;
	quantity: number;
}
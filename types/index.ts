export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface BillboardImage {
  id: string;
  url: string;
  title: string;
  subtitle: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
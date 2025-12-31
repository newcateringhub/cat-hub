export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
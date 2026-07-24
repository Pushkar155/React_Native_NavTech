export type Shoe = {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity?: number;
  selectedSize?: number;
  inStock?: boolean;
};

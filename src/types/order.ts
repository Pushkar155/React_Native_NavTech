import type { CartItem } from "./cart";

// export type Order = {
//   id: string;
//   items: CartItem[];
//   status: 'pending' | 'paid' | 'shipped' | 'delivered';
// };

export interface Order {
  id: string;

  items: CartItem[];

  total: number;

  createdAt: string;

  status: "Pending" | "Delivered";
}

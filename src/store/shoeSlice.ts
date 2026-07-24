import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Shoe } from "../types/shoe";

type ShoeState = { items: Shoe[] };

const initialState: ShoeState = {
  items: [
    {
      id: "air-max-1",
      name: "Air Max 1",
      imageUrl:
        "https://thedropdate.com/_next/image?url=https%3A%2F%2Fstatic.sneakerjagers.com%2Fp%2Fe1xoI2qjIK3rZmHqmpTDKnjH08PTq1LySEuKXgmU.png&w=3840&q=100",
      brand: "Nike",
      price: 11149,
      description: "Everyday comfort with iconic cushioning.",
      quantity: 25,
      inStock: true,
    },
    {
      id: "club-c-85",
      name: "Club C 85",
      imageUrl:
        "https://imagescdn.reebok.in/img/app/product/4/40540160-31548884.jpg?auto=format&w=390",
      brand: "Reebok",
      price: 8900,
      description: "A clean, classic leather sneaker.",
      quantity: 18,
      inStock: true,
    },
    {
      id: "air-max-270",
      name: "Air Max 270",
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      brand: "Nike",
      price: 149.99,
      description: "Comfortable everyday sneakers with Air Max cushioning.",
      quantity: 32,
      inStock: true,
    },
    {
      id: "ultraboost-22",
      name: "Ultraboost 22",
      imageUrl:
        "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800",
      brand: "Adidas",
      price: 17999,
      description: "Responsive running shoes with Boost technology.",
      quantity: 14,
      inStock: true,
    },
    {
      id: "classic-leather",
      name: "Classic Leather",
      imageUrl:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800",
      brand: "Reebok",
      price: 9400,
      description: "Premium leather sneakers with timeless styling.",
      quantity: 20,
      inStock: true,
    },
    {
      id: "suede-classic",
      name: "Suede Classic",
      imageUrl:
        "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800",
      brand: "Puma",
      price: 8400,
      description: "Iconic suede sneakers for casual everyday wear.",
      quantity: 16,
      inStock: true,
    },
    {
      id: "old-skool",
      name: "Old Skool",
      imageUrl:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
      brand: "Vans",
      price: 7400,
      description: "Classic skate shoes with signature side stripe.",
      quantity: 11,
      inStock: true,
    },
    {
      id: "chuck-taylor",
      name: "Chuck Taylor All Star",
      imageUrl:
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800",
      brand: "Converse",
      price: 6900,
      description: "Legendary canvas sneakers with timeless appeal.",
      quantity: 27,
      inStock: true,
    },
    {
      id: "gel-kayano-30",
      name: "Gel Kayano 30",
      imageUrl:
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800",
      brand: "ASICS",
      price: 18900,
      description: "Premium stability running shoes with GEL cushioning.",
      quantity: 9,
      inStock: true,
    },
    {
      id: "fresh-foam-1080",
      name: "Fresh Foam 1080",
      imageUrl:
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800",
      brand: "New Balance",
      price: 16900,
      description: "Soft, cushioned running shoes for long-distance comfort.",
      quantity: 13,
      inStock: true,
    },
    {
      id: "wave-rider-27",
      name: "Wave Rider 27",
      imageUrl:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800",
      brand: "Mizuno",
      price: 15900,
      description: "Lightweight running shoes with Wave Plate technology.",
      quantity: 7,
      inStock: true,
    },
    {
      id: "zoomx-vaporfly",
      name: "ZoomX Vaporfly",
      imageUrl:
        "https://images.unsplash.com/photo-1605408499391-6368c628ef42?w=800",
      brand: "Nike",
      price: 24900,
      description:
        "Elite racing shoes built for maximum speed and performance.",
      quantity: 5,
      inStock: true,
    },
  ],
};

const shoeSlice = createSlice({
  name: "shoes",
  initialState,
  reducers: {
    setShoes: (state, action: PayloadAction<Shoe[]>) => {
      state.items = action.payload;
    },
    addShoe: (state, action: PayloadAction<Shoe>) => {
      state.items.push(action.payload);
    },
    updateShoe(state, action: PayloadAction<Shoe>) {
      const index = state.items.findIndex(
        (shoe) => shoe.id === action.payload.id,
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    deleteShoe(state, action: PayloadAction<string>) {
      state.items = state.items.filter((shoe) => shoe.id !== action.payload);
    },

    updateStock(
      state,
      action: PayloadAction<{
        id: string;
        inStock: boolean;
      }>,
    ) {
      const shoe = state.items.find((shoe) => shoe.id === action.payload.id);

      if (shoe) {
        shoe.inStock = action.payload.inStock;
      }
    },

    updateQuantity(
      state,
      action: PayloadAction<{
        id: string;
        quantity: number;
      }>,
    ) {
      const shoe = state.items.find((shoe) => shoe.id === action.payload.id);

      if (shoe) {
        shoe.quantity = action.payload.quantity;

        shoe.inStock = action.payload.quantity > 0;
      }
    },
  },
});

export const {
  addShoe,
  setShoes,
  updateShoe,
  deleteShoe,
  updateStock,
  updateQuantity,
} = shoeSlice.actions;
export default shoeSlice.reducer;

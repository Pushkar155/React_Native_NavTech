import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Order } from "../types/order";

type OrderState = { items: Order[] };

const initialState: OrderState = { items: [] };

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.items.unshift(action.payload);
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<Pick<Order, "id" | "status">>,
    ) => {
      const order = state.items.find((item) => item.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
  },
});

export const { addOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cartSlice';
import ordersReducer from './orderSlice';
import shoesReducer from './shoeSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: ordersReducer,
    shoes: shoesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showCart: false,
    cartItems: '',
    totalPrice: '',
    totalQuantities: '',
    qty: 1,
  },

  reducers: {
    incQty(state, action) {
      state.qty += 1;
    },

    decQty(state, action) {
      if (state.qty > 1) {
        state.qty -= 1;
      }
    },
  },
});

export const { incQty, decQty } = cartSlice.actions;
export default cartSlice.reducer;

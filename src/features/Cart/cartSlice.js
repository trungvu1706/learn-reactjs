import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItem: [],
  },

  reducers: {
    displayMiniCart: (state) => {
      state.showMiniCart = true;
    },

    hideMiniCart: (state) => {
      state.showMiniCart = false;
    },

    addToCart: (state, action) => {
      //newItem = {id, product, quantity}

      const newItem = action.payload;
      const index = state.cartItem.findIndex((x) => x.id === newItem.id);
      if (index >= 0) {
        // if item was in cart -> update quantity
        state.cartItem[index].quantity = newItem.quantity;
      } else {
        // if item isn't in cart -> add to cart new item
        state.cartItem.push(newItem);
      }
    },

    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      // check if product is available in cart
      const index = state.cartItem.findIndex((x) => x.id === id);
      if (index >= 0) {
        state.cartItem[index].quantity = quantity;
      }
    },

    removeItemFromCart: (state, action) => {
      const idNeedToRemove = action.payload;
      state.cartItem = state.cartItem.filter((x) => x.id !== idNeedToRemove);
    },
  },
});

const { reducer, actions } = cartSlice;

export const { displayMiniCart, hideMiniCart } = actions;

export default reducer;

import { createSelector } from '@reduxjs/toolkit';

const cartItemSelector = (state) => state.cart.cartItem;

// count items in cart
export const cartItemCountSelector = createSelector(
  cartItemSelector,
  (cartItems) => cartItems.reduce((count, item) => count + item, 0)
);

// calculate total of cart
export const cartItemTotalSelector = createSelector(
  cartItemSelector,
  (cartItem) =>
    cartItem.reduce((total, item) => total + item.quantity * item.salePrice)
);

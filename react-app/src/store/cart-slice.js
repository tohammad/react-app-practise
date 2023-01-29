import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      state.totalQuantity += 1;
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.itemId === newItem.itemId
      );
      if (!existingItem) {
        state.items.push({
          itemId: newItem.itemId,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price,
          name: newItem.name,
        });
      } else {
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.price;
      }
    },
    removeItemToCart(state, action) {
      state.totalQuantity -= 1;
      const itemId = action.payload.itemId;
      const existingItem = state.items.find((item) => item.itemId === itemId);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item !== itemId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendApiRequest = async () => {
      await fetch("https://localhost:3000/api/", {
        method: "PUT",
        body: JSON.stringify(cart),
      });
    };
    await sendApiRequest();
  } 
}
export const cartActions = cartSlice.actions;
export default cartSlice;

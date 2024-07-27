import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of the item and state
interface Item {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity?: number;
}

interface CartState {
  items: Item[];
  favourites: Item[];
}

const initialState: CartState = {
  items: [],
  favourites: []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<Item>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      const existingItem = state.items.find(item => item.id === idToRemove);
      if (existingItem) {
        if ((existingItem.quantity || 1) > 1) {
          existingItem.quantity = (existingItem.quantity || 1) - 1;
        } else {
          state.items = state.items.filter(item => item.id !== idToRemove);
        }
      }
    },
    deleteCartItem: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== idToRemove);
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
    addFavourites: (state, action: PayloadAction<Item>) => {
      const newItem = action.payload;
      state.favourites.push(newItem);
    },
    deleteFavourites: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      state.favourites = state.favourites.filter(item => item.id !== idToRemove);
    },
  },
});

export const { addCartItem, removeCartItem, updateCartItemQuantity, deleteCartItem, addFavourites, deleteFavourites, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

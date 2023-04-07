import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favItems: [],
    favQuantity: 0,
}

const favSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            const newFavorite = action.payload;
            const existingFavorite = state.favItems.find((item) => item.id === newFavorite.id);
            if (!existingFavorite) {
                state.favItems.push({
                    id: newFavorite.id,
                    productName: newFavorite.productName,
                    imgUrl: newFavorite.imgUrl,
                    price: newFavorite.price,
                    quantity: 1,
                    totalPrice: newFavorite.price
                });
                state.favQuantity++;
            }
        },
        deleteFavorite: (state, action) => {
            const id = action.payload;
            const existingFavorite = state.favItems.find(item => item.id === id);
            if (existingFavorite) {
                state.favItems = state.favItems.filter(item => item.id !== id)
                state.favQuantity--;
            }
        },
    }
});


export const favActions = favSlice.actions;
export default favSlice.reducer;
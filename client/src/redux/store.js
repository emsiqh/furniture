import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import favSlice from "./slices/favSlice";

const saveToLocalStorage = (store) => (next) => (action) => {
    const result = next(action);
    localStorage.setItem('currentItems', JSON.stringify(store.getState()));
    return result;
};

const persistedState = localStorage.getItem('currentItems')
    ? JSON.parse(localStorage.getItem('currentItems'))
    : {};

const store = configureStore({
    reducer: {
        cart: cartSlice,
        favorites: favSlice,
    },
    preloadedState: persistedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(saveToLocalStorage),
});

export default store;
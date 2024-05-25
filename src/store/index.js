import { configureStore, createReducer } from "@reduxjs/toolkit";
import reductorDelShop from "../features/Shop/shopSlice"
import { shopApi } from "../services/shopServices";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from '../features/Cart/cartSlice';
import authReducer from '../features/user/userSlice'
import { authApi } from "../services/authService";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        shop: reductorDelShop,
        auth: authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware).concat(authApi.middleware)
})

setupListeners(store.dispatch)

export default store
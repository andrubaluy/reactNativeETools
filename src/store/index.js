import { configureStore, createReducer } from "@reduxjs/toolkit";
import reductorDelShop from "../features/Shop/shopSlice"
import { shopApi } from "../services/shopServices";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        shop: reductorDelShop,
        [shopApi.reducerPath]: shopApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware)
})

setupListeners(store.dispatch)

export default store
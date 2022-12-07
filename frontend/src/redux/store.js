import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/slices/auth'
import messageReducer from './messages/slices/message'
import productReducer from './products/slices/product'
import categoryReducer from './category/slices/category'
import cartReducer from './cart/slices/cart'
import orderReducer from './order/slices/order'

const reducer = {
    auth: authReducer,
    message: messageReducer,
    product: productReducer,
    category: categoryReducer,
    cart: cartReducer,
    order: orderReducer
}
  
const store = configureStore({
    reducer: reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    })
})

export default store;
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/slices/auth'
import messageReducer from './messages/slices/message'
import productReducer from './products/slices/product'
import categoryReducer from './category/slices/category'
import orderReducer from './order/slices/order'
import userReducer from './user/slices/user'

const reducer = {
    auth: authReducer,
    message: messageReducer,
    product: productReducer,
    category: categoryReducer,
    order: orderReducer,
    user: userReducer
}
  
const store = configureStore({
    reducer: reducer,
    devTools: true,
})

export default store;
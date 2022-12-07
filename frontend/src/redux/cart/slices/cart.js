import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")) : [],
    cartTotalQuantity : 0,
    cartTotalAmount : 0
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers:{
        addToCart(state,action){
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            if(itemIndex >= 0){
                state.cartItems[itemIndex].Quantity += 1;
                state.cartItems[itemIndex].TotalPrice += action.payload['detail'].price;
                toast.info(`Increased quantity of ${action.payload.name}`,{
                    position:"top-right",
                })
            }else{
                const tempProduct = { ...action.payload, Quantity:1, TotalPrice:action.payload['detail'].price };
                state.cartItems.push(tempProduct)
                toast.success(`${action.payload.name} added to cart`,{
                    position:"top-right",
                })
            }  
            localStorage.setItem("Cart", JSON.stringify(state.cartItems)) 
        },

        removeFromCart(state,action){
            const updatedCart = state.cartItems.filter(
                (cartItem) => cartItem.id !== action.payload.id
            );
            state.cartItems = updatedCart;
            localStorage.setItem("Cart", JSON.stringify(state.cartItems)) 
            toast.error(`Item deleted from cart`,{
                position:"top-right",
            })
        },
        increaseQuantity(state,action){
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            state.cartItems[itemIndex].Quantity += 1;
            state.cartItems[itemIndex].TotalPrice += action.payload['detail'].price;
            localStorage.setItem("Cart", JSON.stringify(state.cartItems)) 
            toast.info(`Item increased in cart`,{
                position:"top-right",
            })
        },
        decreaseQuantity(state,action){
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            
            if(state.cartItems[itemIndex].Quantity > 1){
                state.cartItems[itemIndex].Quantity -= 1;
                state.cartItems[itemIndex].TotalPrice -= action.payload['detail'].price;
                toast.info(`Item decreased from cart`,{
                    position:"top-right",
                })
            }else if(state.cartItems[itemIndex].Quantity === 1){
                const updatedCart = state.cartItems.filter(
                    (cartItem) => cartItem.id !== action.payload.id
                );
                state.cartItems = updatedCart;
                toast.error(`Item deleted from cart`,{
                    position:"top-right",
                })
            }
            localStorage.setItem("Cart", JSON.stringify(state.cartItems)) 
        },
        clearCart(state,action){
            state.cartItems = [];
            localStorage.removeItem("Cart"); 
            toast.error(`All items are removed from cart`,{
                position:"top-right",
            })
        },
        afterPayment(state,action){
            state.cartItems = [];
            localStorage.removeItem("Cart"); 
        },
        getTotal(state,action){
            let {total} = state.cartItems.reduce(
                (cartTotal, cartItem) =>{
                    const {TotalPrice} = cartItem;
                    cartTotal.total += TotalPrice;
                    return cartTotal;
                },
                {
                    total:0,
                }
            )

            state.cartTotalAmount = total
        }
    }
})

export const { addToCart, removeFromCart , increaseQuantity, decreaseQuantity, clearCart, getTotal, afterPayment} = cartSlice.actions;
const { reducer } = cartSlice;
export default reducer;

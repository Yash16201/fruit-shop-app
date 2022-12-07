import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart, getTotal } from "../redux/cart/slices/cart";


const Cart = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } =useSelector((state)=> state.auth)
  const moveto = useNavigate();
  const { cartItems,cartTotalAmount } = useSelector((state) => state.cart)
  const cartItem = cartItems;
  useEffect(() => {
    dispatch(getTotal())
  }, [cartItem])
  
  const proceedtoBuy = () =>{
    moveto('/buyit');
  }
  return (
    <>
    <div className='container my-5'>
      <h2>Your Cart</h2>
      <table className='table mt-5'>
        <thead>
            <tr>
                <th scope='col'> Prouct Name</th>
                <th scope='col'> Price </th>
                <th scope='col'> Product Quantity</th>
                <th scope='col'> Total </th>
            </tr>
        </thead>
        <tbody>
            {
              cartItem.length > 0 ? cartItem.map((row)=>(
                <tr key={row.id}>
                  <td>{row.name} <a role="button" className='text-danger' onClick={()=>{dispatch(removeFromCart(row))}}>(Delete)</a> </td>
                  <td>₹{row['detail'].price} </td>
                  <td> <button className="btn btn-danger btn-sm" onClick={()=>{dispatch(decreaseQuantity(row))}}>-</button> {row.Quantity} <button className="btn btn-primary btn-sm" onClick={()=>{dispatch(increaseQuantity(row))}}>+</button></td>
                  <td>₹{row.TotalPrice} </td>
                </tr>  
               )) :
               <tr>
                  <td colSpan={4} className="text-center">
                        No Data
                  </td>
               </tr>
            }
        </tbody>
        <tfoot>
            {
              cartItem.length > 0 &&
              <tr>
                <td colSpan={3}> <b> Subtotal </b> </td>
                <td colSpan={1}> <b> ₹{cartTotalAmount} </b> </td>
              </tr>
              
            }  
        </tfoot>
      </table>
      {
        cartItem.length > 0 && 
        <>
        <button className="btn btn-danger float-left my-3" onClick={()=>{dispatch(clearCart())}}>Clear cart</button>      
        </>
      }
      {
        cartItem.length > 0 ? isLoggedIn ? <button className="btn btn-primary float-right my-3" onClick={proceedtoBuy}>Proceed to buy</button> : <h4 className='float-right my-3'> Please login to continue </h4> : <h4 className='float-right my-3'> Please fill cart to continue </h4> 
      }
    </div>
    </>
  )
}

export default Cart
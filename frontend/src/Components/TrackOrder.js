import React, { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Footer from './Footer'
import { useSelector, useDispatch } from "react-redux";
import { track } from "../redux/order/slices/order";

const TrackOrder = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const user_id  = user.id;
    const {id} = useParams();
    const { trackOrder } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    
    const fetchData = useCallback(() => {
      dispatch(track({id,user_id}))
      //eslint-disable-next-line
    }, [dispatch])
    
    useEffect(() => {
      fetchData() 
    }, [fetchData])
    return (
    <>
        <div className='container my-5'>
        <h2>Order #{id-10}-{id*id+id-id*2}-{id*200}</h2>
        <br/>
        <h3>Product Details</h3>
        <table className='table mt-5'>
            <thead>
                <tr>
                    <th scope='col'>Sr No.</th>
                    <th scope='col'> Product Name </th>
                    <th scope='col'> Price</th>
                    <th scope='col'> Quantity</th>
                    <th scope='col'> Total </th>
                </tr>
            </thead>
            <tbody>
                {
                    trackOrder.length > 0 && trackOrder.map((row,key)=>(
                        <tr key={row.id}>
                            <td>{key+1}</td>
                            <td>{row['product'].name}</td>
                            <td>{row['product'].detail.price}</td>
                            <td>{row.total_quantity}</td>
                            <td>{row.total_amount}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
        <Footer/>
    </>
    )
}

export default TrackOrder
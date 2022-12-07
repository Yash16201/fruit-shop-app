import React,{useEffect,useCallback} from 'react'
import Footer from './Footer'
import { useSelector, useDispatch } from "react-redux";
import { get } from "../redux/order/slices/order";
import moment from "moment"
import { Link } from 'react-router-dom';
const MyOrder = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const { order } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  
  const fetchData = useCallback(() => {
    dispatch(get(user.id))
    //eslint-disable-next-line
  }, [dispatch])
  
  useEffect(() => {
    fetchData() 
  }, [fetchData])
  return (
    <>
    <div className='container my-5'>
      <h2>Your Orders</h2>
      <table className='table mt-5'>
        <thead>
            <tr>
                <th scope='col'>Sr No.</th>
                <th scope='col'> Deliver to </th>
                <th scope='col'> Ordered at</th>
                <th scope='col'> Amount</th>
                <th scope='col'> Status </th>
                <th scope='col'> Action  </th>
            </tr>
        </thead>
        <tbody>
            {
                order.length > 0 && order.map((row,key)=>(
                    <tr key={row.id}>
                        <td>{key+1}</td>
                        <td>{row['dispatch'].full_name}</td>
                        <td>{moment(row.createdAt).format('DD-MMMM-Y')}</td>
                        <td>{row.totalwithtax}</td>
                        <td>{row.status}</td>
                        <td><Link to={`/track/${row.id}`} role="button">View Products</Link></td>
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

export default MyOrder
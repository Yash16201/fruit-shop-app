import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get, updatePayment, updateStatus } from '../redux/order/slices/order'
import moment from 'moment'

const ManageOrder = () => {
    const dispatch = useDispatch();
    const { order } = useSelector((state) => state.order);
    const fetchData = useCallback(() => {
      dispatch(get())
    }, [dispatch])
  
    useEffect(() => {
      fetchData() 
    }, [fetchData])
  const handleStatus = (id,e) =>{
    const status = e.target.value
    dispatch(updateStatus({id,status}))
  }
  const handlePaymentStatus = (id,e) =>{
    const status = e.target.value
    dispatch(updatePayment({id,status}))
  }
  return (
    <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
            <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">View Orders </h6>
                <div className="table">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                        <thead>
                            <tr className="text-white">
                                <th scope="col">Sr No.</th>
                                <th scope="col">Order Id</th>
                                <th scope="col">Ordered By</th>
                                <th scope="col">Ordered At</th>
                                <th scope="col">Updated At</th>
                                <th scope="col">Payment Status</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.length > 0 && order.map((row,key)=>{
                                    return(
                                        <tr key={row.id}>
                                            <td>{key+1}</td>
                                            <td>{row.id}</td>
                                            <td>{row['dispatch'].full_name}</td>
                                            <td>{moment(row.created_at).format('DD-MM-Y')}</td>
                                            <td>{moment(row.updated_at).format('DD-MM-Y')}</td>
                                            <td>
                                                <select className="form-select" id="floatingSelect"
                                                    aria-label="Floating label select example" onChange={e=>handlePaymentStatus(row.id,e)}>
                                                    {
                                                        row['payment'].payment_status === "paid" ? <option value="paid" selected>Paid</option> : <option value="paid">Paid</option>
                                                    }
                                                    {
                                                        row['payment'].payment_status === "unpaid" ? <option value="unpaid" selected>Unpaid</option> : <option value="unpaid">Unpaid</option>
                                                    }
                                                </select>
                                            </td>
                                            <td>
                                                <select className="form-select" id="floatingSelect"
                                                    aria-label="Floating label select example" onChange={e=>handleStatus(row.id,e)}>
                                                    {
                                                        row.status === "Ordered" ? <option value="Ordered" selected>Ordered</option> : <option value="Ordered">Ordered</option>
                                                    }
                                                    {
                                                        row.status === "Dispatched" ? <option value="Dispatched" selected>Dispatched</option> : <option value="Dispatched">Dispatched</option>
                                                    }
                                                    {
                                                        row.status === "Delivered" ? <option value="Delivered" selected>Delivered</option> : <option value="Delivered">Delivered</option>
                                                    }
                                                </select>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ManageOrder
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteproduct, fetch } from '../../redux/products/slices/product'
import moment from 'moment'
const ManageProduct = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state)=> state.product)

  const fetchData = useCallback(()=>{
    dispatch(fetch())
  },[dispatch])
  useEffect(()=>{
    fetchData()
  },[fetchData])
  const handleDelete = (id) =>{
    // dispatch(deleteproduct(id)).then(()=>{
    //     dispatch(fetch())
    // })
  }
  return (
    <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
            <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">View Product </h6>
                <div className="table">
                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                        <thead>
                            <tr className="text-white">
                                <th scope="col">#</th>
                                <th scope="col">Product name</th>
                                <th scope="col">Product price</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Updated At</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.length > 0 && product.map((row,key)=>{
                                    return(
                                        <tr key={row.id}>
                                            <td>{key+1}</td>
                                            <td>{row.name}</td>
                                            <td>{row['detail'].price}</td>
                                            <td>{moment(row.created_at).format('DD-MM-Y')}</td>
                                            <td>{moment(row.updated_at).format('DD-MM-Y')}</td>
                                            <td>
                                                <Link className="btn btn-sm btn-primary" to={`/editproduct/${row.id}`}>Edit</Link>
                                                <button className="btn btn-sm btn-primary mx-2" onClick={()=>{ dispatch(deleteproduct(row.id)).then(()=>{ dispatch(fetchData()) }) }}>Delete</button>
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

export default ManageProduct
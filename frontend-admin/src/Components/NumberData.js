import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategory } from '../redux/category/slices/category';
import { get } from '../redux/order/slices/order';
import { fetch } from '../redux/products/slices/product';
import { fetchUsers } from '../redux/user/slices/user';
const NumberData = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user)
  const { category } = useSelector((state) => state.category)
  const { product } = useSelector((state)=> state.product)
  const { order } = useSelector((state) => state.order)

  const fetchData = useCallback(() => {
    dispatch(get())
    dispatch(fetchUsers())
    dispatch(fetchCategory())
    dispatch(fetch())
  }, [dispatch])

  useEffect(() => {
    fetchData() 
  }, [fetchData])
    
  return (
    <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
            <div className="col-sm-6 col-xl-3">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-line fa-3x text-primary"></i>
                    <div className="ms-3">
                        <p className="mb-2">Total Users</p>
                        <h6 className="mb-0">{user.length}</h6>
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-xl-3">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-bar fa-3x text-primary"></i>
                    <div className="ms-3">
                        <p className="mb-2">Total Categories</p>
                        <h6 className="mb-0">{category.length}</h6>
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-xl-3">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-area fa-3x text-primary"></i>
                    <div className="ms-3">
                        <p className="mb-2">Total Products</p>
                        <h6 className="mb-0">{product.length}</h6>
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-xl-3">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-pie fa-3x text-primary"></i>
                    <div className="ms-3">
                        <p className="mb-2">Total Orders</p>
                        <h6 className="mb-0">{ order.length }</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NumberData
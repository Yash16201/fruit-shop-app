import React, { useCallback, useEffect } from 'react'
import NumberData from './NumberData'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategory } from '../redux/category/slices/category';
import { get } from '../redux/order/slices/order';
import { fetch } from '../redux/products/slices/product';
import { fetchUsers } from '../redux/user/slices/user';
import BarChart from './Charts and Graphs/BarChart';
import PieChart from './Charts and Graphs/PieChart';
import AreaChart from './Charts and Graphs/AreaChart';
const Home = () => {
    const dispatch = useDispatch()
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
    <>
        <NumberData/>
        <div className="container pt-4 px-4">
            <div className="row g-4">
                <div className="col-sm-6">
                    <div className="bg-secondary text-center rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0">Price Bar Chart</h6>
                        </div>
                        <BarChart label={product.map(x => x.name)} data={product.map(x => x['detail'].price)}/>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="bg-secondary text-center rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0">Price Area Chart</h6>
                        </div>
                        <AreaChart label={product.map(x => x.name)} data={product.map(x => x['detail'].price)}/>
                    </div>
                </div>
            </div>
        </div>
        <div className="container pt-4 px-4 my-2">
            <div className="row g-4">
                <div className="col-sm-6">
                    <div className="bg-secondary text-center rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <h6 className="mb-0">Price Pie Chart</h6>
                        </div>
                        <PieChart label={product.map(x => x.name)} data={product.map(x => x['detail'].price)}/>
                    </div>
                </div>
            </div>
        </div>   
    </>
  )
}

export default Home
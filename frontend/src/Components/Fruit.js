import React, {useEffect, useCallback, useState} from 'react'
import Footer from './Footer'
import ShopFruit from './ShopFruit'
import { useSelector, useDispatch } from "react-redux";
import { fetch, fetchbycategory, fetchbyname } from "../redux/products/slices/product";
import { fetchCategory } from "../redux/category/slices/category"
import { useParams } from 'react-router-dom';


const Fruit = () => {
  
  const { product } = useSelector((state) => state.product);
  const { category } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [Search, setSearch] = useState()

  const fetchData = useCallback(() => {
    dispatch(fetch())
    dispatch(fetchCategory())
  }, [dispatch])

  useEffect(() => {
    fetchData() 
  }, [fetchData])

  const fetchproductbyname = () =>{
    dispatch(fetchbyname(Search))
  }

  const fetchproductbycategory = (e) =>{
    if(e.target.value === ""){
      window.location.reload();
    }
    dispatch(fetchbycategory(e.target.value))
  }

  return (
    <section className="contact_section layout_padding-bottom my-5">

        <div className="contact_form-container">
        <div className='container'>
            <input type="text" placeholder="Name of fruit" name="name" onKeyUp={fetchproductbyname} onChange={(e=>setSearch(e.target.value))}/>
            <select className='form-select' name="categories" onChange={(e)=>{fetchproductbycategory(e)}} >
                <option value="">Fetch Category Wise</option>
                {
                  category.length > 0 && category.map((row)=>(
                    <option value={row.id} key={row.id}>{row.name}</option>
                  ))
                }
            </select>               
            </div>
        </div>
        {
          product.length > 0 && 
            <>
              <ShopFruit product={product}/>  
            </>
        }
        <Footer/>
    </section>
  )
}

export default Fruit
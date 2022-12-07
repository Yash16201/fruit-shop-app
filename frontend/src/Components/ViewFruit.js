import React, {useCallback, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Footer from './Footer'
import { useSelector, useDispatch } from "react-redux";
import { fetchbyid } from "../redux/products/slices/product";
import { addToCart } from "../redux/cart/slices/cart";


const ViewFruit = () => {
  const id  = useParams();
  const { productbyid } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const fetchData = useCallback(() => {
    dispatch(fetchbyid(id))
    //eslint-disable-next-line
  }, [dispatch])
//   const fetchData = () =>{
//     dispatch(fetchbyid(id))
//   }

  useEffect(() => {
    fetchData() 
  }, [fetchData])


  return (
    <div>
        <div>
        <section className="about_section">
            <div className="container">
            {
                productbyid?.map((row, key)=>(
                    <div className="row my-5" key={row.id}>
                        <div className="col-md-6">
                        
                            <img src={`http://localhost:8000/Image/${row['detail'].image}`}  alt="" height="min-content" width="min-content"/>
                        </div>
                        <div className="col-md-6">
                        <div className="detail-box">
                            <div className="heading_container">
                            <h2>
                                About {row.name}
                            </h2>
                            </div>
                            <p className='text-justify mx-2'>
                                {row['detail'].description}
                            </p>
                            <p className='text-justify mx-2 my-5'>
                                Price :- ₹{row['detail'].price} /kg
                            </p>
                            <button name='addtocart' className="btn btn-primary" onClick={()=>{dispatch(addToCart(row))}}> Add to cart </button>
                        </div>
                        </div>
                </div>
                ))
            }
            
            </div>
        </section>
        {/* <FruitInfo product={productbyid}/> */}

        <Footer/>
    </div>
    </div>
    
  )
}

export default ViewFruit
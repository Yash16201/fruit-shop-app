import React from 'react'
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart/slices/cart";
const FruitInfo = (props) => {
    const dispatch = useDispatch();
    // const handleAddToCart = (product) =>{
    //     console.log("button clicked");
    //     dispatch(addToCart(product))
    // }
  return (
    <div>
        <section className="about_section">
            <div className="container">
            {
                props.product?.map((row)=>(
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
    </div>
  )
}

export default FruitInfo